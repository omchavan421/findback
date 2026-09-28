import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  PlusCircle,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Shield,
  Copy,
  Check,
  PackageCheck
} from 'lucide-react';
import { useItems } from '../context/ItemContext';
import { useToast } from '../context/ToastContext';
import { FormField } from '../components/FormField';
import { ImageUploader } from '../components/ImageUploader';
import { Button } from '../components/Button';
import { CATEGORIES, CAMPUS_LOCATIONS } from '../data/mockItems';
import { ItemCategory } from '../types/item';

export const ReportFoundPage: React.FC = () => {
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
    category: 'Keys' as ItemCategory,
    description: '',
    image: '',
    location: '',
    building: 'Student Union',
    date: new Date().toISOString().split('T')[0],
    time: '01:00 PM',
    identifyingDetails: '',
    contactPreference: 'campus_desk' as 'email' | 'phone' | 'campus_desk',
    contactValue: 'Student Union Info Desk (Level 1)',
    reporterName: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateStep = (step: number): boolean => {
    const errs: Record<string, string> = {};

    if (step === 1) {
      if (!formData.title.trim()) errs.title = 'Item name is required';
      if (!formData.category) errs.category = 'Please select a category';
      if (!formData.description.trim() || formData.description.length < 10) {
        errs.description = 'Please describe the found item (at least 10 characters)';
      }
    } else if (step === 2) {
      if (!formData.location.trim()) errs.location = 'Please specify where this item was found';
      if (!formData.date) errs.date = 'Date found is required';
      if (!formData.time.trim()) errs.time = 'Approximate time is required';
    } else if (step === 3) {
      if (!formData.identifyingDetails.trim()) {
        errs.identifyingDetails = 'Please note distinguishing features or custody location';
      }
      if (!formData.reporterName.trim()) {
        errs.reporterName = 'Finder or staff name is required';
      }
      if (formData.contactPreference !== 'campus_desk' && !formData.contactValue.trim()) {
        errs.contactValue = 'Contact information is required';
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
        type: 'found',
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
        'Found Item Logged Successfully',
        `Item registered under ID ${createdItem.reportId} in the campus catalog.`
      );
    } catch (err) {
      console.error(err);
      toast.error('Submission Failed', 'An error occurred while logging the found item.');
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
      category: 'Keys',
      description: '',
      image: '',
      location: '',
      building: 'Student Union',
      date: new Date().toISOString().split('T')[0],
      time: '01:00 PM',
      identifyingDetails: '',
      contactPreference: 'campus_desk',
      contactValue: 'Student Union Info Desk (Level 1)',
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
          <PackageCheck className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Item Logged in Custody
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Thank you! Your found item has been logged.
          </h1>
          <p className="text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
            Your found item report is now accessible to campus students and staff searching for their missing belongings.
          </p>
        </div>

        {/* Report ID Box */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs max-w-md mx-auto space-y-2">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Mock Found Item Catalog ID
          </p>
          <div className="flex items-center justify-center gap-3">
            <span className="font-mono text-2xl font-extrabold text-emerald-600 tracking-wider">
              {submittedReport.reportId}
            </span>
            <button
              onClick={handleCopyReportId}
              className="p-2 rounded-xl text-slate-400 hover:text-emerald-600 hover:bg-slate-100 transition-colors focus:outline-none"
              title="Copy Catalog ID"
            >
              {copied ? <Check className="w-5 h-5 text-emerald-600" /> : <Copy className="w-5 h-5" />}
            </button>
          </div>
          <p className="text-[11px] text-slate-400">
            Reference this ID when turning the physical item over to the campus lost & found holding office.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <Link to={`/item/${submittedReport.id}`}>
            <Button variant="primary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />}>
              View Item in Catalog
            </Button>
          </Link>
          <Button variant="outline" size="md" onClick={resetForm}>
            Log Another Found Item
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
    { number: 3, title: 'Custody & Contact' },
    { number: 4, title: 'Review & Submit' }
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold">
          <PlusCircle className="w-3.5 h-3.5" />
          <span>Campus Found Item Form</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Report a Found Item
        </h1>
        <p className="text-sm text-slate-500 max-w-lg mx-auto">
          Found something on campus? Registering it here helps the rightful owner discover where it is held safely.
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
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 ring-4 ring-emerald-50'
                      : 'bg-slate-100 text-slate-400'
                  }`}
                >
                  {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : step.number}
                </div>
                <span
                  className={`text-[11px] font-semibold mt-2 hidden sm:block truncate ${
                    isCurrent ? 'text-emerald-700' : isCompleted ? 'text-slate-700' : 'text-slate-400'
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
                  General details about the object you located.
                </p>
              </div>

              <FormField
                id="found-title"
                label="Item Name / Title"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                error={errors.title}
                placeholder="e.g. Set of Keys with Red Tag, Sony Wireless Headphones, Hydroflask Bottle"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  id="found-category"
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
                    <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                      Found Item (Available)
                    </span>
                  </div>
                </div>
              </div>

              <FormField
                id="found-description"
                fieldType="textarea"
                label="Detailed Description"
                required
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                error={errors.description}
                placeholder="Describe color, general brand, shape, condition, and any obvious outward traits..."
                helperText="Avoid disclosing every secret sticker or engraving so the owner can use it as proof of claim."
              />

              <ImageUploader
                value={formData.image}
                onChange={(img) => setFormData({ ...formData, image: img })}
                label="Item Photo (Recommended)"
                helperText="Upload a photo to help the owner recognize their item quickly."
              />
            </div>
          )}

          {/* STEP 2: LOCATION & TIME */}
          {currentStep === 2 && (
            <div className="space-y-5 animate-fade-in">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-base font-bold text-slate-900">Step 2: Location & Time</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Where and when was this item discovered?
                </p>
              </div>

              <FormField
                id="found-building"
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
                id="found-location"
                label="Specific Discovery Location"
                required
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                error={errors.location}
                placeholder="e.g. Left on table 12 in dining hall, under row 4 bleachers in gymnasium"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  id="found-date"
                  type="date"
                  label="Date Found"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  error={errors.date}
                />
                <FormField
                  id="found-time"
                  label="Approximate Time"
                  required
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  error={errors.time}
                  placeholder="e.g. 11:30 AM, after afternoon seminar"
                />
              </div>
            </div>
          )}

          {/* STEP 3: CUSTODY & CONTACT */}
          {currentStep === 3 && (
            <div className="space-y-5 animate-fade-in">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-base font-bold text-slate-900">Step 3: Custody & Contact</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Indicate where the item is physically kept for safekeeping.
                </p>
              </div>

              <FormField
                id="found-identifying"
                fieldType="textarea"
                label="Distinctive Features & Storage Notes"
                required
                rows={3}
                value={formData.identifyingDetails}
                onChange={(e) => setFormData({ ...formData, identifyingDetails: e.target.value })}
                error={errors.identifyingDetails}
                placeholder="e.g. Stored in locked cabinet at circulation counter; has distinctive serial sticker..."
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  id="found-reporter"
                  label="Finder / Handler Name"
                  required
                  value={formData.reporterName}
                  onChange={(e) => setFormData({ ...formData, reporterName: e.target.value })}
                  error={errors.reporterName}
                  placeholder="e.g. Campus Staff, TA David, or Student Helper"
                />

                <FormField
                  id="found-pref"
                  fieldType="select"
                  label="Where is the Item Being Held?"
                  value={formData.contactPreference}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      contactPreference: e.target.value as 'email' | 'phone' | 'campus_desk'
                    })
                  }
                  options={[
                    { label: 'Campus Information / Security Desk', value: 'campus_desk' },
                    { label: 'With Finder (Contact via Email)', value: 'email' },
                    { label: 'With Finder (Contact via Phone)', value: 'phone' }
                  ]}
                />
              </div>

              <FormField
                id="found-contact-value"
                label={
                  formData.contactPreference === 'campus_desk'
                    ? 'Custody Desk Location / Room'
                    : formData.contactPreference === 'phone'
                    ? 'Phone Number'
                    : 'Email Address'
                }
                required
                value={formData.contactValue}
                onChange={(e) => setFormData({ ...formData, contactValue: e.target.value })}
                error={errors.contactValue}
                placeholder="e.g. Student Union Info Desk (Level 1) or phone number"
              />
            </div>
          )}

          {/* STEP 4: REVIEW & SUBMIT */}
          {currentStep === 4 && (
            <div className="space-y-5 animate-fade-in">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-base font-bold text-slate-900">Step 4: Review & Submit</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Confirm your found item catalog entry before publishing.
                </p>
              </div>

              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 space-y-4 text-xs">
                <div className="flex items-start justify-between border-b border-slate-200 pb-3">
                  <div>
                    <span className="text-[11px] font-semibold text-slate-400 uppercase">Item Title</span>
                    <h4 className="text-base font-bold text-slate-900">{formData.title}</h4>
                    <span className="inline-block mt-1 font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
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
                    <span className="font-semibold text-slate-700">Found At:</span> {formData.location}{' '}
                    ({formData.building})
                  </div>
                  <div>
                    <span className="font-semibold text-slate-700">Date & Time:</span> {formData.date} at{' '}
                    {formData.time}
                  </div>
                  <div>
                    <span className="font-semibold text-slate-700">Logged By:</span> {formData.reporterName}
                  </div>
                  <div>
                    <span className="font-semibold text-slate-700">Custody / Location:</span>{' '}
                    {formData.contactValue}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200">
                  <span className="font-semibold text-slate-700 block mb-1">Description:</span>
                  <p className="text-slate-600 leading-relaxed">{formData.description}</p>
                </div>

                <div className="pt-2 border-t border-slate-200">
                  <span className="font-semibold text-slate-700 block mb-1">Custody Notes:</span>
                  <p className="text-slate-600 leading-relaxed">{formData.identifyingDetails}</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-start gap-2">
                <Shield className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <p>
                  Thank you for helping reunite campus members with their property. Once submitted, claimants must prove ownership before physical release.
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
                className="bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Continue to Step {currentStep + 1}
              </Button>
            ) : (
              <Button
                type="submit"
                variant="primary"
                isLoading={submitting}
                className="bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/25"
                rightIcon={<CheckCircle2 className="w-4 h-4" />}
              >
                Publish Found Item Entry
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
