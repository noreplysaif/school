import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Modal } from './Modal';
import { Button } from './Button';

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isDestructive?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  isDestructive = false,
  onConfirm,
  onCancel,
  isLoading = false,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onCancel} title={title} maxWidth="sm">
      <div className="flex items-start gap-4 pt-1">
        <div
          className={`p-3 rounded-full shrink-0 ${
            isDestructive ? 'bg-rose-100 text-rose-600' : 'bg-blue-100 text-blue-600'
          }`}
        >
          <AlertTriangle className="w-6 h-6" />
        </div>
        <div>
          <p className="text-sm text-slate-600 leading-relaxed">{message}</p>
        </div>
      </div>
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 mt-4">
        <Button variant="outline" size="md" onClick={onCancel} disabled={isLoading}>
          {cancelLabel}
        </Button>
        <Button
          variant={isDestructive ? 'danger' : 'primary'}
          size="md"
          onClick={onConfirm}
          isLoading={isLoading}
        >
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  );
};
