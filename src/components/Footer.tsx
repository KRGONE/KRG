/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { PageId } from '../types';
import { ShieldCheck, Mail, Phone, MapPin } from 'lucide-react';
import { COMPANY_CONFIG } from '../config/company';

interface FooterProps {
  onPageChange: (page: PageId) => void;
  onBookCall: () => void;
  onStartAssessment: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onPageChange,
  onBookCall,
  onStartAssessment,
}) => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    platform: [
      { label: 'Growth Assessment™', id: 'assessment' as PageId },
      { label: 'BGOS™ Core Engine', id: 'frameworks' as PageId },
      { label: 'Solutions Blueprint', id: 'solutions' as PageId },
      { label: `Why ${COMPANY_CONFIG.name}`, id: 'why-krgone' as PageId },
    ],
    resources: [
      { label: 'Knowledge Base', id: 'resources' as PageId },
      { label: 'Whitepapers', id: 'resources' as PageId },
      { label: 'Case Studies', id: 'resources' as PageId },
      { label: 'Contact Platform', id: 'contact' as PageId },
    ],
    company: [
      { label: `About ${COMPANY_CONFIG.name}`, id: 'about' as PageId },
      { label: 'Advisory Team', id: 'about' as PageId },
      { label: 'Visit Website', url: COMPANY_CONFIG.website, isExternal: true },
      { label: 'Contact Sales', id: 'contact' as PageId },
    ],
  };

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 font-sans">
      {/* Upper Area: Info grid */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 sm:gap-12">
        {/* Col 1: Platform identity */}
        <div className="lg:col-span-2 space-y-6">
          <button
            onClick={() => onPageChange('home')}
            className="flex items-center gap-2 bg-transparent border-0 cursor-pointer text-left focus:outline-none rounded-md group"
          >
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <img
                  src={COMPANY_CONFIG.logoPath}
                  alt={`${COMPANY_CONFIG.name} Logo`}
                  referrerPolicy="no-referrer"
                  className="h-10 sm:h-12 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.03]"
                />
              </div>
              <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase font-medium leading-none mt-2">
                {COMPANY_CONFIG.tagline}
              </span>
            </div>
          </button>
          
          <p className="text-sm text-slate-400 max-w-sm leading-relaxed font-normal">
            {COMPANY_CONFIG.name} is the premier {COMPANY_CONFIG.tagline} empowering mid-market leaders to diagnose inefficiencies, align growth engines, and orchestrate systematic scaling.
          </p>

          <div className="space-y-3.5 text-xs">
            <div className="flex items-start gap-3">
              <MapPin className="h-4 w-4 text-slate-500 shrink-0 mt-0.5" />
              <span>{COMPANY_CONFIG.fullAddress}</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-slate-500 shrink-0" />
              <a href={`mailto:${COMPANY_CONFIG.email}`} className="hover:text-white transition-colors font-semibold">
                {COMPANY_CONFIG.email}
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-slate-500 shrink-0" />
              <span className="text-slate-400 font-medium">Contact Support: </span>
              <a href={COMPANY_CONFIG.phoneDial} className="hover:text-white transition-colors font-bold md:pointer-events-none md:cursor-default">
                {COMPANY_CONFIG.phone}
              </a>
            </div>
          </div>
        </div>

        {/* Col 2: Platform modules */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-widest text-white mb-5 font-mono">
            Platform
          </h4>
          <ul className="space-y-3 text-sm">
            {footerLinks.platform.map((link, i) => (
              <li key={i}>
                <button
                  onClick={() => onPageChange(link.id)}
                  className="hover:text-white transition-colors bg-transparent border-none p-0 cursor-pointer select-none text-left"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Resources */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-widest text-white mb-5 font-mono">
            Resources
          </h4>
          <ul className="space-y-3 text-sm">
            {footerLinks.resources.map((link, i) => (
              <li key={i}>
                <button
                  onClick={() => onPageChange(link.id)}
                  className="hover:text-white transition-colors bg-transparent border-none p-0 cursor-pointer select-none text-left"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4: Corporate */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-widest text-white mb-5 font-mono">
            Company
          </h4>
          <ul className="space-y-3 text-sm">
            {footerLinks.company.map((link: any, i) => (
              <li key={i}>
                {link.isExternal ? (
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    {link.label}
                  </a>
                ) : (
                  <button
                    onClick={() => onPageChange(link.id)}
                    className="hover:text-white transition-colors bg-transparent border-none p-0 cursor-pointer select-none text-left"
                  >
                    {link.label}
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Lower Area: Disclosures and copyright */}
      <div className="w-full bg-slate-950 border-t border-slate-900/60 py-8 text-xs text-slate-500 font-normal">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-5 text-center md:text-left">
          <div className="space-y-1.5 max-w-2xl">
            <p>
              © 2026 {COMPANY_CONFIG.name}. All rights reserved. {COMPANY_CONFIG.tagline}, Business Growth Maturity Assessment™, Business Growth Score™, and BGOS™ are registered trademarks or service marks of {COMPANY_CONFIG.name}.
            </p>
            <p className="text-[10px] leading-relaxed">
              Disclaimer: Platform analytics, maturity metrics, and simulated reports generated by the Business Growth Score™ engine are designed for strategic intelligence purposes only. Final corporate consulting decisions should be backed by custom audits.
            </p>
          </div>
          
          <div className="flex gap-4 sm:gap-6 whitespace-nowrap items-center">
            <button
              onClick={() => onPageChange('privacy')}
              className="hover:text-slate-300 transition-colors bg-transparent border-0 p-0 cursor-pointer text-left focus:outline-none font-normal"
              id="footer-privacy-trigger"
            >
              Privacy Policy
            </button>
            <a href="#terms" className="hover:text-slate-300 transition-colors">Terms of Service</a>
            <a href="#legal" className="hover:text-slate-300 transition-colors">Compliance</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
