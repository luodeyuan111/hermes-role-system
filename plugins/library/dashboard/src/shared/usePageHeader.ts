/**
 * usePageHeader shim. The real hook (web/src/contexts/usePageHeader.ts)
 * reads the host's PageHeaderContext; a plugin bundle gets its own React
 * module graph boundary at the SDK, so it cannot consume that context —
 * copying the hook would throw "must be used within a PageHeaderProvider".
 *
 * It is also unnecessary: the page header title for a plugin tab already
 * resolves from the manifest label (PageHeaderProvider → resolvePageTitle
 * with pluginTabs), so the header shows 「资料馆」 without the page doing
 * anything. The shim keeps the copied page code compiling; calls are no-ops.
 */
export function usePageHeader(): {
  setTitle: (title: string | null) => void;
  setAfterTitle: (node: unknown) => void;
  setEnd: (node: unknown) => void;
} {
  return {
    setTitle: () => {},
    setAfterTitle: () => {},
    setEnd: () => {},
  };
}
