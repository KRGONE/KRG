/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { PageId } from '../types';

interface GlobalLayoutProps {
  children: React.ReactNode;
  currentPage: PageId;
  onPageChange: (page: PageId) => void;
  onStartAssessment: () => void;
  onBookCall: () => void;
}

export const GlobalLayout: React.FC<GlobalLayoutProps> = ({
  children,
  currentPage,
  onPageChange,
  onStartAssessment,
  onBookCall,
}) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans antialiased selection:bg-slate-900 selection:text-white">
      {/* Structural Skip-Link for Accessibility (WCAG Compliance) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 px-4 py-2.5 bg-brand-indigo text-white font-medium rounded-md text-sm shadow-md"
      >
        Skip to content
      </a>

      {/* Sticky Premium Navbar Header */}
      <Navbar
        currentPage={currentPage}
        onPageChange={onPageChange}
        onStartAssessment={onStartAssessment}
        onBookCall={onBookCall}
      />

      {/* Main Core View Area with Page Transition animations */}
      <main
        id="main-content"
        className="flex-grow flex flex-col w-full focus:outline-none"
        tabIndex={-1}
      >
        {children}
      </main>

      {/* Secure Enterprise Footer */}
      <Footer
        onPageChange={onPageChange}
        onStartAssessment={onStartAssessment}
        onBookCall={onBookCall}
      />
    </div>
  );
};

export default GlobalLayout;
