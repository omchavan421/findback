import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, ArrowRight, Clock } from 'lucide-react';
import { Item } from '../types/item';
import { StatusBadge } from './StatusBadge';
import { CategoryBadge } from './CategoryBadge';
import { formatDate } from '../utils/formatters';

interface ItemCardProps {
  item: Item;
}

export const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  return (
    <div className="group bg-white rounded-2xl border border-slate-200/80 hover:border-indigo-200 overflow-hidden shadow-xs hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1">
      {/* Image Banner */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          <StatusBadge status={item.status} type={item.type} size="sm" />
        </div>
        <div className="absolute top-3 right-3 z-10">
          <CategoryBadge category={item.category} className="shadow-xs backdrop-blur-md" />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-slate-900/40 to-transparent pointer-events-none" />
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-[11px] text-slate-400 mb-2 font-mono">
            <span>ID: {item.reportId}</span>
            <span className="capitalize px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-sans font-medium">
              {item.type}
            </span>
          </div>

          <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
            {item.title}
          </h3>

          <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Metadata Footer */}
        <div className="mt-4 pt-3.5 border-t border-slate-100 space-y-2">
          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{item.location}</span>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
            <div className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>{formatDate(item.date)}</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-slate-400">
              <Clock className="w-3 h-3 shrink-0" />
              <span>{item.time}</span>
            </div>
          </div>

          <div className="pt-2">
            <Link
              to={`/item/${item.id}`}
              className="w-full inline-flex items-center justify-center gap-1.5 text-xs font-semibold py-2 px-3 rounded-xl bg-slate-50 hover:bg-indigo-50 text-slate-700 hover:text-indigo-600 border border-slate-200/80 hover:border-indigo-200 transition-all duration-150 group-hover:border-indigo-300"
            >
              <span>View Details</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
