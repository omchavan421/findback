import React, { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react';

interface BaseFieldProps {
  label: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  id: string;
}

export interface InputFieldProps extends BaseFieldProps, InputHTMLAttributes<HTMLInputElement> {
  fieldType?: 'input';
}

export interface SelectFieldProps extends BaseFieldProps, SelectHTMLAttributes<HTMLSelectElement> {
  fieldType: 'select';
  options: { label: string; value: string }[];
}

export interface TextareaFieldProps extends BaseFieldProps, TextareaHTMLAttributes<HTMLTextAreaElement> {
  fieldType: 'textarea';
}

export type FormFieldProps = InputFieldProps | SelectFieldProps | TextareaFieldProps;

export const FormField: React.FC<FormFieldProps> = (props) => {
  const { label, error, helperText, required, id, className = '' } = props;

  const inputBaseStyles = `w-full rounded-xl border px-3.5 py-2.5 text-sm transition-all duration-150 focus:outline-none focus:ring-2 disabled:bg-slate-50 disabled:text-slate-500 ${
    error
      ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500/20 text-rose-900 bg-rose-50/30'
      : 'border-slate-200 hover:border-slate-300 focus:border-indigo-600 focus:ring-indigo-600/20 text-slate-800 bg-white'
  } ${className}`;

  return (
    <div className="w-full flex flex-col gap-1.5 text-left">
      <label htmlFor={id} className="text-xs font-semibold text-slate-700 flex items-center justify-between">
        <span>
          {label}
          {required && <span className="text-rose-500 ml-1" title="Required">*</span>}
        </span>
      </label>

      {props.fieldType === 'textarea' ? (
        <textarea
          id={id}
          rows={props.rows || 3}
          className={`${inputBaseStyles} resize-y`}
          {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : props.fieldType === 'select' ? (
        <select
          id={id}
          className={`${inputBaseStyles} cursor-pointer`}
          {...(props as SelectHTMLAttributes<HTMLSelectElement>)}
        >
          {props.options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={id}
          className={inputBaseStyles}
          {...(props as InputHTMLAttributes<HTMLInputElement>)}
        />
      )}

      {error ? (
        <p className="text-xs text-rose-600 font-medium">{error}</p>
      ) : helperText ? (
        <p className="text-xs text-slate-500">{helperText}</p>
      ) : null}
    </div>
  );
};
