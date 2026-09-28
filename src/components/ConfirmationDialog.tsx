import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Modal } from './Modal';
import { Button } from './Button';

interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  isDestructive?: boolean;
  isLoading?: boolean;
}

export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  isDestructive = false,
  isLoading = false
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="sm">
      <div className="flex flex-col items-center text-center">
        <div
          className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${
            isDestructive ? 'bg-rose-50 text-rose-600' : 'bg-amber-50 text-amber-600'
          }`}
        >
          <AlertTriangle className="w-6 h-6" />
        </div>
        <h4 className="text-base font-bold text-slate-900">{title}</h4>
        <p className="text-xs text-slate-500 mt-2 leading-relaxed">{message}</p>
        <div className="flex items-center gap-3 mt-6 w-full">
          <Button variant="outline" className="flex-1" onClick={onClose} disabled={isLoading}>
            {cancelLabel}
          </Button>
          <Button
            variant={isDestructive ? 'danger' : 'primary'}
            className="flex-1"
            onClick={onConfirm}
            isLoading={isLoading}
          >
            {confirmLabel}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
