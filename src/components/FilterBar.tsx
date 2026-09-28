import React from 'react';
import { SlidersHorizontal, RotateCcw, MapPin, Tag, CheckCircle2, ArrowUpDown } from 'lucide-react';
import { CATEGORIES, CAMPUS_LOCATIONS } from '../data/mockItems';
import { ItemFilterState, ItemType } from '../types/item';

interface FilterBarProps {
  type: ItemType;
  filters: ItemFilterState;
  onChange: (updated: Partial<ItemFilterState>) => void;
  onReset: () => void;
  totalResults: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  type,
  filters,
  onChange,
  onReset,
  totalResults
}) => {
  const statusOptions =
    type === 'lost'
      ? [
          { label: 'All Statuses', value: 'All' },
          { label: 'Missing (Open)', value: 'open' },
          { label: 'Claim Pending', value: 'claimed' },
          { label: 'Recovered', value: 'resolved' }
        ]
      : [
          { label: 'All Statuses', value: 'All' },
          { label: 'Available in Custody', value: 'available' },
          { label: 'Claim Under Review', value: 'claimed' },
          { label: 'Returned to Owner', value: 'handed_over' }
        ];

  const hasActiveFilters =
    filters.category !== 'All' ||
    filters.location !== 'All' ||
    filters.status !== 'All' ||
    filters.search !== '';

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-4 sm:p-5 w-full space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2 text-slate-700 font-semibold text-sm">
          <SlidersHorizontal className="w-4 h-4 text-indigo-600" />
          <span>Filters & Display</span>
          <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-medium ml-1">
            {totalResults} {totalResults === 1 ? 'item' : 'items'}
          </span>
        </div>

        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-rose-600 hover:text-rose-700 hover:underline transition-colors focus:outline-none"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset all filters
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Category Filter */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-slate-600 flex items-center gap-1">
            <Tag className="w-3 h-3 text-indigo-500" />
            Category
          </label>
          <select
            value={filters.category}
            onChange={(e) => onChange({ category: e.target.value })}
            className="w-full text-xs font-medium rounded-xl border border-slate-200 px-3 py-2 bg-slate-50/50 hover:bg-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 text-slate-800 transition-colors"
          >
            <option value="All">All Categories</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Location Filter */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-slate-600 flex items-center gap-1">
            <MapPin className="w-3 h-3 text-indigo-500" />
            Location
          </label>
          <select
            value={filters.location}
            onChange={(e) => onChange({ location: e.target.value })}
            className="w-full text-xs font-medium rounded-xl border border-slate-200 px-3 py-2 bg-slate-50/50 hover:bg-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 text-slate-800 transition-colors"
          >
            <option value="All">All Campus Locations</option>
            {CAMPUS_LOCATIONS.filter((l) => l !== 'All Campus Locations').map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-slate-600 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-indigo-500" />
            Status
          </label>
          <select
            value={filters.status}
            onChange={(e) => onChange({ status: e.target.value })}
            className="w-full text-xs font-medium rounded-xl border border-slate-200 px-3 py-2 bg-slate-50/50 hover:bg-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 text-slate-800 transition-colors"
          >
            {statusOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Sort By Dropdown */}
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-slate-600 flex items-center gap-1">
            <ArrowUpDown className="w-3 h-3 text-indigo-500" />
            Sort By
          </label>
          <select
            value={filters.sortBy}
            onChange={(e) => onChange({ sortBy: e.target.value as ItemFilterState['sortBy'] })}
            className="w-full text-xs font-medium rounded-xl border border-slate-200 px-3 py-2 bg-slate-50/50 hover:bg-white focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 text-slate-800 transition-colors"
          >
            <option value="newest">Recently Reported</option>
            <option value="oldest">Oldest First</option>
            <option value="name-asc">Alphabetical (A - Z)</option>
            <option value="name-desc">Alphabetical (Z - A)</option>
          </select>
        </div>
      </div>
    </div>
  );
};
