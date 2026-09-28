import React from 'react';

interface LoadingStateProps {
  count?: number;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs animate-pulse"
        >
          <div className="h-48 bg-slate-200 w-full" />
          <div className="p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="h-4 bg-slate-200 rounded-md w-24" />
              <div className="h-5 bg-slate-200 rounded-full w-20" />
            </div>
            <div className="h-5 bg-slate-200 rounded-md w-3/4" />
            <div className="space-y-2">
              <div className="h-3 bg-slate-200 rounded w-full" />
              <div className="h-3 bg-slate-200 rounded w-5/6" />
            </div>
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <div className="h-3 bg-slate-200 rounded w-28" />
              <div className="h-8 bg-slate-200 rounded-xl w-24" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
