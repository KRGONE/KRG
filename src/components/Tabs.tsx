/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface TabsProps {
  items: TabItem[];
  activeId: string;
  onChange: (id: string) => void;
  variant?: 'pill' | 'underline';
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  items,
  activeId,
  onChange,
  variant = 'pill',
  className = '',
}) => {
  return (
    <div className={`w-full ${className}`}>
      {/* Scrollable container for mobile tabs layout */}
      <div className="flex overflow-x-auto scrollbar-none pb-1 -mb-1 border-b border-slate-200/60">
        <div className="flex gap-1.5 min-w-full">
          {items.map((item) => {
            const isActive = item.id === activeId;

            if (variant === 'underline') {
              return (
                <button
                  key={item.id}
                  onClick={() => onChange(item.id)}
                  className="relative px-5 py-3 text-sm font-medium transition-colors duration-200 select-none whitespace-nowrap focus:outline-none"
                  style={{ WebkitTapHighlightColor: 'transparent' }}
                >
                  <div className={`flex items-center gap-2 ${isActive ? 'text-slate-950 font-semibold' : 'text-slate-400 hover:text-slate-700'}`}>
                    {item.icon && <span className="shrink-0">{item.icon}</span>}
                    <span>{item.label}</span>
                  </div>

                  {isActive && (
                    <motion.div
                      layoutId="activeUnderlineTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-950"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            }

            // Default: Pill Layout (Stripe style)
            return (
              <button
                key={item.id}
                onClick={() => onChange(item.id)}
                className="relative px-4 py-2 text-sm rounded-md transition-colors duration-200 select-none whitespace-nowrap focus:outline-none"
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                {/* Active Indicator Slide Animation */}
                {isActive && (
                  <motion.div
                    layoutId="activePillTab"
                    className="absolute inset-0 bg-slate-900 shadow-sm"
                    style={{ borderRadius: '6px' }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}

                <div
                  className={`relative z-10 flex items-center gap-2 transition-colors duration-200 ${
                    isActive ? 'text-white font-medium' : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  {item.icon && <span className="shrink-0">{item.icon}</span>}
                  <span>{item.label}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Tabs;
