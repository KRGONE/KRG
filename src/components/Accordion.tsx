/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
  badge?: string;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultiple = false,
  className = '',
}) => {
  const [openIds, setOpenIds] = useState<string[]>([]);

  const handleToggle = (id: string) => {
    if (allowMultiple) {
      setOpenIds((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    } else {
      setOpenIds((prev) => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className={`space-y-3.5 w-full ${className}`}>
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);
        return (
          <div
            key={item.id}
            className={`border rounded-lg bg-white overflow-hidden transition-all duration-300 ${
              isOpen ? 'border-slate-300 shadow-premium-sm' : 'border-slate-200 hover:border-slate-300'
            }`}
          >
            <button
              onClick={() => handleToggle(item.id)}
              className="w-full flex items-center justify-between p-5 text-left font-medium select-none focus-visible:outline-none focus-visible:bg-slate-50 transition-colors"
              aria-expanded={isOpen}
            >
              <div className="flex items-center gap-3">
                <span className="text-sm sm:text-base font-semibold text-slate-900">{item.title}</span>
                {item.badge && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono uppercase font-semibold border bg-slate-100 text-slate-600 border-slate-200">
                    {item.badge}
                  </span>
                )}
              </div>
              <ChevronDown
                className={`h-4 w-4 text-slate-400 transition-transform duration-300 shrink-0 ${
                  isOpen ? 'rotate-180 text-slate-800' : ''
                }`}
              />
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="px-5 pb-5 pt-0 text-slate-500 text-sm leading-relaxed border-t border-slate-100/60 mt-0.5">
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;
