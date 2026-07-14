/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Check } from 'lucide-react';

export interface TimelineStep {
  id: string;
  number: string;
  title: string;
  description: string;
  status?: 'complete' | 'active' | 'upcoming';
  meta?: string;
}

interface TimelineProps {
  steps: TimelineStep[];
  className?: string;
}

export const Timeline: React.FC<TimelineProps> = ({ steps, className = '' }) => {
  return (
    <div className={`relative w-full ${className}`}>
      {/* Complete Vertical Progress Line */}
      <div className="absolute left-[20px] top-4 bottom-4 w-0.5 bg-slate-200 pointer-events-none" />

      <div className="space-y-10">
        {steps.map((step, idx) => {
          const isComplete = step.status === 'complete';
          const isActive = step.status === 'active';

          return (
            <div key={step.id} className="relative flex gap-6 md:gap-8 group">
              {/* Left Side Number Badge Indicator */}
              <div className="relative z-10 shrink-0">
                <div
                  className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-semibold border transition-all duration-300 ${
                    isComplete
                      ? 'bg-slate-950 border-slate-950 text-white'
                      : isActive
                      ? 'bg-white border-slate-900 text-slate-900 ring-4 ring-slate-100'
                      : 'bg-white border-slate-200 text-slate-400 group-hover:border-slate-300'
                  }`}
                >
                  {isComplete ? (
                    <Check className="h-4 w-4 stroke-[2.5]" />
                  ) : (
                    <span>{step.number}</span>
                  )}
                </div>
              </div>

              {/* Right Side Step Contents */}
              <div className="flex-grow pt-1.5 pb-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-2.5">
                  <div className="flex items-center gap-2.5">
                    <h4
                      className={`text-base font-bold tracking-tight transition-colors duration-200 ${
                        isActive ? 'text-slate-950 font-extrabold' : 'text-slate-800'
                      }`}
                    >
                      {step.title}
                    </h4>
                    {step.status && (
                      <span
                        className={`text-[9px] font-mono tracking-widest uppercase px-2 py-0.5 rounded-md font-semibold border ${
                          isComplete
                            ? 'bg-emerald-50 border-emerald-100 text-brand-emerald'
                            : isActive
                            ? 'bg-blue-50 border-blue-100 text-brand-indigo animate-pulse'
                            : 'bg-slate-100 border-slate-200 text-slate-400'
                        }`}
                      >
                        {step.status}
                      </span>
                    )}
                  </div>

                  {step.meta && (
                    <span className="text-xs font-mono text-slate-400 font-medium">
                      {step.meta}
                    </span>
                  )}
                </div>

                <p className="text-sm text-slate-500 leading-relaxed max-w-3xl">
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Timeline;
