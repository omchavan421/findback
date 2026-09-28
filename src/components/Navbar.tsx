import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import {
  Compass,
  Search,
  PlusCircle,
  HelpCircle,
  Menu,
  X,
  Sparkles,
  Shield,
  FileQuestion,
  CheckSquare
} from 'lucide-react';
import { Button } from './Button';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Lost Items', path: '/lost' },
    { label: 'Found Items', path: '/found' }
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        scrolled
          ? 'glass-nav shadow-xs border-b border-slate-200/80 py-3'
          : 'bg-white/95 backdrop-blur-md border-b border-slate-100 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Brand */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-lg"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-700 via-indigo-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-indigo-600/20 group-hover:scale-105 transition-transform duration-200">
              <Compass className="w-5 h-5 transition-transform group-hover:rotate-45 duration-300" />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-extrabold text-xl tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
                FIND<span className="text-indigo-600">Back</span>
              </span>
              <span className="text-[10px] font-medium text-slate-400 tracking-wider uppercase -mt-1">
                Campus Lost & Found
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1 rounded-2xl border border-slate-200/60">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                className={({ isActive }) =>
                  `px-4 py-1.5 text-xs font-semibold rounded-xl transition-all duration-150 ${
                    isActive
                      ? 'bg-white text-indigo-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden lg:flex items-center gap-2.5">
            <Link to="/report-lost">
              <Button
                variant="outline"
                size="sm"
                className="text-xs font-semibold border-rose-200 text-rose-700 hover:bg-rose-50/70 hover:border-rose-300"
                leftIcon={<FileQuestion className="w-3.5 h-3.5 text-rose-500" />}
              >
                Report Lost
              </Button>
            </Link>
            <Link to="/report-found">
              <Button
                variant="primary"
                size="sm"
                className="text-xs font-semibold"
                leftIcon={<PlusCircle className="w-3.5 h-3.5" />}
              >
                Report Found
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <Link to="/report-lost" className="sm:hidden">
              <Button size="sm" variant="outline" className="text-xs px-2.5 py-1.5">
                Report
              </Button>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pt-4 pb-6 border-t border-slate-100 mt-3 animate-slide-up space-y-4">
            <nav className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.path === '/'}
                  className={({ isActive }) =>
                    `px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center justify-between ${
                      isActive
                        ? 'bg-indigo-50 text-indigo-700'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`
                  }
                >
                  <span>{link.label}</span>
                </NavLink>
              ))}
            </nav>

            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <Link to="/report-lost" className="w-full">
                <Button
                  variant="outline"
                  className="w-full justify-center border-rose-200 text-rose-700 hover:bg-rose-50"
                  leftIcon={<FileQuestion className="w-4 h-4 text-rose-500" />}
                >
                  Report Lost Item
                </Button>
              </Link>
              <Link to="/report-found" className="w-full">
                <Button
                  variant="primary"
                  className="w-full justify-center"
                  leftIcon={<PlusCircle className="w-4 h-4" />}
                >
                  Report Found Item
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
