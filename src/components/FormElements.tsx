/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

/**
 * Standard Form Label
 */
interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

export const Label: React.FC<LabelProps> = ({ children, required, className = '', ...props }) => {
  return (
    <label className={`block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2 ${className}`} {...props}>
      {children}
      {required && <span className="text-brand-amber ml-1">*</span>}
    </label>
  );
};

/**
 * Premium Text Input Field
 */
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  required?: boolean;
  icon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, required, icon, className = '', type = 'text', ...props }, ref) => {
    return (
      <div className="w-full text-left">
        {label && <Label required={required}>{label}</Label>}
        <div className="relative">
          {icon && (
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              {icon}
            </div>
          )}
          <input
            type={type}
            ref={ref}
            className={`w-full px-4.5 py-2.5 rounded-md border text-sm transition-all duration-200 outline-none placeholder:text-slate-400 ${
              icon ? 'pl-10' : ''
            } ${
              error
                ? 'border-red-500 bg-red-50/10 text-slate-900 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                : 'border-slate-200 bg-white text-slate-900 focus:border-slate-400 focus:ring-1 focus:ring-slate-400/20'
            } ${className}`}
            {...props}
          />
        </div>
        {error && <p className="mt-1.5 text-xs text-red-500 font-medium">{error}</p>}
      </div>
    );
  }
);
Input.displayName = 'Input';

/**
 * Premium Textarea Field
 */
interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  required?: boolean;
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, error, required, className = '', rows = 4, ...props }, ref) => {
    return (
      <div className="w-full text-left">
        {label && <Label required={required}>{label}</Label>}
        <textarea
          ref={ref}
          rows={rows}
          className={`w-full px-4.5 py-2.5 rounded-md border text-sm transition-all duration-200 outline-none placeholder:text-slate-400 ${
            error
              ? 'border-red-500 bg-red-50/10 text-slate-900 focus:border-red-500 focus:ring-1 focus:ring-red-500'
              : 'border-slate-200 bg-white text-slate-900 focus:border-slate-400 focus:ring-1 focus:ring-slate-400/20'
          } ${className}`}
          {...props}
        />
        {error && <p className="mt-1.5 text-xs text-red-500 font-medium">{error}</p>}
      </div>
    );
  }
);
TextArea.displayName = 'TextArea';

/**
 * Premium Select Field
 */
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  required?: boolean;
  options: { value: string; label: string }[];
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, required, options, className = '', ...props }, ref) => {
    return (
      <div className="w-full text-left">
        {label && <Label required={required}>{label}</Label>}
        <div className="relative">
          <select
            ref={ref}
            className={`w-full px-4.5 py-2.5 rounded-md border text-sm appearance-none transition-all duration-200 outline-none bg-white ${
              error
                ? 'border-red-500 bg-red-50/10 text-slate-900 focus:border-red-500'
                : 'border-slate-200 text-slate-800 focus:border-slate-400 focus:ring-1 focus:ring-slate-400/20'
            } ${className}`}
            {...props}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400">
            <svg className="h-4 w-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        {error && <p className="mt-1.5 text-xs text-red-500 font-medium">{error}</p>}
      </div>
    );
  }
);
Select.displayName = 'Select';

/**
 * Custom Checkbox Component
 */
interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
  description?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, description, className = '', ...props }, ref) => {
    return (
      <label className="flex items-start gap-3 cursor-pointer select-none group">
        <div className="relative flex items-center pt-0.5">
          <input
            type="checkbox"
            ref={ref}
            className="peer sr-only"
            {...props}
          />
          <div className="h-4.5 w-4.5 rounded border border-slate-300 bg-white transition-all duration-200 peer-checked:bg-slate-950 peer-checked:border-slate-950 flex items-center justify-center group-hover:border-slate-400">
            <svg
              className="h-3 w-3 text-white stroke-current stroke-[3] fill-none opacity-0 peer-checked:opacity-100 transition-opacity duration-150"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        <div className="flex flex-col text-left">
          <span className="text-sm font-medium text-slate-800 group-hover:text-slate-950 transition-colors">
            {label}
          </span>
          {description && <span className="text-xs text-slate-500">{description}</span>}
        </div>
      </label>
    );
  }
);
Checkbox.displayName = 'Checkbox';

/**
 * Custom Styled Option Card (Ideal for Assessments)
 */
interface OptionCardProps {
  checked: boolean;
  onChange: () => void;
  title: string;
  description?: string;
  scoreLabel?: string;
}

export const OptionCard: React.FC<OptionCardProps> = ({
  checked,
  onChange,
  title,
  description,
  scoreLabel,
}) => {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`w-full text-left p-5 rounded-lg border transition-all duration-300 focus:outline-none select-none ${
        checked
          ? 'border-slate-900 bg-slate-950 text-white shadow-premium-md'
          : 'border-slate-200 bg-white text-slate-800 hover:border-slate-300 hover:bg-slate-50'
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-grow">
          <h5 className={`text-sm sm:text-base font-semibold leading-tight mb-1.5 ${checked ? 'text-white' : 'text-slate-950'}`}>
            {title}
          </h5>
          {description && (
            <p className={`text-xs sm:text-sm leading-relaxed ${checked ? 'text-slate-300' : 'text-slate-500'}`}>
              {description}
            </p>
          )}
        </div>

        {/* Radio dot element */}
        <div className="shrink-0 pt-0.5">
          <div
            className={`h-4.5 w-4.5 rounded-full border flex items-center justify-center transition-colors duration-200 ${
              checked ? 'border-white bg-white' : 'border-slate-300 bg-transparent'
            }`}
          >
            {checked && <div className="h-2 w-2 rounded-full bg-slate-950" />}
          </div>
        </div>
      </div>

      {scoreLabel && (
        <div className="mt-4 pt-3 border-t border-slate-100/10 flex items-center justify-between text-[10px] font-mono tracking-wider uppercase">
          <span className={checked ? 'text-slate-400' : 'text-slate-400'}>Maturity Alignment</span>
          <span className={`font-semibold ${checked ? 'text-brand-emerald' : 'text-slate-600'}`}>{scoreLabel}</span>
        </div>
      )}
    </button>
  );
};
