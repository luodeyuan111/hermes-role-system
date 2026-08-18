/**
 * Router helpers — the plugin bundle cannot use react-router hooks (the
 * host's Router context lives in the host bundle, and bundling a second
 * react-router copy would not share it). These cover exactly what the
 * bubble-chat page needs: the ``?resume=`` conversation param, the
 * ``?profile=`` management-profile projection, and reactive re-reads of
 * the location when the plugin itself navigates.
 *
 * react-router only listens to ``popstate``, so after pushState we dispatch
 * a synthetic event to make the host router re-read the location
 * (established micro-frontend pattern — same as the library plugin).
 * Host-side navigations that keep us mounted never rewrite ``?resume=``;
 * profile switches remount the whole route tree (ProfileKeyedRoutes in
 * App.tsx), so popstate + mount-time reads cover every change source.
 */

import { useMemo, useSyncExternalStore } from "react";
import { HERMES_BASE_PATH } from "./sdk";

function subscribeToLocation(onChange: () => void): () => void {
  window.addEventListener("popstate", onChange);
  return () => window.removeEventListener("popstate", onChange);
}

/** Current ``window.location.search``, re-read on plugin-initiated nav. */
export function useLocationSearch(): URLSearchParams {
  const search = useSyncExternalStore(
    subscribeToLocation,
    () => window.location.search,
    () => "",
  );
  return useMemo(() => new URLSearchParams(search), [search]);
}

/**
 * Replace the ``?resume=`` conversation param, preserving every other param
 * (notably ``?profile=``), then notify both the host router and our own
 * location hook via popstate.
 */
export function setResumeParam(id: string | null): void {
  const next = new URLSearchParams(window.location.search);
  if (id) next.set("resume", id);
  else next.delete("resume");
  const qs = next.toString();
  const url = `${HERMES_BASE_PATH}/chat${qs ? `?${qs}` : ""}`;
  window.history.pushState(null, "", url);
  window.dispatchEvent(new PopStateEvent("popstate"));
}
