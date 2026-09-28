import React, { useState } from 'react';
import { Item, ReportIssueDTO } from '../types/item';
import { Modal } from './Modal';
import { FormField } from './FormField';
import { Button } from './Button';
import { AlertCircle } from 'lucide-react';

interface ReportIssueModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: Item;
  onSubmitReport: (dto: ReportIssueDTO) => Promise<void>;
}

export const ReportIssueModal: React.FC<ReportIssueModalProps> = ({
  isOpen,
  onClose,
  item,
  onSubmitReport
}) => {
  const [issueType, setIssueType] = useState<ReportIssueDTO['issueType']>('wrong_info');
  const [comment, setComment] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) {
      setError('Please explain what is incorrect or inaccurate.');
      return;
    }
    setError('');

    try {
      setSubmitting(true);
      await onSubmitReport({
        itemId: item.id,
        issueType,
        comment: comment.trim(),
        reportedByEmail: email.trim() || undefined
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
      title="Report Incorrect Information"
      description={`Notice inaccurate details for item report ${item.reportId}? Help us keep campus records accurate.`}
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField
          id="issue-type"
          fieldType="select"
          label="What kind of issue are you reporting?"
          value={issueType}
          onChange={(e) => setIssueType(e.target.value as ReportIssueDTO['issueType'])}
          options={[
            { label: 'Inaccurate or mistaken details / location', value: 'wrong_info' },
            { label: 'This item has already been recovered / returned', value: 'already_resolved' },
            { label: 'Suspected duplicate listing', value: 'spam' },
            { label: 'Inappropriate or offensive content', value: 'offensive' },
            { label: 'Other inquiry', value: 'other' }
          ]}
        />

        <FormField
          id="issue-comment"
          fieldType="textarea"
          label="Please provide correction or context"
          required
          rows={3}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          error={error}
          placeholder="e.g. This was already handed over to the circulation desk, or the building name was typed wrong..."
        />

        <FormField
          id="reporter-email"
          label="Your Email (Optional)"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your.email@campus.edu"
          helperText="Only used if the moderator needs clarification"
        />

        <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
          <Button type="button" variant="outline" onClick={onClose} disabled={submitting}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" isLoading={submitting}>
            Submit Correction Report
          </Button>
        </div>
      </form>
    </Modal>
  );
};
