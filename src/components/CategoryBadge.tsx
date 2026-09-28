import React from 'react';
import { getCategoryColor } from '../utils/formatters';

interface CategoryBadgeProps {
  category: string;
  className?: string;
}

export const CategoryBadge: React.FC<CategoryBadgeProps> = ({ category, className = '' }) => {
  const { bg, text, border } = getCategoryColor(category);

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium border ${bg} ${text} ${border} ${className}`}
    >
      {category}
    </span>
  );
};
