import React, { ButtonHTMLAttributes } from 'react';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-60 disabled:pointer-events-none disabled:active:scale-100 select-none cursor-pointer';

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 gap-1.5 rounded-lg',
    md: 'text-sm px-4 py-2.5 gap-2 rounded-xl',
    lg: 'text-base px-6 py-3.5 gap-2.5 rounded-xl font-semibold shadow-sm'
  };

  const variantStyles = {
    primary:
      'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/20 hover:shadow-indigo-600/30 focus-visible:ring-indigo-500',
    secondary:
      'bg-slate-900 hover:bg-slate-800 text-white shadow-sm focus-visible:ring-slate-900',
    outline:
      'border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-700 shadow-xs focus-visible:ring-slate-400',
    ghost:
      'text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus-visible:ring-slate-400',
    danger:
      'bg-rose-600 hover:bg-rose-700 text-white shadow-sm shadow-rose-600/20 focus-visible:ring-rose-500',
    success:
      'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm shadow-emerald-600/20 focus-visible:ring-emerald-500'
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current" />
      ) : (
        leftIcon && <span className="shrink-0">{leftIcon}</span>
      )}
      <span>{children}</span>
      {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </button>
  );
};
