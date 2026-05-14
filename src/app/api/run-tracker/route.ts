import { NextRequest } from "next/server";
import { createRun, insertResult } from "@/lib/db";
import { checkMention, PLATFORMS } from "@/lib/dataforseo";
import type { PlatformId } from "@/lib/dataforseo";
import type { SSEEvent } from "@/app/tool/ai-mention-tracker/types";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface RunTrackerPayload {
  brandName: string;
  brandDomain: string;
  competitors: string[];
  keywords: string[];
  apiLogin?: string;
  apiPassword?: string;
}

/* ------------------------------------------------------------------ */
/*  POST Handler                                                       */
/* ------------------------------------------------------------------ */

export async function POST(request: NextRequest) {
  const body = (await request.json()) as RunTrackerPayload;

  const { brandName, brandDomain, competitors, keywords, apiLogin, apiPassword } = body;

  if (!brandName || !brandDomain || !keywords?.length) {
    return new Response(
      JSON.stringify({ error: "brandName, brandDomain, and keywords are required" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const runId = crypto.randomUUID();
  const total = keywords.length * PLATFORMS.length;

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      try {
        // Create the run in SQLite
        createRun({
          id: runId,
          brand_domain: brandDomain,
          brand_name: brandName,
          competitors,
        });

        let step = 0;

        for (const keyword of keywords) {
          for (const platform of PLATFORMS) {
            step++;

            try {
              const result = await checkMention(
                platform.id as PlatformId,
                keyword,
                brandName,
                brandDomain,
                apiLogin,
                apiPassword
              );

              // Store in database
              insertResult({
                run_id: runId,
                keyword,
                platform: platform.id,
                mentioned: result.mentioned,
                mention_position: result.position,
                ai_response_text: result.ai_response_text,
              });

              // Push SSE event to client
              const event: SSEEvent = {
                step,
                total,
                keyword,
                platform: platform.id,
                platformLabel: platform.label,
                mentioned: result.mentioned,
                position: result.position,
                aiResponseText: result.ai_response_text,
              };

              controller.enqueue(
                encoder.encode(`data: ${JSON.stringify(event)}\n\n`)
              );
            } catch (err) {
              // Still push an event on error so progress continues
              const event: SSEEvent = {
                step,
                total,
                keyword,
                platform: platform.id,
                platformLabel: platform.label,
                mentioned: false,
                position: null,
                aiResponseText: err instanceof Error ? err.message : "Unknown error",
                error: err instanceof Error ? err.message : "Unknown error",
              };

              controller.enqueue(
                encoder.encode(`data: ${JSON.stringify(event)}\n\n`)
              );

              // Also store the error result
              insertResult({
                run_id: runId,
                keyword,
                platform: platform.id,
                mentioned: false,
                mention_position: null,
                ai_response_text:
                  err instanceof Error ? err.message : "Unknown error",
              });
            }
          }
        }

        // Send final done event
        const doneEvent: SSEEvent = {
          step: total,
          total,
          keyword: "",
          platform: "",
          platformLabel: "",
          mentioned: false,
          position: null,
          done: true,
          runId,
        };

        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify(doneEvent)}\n\n`)
        );

        controller.close();
      } catch (err) {
        const errorEvent = {
          error: err instanceof Error ? err.message : "Unknown stream error",
          done: true,
        };
        controller.enqueue(
          encoder.encode(`data: ${JSON.stringify(errorEvent)}\n\n`)
        );
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}
