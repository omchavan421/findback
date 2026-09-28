import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onSearch?: () => void;
  className?: string;
  size?: 'md' | 'lg';
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = 'Search by item name, location, keyword, or report ID...',
  onSearch,
  className = '',
  size = 'md'
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch();
    }
  };

  const isLarge = size === 'lg';

  return (
    <div className={`relative flex items-center w-full ${className}`}>
      <div className={`absolute left-4 pointer-events-none text-slate-400 ${isLarge ? 'w-5 h-5' : 'w-4 h-4'}`}>
        <Search className="w-full h-full" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={`w-full rounded-2xl bg-white border border-slate-200/90 text-slate-900 placeholder:text-slate-400 shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-600/25 focus:border-indigo-600 hover:border-slate-300 ${
          isLarge ? 'py-4 pl-12 pr-12 text-base' : 'py-2.5 pl-10 pr-10 text-sm'
        }`}
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange('')}
          className="absolute right-3.5 text-slate-400 hover:text-slate-600 p-1 rounded-md hover:bg-slate-100 transition-colors"
          title="Clear search"
          aria-label="Clear search query"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
