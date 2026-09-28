import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Shield, Heart, MapPin, Clock, Mail, Phone } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-16 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
                <Compass className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight">
                FIND<span className="text-indigo-400">Back</span>
              </span>
            </Link>
            <p className="text-sm text-indigo-200/80 font-medium">"Lost it? Find it back."</p>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              The official centralized lost and found network for university students, faculty, and campus staff. Connecting people with misplaced belongings with speed, privacy, and verification.
            </p>
            <div className="pt-2 flex items-center gap-3 text-xs text-slate-400">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Campus Desk Online
              </span>
              <span>24/7 Report Filing</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Explore Items</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/" className="text-slate-400 hover:text-white transition-colors">
                  Home Portal
                </Link>
              </li>
              <li>
                <Link to="/lost" className="text-slate-400 hover:text-white transition-colors">
                  Browse Lost Items
                </Link>
              </li>
              <li>
                <Link to="/found" className="text-slate-400 hover:text-white transition-colors">
                  Browse Found Catalog
                </Link>
              </li>
              <li>
                <Link to="/report-lost" className="text-slate-400 hover:text-white transition-colors">
                  File a Lost Report
                </Link>
              </li>
              <li>
                <Link to="/report-found" className="text-slate-400 hover:text-white transition-colors">
                  Turn in a Found Object
                </Link>
              </li>
            </ul>
          </div>

          {/* Campus Desks */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Physical Hubs</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                <span>Student Union - Info Counter (Level 1)</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                <span>Central Library - Circulation Desk</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                <span>Campus Safety Services - Hall A</span>
              </li>
            </ul>
          </div>

          {/* Desk Hours & Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Desk Hours</h4>
            <div className="text-xs text-slate-400 space-y-2">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span>Mon – Fri: 8:00 AM – 8:00 PM</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span>Weekends: 10:00 AM – 5:00 PM</span>
              </div>
              <div className="flex items-center gap-2 pt-1 text-slate-300">
                <Phone className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span>(555) 234-LOST</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Mail className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span>lostandfound@campus.edu</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} FINDBack Platform. Campus Security & Student Association.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-400 transition-colors cursor-pointer">
              Privacy Guidelines
            </span>
            <span className="hover:text-slate-400 transition-colors cursor-pointer">
              Verification Policy
            </span>
            <span className="hover:text-slate-400 transition-colors cursor-pointer">
              Campus Security
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
