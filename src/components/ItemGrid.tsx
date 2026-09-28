import React from 'react';
import { Item } from '../types/item';
import { ItemCard } from './ItemCard';
import { EmptyState } from './EmptyState';
import { LoadingState } from './LoadingState';

interface ItemGridProps {
  items: Item[];
  isLoading?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
  onResetFilters?: () => void;
}

export const ItemGrid: React.FC<ItemGridProps> = ({
  items,
  isLoading = false,
  emptyTitle,
  emptyDescription,
  onResetFilters
}) => {
  if (isLoading) {
    return <LoadingState count={6} />;
  }

  if (items.length === 0) {
    return (
      <EmptyState
        title={emptyTitle}
        description={emptyDescription}
        actionLabel={onResetFilters ? 'Clear filters' : undefined}
        onAction={onResetFilters}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      {items.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  );
};
