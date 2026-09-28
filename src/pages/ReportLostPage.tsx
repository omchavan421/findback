import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FileQuestion,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Upload,
  Calendar,
  Clock,
  MapPin,
  Tag,
  Shield,
  Copy,
  Check,
  Sparkles
} from 'lucide-react';
import { useItems } from '../context/ItemContext';
import { useToast } from '../context/ToastContext';
import { FormField } from '../components/FormField';
import { ImageUploader } from '../components/ImageUploader';
import { Button } from '../components/Button';
import { CATEGORIES, CAMPUS_LOCATIONS } from '../data/mockItems';
import { ItemCategory } from '../types/item';

export const ReportLostPage: React.FC = () => {
  const navigate = useNavigate();
  const { createReport } = useItems();
  const toast = useToast();

  const [currentStep, setCurrentStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submittedReport, setSubmittedReport] = useState<{ id: string; reportId: string } | null>(null);
  const [copied, setCopied] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    category: 'Electronics' as ItemCategory,
    description: '',
    image: '',
    location: '',
    building: 'Central Library',
    date: new Date().toISOString().split('T')[0],
    time: '12:00 PM',
    identifyingDetails: '',
    contactPreference: 'email' as 'email' | 'phone' | 'campus_desk',
    contactValue: '',
    reporterName: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep = (step: number): boolean => {
    const errs: Record<string, string> = {};

    if (step === 1) {
      if (!formData.title.trim()) errs.title = 'Item name is required';
      if (!formData.category) errs.category = 'Please choose a category';
      if (!formData.description.trim() || formData.description.length < 10) {
        errs.description = 'Please provide a descriptive overview (at least 10 characters)';
      }
    } else if (step === 2) {
      if (!formData.location.trim()) errs.location = 'Please specify where it was last seen';
      if (!formData.date) errs.date = 'Date lost is required';
      if (!formData.time.trim()) errs.time = 'Approximate time is required';
    } else if (step === 3) {
      if (!formData.identifyingDetails.trim()) {
        errs.identifyingDetails = 'Please provide unique features or identifying marks';
      }
      if (!formData.reporterName.trim()) {
        errs.reporterName = 'Reporter name is required';
      }
      if (formData.contactPreference === 'email') {
        if (!formData.contactValue.trim() || !formData.contactValue.includes('@')) {
          errs.contactValue = 'Valid campus or personal email is required';
        }
      } else if (formData.contactPreference === 'phone') {
        if (!formData.contactValue.trim()) {
          errs.contactValue = 'Contact phone number is required';
        }
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(3)) return;

    try {
      setSubmitting(true);
      const createdItem = await createReport({
        type: 'lost',
        title: formData.title,
        category: formData.category,
        description: formData.description,
        location: formData.location,
        building: formData.building,
        date: formData.date,
        time: formData.time,
        identifyingDetails: formData.identifyingDetails,
        contactPreference: formData.contactPreference,
        contactValue: formData.contactValue,
        reporterName: formData.reporterName,
        image: formData.image
      });

      setSubmittedReport({ id: createdItem.id, reportId: createdItem.reportId });
      toast.success(
        'Lost Item Reported Successfully',
        `Report ID ${createdItem.reportId} is now active in the directory.`
      );
    } catch (err) {
      console.error(err);
      toast.error('Submission Failed', 'An error occurred while filing the report. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCopyReportId = () => {
    if (submittedReport) {
      navigator.clipboard.writeText(submittedReport.reportId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      category: 'Electronics',
      description: '',
      image: '',
      location: '',
      building: 'Central Library',
      date: new Date().toISOString().split('T')[0],
      time: '12:00 PM',
      identifyingDetails: '',
      contactPreference: 'email',
      contactValue: '',
      reporterName: ''
    });
    setCurrentStep(1);
    setSubmittedReport(null);
  };

  // SUCCESS SCREEN
  if (submittedReport) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center animate-fade-in space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-emerald-50 text-emerald-600 border border-emerald-200/80 flex items-center justify-center mx-auto shadow-md">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Report Published
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Your lost item has been reported.
          </h1>
          <p className="text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
            Your missing item report is now listed on the campus directory. Anyone who finds or turns in an item matching your description will be able to reference this report.
          </p>
        </div>

        {/* Report ID Box */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs max-w-md mx-auto space-y-2">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Mock Report Identification Number
          </p>
          <div className="flex items-center justify-center gap-3">
            <span className="font-mono text-2xl font-extrabold text-indigo-600 tracking-wider">
              {submittedReport.reportId}
            </span>
            <button
              onClick={handleCopyReportId}
              className="p-2 rounded-xl text-slate-400 hover:text-indigo-600 hover:bg-slate-100 transition-colors focus:outline-none"
              title="Copy Report ID"
            >
              {copied ? <Check className="w-5 h-5 text-emerald-600" /> : <Copy className="w-5 h-5" />}
            </button>
          </div>
          <p className="text-[11px] text-slate-400">
            Save this ID to share with campus security or verify ownership when claiming.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <Link to={`/item/${submittedReport.id}`}>
            <Button variant="primary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
              View Item in Directory
            </Button>
          </Link>
          <Button variant="outline" size="md" onClick={resetForm}>
            Report Another Item
          </Button>
          <Link to="/">
            <Button variant="ghost" size="md">
              Return to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const steps = [
    { number: 1, title: 'Item Information' },
    { number: 2, title: 'Location & Time' },
    { number: 3, title: 'Additional Details' },
    { number: 4, title: 'Review & Submit' }
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-semibold">
          <FileQuestion className="w-3.5 h-3.5" />
          <span>Campus Lost Item Form</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Report a Lost Item
        </h1>
        <p className="text-sm text-slate-500 max-w-lg mx-auto">
          Provide accurate details about where and when you last had your item to assist campus personnel and fellow students.
        </p>
      </div>

      {/* Progress Stepper */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs">
        <div className="grid grid-cols-4 gap-2">
          {steps.map((step) => {
            const isCompleted = currentStep > step.number;
            const isCurrent = currentStep === step.number;
            return (
              <div key={step.number} className="flex flex-col items-center text-center">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold transition-all duration-200 ${
                    isCompleted
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : isCurrent
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 ring-4 ring-indigo-50'
                      : 'bg-slate-100 text-slate-400'
                  }`}
                >
                  {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : step.number}
                </div>
                <span
                  className={`text-[11px] font-semibold mt-2 hidden sm:block truncate ${
                    isCurrent ? 'text-indigo-600' : isCompleted ? 'text-slate-700' : 'text-slate-400'
                  }`}
                >
                  {step.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Form Container */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* STEP 1: ITEM INFORMATION */}
          {currentStep === 1 && (
            <div className="space-y-5 animate-fade-in">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-base font-bold text-slate-900">Step 1: Item Information</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Describe what you lost so it can be easily indexed.
                </p>
              </div>

              <FormField
                id="lost-title"
                label="Item Name / Title"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                error={errors.title}
                placeholder="e.g. Apple MacBook Pro 14 inch, Blue Hydro Flask 32oz, Brown Leather Wallet"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  id="lost-category"
                  fieldType="select"
                  label="Category"
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as ItemCategory })}
                  error={errors.category}
                  options={CATEGORIES.map((c) => ({ label: c, value: c }))}
                />

                <div className="flex flex-col gap-1 text-left">
                  <label className="text-xs font-semibold text-slate-700">Campus Status</label>
                  <div className="rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs bg-slate-50 text-slate-500 flex items-center justify-between">
                    <span>Listing Type</span>
                    <span className="font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200">
                      Lost Item
                    </span>
                  </div>
                </div>
              </div>

              <FormField
                id="lost-description"
                fieldType="textarea"
                label="Detailed Description"
                required
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                error={errors.description}
                placeholder="Include color, model, casing, notable contents, stickers, condition, or special markings..."
                helperText="Minimum 10 characters."
              />

              <ImageUploader
                value={formData.image}
                onChange={(img) => setFormData({ ...formData, image: img })}
                label="Item Photo (Optional but Recommended)"
                helperText="Upload a photo or paste a URL of your item or an identical model to aid identification."
              />
            </div>
          )}

          {/* STEP 2: LOCATION & TIME */}
          {currentStep === 2 && (
            <div className="space-y-5 animate-fade-in">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-base font-bold text-slate-900">Step 2: Location & Time</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Pinpoint where and when the item was last seen on campus.
                </p>
              </div>

              <FormField
                id="lost-building"
                fieldType="select"
                label="Campus Building / Area"
                required
                value={formData.building}
                onChange={(e) => setFormData({ ...formData, building: e.target.value })}
                options={CAMPUS_LOCATIONS.filter((l) => l !== 'All Campus Locations').map((loc) => ({
                  label: loc,
                  value: loc
                }))}
              />

              <FormField
                id="lost-location"
                label="Specific Room / Spot"
                required
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                error={errors.location}
                placeholder="e.g. 2nd Floor Study Room 204, Table near north window, Cafe checkout counter"
                helperText="Be as specific as possible regarding seats, floors, or nearby landmarks."
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  id="lost-date"
                  type="date"
                  label="Date Lost"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  error={errors.date}
                />
                <FormField
                  id="lost-time"
                  label="Approximate Time"
                  required
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  error={errors.time}
                  placeholder="e.g. 10:30 AM, between 2 PM and 4 PM"
                />
              </div>
            </div>
          )}

          {/* STEP 3: ADDITIONAL DETAILS */}
          {currentStep === 3 && (
            <div className="space-y-5 animate-fade-in">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-base font-bold text-slate-900">Step 3: Identifying Details & Contact</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Confidential details used by campus security to verify your ownership when found.
                </p>
              </div>

              <FormField
                id="lost-details"
                fieldType="textarea"
                label="Identifying Details / Secret Marks"
                required
                rows={3}
                value={formData.identifyingDetails}
                onChange={(e) => setFormData({ ...formData, identifyingDetails: e.target.value })}
                error={errors.identifyingDetails}
                placeholder="e.g. Keychain has a tiny scratch on the back, inside pocket contains 2 transit coins and a library receipt..."
                helperText="These details help verify ownership when someone reports finding your item."
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  id="lost-reporter"
                  label="Your Full Name"
                  required
                  value={formData.reporterName}
                  onChange={(e) => setFormData({ ...formData, reporterName: e.target.value })}
                  error={errors.reporterName}
                  placeholder="e.g. Alex Chen"
                />

                <FormField
                  id="lost-pref"
                  fieldType="select"
                  label="Preferred Contact Method"
                  value={formData.contactPreference}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      contactPreference: e.target.value as 'email' | 'phone' | 'campus_desk'
                    })
                  }
                  options={[
                    { label: 'Campus Email', value: 'email' },
                    { label: 'Phone Call / SMS', value: 'phone' },
                    { label: 'Campus Security Desk Only', value: 'campus_desk' }
                  ]}
                />
              </div>

              <FormField
                id="lost-contact"
                label={formData.contactPreference === 'phone' ? 'Phone Number' : 'Email Address'}
                required={formData.contactPreference !== 'campus_desk'}
                value={formData.contactValue}
                onChange={(e) => setFormData({ ...formData, contactValue: e.target.value })}
                error={errors.contactValue}
                placeholder={
                  formData.contactPreference === 'phone'
                    ? '(555) 123-4567'
                    : 'alex.chen@student.campus.edu'
                }
              />
            </div>
          )}

          {/* STEP 4: REVIEW & SUBMIT */}
          {currentStep === 4 && (
            <div className="space-y-5 animate-fade-in">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-base font-bold text-slate-900">Step 4: Review & Submit</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Confirm your lost report details before broadcasting to the campus directory.
                </p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 space-y-4 text-xs">
                <div className="flex items-start justify-between border-b border-slate-200 pb-3">
                  <div>
                    <span className="text-[11px] font-semibold text-slate-400 uppercase">Item Title</span>
                    <h4 className="text-base font-bold text-slate-900">{formData.title}</h4>
                    <span className="inline-block mt-1 font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                      {formData.category}
                    </span>
                  </div>
                  {formData.image && (
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="w-16 h-16 rounded-xl object-cover border border-slate-200"
                    />
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-600">
                  <div>
                    <span className="font-semibold text-slate-700">Location:</span> {formData.location}{' '}
                    ({formData.building})
                  </div>
                  <div>
                    <span className="font-semibold text-slate-700">Date & Time:</span> {formData.date} at{' '}
                    {formData.time}
                  </div>
                  <div>
                    <span className="font-semibold text-slate-700">Reporter:</span> {formData.reporterName}
                  </div>
                  <div>
                    <span className="font-semibold text-slate-700">Contact:</span>{' '}
                    {formData.contactValue || 'Campus Desk Referral'}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200">
                  <span className="font-semibold text-slate-700 block mb-1">Description:</span>
                  <p className="text-slate-600 leading-relaxed">{formData.description}</p>
                </div>

                <div className="pt-2 border-t border-slate-200">
                  <span className="font-semibold text-slate-700 block mb-1">Identifying Details:</span>
                  <p className="text-slate-600 leading-relaxed">{formData.identifyingDetails}</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800 flex items-start gap-2">
                <Shield className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <p>
                  By submitting, you certify that this item is genuinely your property and that all campus security guidelines are upheld. A unique report ID will be generated upon submission.
                </p>
              </div>
            </div>
          )}

          {/* Form Actions */}
          <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
            {currentStep > 1 ? (
              <Button
                type="button"
                variant="outline"
                onClick={handleBack}
                leftIcon={<ArrowLeft className="w-4 h-4" />}
              >
                Back
              </Button>
            ) : (
              <Link to="/">
                <Button type="button" variant="ghost">
                  Cancel
                </Button>
              </Link>
            )}

            {currentStep < 4 ? (
              <Button
                type="button"
                variant="primary"
                onClick={handleNext}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Continue to Step {currentStep + 1}
              </Button>
            ) : (
              <Button
                type="submit"
                variant="primary"
                isLoading={submitting}
                className="bg-rose-600 hover:bg-rose-700 shadow-rose-600/25"
                rightIcon={<CheckCircle2 className="w-4 h-4" />}
              >
                Submit Lost Item Report
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
