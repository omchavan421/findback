import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems?: number;
  itemsPerPage?: number;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage
}) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t border-slate-200/80 w-full">
      {totalItems !== undefined && itemsPerPage !== undefined && (
        <p className="text-xs text-slate-500">
          Showing <span className="font-semibold text-slate-700">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
          <span className="font-semibold text-slate-700">
            {Math.min(currentPage * itemsPerPage, totalItems)}
          </span>{' '}
          of <span className="font-semibold text-slate-700">{totalItems}</span> results
        </p>
      )}

      <div className="flex items-center gap-1.5">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="inline-flex items-center justify-center p-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none transition-colors text-sm"
          aria-label="Previous page"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-9 h-9 rounded-xl text-xs font-semibold transition-all ${
              currentPage === page
                ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/20'
                : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="inline-flex items-center justify-center p-2 rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:pointer-events-none transition-colors text-sm"
          aria-label="Next page"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
