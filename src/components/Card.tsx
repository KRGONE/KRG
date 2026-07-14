/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import * as Icons from 'lucide-react';
import Button from './Button';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'white' | 'slate' | 'outline' | 'dark' | 'glass';
  hoverEffect?: boolean;
}

/**
 * Standard Modular Card Component
 */
export const Card: React.FC<CardProps> = ({
  children,
  variant = 'white',
  hoverEffect = true,
  className = '',
  ...props
}) => {
  const variantStyles = {
    white: 'bg-white border border-slate-200/80 shadow-premium-sm text-slate-900',
    slate: 'bg-slate-50 border border-slate-200 text-slate-900',
    outline: 'bg-transparent border border-slate-200 text-slate-900',
    dark: 'bg-slate-900 border border-slate-800 text-white',
    glass: 'bg-white/60 backdrop-blur-md border border-white/20 shadow-premium-sm text-slate-900',
  }[variant];

  const hoverStyle = hoverEffect
    ? 'hover:shadow-premium-md hover:border-slate-300 hover:translate-y-[-2px] transition-all duration-300 ease-out'
    : 'transition-all duration-200';

  return (
    <div
      className={`rounded-lg p-6 sm:p-8 overflow-hidden ${variantStyles} ${hoverStyle} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

/**
 * Feature Card Component
 */
interface FeatureCardProps extends Omit<CardProps, 'children'> {
  title: string;
  description: string;
  iconName: keyof typeof Icons;
  features?: string[];
  actionLabel?: string;
  onAction?: () => void;
  badge?: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  iconName,
  features = [],
  actionLabel,
  onAction,
  badge,
  variant = 'white',
  className = '',
  ...props
}) => {
  // Dynamically resolve lucide icons
  const IconComponent = (Icons[iconName] as React.ComponentType<{ className?: string }>) || Icons.Activity;

  return (
    <Card variant={variant} className={`flex flex-col h-full ${className}`} {...props}>
      <div className="flex items-start justify-between mb-5">
        <div className="p-3 rounded-lg bg-slate-100 text-slate-900 border border-slate-200/60 inline-flex">
          <IconComponent className="h-5 w-5 stroke-[1.8]" />
        </div>
        {badge && (
          <span className="text-xs font-mono font-medium tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-indigo-50 border border-indigo-100 text-brand-indigo">
            {badge}
          </span>
        )}
      </div>

      <h3 className="text-lg font-semibold tracking-tight text-slate-900 mb-2">{title}</h3>
      <p className="text-sm text-slate-500 leading-relaxed mb-6 flex-grow">{description}</p>

      {features.length > 0 && (
        <ul className="space-y-2.5 mb-6 border-t border-slate-100 pt-4">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start gap-2.5 text-xs text-slate-600">
              <Icons.Check className="h-4 w-4 text-brand-emerald shrink-0 stroke-[2.5]" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      )}

      {actionLabel && (
        <Button
          variant={variant === 'dark' ? 'secondary' : 'outline'}
          size="sm"
          className="w-full mt-auto"
          onClick={onAction}
        >
          {actionLabel}
        </Button>
      )}
    </Card>
  );
};

/**
 * Business Challenge Card Component
 */
interface ChallengeCardProps {
  challengeTitle: string;
  challengeDesc: string;
  engineTitle: string;
  engineDesc: string;
  impactMetrics?: string;
}

export const ChallengeCard: React.FC<ChallengeCardProps> = ({
  challengeTitle,
  challengeDesc,
  engineTitle,
  engineDesc,
  impactMetrics,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 rounded-lg border border-slate-200 overflow-hidden shadow-premium-sm bg-white hover:border-slate-300 transition-all duration-300">
      {/* Before / Pain Point */}
      <div className="p-6 sm:p-8 bg-slate-50 border-r border-b md:border-b-0 border-slate-200 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-4 text-slate-500 font-mono text-xs tracking-wider uppercase">
            <Icons.AlertCircle className="h-4 w-4 text-brand-amber shrink-0" />
            <span>The Challenge</span>
          </div>
          <h4 className="text-base font-semibold tracking-tight text-slate-900 mb-2">{challengeTitle}</h4>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">{challengeDesc}</p>
        </div>
        <div className="mt-6 flex items-center gap-1.5 text-xs font-medium text-slate-400">
          <span>Stagnant growth loops</span>
        </div>
      </div>

      {/* After / BGOS™ Blueprint */}
      <div className="p-6 sm:p-8 bg-slate-950 text-white flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-4 text-slate-400 font-mono text-xs tracking-wider uppercase">
            <Icons.Zap className="h-4 w-4 text-brand-indigo shrink-0" />
            <span>The BGOS™ Solution</span>
          </div>
          <h4 className="text-base font-semibold tracking-tight text-white mb-2">{engineTitle}</h4>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{engineDesc}</p>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] font-mono uppercase text-slate-400 tracking-widest">Expected Outcome</span>
            <span className="text-sm font-semibold text-brand-emerald">{impactMetrics || 'Maturity Upgrade'}</span>
          </div>
          <Icons.ChevronRight className="h-4 w-4 text-slate-500" />
        </div>
      </div>
    </div>
  );
};

/**
 * Premium CTA Card Component
 */
interface CTACardProps {
  title: string;
  description: string;
  primaryActionLabel: string;
  primaryActionHref?: string;
  primaryActionOnClick?: () => void;
  secondaryActionLabel?: string;
  secondaryActionHref?: string;
  secondaryActionOnClick?: () => void;
  variant?: 'light' | 'dark';
}

export const CTACard: React.FC<CTACardProps> = ({
  title,
  description,
  primaryActionLabel,
  primaryActionHref,
  primaryActionOnClick,
  secondaryActionLabel,
  secondaryActionHref,
  secondaryActionOnClick,
  variant = 'dark',
}) => {
  const isDark = variant === 'dark';

  return (
    <div
      className={`rounded-xl p-8 sm:p-12 text-center relative overflow-hidden shadow-premium-xl border ${
        isDark
          ? 'bg-slate-950 border-slate-900 text-white'
          : 'bg-white border-slate-200 text-slate-900'
      }`}
    >
      {/* Decorative Grid Mesh (Apple style subtlety) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
        <h3 className={`text-2xl sm:text-3xl font-bold tracking-tight mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
          {title}
        </h3>
        <p className={`text-sm sm:text-base leading-relaxed mb-8 max-w-lg ${isDark ? 'text-slate-300' : 'text-slate-500'}`}>
          {description}
        </p>

        <div className="flex flex-col sm:flex-row gap-3.5 w-full sm:w-auto justify-center">
          <Button 
            href={primaryActionHref} 
            onClick={primaryActionOnClick}
            variant={isDark ? 'secondary' : 'primary'} 
            size="md"
          >
            {primaryActionLabel}
          </Button>
          {secondaryActionLabel && (secondaryActionHref || secondaryActionOnClick) && (
            <Button 
              href={secondaryActionHref} 
              onClick={secondaryActionOnClick}
              variant={isDark ? 'outline' : 'secondary'} 
              size="md"
            >
              {secondaryActionLabel}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
