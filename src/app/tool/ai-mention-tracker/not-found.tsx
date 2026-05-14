import { redirect } from "next/navigation";

export default function TrackerNotFound() {
  redirect("/tool/ai-mention-tracker");
}
