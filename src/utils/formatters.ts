import { ItemStatus, ItemType } from '../types/item';

export const formatDate = (dateStr: string): string => {
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  } catch {
    return dateStr;
  }
};

export const getStatusLabel = (status: ItemStatus, type: ItemType): string => {
  switch (status) {
    case 'open':
      return 'Missing';
    case 'available':
      return 'In Custody / Available';
    case 'claimed':
      return 'Claim Pending';
    case 'resolved':
      return 'Recovered & Closed';
    case 'handed_over':
      return 'Returned to Owner';
    default:
      return status;
  }
};

export const getCategoryColor = (category: string): { bg: string; text: string; border: string } => {
  switch (category) {
    case 'Electronics':
      return { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' };
    case 'ID Card':
      return { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' };
    case 'Wallet':
      return { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' };
    case 'Keys':
      return { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200' };
    case 'Books':
      return { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' };
    case 'Documents':
      return { bg: 'bg-cyan-50', text: 'text-cyan-700', border: 'border-cyan-200' };
    case 'Water Bottle':
      return { bg: 'bg-teal-50', text: 'text-teal-700', border: 'border-teal-200' };
    case 'Bag':
      return { bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200' };
    case 'Accessories':
      return { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200' };
    default:
      return { bg: 'bg-slate-100', text: 'text-slate-700', border: 'border-slate-200' };
  }
};
