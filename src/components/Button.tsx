/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  href?: string; // If provided, behaves like a styled anchor link
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  icon,
  iconPosition = 'right',
  href,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 rounded-md focus-visible:outline-2 focus-visible:outline-brand-indigo focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] select-none';

  const variantStyles = {
    primary: 'bg-slate-950 text-white hover:bg-slate-900 border border-slate-950 shadow-sm shadow-slate-950/20',
    secondary: 'bg-white text-slate-900 border border-slate-200 hover:bg-slate-50 hover:border-slate-300 shadow-xs',
    outline: 'bg-transparent text-slate-800 border border-slate-300 hover:bg-slate-100 hover:text-slate-900',
    ghost: 'bg-transparent text-slate-700 hover:bg-slate-100 hover:text-slate-900',
    link: 'bg-transparent text-brand-indigo hover:underline p-0 underline-offset-4',
  }[variant];

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 h-8 gap-1.5',
    md: 'text-sm px-4.5 py-2.5 h-10 gap-2',
    lg: 'text-base px-6 py-3.5 h-12 gap-2.5',
  }[size];

  const content = (
    <>
      {isLoading && <Loader2 className="h-4 w-4 animate-spin shrink-0" />}
      {!isLoading && icon && iconPosition === 'left' && <span className="transition-transform duration-200">{icon}</span>}
      <span>{children}</span>
      {!isLoading && icon && iconPosition === 'right' && <span className="transition-transform duration-200 group-hover:translate-x-1">{icon}</span>}
    </>
  );

  // If href is specified, render as a styled anchor link
  if (href) {
    const linkClass = `${baseStyles} ${variantStyles} ${sizeStyles} group ${className}`;
    return (
      <a href={href} className={linkClass}>
        {content}
      </a>
    );
  }

  return (
    <button
      className={`${baseStyles} ${variantStyles} ${sizeStyles} group ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {content}
    </button>
  );
};

export default Button;
