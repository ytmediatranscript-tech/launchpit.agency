/* ------------------------------------------------------------------ */
/*  DataForSEO API Client                                              */
/* ------------------------------------------------------------------ */

const DEFAULT_LOGIN = process.env.DATAFORSEO_LOGIN;
const DEFAULT_PASSWORD = process.env.DATAFORSEO_PASSWORD;

if (!DEFAULT_LOGIN || !DEFAULT_PASSWORD) {
  console.warn(
    "DATAFORSEO_LOGIN or DATAFORSEO_PASSWORD not found in environment variables"
  );
}

const BASE_URL = "https://api.dataforseo.com";

/* ------------------------------------------------------------------ */
/*  Platform Definitions                                              */
/* ------------------------------------------------------------------ */

export const PLATFORMS = [
  { id: "google", label: "Google AI Overview" },
  { id: "chatgpt", label: "ChatGPT" },
  { id: "perplexity", label: "Perplexity" },
  { id: "gemini", label: "Gemini" },
  { id: "claude", label: "Claude" },
] as const;

export type PlatformId = (typeof PLATFORMS)[number]["id"];

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface DataForSEOSection {
  text: string;
}

interface DataForSEOItem {
  sections?: DataForSEOSection[];
  markdown?: string;
  text?: string;
  type?: string;
}

interface DataForSEOResult {
  items?: DataForSEOItem[];
}

interface DataForSEOTask {
  result?: DataForSEOResult[];
}

interface DataForSEOResponse {
  tasks: DataForSEOTask[];
}

export interface MentionCheckResult {
  mentioned: boolean;
  position: number | null;
  ai_response_text: string;
}

/* ------------------------------------------------------------------ */
/*  Core Fetch                                                         */
/* ------------------------------------------------------------------ */

async function dataForSEOFetch(
  endpoint: string,
  data: Record<string, unknown>,
  login?: string,
  password?: string
): Promise<DataForSEOResponse> {
  const effectiveLogin = login || DEFAULT_LOGIN;
  const effectivePassword = password || DEFAULT_PASSWORD;

  if (!effectiveLogin || !effectivePassword) {
    throw new Error("DataForSEO credentials are missing. Please provide them in the form or environment variables.");
  }

  const auth = Buffer.from(`${effectiveLogin}:${effectivePassword}`).toString("base64");

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify([data]),
  });

  if (!response.ok) {
    const errorBody = await response.text().catch(() => "No error body");
    throw new Error(`DataForSEO API error: ${response.status} ${response.statusText} - ${errorBody}`);
  }

  return response.json() as Promise<DataForSEOResponse>;
}

/* ------------------------------------------------------------------ */
/*  Endpoint Configuration                                             */
/* ------------------------------------------------------------------ */

interface PlatformConfig {
  endpoint: string;
  buildPayload: (keyword: string) => Record<string, unknown>;
  extractText: (item: DataForSEOItem) => string;
}

const PLATFORM_CONFIGS: Record<PlatformId, PlatformConfig> = {
  google: {
    endpoint: "/v3/serp/google/ai_mode/live/advanced",
    buildPayload: (keyword: string) => ({
      keyword,
      location_code: 2840, // United States
      language_code: "en",
      device: "desktop",
    }),
    extractText: (item) => item.markdown ?? item.text ?? "",
  },
  chatgpt: {
    endpoint: "/v3/ai_optimization/chat_gpt/llm_responses/live",
    buildPayload: (keyword: string) => ({
      user_prompt: keyword,
      model_name: "gpt-4o-mini",
      web_search: true,
    }),
    extractText: (item) =>
      item.text ?? item.sections?.map((s) => s.text).join("\n") ?? "",
  },
  perplexity: {
    endpoint: "/v3/ai_optimization/perplexity/llm_responses/live",
    buildPayload: (keyword: string) => ({
      user_prompt: keyword,
      model_name: "sonar",
    }),
    extractText: (item) =>
      item.text ?? item.sections?.map((s) => s.text).join("\n") ?? "",
  },
  gemini: {
    endpoint: "/v3/ai_optimization/gemini/llm_responses/live",
    buildPayload: (keyword: string) => ({
      user_prompt: keyword,
      model_name: "gemini-2.0-flash", // Updated for 2026 availability
      web_search: true,
    }),
    extractText: (item) =>
      item.text ?? item.sections?.map((s) => s.text).join("\n") ?? "",
  },
  claude: {
    endpoint: "/v3/ai_optimization/claude/llm_responses/live",
    buildPayload: (keyword: string) => ({
      user_prompt: keyword,
      model_name: "claude-haiku-4-5", // Updated for 2026 availability
      web_search: true,
    }),
    extractText: (item) =>
      item.text ?? item.sections?.map((s) => s.text).join("\n") ?? "",
  },
};

/* ------------------------------------------------------------------ */
/*  Public: Check Mention                                              */
/* ------------------------------------------------------------------ */

export async function checkMention(
  platform: PlatformId,
  keyword: string,
  brand: string,
  domain: string,
  login?: string,
  password?: string
): Promise<MentionCheckResult> {
  try {
    const config = PLATFORM_CONFIGS[platform];
    if (!config) {
      throw new Error(`Unknown platform: ${platform}`);
    }

    const payload = config.buildPayload(keyword);
    const res = await dataForSEOFetch(config.endpoint, payload, login, password);

    const task = res.tasks?.[0];
    if (task?.status_code && task.status_code >= 40000) {
      // Improved error message for debugging
      const details = task.status_message || "Unknown API error";
      return {
        mentioned: false,
        ai_response_text: `DataForSEO Error: ${details}`,
        position: null,
      };
    }

    const result = task?.result?.[0];
    const item = result?.items?.[0];

    if (!item) {
      return {
        mentioned: false,
        ai_response_text: "No response received from API",
        position: null,
      };
    }

    const fullText = config.extractText(item);

    if (!fullText) {
      return {
        mentioned: false,
        ai_response_text: "No response text received",
        position: null,
      };
    }

    // Case-insensitive brand / domain detection
    const escapedDomain = domain.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const brandMatch = new RegExp(brand, "gi").test(fullText);
    const domainMatch = new RegExp(escapedDomain, "gi").test(fullText);

    if (brandMatch || domainMatch) {
      const lowerText = fullText.toLowerCase();
      const indexBrand = lowerText.indexOf(brand.toLowerCase());
      const indexDomain = lowerText.indexOf(domain.toLowerCase());

      let pos = -1;
      if (indexBrand !== -1 && indexDomain !== -1) {
        pos = Math.min(indexBrand, indexDomain);
      } else if (indexBrand !== -1) {
        pos = indexBrand;
      } else if (indexDomain !== -1) {
        pos = indexDomain;
      }

      return {
        mentioned: true,
        ai_response_text: fullText,
        position: pos !== -1 ? pos : 0,
      };
    }

    return { mentioned: false, ai_response_text: fullText, position: null };
  } catch (error) {
    console.error(`Error checking ${platform} for "${keyword}":`, error);
    return {
      mentioned: false,
      ai_response_text:
        error instanceof Error ? error.message : "Unknown error",
      position: null,
    };
  }
}
