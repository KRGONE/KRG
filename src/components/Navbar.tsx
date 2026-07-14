/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, ShieldCheck, ChevronRight, Calendar, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Button from './Button';
import { PageId } from '../types';
import { COMPANY_CONFIG } from '../config/company';

interface NavbarProps {
  currentPage: PageId;
  onPageChange: (page: PageId) => void;
  onStartAssessment: () => void;
  onBookCall: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onPageChange,
  onStartAssessment,
  onBookCall,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Monitor scroll for stateful glassmorphism styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 15) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scroll when mobile menu is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navItems = [
    { label: 'Assessment', id: 'assessment' as PageId },
    { label: 'Solutions', id: 'solutions' as PageId },
    { label: 'Platform', id: 'platform' as PageId },
    { label: 'Email Blueprints', id: 'email-templates' as PageId },
    { label: 'Resources', id: 'resources' as PageId },
    { label: 'About Us', id: 'about' as PageId },
    { label: 'Contact', id: 'contact' as PageId },
  ];

  const handleLinkClick = (id: PageId) => {
    onPageChange(id);
    setIsOpen(false);
  };

  return (
    <header
      id="main-header"
      className={`sticky top-0 z-50 w-full transition-all duration-300 border-b ${
        isScrolled
          ? 'border-slate-200/50 bg-white/75 backdrop-blur-md shadow-xs py-2 sm:py-3'
          : 'border-slate-100/60 bg-white/90 backdrop-blur-sm py-4'
      }`}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo Anchor */}
        <button
          id="navbar-logo"
          onClick={() => handleLinkClick('home')}
          className="flex items-center bg-transparent border-0 cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 rounded-md p-0.5 -ml-1 sm:-ml-2.5 group shrink-0 transition-transform duration-200 active:scale-95"
        >
          <img
            src={COMPANY_CONFIG.logoPath}
            alt={`${COMPANY_CONFIG.name} Logo`}
            referrerPolicy="no-referrer"
            className="h-10 sm:h-12 md:h-14 w-auto object-contain transition-all duration-300 group-hover:scale-[1.03]"
          />
        </button>

        {/* Desktop Navigation Links (Stripe & Apple Elegance) */}
        <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2 relative" id="desktop-navigation">
          {navItems.map((item, index) => {
            const isActive = currentPage === item.id;
            return (
              <button
                id={`nav-link-${item.id}`}
                key={item.id}
                onClick={() => handleLinkClick(item.id)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`relative px-4 py-2 text-[13px] xl:text-sm font-medium transition-colors duration-200 cursor-pointer select-none rounded-md ${
                  isActive
                    ? 'text-slate-950 font-semibold'
                    : 'text-slate-500 hover:text-slate-950'
                }`}
              >
                {/* Micro-hover Capsule backdrop animation */}
                <AnimatePresence>
                  {hoveredIndex === index && (
                    <motion.span
                      layoutId="nav-hover-backdrop"
                      className="absolute inset-0 bg-slate-100/60 rounded-md -z-10"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                    />
                  )}
                </AnimatePresence>

                {item.label}

                {/* Elegant active sliding underline indicator */}
                {isActive && (
                  <motion.div
                    layoutId="nav-active-bar"
                    className="absolute bottom-[-6px] left-4 right-4 h-[2px] bg-slate-950 rounded-full"
                    transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Button CTAs */}
        <div className="hidden lg:flex items-center gap-4" id="desktop-ctas">
          <Button
            id="nav-cta-book-call"
            variant="ghost"
            onClick={onBookCall}
            className="text-[13px] text-slate-600 hover:text-slate-950 hover:bg-slate-50 font-medium tracking-tight px-3 py-1.5 h-9"
          >
            Book Diagnostic Call
          </Button>
          <Button
            id="nav-cta-start-assessment"
            variant="primary"
            size="sm"
            onClick={onStartAssessment}
            className="text-[13px] font-semibold bg-slate-950 hover:bg-slate-900 border-none rounded-full h-9 px-4.5 shadow-xs flex items-center gap-1.5"
            icon={<ArrowRight className="h-3.5 w-3.5" />}
          >
            Start Free Assessment
          </Button>
        </div>

        {/* Responsive Mobile Hamburg Toggle button */}
        <div className="flex lg:hidden items-center gap-3">
          {/* Quick micro-assessment CTA for mobile speed */}
          <Button
            id="nav-mobile-assess-quick"
            variant="primary"
            size="sm"
            onClick={onStartAssessment}
            className="text-xs px-3 h-8 rounded-full bg-slate-950 text-white font-medium shadow-xs"
          >
            Assess
          </Button>
          
          <button
            id="nav-mobile-toggle"
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg text-slate-700 hover:text-slate-950 hover:bg-slate-100 transition-colors focus:outline-none cursor-pointer"
            aria-label={isOpen ? 'Close main menu' : 'Open main menu'}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Premium Mobile Glassmorphic Drawer Panel with motion animations */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="lg:hidden fixed inset-0 top-[100%] bg-slate-950/20 backdrop-blur-xs z-30 h-[calc(100vh-100%)]"
            />

            {/* Mobile Drawer Content */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="lg:hidden absolute left-0 right-0 top-[100%] w-full bg-white/95 backdrop-blur-xl border-b border-slate-200/80 shadow-2xl z-40 overflow-hidden flex flex-col"
              id="mobile-drawer"
            >
              <div className="px-5 pt-4 pb-6 space-y-1 divide-y divide-slate-100 max-h-[75vh] overflow-y-auto">
                <div className="py-2 space-y-1">
                  {navItems.map((item, index) => {
                    const isActive = currentPage === item.id;
                    return (
                      <motion.button
                        id={`mobile-nav-link-${item.id}`}
                        key={item.id}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.04 }}
                        onClick={() => handleLinkClick(item.id)}
                        className={`w-full text-left px-3 py-3 rounded-lg text-[15px] font-medium transition-colors flex items-center justify-between select-none cursor-pointer ${
                          isActive
                            ? 'bg-slate-50 text-slate-950 font-semibold'
                            : 'text-slate-600 hover:bg-slate-50/50 hover:text-slate-900'
                        }`}
                      >
                        <span>{item.label}</span>
                        <ChevronRight className={`h-4 w-4 opacity-50 transition-transform ${isActive ? 'translate-x-0.5 text-slate-900 stroke-[2.5]' : ''}`} />
                      </motion.button>
                    );
                  })}
                </div>

                {/* Mobile Sticky-feel CTA container */}
                <div className="pt-5 space-y-3 px-3">
                  <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-100 mb-2">
                    <Sparkles className="h-4 w-4 text-brand-indigo animate-pulse shrink-0" />
                    <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider font-semibold">
                      Enterprise Advisory Access Active
                    </span>
                  </div>

                  <button
                    id="mobile-cta-book-call"
                    onClick={() => { setIsOpen(false); onBookCall(); }}
                    className="w-full h-11 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer active:scale-98"
                  >
                    <Calendar className="h-4 w-4 text-slate-500" />
                    Book Diagnostic Call
                  </button>
                  
                  <button
                    id="mobile-cta-start-assessment"
                    onClick={() => { setIsOpen(false); onStartAssessment(); }}
                    className="w-full h-12 rounded-xl bg-slate-950 hover:bg-slate-900 text-white font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-md shadow-slate-950/10 cursor-pointer active:scale-98"
                  >
                    Start Free Assessment
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Bottom Decorative tag */}
              <div className="bg-slate-50 py-3 px-5 border-t border-slate-100 flex justify-between items-center text-[10px] font-mono text-slate-400">
                <span>{COMPANY_CONFIG.name.toUpperCase()} INTEGRATED SYSTEM v2.0</span>
                <span>SECURED AES-256</span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
