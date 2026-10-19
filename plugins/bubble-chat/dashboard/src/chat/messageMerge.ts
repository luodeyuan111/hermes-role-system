/**
 * Merge the authoritative message.complete text with already-rendered
 * streaming deltas. Backend final_response contains only the last assistant
 * message of a tool-using turn; deltas may already include interim narration.
 * Keep the accumulated text when the final answer is its suffix.
 */
export function mergeCompletedText(accumulated: string, finalText: string | null | undefined): string {
  if (!finalText) return accumulated;
  const compact = (value: string): string => value.replace(/\s+/g, " ").trim();
  if (!compact(finalText)) return accumulated;
  if (compact(accumulated).endsWith(compact(finalText))) return accumulated;
  return finalText;
}
