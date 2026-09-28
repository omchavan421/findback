import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  ArrowRight,
  ShieldCheck,
  MapPin,
  Clock,
  Sparkles,
  FileQuestion,
  PlusCircle,
  CheckCircle2,
  TrendingUp,
  Compass,
  AlertTriangle,
  Layers,
  HelpCircle,
  Smartphone,
  CreditCard,
  Key,
  BookOpen,
  FileText,
  Watch,
  Coffee,
  Briefcase,
  HelpCircle as OtherIcon
} from 'lucide-react';
import { useItems } from '../context/ItemContext';
import { ItemCard } from '../components/ItemCard';
import { Button } from '../components/Button';
import { SearchBar } from '../components/SearchBar';
import { CATEGORIES } from '../data/mockItems';
import { LoadingState } from '../components/LoadingState';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { items, loading, stats } = useItems();
  const [heroSearch, setHeroSearch] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'lost' | 'found'>('all');

  const handleHeroSearchSubmit = () => {
    if (heroSearch.trim()) {
      navigate(`/lost?q=${encodeURIComponent(heroSearch.trim())}`);
    }
  };

  const handleCategoryClick = (category: string) => {
    navigate(`/lost?cat=${encodeURIComponent(category)}`);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'ID Card':
        return <CreditCard className="w-5 h-5 text-emerald-600" />;
      case 'Electronics':
        return <Smartphone className="w-5 h-5 text-blue-600" />;
      case 'Keys':
        return <Key className="w-5 h-5 text-orange-600" />;
      case 'Books':
        return <BookOpen className="w-5 h-5 text-purple-600" />;
      case 'Documents':
        return <FileText className="w-5 h-5 text-cyan-600" />;
      case 'Accessories':
        return <Watch className="w-5 h-5 text-rose-600" />;
      case 'Water Bottle':
        return <Coffee className="w-5 h-5 text-teal-600" />;
      case 'Bag':
        return <Briefcase className="w-5 h-5 text-indigo-600" />;
      default:
        return <OtherIcon className="w-5 h-5 text-slate-600" />;
    }
  };

  const recentItems = items
    .filter((item) => (activeTab === 'all' ? true : item.type === activeTab))
    .slice(0, 6);

  return (
    <div className="space-y-20 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-indigo-900 via-slate-900 to-slate-950 text-white pt-20 pb-28 px-4 sm:px-6 lg:px-8">
        {/* Subtle background radial glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-indigo-500/15 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-10 right-10 w-96 h-96 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative max-w-5xl mx-auto text-center space-y-8 animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-indigo-200 text-xs font-medium shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
            <span>The Centralized University Lost & Found Network</span>
          </div>

          {/* Main Title & Tagline */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight">
              Lost it? <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-indigo-200 to-white">Find it back.</span>
            </h1>
            <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
              Instantly connect with campus lost & found desks, students, and campus safety. Report missing belongings, search verified items, and recover what’s yours.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link to="/report-lost">
              <Button
                variant="primary"
                size="lg"
                className="bg-indigo-500 hover:bg-indigo-600 shadow-lg shadow-indigo-500/30 text-white font-semibold"
                leftIcon={<FileQuestion className="w-5 h-5 text-indigo-200" />}
              >
                I Lost Something
              </Button>
            </Link>
            <Link to="/report-found">
              <Button
                variant="outline"
                size="lg"
                className="bg-white/10 hover:bg-white/20 border-white/20 text-white font-semibold backdrop-blur-sm"
                leftIcon={<PlusCircle className="w-5 h-5 text-emerald-400" />}
              >
                I Found Something
              </Button>
            </Link>
          </div>

          {/* Hero Search Bar */}
          <div className="max-w-2xl mx-auto pt-6">
            <div className="relative flex items-center shadow-2xl rounded-2xl">
              <SearchBar
                size="lg"
                value={heroSearch}
                onChange={setHeroSearch}
                onSearch={handleHeroSearchSubmit}
                placeholder="Search lost wallets, keys, AirPods, student IDs..."
                className="shadow-xl"
              />
              <div className="absolute right-2">
                <Button
                  size="md"
                  onClick={handleHeroSearchSubmit}
                  className="rounded-xl px-4 py-2"
                >
                  Search
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 mt-3 text-xs text-slate-400">
              <span>Popular searches:</span>
              <button
                onClick={() => setHeroSearch('Student ID')}
                className="underline hover:text-white transition-colors"
              >
                Student ID
              </button>
              <span>•</span>
              <button
                onClick={() => setHeroSearch('Keys')}
                className="underline hover:text-white transition-colors"
              >
                Keys
              </button>
              <span>•</span>
              <button
                onClick={() => setHeroSearch('MacBook')}
                className="underline hover:text-white transition-colors"
              >
                MacBook
              </button>
              <span>•</span>
              <button
                onClick={() => setHeroSearch('Hydro Flask')}
                className="underline hover:text-white transition-colors"
              >
                Hydro Flask
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS BAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-20">
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-200/40 p-6 sm:p-8 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <div className="space-y-1 border-r border-slate-100 last:border-r-0">
            <p className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {stats.totalReported}+
            </p>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Total Items Logged
            </p>
          </div>
          <div className="space-y-1 sm:border-r border-slate-100">
            <p className="text-3xl sm:text-4xl font-extrabold text-indigo-600 tracking-tight">
              {stats.recoveryRate}%
            </p>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Campus Recovery Rate
            </p>
          </div>
          <div className="space-y-1 border-r border-slate-100 last:border-r-0">
            <p className="text-3xl sm:text-4xl font-extrabold text-emerald-600 tracking-tight">
              {stats.activeFound}
            </p>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Items In Safe Custody
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-3xl sm:text-4xl font-extrabold text-rose-600 tracking-tight">
              {stats.activeLost}
            </p>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Active Missing Alerts
            </p>
          </div>
        </div>
      </section>

      {/* 3. QUICK CATEGORY CARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Explore by Category
          </h2>
          <p className="text-sm text-slate-500">
            Select a category to quickly narrow down lost and found reports across all campus faculties.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3.5">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl border border-slate-200/80 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-200 group text-center cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-50 group-hover:bg-indigo-50 group-hover:scale-110 flex items-center justify-center transition-all duration-200 mb-3 shadow-inner">
                {getCategoryIcon(cat)}
              </div>
              <span className="text-xs font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
                {cat}
              </span>
              <span className="text-[10px] text-slate-400 mt-0.5">
                {items.filter((i) => i.category === cat).length} items
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* 4. RECENTLY REPORTED ITEMS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-1">
              <Clock className="w-3.5 h-3.5" />
              <span>Live Updates</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Recently Reported Items
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Latest items spotted or reported missing within the last 48 hours.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-100/80 p-1 rounded-2xl border border-slate-200/60 self-start sm:self-auto">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all ${
                activeTab === 'all'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Items
            </button>
            <button
              onClick={() => setActiveTab('lost')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all ${
                activeTab === 'lost'
                  ? 'bg-white text-rose-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Missing Only
            </button>
            <button
              onClick={() => setActiveTab('found')}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all ${
                activeTab === 'found'
                  ? 'bg-white text-emerald-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Found Only
            </button>
          </div>
        </div>

        {loading ? (
          <LoadingState count={6} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentItems.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        )}

        <div className="mt-10 text-center">
          <Link to="/lost">
            <Button
              variant="outline"
              size="md"
              className="px-6 rounded-xl font-semibold hover:border-indigo-300 hover:text-indigo-600"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              View Full Campus Directory
            </Button>
          </Link>
        </div>
      </section>

      {/* 5. HOW IT WORKS SECTION */}
      <section className="bg-slate-100/60 border-y border-slate-200/80 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">
              Simple 4-Step Process
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              How FINDBack Works
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed">
              Designed specifically for campus communities to streamline reporting, prevent fraudulent claims, and get personal belongings back where they belong.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs relative flex flex-col justify-between group hover:border-indigo-200 hover:shadow-md transition-all">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center font-extrabold text-lg shadow-inner">
                  1
                </div>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  Report
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Lost an item or found something unattended? Submit a quick 4-step report with last seen location, time, and photo.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-100 text-[11px] font-semibold text-indigo-600">
                Mock Report ID Generated
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs relative flex flex-col justify-between group hover:border-indigo-200 hover:shadow-md transition-all">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center font-extrabold text-lg shadow-inner">
                  2
                </div>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  Search
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Filter through all campus building records using keywords, location tags, item category, and status indicators.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-100 text-[11px] font-semibold text-blue-600">
                Multi-Filter Directory
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs relative flex flex-col justify-between group hover:border-indigo-200 hover:shadow-md transition-all">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-100 text-amber-600 flex items-center justify-center font-extrabold text-lg shadow-inner">
                  3
                </div>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                  Connect
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Initiate a secure claim request by answering verification questions, matching serial codes, or stating unique traits.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-100 text-[11px] font-semibold text-amber-600">
                Identity & Proof Check
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs relative flex flex-col justify-between group hover:border-indigo-200 hover:shadow-md transition-all">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center font-extrabold text-lg shadow-inner">
                  4
                </div>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                  Recover
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Pick up your item at verified campus custody points (Student Union, Central Library, or Security Desk) with student ID.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-slate-100 text-[11px] font-semibold text-emerald-600">
                Safely Reunited
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-8 sm:p-14 text-white shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/20 blur-3xl rounded-full pointer-events-none" />
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              Verified Campus Security Integration
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Misplaced something during class today?
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Don’t wait until the weekend. Most items turned in to campus lost and found are claimed within 24 hours of filing a report.
            </p>
            <div className="pt-4 flex flex-wrap items-center gap-3">
              <Link to="/report-lost">
                <Button variant="primary" size="md" className="font-semibold bg-indigo-500 hover:bg-indigo-600">
                  File a Lost Item Alert
                </Button>
              </Link>
              <Link to="/found">
                <Button variant="outline" size="md" className="bg-white/10 hover:bg-white/20 text-white border-white/20 font-semibold">
                  Check Found Inventory
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
