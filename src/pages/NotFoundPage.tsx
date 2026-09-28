import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Search, ArrowRight, Home, HelpCircle } from 'lucide-react';
import { Button } from '../components/Button';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 text-center animate-fade-in">
      <div className="max-w-lg mx-auto space-y-6">
        {/* Animated Compass Icon */}
        <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
          <div className="absolute inset-0 bg-indigo-500/10 rounded-full animate-ping" />
          <div className="relative w-24 h-24 rounded-3xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-xl shadow-indigo-500/10">
            <Compass className="w-12 h-12 animate-spin [animation-duration:8s]" />
          </div>
          <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-rose-500 text-white font-mono text-xs font-bold flex items-center justify-center shadow-md">
            404
          </div>
        </div>

        <div className="space-y-3">
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
            Page Not Found
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Looks like this item got lost too.
          </h1>
          <p className="text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
            The page or report you are looking for has either been moved, deleted, or was never filed in the first place.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link to="/">
            <Button
              variant="primary"
              size="md"
              leftIcon={<Home className="w-4 h-4" />}
            >
              Return Home
            </Button>
          </Link>
          <Link to="/lost">
            <Button
              variant="outline"
              size="md"
              leftIcon={<Search className="w-4 h-4" />}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Browse Lost Directory
            </Button>
          </Link>
        </div>

        <div className="pt-6 border-t border-slate-100 text-xs text-slate-400">
          <p>
            Need urgent assistance? Visit the <span className="font-semibold text-slate-600">Student Union Desk</span> or call campus security at <span className="font-mono text-slate-600">(555) 234-LOST</span>.
          </p>
        </div>
      </div>
    </div>
  );
};
