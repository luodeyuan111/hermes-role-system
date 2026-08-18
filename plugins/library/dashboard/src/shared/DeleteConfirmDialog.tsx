/**
 * DeleteConfirmDialog — copied from web/src/components/DeleteConfirmDialog.tsx
 * (not exposed on the host SDK). Only the ConfirmDialog / useI18n imports
 * point at plugin-local modules now.
 */
import { ConfirmDialog } from "./ConfirmDialog";
import { useI18n } from "../sdk";

export function DeleteConfirmDialog({
  cancelLabel,
  confirmLabel,
  description,
  loading,
  onCancel,
  onConfirm,
  open,
  title,
}: DeleteConfirmDialogProps) {
  const { t } = useI18n();

  return (
    <ConfirmDialog
      open={open}
      onCancel={onCancel}
      onConfirm={onConfirm}
      title={title}
      description={description}
      loading={loading}
      destructive
      confirmLabel={confirmLabel ?? t.common.delete}
      cancelLabel={cancelLabel ?? t.common.cancel}
    />
  );
}

interface DeleteConfirmDialogProps {
  cancelLabel?: string;
  confirmLabel?: string;
  description?: string;
  loading: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  open: boolean;
  title: string;
}
