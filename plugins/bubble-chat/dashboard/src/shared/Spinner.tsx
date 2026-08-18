/**
 * Braille unicode spinner — plugin-local copy of
 * ``@nous-research/ui/ui/components/spinner`` (the host SDK does not expose
 * it). Same behaviour: inline <span> cycling the braille frames on an
 * 80 ms interval; inherits font color/size from its parent.
 */
import { useEffect, useState } from "react";
import { cn } from "../sdk";

const BRAILLE_FRAMES = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
const INTERVAL_MS = 80;

export function Spinner({
  className,
  ...props
}: {
  className?: string;
  "aria-label"?: string;
}) {
  const [frame, setFrame] = useState(0);
  useEffect(() => {
    const id = setInterval(
      () => setFrame((f) => (f + 1) % BRAILLE_FRAMES.length),
      INTERVAL_MS,
    );
    return () => clearInterval(id);
  }, []);
  return (
    <span
      aria-hidden={props["aria-label"] ? undefined : true}
      aria-label={props["aria-label"]}
      className={cn(
        "font-mono inline-block leading-none tabular-nums",
        className,
      )}
    >
      {BRAILLE_FRAMES[frame]}
    </span>
  );
}
