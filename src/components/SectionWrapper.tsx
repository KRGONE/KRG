/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface SectionWrapperProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  variant?: 'light' | 'slate' | 'dark' | 'glass';
  size?: 'sm' | 'md' | 'lg' | 'none';
  hasBorder?: boolean;
}

export const SectionWrapper: React.FC<SectionWrapperProps> = ({
  children,
  variant = 'light',
  size = 'md',
  hasBorder = false,
  className = '',
  id,
  ...props
}) => {
  const bgStyles = {
    light: 'bg-white text-slate-900',
    slate: 'bg-slate-50 text-slate-900',
    dark: 'bg-slate-950 text-white',
    glass: 'bg-white/70 backdrop-blur-md text-slate-900',
  };

  const paddingStyles = {
    sm: 'py-12 md:py-16',
    md: 'py-16 md:py-24',
    lg: 'py-24 md:py-36',
    none: 'py-0',
  };

  const borderStyle = hasBorder
    ? variant === 'dark'
      ? 'border-b border-slate-800'
      : 'border-b border-slate-200'
    : '';

  return (
    <section
      id={id}
      className={`relative w-full ${bgStyles[variant]} ${paddingStyles[size]} ${borderStyle} ${className}`}
      {...props}
    >
      {children}
    </section>
  );
};

export default SectionWrapper;
