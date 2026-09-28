import React from 'react';
import { ItemStatus, ItemType } from '../types/item';

interface StatusBadgeProps {
  status: ItemStatus;
  type: ItemType;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, type, size = 'md' }) => {
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs';

  if (type === 'lost') {
    if (status === 'open') {
      return (
        <span
          className={`inline-flex items-center gap-1.5 font-medium rounded-full bg-rose-50 text-rose-700 border border-rose-200/80 ${sizeClasses}`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
          Lost / Missing
        </span>
      );
    }
    if (status === 'claimed') {
      return (
        <span
          className={`inline-flex items-center gap-1.5 font-medium rounded-full bg-amber-50 text-amber-700 border border-amber-200/80 ${sizeClasses}`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
          Claim Pending
        </span>
      );
    }
    return (
      <span
        className={`inline-flex items-center gap-1.5 font-medium rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/80 ${sizeClasses}`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
        Recovered
      </span>
    );
  }

  // Type === 'found'
  if (status === 'available') {
    return (
      <span
        className={`inline-flex items-center gap-1.5 font-medium rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/80 ${sizeClasses}`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        Found / Available
      </span>
    );
  }
  if (status === 'claimed') {
    return (
      <span
        className={`inline-flex items-center gap-1.5 font-medium rounded-full bg-amber-50 text-amber-700 border border-amber-200/80 ${sizeClasses}`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
        Claim Under Review
      </span>
    );
  }
  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-full bg-blue-50 text-blue-700 border border-blue-200/80 ${sizeClasses}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
      Returned to Owner
    </span>
  );
};
