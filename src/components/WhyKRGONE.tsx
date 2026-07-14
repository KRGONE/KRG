import React from 'react';
import { motion } from 'motion/react';
import { 
  Eye, 
  Cpu, 
  Clock, 
  FileText, 
  Settings, 
  TrendingUp,
  Quote
} from 'lucide-react';
import { COMPANY_CONFIG } from '../config/company';

const CARDS_DATA = [
  {
    title: 'Measure Before You Advise™',
    description: 'We understand your business before recommending solutions.',
    icon: Eye,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50/50',
    borderColor: 'group-hover:border-indigo-500/30'
  },
  {
    title: 'Business Growth Intelligence Platform™',
    description: 'More than consulting. A platform that measures business performance and growth opportunities.',
    icon: Cpu,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50/50',
    borderColor: 'group-hover:border-blue-500/30'
  },
  {
    title: 'Business Growth Assessment™',
    description: 'Identify your strengths, weaknesses and growth opportunities in just 8 minutes.',
    icon: Clock,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50/50',
    borderColor: 'group-hover:border-emerald-500/30'
  },
  {
    title: 'Executive Growth Report™',
    description: 'Receive a clear report with practical insights and priority areas for improvement.',
    icon: FileText,
    color: 'text-violet-600',
    bgColor: 'bg-violet-50/50',
    borderColor: 'group-hover:border-violet-500/30'
  },
  {
    title: 'Business Growth Operating System™',
    description: 'A structured approach to improve every part of your business.',
    icon: Settings,
    color: 'text-amber-600',
    bgColor: 'bg-amber-50/50',
    borderColor: 'group-hover:border-amber-500/30'
  },
  {
    title: 'Turning Knowledge into Revenue Growth™',
    description: 'Our goal is simple. Help business owners make better decisions that lead to sustainable revenue growth.',
    icon: TrendingUp,
    color: 'text-rose-600',
    bgColor: 'bg-rose-50/50',
    borderColor: 'group-hover:border-rose-500/30'
  }
];

export default function WhyKRGONE() {
  return (
    <section 
      id="why-krgone" 
      className="relative overflow-hidden bg-white py-20 md:py-28 lg:py-32 border-b border-slate-200/50"
    >
      {/* Soft background accents */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 h-80 w-80 bg-indigo-500/5 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 h-80 w-80 bg-emerald-500/5 rounded-full filter blur-3xl pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 md:mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 font-sans"
          >
            Why Business Owners Choose {COMPANY_CONFIG.name}
          </motion.h2>
          
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 flex flex-col items-center space-y-1 text-slate-600 font-sans text-base sm:text-lg font-medium leading-relaxed"
          >
            <p>We don't start with advice.</p>
            <p>We start with understanding your business.</p>
            <p className="text-slate-800 font-semibold mt-1">
              Every recommendation begins with measurement, not assumptions.
            </p>
          </motion.div>
        </div>

        {/* 6 Premium Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {CARDS_DATA.map((card, index) => {
            const IconComponent = card.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ y: -4 }}
                className={`group flex flex-col bg-slate-50 hover:bg-white rounded-2xl p-6.5 sm:p-8 border border-slate-200/60 hover:border-slate-300 shadow-xs hover:shadow-md transition-all duration-300 relative overflow-hidden`}
              >
                {/* Icon Container */}
                <div className={`h-11 w-11 rounded-xl ${card.bgColor} ${card.color} flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-105`}>
                  <IconComponent className="h-5 w-5 stroke-[2.2]" />
                </div>

                {/* Card Title & Content */}
                <h3 className="text-lg font-bold text-slate-900 font-sans tracking-tight mb-3">
                  {card.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mt-auto">
                  {card.description}
                </p>

                {/* Subtle bottom border highlight */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-transparent group-hover:bg-linear-gradient(to right, transparent, rgba(99,102,241,0.1), transparent) transition-all duration-300" />
              </motion.div>
            );
          })}
        </div>

        {/* Premium bottom quote callout */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20 md:mt-24 max-w-4xl mx-auto text-center border border-slate-200/50 bg-slate-50/40 rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-xs"
        >
          {/* Subtle Ambient Watermark Quote Icon */}
          <div className="absolute top-4 left-6 text-slate-100 opacity-70 pointer-events-none">
            <Quote className="h-16 w-16 rotate-180" />
          </div>

          <div className="relative z-10 flex flex-col items-center">
            <p className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-800 italic max-w-2xl font-sans leading-relaxed">
              "Great businesses don't grow by chance. They grow by making better decisions."
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 pt-6 border-t border-slate-200/60 w-full max-w-lg">
              <span className="text-[11px] sm:text-xs font-mono tracking-widest uppercase font-bold text-indigo-600">
                Measure Before You Advise™
              </span>
              <span className="hidden sm:inline h-4 w-[1px] bg-slate-300" />
              <span className="text-[11px] sm:text-xs font-mono tracking-widest uppercase font-bold text-slate-800">
                Turning Knowledge into Revenue Growth™
              </span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
