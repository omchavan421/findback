import React, { useState, useRef } from 'react';
import { UploadCloud, Image as ImageIcon, X, Link as LinkIcon } from 'lucide-react';
import { Button } from './Button';

interface ImageUploaderProps {
  value?: string;
  onChange: (imageUrl: string) => void;
  label?: string;
  helperText?: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  value,
  onChange,
  label = 'Item Photo',
  helperText = 'Upload a clear photo of the item or paste a direct image URL.'
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleApplyUrl = () => {
    if (urlInput.trim()) {
      onChange(urlInput.trim());
      setUrlInput('');
      setShowUrlInput(false);
    }
  };

  return (
    <div className="w-full flex flex-col gap-1.5 text-left">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-slate-700">{label}</label>
        <button
          type="button"
          onClick={() => setShowUrlInput(!showUrlInput)}
          className="text-xs text-indigo-600 hover:text-indigo-700 font-medium inline-flex items-center gap-1 focus:outline-none"
        >
          <LinkIcon className="w-3.5 h-3.5" />
          {showUrlInput ? 'Upload file instead' : 'Use image URL'}
        </button>
      </div>

      {showUrlInput ? (
        <div className="flex items-center gap-2 mt-1">
          <input
            type="url"
            placeholder="https://images.unsplash.com/..."
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            className="flex-1 rounded-xl border border-slate-200 px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600"
          />
          <Button type="button" size="sm" onClick={handleApplyUrl}>
            Apply
          </Button>
        </div>
      ) : null}

      {value ? (
        <div className="relative mt-1 group rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 aspect-video max-h-56 flex items-center justify-center">
          <img
            src={value}
            alt="Uploaded item preview"
            className="w-full h-full object-cover rounded-2xl"
          />
          <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-1.5 bg-white text-slate-800 text-xs font-medium rounded-lg shadow-sm hover:bg-slate-50 transition-colors"
            >
              Change Photo
            </button>
            <button
              type="button"
              onClick={() => onChange('')}
              className="p-1.5 bg-rose-600 text-white rounded-lg shadow-sm hover:bg-rose-700 transition-colors"
              title="Remove photo"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
          className={`mt-1 border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-200 ${
            isDragging
              ? 'border-indigo-500 bg-indigo-50/50 scale-[1.01]'
              : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/50 bg-slate-50/20'
          }`}
        >
          <div className="w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3 shadow-inner">
            <UploadCloud className="w-6 h-6" />
          </div>
          <p className="text-sm font-semibold text-slate-700">
            Click to upload <span className="font-normal text-slate-500">or drag and drop</span>
          </p>
          <p className="text-xs text-slate-400 mt-1">PNG, JPG, WEBP or GIF (up to 5MB)</p>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      <p className="text-xs text-slate-400 mt-1">{helperText}</p>
    </div>
  );
};
