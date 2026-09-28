import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Clock,
  ShieldCheck,
  ShieldAlert,
  Copy,
  Check,
  Flag,
  Share2,
  Mail,
  Phone,
  Building,
  CheckCircle2,
  FileQuestion,
  User,
  Info
} from 'lucide-react';
import { useItems } from '../context/ItemContext';
import { useToast } from '../context/ToastContext';
import { StatusBadge } from '../components/StatusBadge';
import { CategoryBadge } from '../components/CategoryBadge';
import { Button } from '../components/Button';
import { ClaimModal } from '../components/ClaimModal';
import { ReportIssueModal } from '../components/ReportIssueModal';
import { formatDate } from '../utils/formatters';
import { ClaimRequestDTO, ReportIssueDTO } from '../types/item';

export const ItemDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { items, claimItem, reportIssue } = useItems();
  const toast = useToast();

  const [claimModalOpen, setClaimModalOpen] = useState(false);
  const [reportIssueOpen, setReportIssueOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const item = items.find((i) => i.id === id);

  if (!item) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center animate-fade-in space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center mx-auto shadow-sm">
          <ShieldAlert className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-slate-900">Item Report Not Found</h1>
          <p className="text-sm text-slate-500 max-w-md mx-auto">
            The item ID you are looking for ({id}) does not exist in our campus registry or may have been removed.
          </p>
        </div>
        <div className="flex items-center justify-center gap-3 pt-2">
          <Link to="/lost">
            <Button variant="primary" size="md">
              Browse Lost Directory
            </Button>
          </Link>
          <Link to="/">
            <Button variant="outline" size="md">
              Return Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const isFound = item.type === 'found';

  const handleCopyReportId = () => {
    navigator.clipboard.writeText(item.reportId);
    setCopied(true);
    toast.info('Copied to clipboard', `Report ID ${item.reportId}`);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `FINDBack: ${item.title}`,
        text: `Campus Lost & Found report for ${item.title} (${item.reportId})`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.info('Link Copied', 'Item URL copied to your clipboard.');
    }
  };

  const handleClaimSubmit = async (dto: ClaimRequestDTO) => {
    const res = await claimItem(dto);
    toast.success('Claim Filed', res.message);
  };

  const handleIssueSubmit = async (dto: ReportIssueDTO) => {
    const res = await reportIssue(dto);
    toast.success('Report Received', res.message);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fade-in">
      {/* Top Breadcrumb & Action bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-indigo-600 transition-colors focus:outline-none"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Directory</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors shadow-xs"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share Listing</span>
          </button>
          <button
            onClick={() => setReportIssueOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-rose-200/80 bg-rose-50/50 hover:bg-rose-50 text-xs font-semibold text-rose-700 transition-colors shadow-xs"
          >
            <Flag className="w-3.5 h-3.5" />
            <span>Report Issue</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Left Image & Details, Right Sidebar Info */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (Image & Main Content) - 7 cols */}
        <div className="lg:col-span-7 space-y-6">
          {/* Main Image */}
          <div className="relative rounded-3xl overflow-hidden border border-slate-200/80 bg-slate-900 aspect-video shadow-md">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
              <StatusBadge status={item.status} type={item.type} size="md" />
            </div>
            <div className="absolute top-4 right-4 z-10">
              <CategoryBadge category={item.category} className="shadow-md backdrop-blur-md" />
            </div>
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-slate-950/60 to-transparent pointer-events-none" />
          </div>

          {/* Description Card */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 sm:p-8 space-y-5 text-left">
            <div>
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-1">
                <span>Official Report #{item.reportId}</span>
                <span className="capitalize px-2 py-0.5 rounded-md bg-slate-100 font-sans font-semibold text-slate-700">
                  {item.type} Item
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {item.title}
              </h1>
            </div>

            <div className="border-t border-slate-100 pt-4">
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Item Description
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                {item.description}
              </p>
            </div>

            {/* Identifying Details */}
            <div className="border-t border-slate-100 pt-4">
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Identifying & Distinguishing Details
              </h2>
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 text-xs text-slate-700 leading-relaxed">
                {item.identifyingDetails}
              </div>
              <p className="text-[11px] text-slate-400 mt-2 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                <span>
                  Campus officials use these points to verify rightful ownership during pickup.
                </span>
              </p>
            </div>
          </div>

          {/* Timeline of events */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 sm:p-8 space-y-4 text-left">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-600" />
              <span>Report Timeline & Audit Log</span>
            </h2>

            <div className="space-y-4 pt-2">
              {item.timeline && item.timeline.length > 0 ? (
                item.timeline.map((event, idx) => (
                  <div key={event.id || idx} className="flex items-start gap-3 relative pb-4 last:pb-0">
                    {idx < item.timeline.length - 1 && (
                      <div className="absolute left-3.5 top-6 bottom-0 w-0.5 bg-slate-200" />
                    )}
                    <div className="w-7 h-7 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-600 flex items-center justify-center shrink-0 z-10 text-xs font-bold">
                      {idx + 1}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex flex-wrap items-center justify-between gap-1">
                        <h3 className="text-xs font-bold text-slate-900">{event.title}</h3>
                        <span className="text-[11px] text-slate-400 font-mono">
                          {event.date} • {event.time}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">{event.description}</p>
                      {event.actor && (
                        <p className="text-[10px] text-indigo-600 font-medium">Logged by: {event.actor}</p>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-400">No timeline updates recorded yet.</p>
              )}
            </div>
          </div>
        </div>

        {/* Right Column (Sidebar & Action Card) - 5 cols */}
        <div className="lg:col-span-5 space-y-6 text-left">
          {/* Action Card */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-md p-6 sm:p-7 space-y-5">
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-widest">
                Action Center
              </span>
              <h2 className="text-lg font-bold text-slate-900">
                {isFound ? 'Is this your missing item?' : 'Did you find this item?'}
              </h2>
              <p className="text-xs text-slate-500 leading-relaxed">
                {isFound
                  ? 'Submit an ownership claim with identifying proof to release this item from campus holding.'
                  : 'Contact the owner or coordinate handover through the campus safety desk.'}
              </p>
            </div>

            <Button
              variant="primary"
              size="lg"
              className={`w-full justify-center ${
                isFound
                  ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20'
                  : 'bg-indigo-600 hover:bg-indigo-700'
              }`}
              onClick={() => setClaimModalOpen(true)}
              leftIcon={isFound ? <CheckCircle2 className="w-5 h-5" /> : <FileQuestion className="w-5 h-5" />}
            >
              {isFound ? 'Claim This Found Item' : 'I Found This Item!'}
            </Button>

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2 text-xs text-slate-600">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-700">Official Report ID:</span>
                <div className="flex items-center gap-1 font-mono font-bold text-indigo-600">
                  <span>{item.reportId}</span>
                  <button
                    onClick={handleCopyReportId}
                    className="p-1 hover:text-slate-900 transition-colors"
                    title="Copy report ID"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-700">Current Status:</span>
                <span className="font-medium text-slate-900 capitalize">{item.status}</span>
              </div>
            </div>
          </div>

          {/* Location & Custody Card */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 space-y-4">
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              {isFound ? 'Discovery & Custody Point' : 'Last Known Location'}
            </h2>

            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-semibold text-slate-900 block">Specific Location</span>
                  <span className="text-slate-600">{item.location}</span>
                </div>
              </div>

              {item.building && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Building className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-slate-900 block">Campus Building</span>
                    <span className="text-slate-600">{item.building}</span>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-semibold text-slate-900 block">Reported Date & Time</span>
                  <span className="text-slate-600">
                    {formatDate(item.date)} at {item.time}
                  </span>
                </div>
              </div>

              {item.storageLocation && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold text-slate-900 block">Physical Custody / Holding</span>
                    <span className="text-slate-600">{item.storageLocation}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Reporter & Contact Card */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 space-y-4">
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              {isFound ? 'Finder / Intake Info' : 'Owner Contact Preference'}
            </h2>

            <div className="space-y-3 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-semibold text-slate-900 block">Logged By</span>
                  <span className="text-slate-600">
                    {item.reporterName} {item.reporterRole ? `(${item.reporterRole})` : ''}
                  </span>
                </div>
              </div>

              {item.contactValue && (
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
                    {item.contactPreference === 'phone' ? (
                      <Phone className="w-4 h-4" />
                    ) : (
                      <Mail className="w-4 h-4" />
                    )}
                  </div>
                  <div className="truncate">
                    <span className="font-semibold text-slate-900 block">Contact Info</span>
                    <span className="text-slate-600 font-mono truncate block">{item.contactValue}</span>
                  </div>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setReportIssueOpen(true)}
                className="w-full text-center text-xs text-rose-600 hover:text-rose-700 hover:underline font-medium"
              >
                Report Incorrect Information for this Item
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Claim Modal */}
      <ClaimModal
        isOpen={claimModalOpen}
        onClose={() => setClaimModalOpen(false)}
        item={item}
        onSubmitClaim={handleClaimSubmit}
      />

      {/* Report Incorrect Info Modal */}
      <ReportIssueModal
        isOpen={reportIssueOpen}
        onClose={() => setReportIssueOpen(false)}
        item={item}
        onSubmitReport={handleIssueSubmit}
      />
    </div>
  );
};
