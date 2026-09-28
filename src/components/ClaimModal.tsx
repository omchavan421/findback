import React, { useState } from 'react';
import { Item, ClaimRequestDTO } from '../types/item';
import { Modal } from './Modal';
import { FormField } from './FormField';
import { Button } from './Button';
import { ShieldCheck, HelpCircle } from 'lucide-react';

interface ClaimModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: Item;
  onSubmitClaim: (dto: ClaimRequestDTO) => Promise<void>;
}

export const ClaimModal: React.FC<ClaimModalProps> = ({
  isOpen,
  onClose,
  item,
  onSubmitClaim
}) => {
  const isFound = item.type === 'found';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    studentId: '',
    proof: '',
    serialOrDetail: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.email.trim() || !formData.email.includes('@')) {
      errs.email = 'Valid campus or personal email is required';
    }
    if (!formData.phone.trim()) errs.phone = 'Phone number is required';
    if (!formData.proof.trim() || formData.proof.trim().length < 10) {
      errs.proof = 'Please describe details only the owner would know (min 10 characters)';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setSubmitting(true);
      await onSubmitClaim({
        itemId: item.id,
        claimantName: formData.name,
        claimantEmail: formData.email,
        claimantPhone: formData.phone,
        studentId: formData.studentId,
        proofDescription: formData.proof,
        serialNumberOrDetail: formData.serialOrDetail
      });
      onClose();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isFound ? `Claim "${item.title}"` : `I Located This Item: "${item.title}"`}
      description={
        isFound
          ? 'To prevent fraudulent claims, please provide proof of ownership. A campus coordinator will verify your claim.'
          : 'Provide your contact details so the student who reported this missing item can coordinate with you.'
      }
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="bg-indigo-50/70 border border-indigo-100 rounded-xl p-3 flex items-start gap-2.5 text-xs text-indigo-900">
          <ShieldCheck className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
          <p>
            Report ID: <span className="font-mono font-bold">{item.reportId}</span> • Storage / Custody:{' '}
            <span className="font-semibold">{item.storageLocation || item.location}</span>
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <FormField
            id="claim-name"
            label="Your Full Name"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            error={errors.name}
            placeholder="Jane Doe"
          />
          <FormField
            id="claim-id"
            label="Student / Employee ID"
            value={formData.studentId}
            onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
            placeholder="e.g. S-892104"
            helperText="Optional, speeds verification"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <FormField
            id="claim-email"
            label="Email Address"
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            error={errors.email}
            placeholder="janedoe@campus.edu"
          />
          <FormField
            id="claim-phone"
            label="Contact Phone"
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            error={errors.phone}
            placeholder="(555) 000-0000"
          />
        </div>

        <FormField
          id="claim-proof"
          fieldType="textarea"
          label={isFound ? 'Proof of Ownership Details' : 'Where Did You Find It / Status'}
          required
          rows={3}
          value={formData.proof}
          onChange={(e) => setFormData({ ...formData, proof: e.target.value })}
          error={errors.proof}
          placeholder={
            isFound
              ? 'Describe private marks, contents, lock screen photo, password hints, or receipts...'
              : 'Specify exact location where you left it or if you gave it to campus desk...'
          }
          helperText="Do not share sensitive passwords. Mention distinctive stickers, scratch patterns, or items inside."
        />

        {isFound && (
          <FormField
            id="claim-serial"
            label="Serial Number or Secret Identifier (if known)"
            value={formData.serialOrDetail}
            onChange={(e) => setFormData({ ...formData, serialOrDetail: e.target.value })}
            placeholder="e.g., Apple SN, card last 4 digits"
          />
        )}

        <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
          <Button type="button" variant="outline" onClick={onClose} disabled={submitting}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" isLoading={submitting}>
            {isFound ? 'Submit Ownership Claim' : 'Send Contact Notification'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
