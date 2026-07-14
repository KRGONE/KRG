/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4;
  align?: 'left' | 'center' | 'right';
  badge?: string;
  subtitle?: string;
  light?: boolean;
}

export const Heading: React.FC<HeadingProps> = ({
  children,
  level = 2,
  align = 'center',
  badge,
  subtitle,
  light = false,
  className = '',
  ...props
}) => {
  const alignClass = {
    left: 'text-left items-start',
    center: 'text-center items-center',
    right: 'text-right items-end',
  }[align];

  const sizeClasses = {
    1: 'text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight',
    2: 'text-3xl sm:text-4xl font-bold tracking-tight',
    3: 'text-2xl sm:text-3xl font-semibold tracking-tight',
    4: 'text-xl sm:text-2xl font-semibold tracking-tight',
  }[level];

  const colorClass = light ? 'text-white' : 'text-slate-900';
  const subtitleColorClass = light ? 'text-slate-300' : 'text-slate-500';

  return (
    <div className={`flex flex-col mb-8 md:mb-12 ${alignClass}`}>
      {badge && (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium tracking-wider uppercase bg-slate-100 text-slate-800 border border-slate-200 mb-4 font-mono">
          {badge}
        </span>
      )}
      
      {React.createElement(
        `h${level}`,
        {
          className: `${sizeClasses} ${colorClass} ${className}`,
          ...props,
        },
        children
      )}

      {subtitle && (
        <p className={`mt-4 text-base sm:text-lg max-w-2xl font-normal leading-relaxed ${subtitleColorClass}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default Heading;
