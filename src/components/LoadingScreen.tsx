/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { COMPANY_CONFIG } from '../config/company';

interface LoadingScreenProps {
  onComplete?: () => void;
  duration?: number; // Total loading time in milliseconds
  message?: string;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  onComplete,
  duration = 3500,
  message = 'Generating Business Growth Report™...',
}) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    'Synthesizing Assessment Responses...',
    'Analyzing growth constraints across Seven Growth Engines™...',
    'Calibrating Business Growth Score™ & Maturity Level...',
    'Mapping bottlenecks to Business Growth Operating System™ (BGOS™)...',
    'Compiling tailored executive PDF report...',
  ];

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const computedProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(computedProgress);

      // Distribute steps over duration
      const stepIndex = Math.min(
        Math.floor((elapsed / duration) * steps.length),
        steps.length - 1
      );
      setCurrentStep(stepIndex);

      if (elapsed >= duration) {
        clearInterval(interval);
        if (onComplete) {
          onComplete();
        }
      }
    }, 50);

    return () => clearInterval(interval);
  }, [duration, onComplete, steps.length]);

  return (
    <div className="fixed inset-0 bg-slate-950 text-white z-50 flex flex-col items-center justify-center p-6 select-none">
      {/* Background elegant grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="relative z-10 max-w-md w-full text-center">
        {/* Animated Brand Emblem Header */}
        <div className="mb-10 inline-flex flex-col items-center">
          <img
            src={COMPANY_CONFIG.logoPath}
            alt={`${COMPANY_CONFIG.name} Logo`}
            className="h-12 w-auto object-contain mb-2 brightness-0 invert"
          />
          <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">
            {COMPANY_CONFIG.tagline}
          </span>
        </div>

        {/* Progress Circular Dial */}
        <div className="relative h-28 w-28 mx-auto mb-8 flex items-center justify-center">
          {/* Track Ring */}
          <svg className="absolute inset-0 h-full w-full -rotate-90">
            <circle
              cx="56"
              cy="56"
              r="48"
              className="stroke-slate-800 fill-none"
              strokeWidth="4"
            />
            {/* Filled Progress Segment */}
            <circle
              cx="56"
              cy="56"
              r="48"
              className="stroke-brand-indigo fill-none transition-all duration-75"
              strokeWidth="4"
              strokeDasharray={2 * Math.PI * 48}
              strokeDashoffset={2 * Math.PI * 48 * (1 - progress / 100)}
              strokeLinecap="round"
            />
          </svg>
          <span className="text-xl font-mono font-bold">{Math.round(progress)}%</span>
        </div>

        {/* Dynamic Heading */}
        <h4 className="text-lg font-bold tracking-tight text-white mb-6">
          {message}
        </h4>

        {/* Verification Checklist */}
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-lg p-5 text-left space-y-3 shadow-premium-lg">
          {steps.map((step, idx) => {
            const isCompleted = idx < currentStep;
            const isCurrent = idx === currentStep;

            return (
              <div
                key={idx}
                className={`flex items-start gap-3 transition-opacity duration-300 ${
                  isCompleted || isCurrent ? 'opacity-100' : 'opacity-25'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="h-4.5 w-4.5 text-brand-emerald shrink-0 mt-0.5" />
                ) : isCurrent ? (
                  <Loader2 className="h-4.5 w-4.5 text-brand-indigo shrink-0 animate-spin mt-0.5" />
                ) : (
                  <div className="h-4.5 w-4.5 rounded-full border border-slate-700 shrink-0 mt-0.5" />
                )}
                <span className="text-xs text-slate-300 font-medium leading-normal">{step}</span>
              </div>
            );
          })}
        </div>

        <p className="mt-8 text-[10px] font-mono text-slate-500 uppercase tracking-wider">
          Secured Enterprise Pipeline • No External Latency
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;
