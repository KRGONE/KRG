import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  Calendar, 
  Check, 
  ShieldCheck, 
  TrendingUp, 
  Cpu, 
  Users, 
  BarChart3, 
  Target, 
  Layers, 
  DollarSign, 
  Compass, 
  AlertTriangle, 
  Sparkles, 
  Briefcase, 
  ChevronRight,
  Info
} from 'lucide-react';
import Button from './Button';
import { COMPANY_CONFIG } from '../config/company';

interface ExecutiveHeroProps {
  onStartAssessment: () => void;
  onBookCall: () => void;
}

// Data for the 7 growth engines
const ENGINE_METRICS = [
  { id: 'leadership', name: 'Leadership Score', score: 82, color: 'bg-indigo-600', textColor: 'text-indigo-600', icon: Compass, desc: 'Governance, strategic vision, alignment velocity.' },
  { id: 'sales', name: 'Sales Score', score: 68, color: 'bg-emerald-600', textColor: 'text-emerald-600', icon: TrendingUp, desc: 'Lead velocity, sales conversion, pipeline leakage.' },
  { id: 'operations', name: 'Operations Score', score: 52, color: 'bg-amber-500', textColor: 'text-amber-500', icon: Layers, desc: 'Delivery capacity, bottlenecks, overhead load.' },
  { id: 'finance', name: 'Finance Score', score: 76, color: 'bg-blue-600', textColor: 'text-blue-600', icon: DollarSign, desc: 'Gross margin efficiency, runway, capital leverage.' },
  { id: 'technology', name: 'Technology Score', score: 45, color: 'bg-rose-500', textColor: 'text-rose-500', icon: Cpu, desc: 'Automation saturation, system integration, modern tech debt.' },
  { id: 'people', name: 'People Score', score: 71, color: 'bg-cyan-600', textColor: 'text-cyan-600', icon: Users, desc: 'Talent density, retention metrics, onboarding ramp.' },
  { id: 'market', name: 'Market Score', score: 80, color: 'bg-violet-600', textColor: 'text-violet-600', icon: Target, desc: 'Product-market fit, pricing leverage, brand authority.' }
];

const OPPORTUNITIES = [
  { title: 'Operational Automation', impact: '+14 Score', desc: 'Synthesize CRM workflows & automate delivery handoffs.', category: 'Operations' },
  { title: 'Sales Pipeline Leakage Remediation', impact: '+11 Score', desc: 'Deploy automated follow-up matrices for high-tier leads.', category: 'Sales' },
  { title: 'SaaS Stack Consolidation', impact: '+8 Score', desc: 'Prune legacy duplicate tools to reclaim 4.2% operating margin.', category: 'Technology' }
];

const RISKS = [
  { title: 'Critical Technology Bottleneck', severity: 'High', desc: 'Manual order processing represents a single point of failure.', category: 'Technology' },
  { title: 'Operational Efficiency Leakage', severity: 'Medium', desc: 'Extended delivery lag is hurting customer lifetime value.', category: 'Operations' },
  { title: 'Sales Transition Dependence', severity: 'Low', desc: 'Founder-led sales dependencies limit enterprise scale capacity.', category: 'Sales' }
];

export default function ExecutiveHero({ onStartAssessment, onBookCall }: ExecutiveHeroProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'matrix' | 'opportunities' | 'risks'>('overview');
  const [selectedEngine, setSelectedEngine] = useState<typeof ENGINE_METRICS[0] | null>(ENGINE_METRICS[2]); // Default to Operations (the lowest)
  const [pulseCount, setPulseCount] = useState(0);

  // Subtle real-time timestamp simulation
  const [systemTime, setSystemTime] = useState('');
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setSystemTime(now.toISOString().substring(11, 19) + ' UTC');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Soft dashboard pulse effect
  useEffect(() => {
    const interval = setInterval(() => {
      setPulseCount(prev => prev + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // SVG coordinates calculations for radar chart
  const center = 100;
  const maxRadius = 75;
  const radarPoints = ENGINE_METRICS.map((eng, i) => {
    const angle = (i * 2 * Math.PI) / ENGINE_METRICS.length - Math.PI / 2;
    const value = eng.score / 100;
    const r = value * maxRadius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y, name: eng.name, rawScore: eng.score, angle, rawEng: eng };
  });

  // Calculate polyline string for radar fill
  const polyPointsString = radarPoints.map(p => `${p.x},${p.y}`).join(' ');

  return (
    <section 
      id="executive-hero" 
      className="relative overflow-hidden bg-slate-50 border-b border-slate-200/50 pt-20 pb-20 md:pt-28 md:pb-32 lg:pt-36 lg:pb-40"
    >
      {/* Absolute Decorative Premium Background Patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(37,99,235,0.03),transparent_40%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(16,185,129,0.02),transparent_40%)] pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-[0.35] pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT SIDE: Brand Positioning & Narrative Copy */}
          <div className="lg:col-span-6 flex flex-col space-y-8 text-left">
            
            {/* Integrated Platform Badge */}
            <div className="inline-flex items-center">
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 text-white border border-slate-800 shadow-sm"
              >
                <Sparkles className="h-3.5 w-3.5 text-brand-amber fill-brand-amber animate-pulse" />
                <span className="text-[10.5px] sm:text-xs font-mono tracking-[0.16em] uppercase font-bold">
                  Business Growth Intelligence Platform™
                </span>
              </motion.div>
            </div>

            {/* Powerful Executive Headline */}
            <div className="space-y-4">
              <motion.h1 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] xl:text-[54px] font-black tracking-tight text-slate-900 font-sans leading-[1.1]"
              >
                Measure Your Business <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 bg-clip-text text-transparent">
                  Before You Scale It.
                </span>
              </motion.h1>

              {/* Supporting Value Proposition */}
              <motion.p 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl"
              >
                <span className="block text-slate-600 text-sm sm:text-base mb-4 leading-relaxed">
                  {COMPANY_CONFIG.name} believes that Before you invest more time, money, or effort, understand what is really holding your business back. Our Business Growth Assessment helps you identify your strengths, weaknesses, and biggest growth opportunities, so you can make smarter business decisions.
                </span>
                <span className="block text-xs sm:text-sm font-mono tracking-wider uppercase font-extrabold text-indigo-600 mb-1">
                  Measure Before You Advise™
                </span>
                <span className="block text-xs sm:text-sm font-mono tracking-wider uppercase font-extrabold text-slate-800">
                  Turning Knowledge into Revenue Growth™
                </span>
              </motion.p>
            </div>

            {/* Premium Call to Actions */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-1"
            >
              <Button
                id="hero-primary-cta"
                variant="primary"
                size="lg"
                onClick={onStartAssessment}
                className="group relative h-13 px-7 rounded-full text-[14.5px] font-bold shadow-[0_10px_30px_rgba(2,6,23,0.15)] bg-slate-950 hover:bg-slate-900 hover:shadow-[0_12px_35px_rgba(2,6,23,0.22)] active:scale-98 transition-all duration-300"
                icon={<ArrowRight className="h-4.5 w-4.5 transition-transform duration-300 group-hover:translate-x-1" />}
              >
                Start Free Maturity Assessment™
                {/* Subtle sheen highlight */}
                <span className="absolute inset-0 rounded-full bg-linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent) -translate-x-full group-hover:animate-shine pointer-events-none" />
              </Button>

              <Button
                id="hero-secondary-cta"
                variant="outline"
                size="lg"
                onClick={onBookCall}
                className="h-13 px-7 rounded-full text-[14.5px] font-semibold border-slate-300 hover:border-slate-800 hover:bg-slate-50 transition-all duration-300 active:scale-98"
                icon={<Calendar className="h-4.5 w-4.5 text-slate-500" />}
              >
                Book Diagnostic Call
              </Button>
            </motion.div>

            {/* Clean, Elegant Trust Badges */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="pt-6 border-t border-slate-200/60"
            >
              <span className="text-[10px] sm:text-xs font-mono tracking-widest uppercase text-slate-400 block mb-3.5 font-bold">
                PLATFORM STANDARDS & DISCLOSURES
              </span>
              <div className="flex flex-wrap gap-x-6 gap-y-3">
                {[
                  '8-Minute Assessment',
                  'Personalized Executive Report™',
                  'Business Growth Score™',
                  'Confidential & Secure',
                  'No Credit Card Required'
                ].map((badge, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 text-slate-600">
                    <div className="h-4 w-4 rounded-full bg-slate-150 flex items-center justify-center text-slate-800 shrink-0">
                      <Check className="h-2.5 w-2.5 stroke-[3]" />
                    </div>
                    <span className="text-xs font-semibold tracking-wide text-slate-700">{badge}</span>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>

          {/* RIGHT SIDE: Highly Interactive Executive Dashboard Preview */}
          <div className="lg:col-span-6 flex flex-col relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.98, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full rounded-2xl bg-slate-900 text-slate-100 shadow-[0_20px_50px_rgba(15,23,42,0.22)] border border-slate-800 overflow-hidden flex flex-col select-none"
            >
              
              {/* Terminal-Style Executive Bar Header */}
              <div className="flex items-center justify-between px-5 py-3.5 bg-slate-950/80 border-b border-slate-850">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-500" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  <span className="text-[10px] font-mono tracking-wider text-slate-500 font-medium ml-2">
                    {COMPANY_CONFIG.name.toUpperCase()} INTEL CORP // ASSESSMENT_SANDBOX
                  </span>
                </div>
                <div className="flex items-center gap-1.5 font-mono text-[9.5px]">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-slate-400 font-bold uppercase tracking-widest">LIVE_CORE</span>
                  <span className="text-slate-600 px-1.5 border border-slate-850 rounded bg-slate-950">{systemTime}</span>
                </div>
              </div>

              {/* simulated client contextual bar */}
              <div className="bg-slate-950/30 px-5 py-3 border-b border-slate-850/50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <span className="text-[9px] font-mono uppercase tracking-widest text-slate-500 block">CURRENT SUBJECT PROFILE</span>
                  <span className="text-xs sm:text-sm font-bold text-slate-200">Acme Mid-Market Growth Holding, Inc.</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="px-2 py-0.5 rounded text-[9.5px] font-mono bg-slate-800 border border-slate-700 text-slate-300 font-medium">
                    $18.4M Rev
                  </span>
                  <span className="px-2 py-0.5 rounded text-[9.5px] font-mono bg-indigo-950/60 border border-indigo-900/60 text-indigo-300 font-medium">
                    84 FTE
                  </span>
                </div>
              </div>

              {/* Navigation tabs inside the dashboard */}
              <div className="flex items-center border-b border-slate-850/80 bg-slate-950/20 px-4">
                {[
                  { id: 'overview', label: 'Maturity Overview' },
                  { id: 'matrix', label: 'Growth Priority Matrix™' },
                  { id: 'opportunities', label: 'Opportunities (+3)' },
                  { id: 'risks', label: 'Critical Risks (-3)' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`px-4.5 py-3 text-xs font-semibold tracking-wide border-b-2 transition-all cursor-pointer relative ${
                      activeTab === tab.id 
                        ? 'text-white border-indigo-500 bg-slate-850/45' 
                        : 'text-slate-400 border-transparent hover:text-slate-200 hover:bg-slate-850/20'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Contents */}
              <div className="p-5 flex-grow min-h-[340px] sm:min-h-[380px] flex flex-col justify-between">
                <AnimatePresence mode="wait">
                  
                  {/* OVERVIEW TAB */}
                  {activeTab === 'overview' && (
                    <motion.div
                      key="overview"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.25 }}
                      className="grid grid-cols-1 md:grid-cols-12 gap-5"
                    >
                      {/* Left half: Score gauges */}
                      <div className="md:col-span-5 flex flex-col gap-4">
                        
                        {/* Overall Business Growth Score™ Card */}
                        <div className="bg-slate-950/50 rounded-xl p-4 border border-slate-800 flex flex-col items-center justify-center text-center relative overflow-hidden group">
                          <div className="absolute top-2 right-2 text-slate-600">
                            <ShieldCheck className="h-4 w-4" />
                          </div>
                          
                          <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
                            BUSINESS GROWTH SCORE™
                          </span>
                          
                          <div className="relative my-3 flex items-center justify-center">
                            {/* Animated SVG Circle Loader */}
                            <svg className="w-24 h-24 transform -rotate-90">
                              <circle 
                                cx="48" 
                                cy="48" 
                                r="40" 
                                stroke="#1e293b" 
                                strokeWidth="6" 
                                fill="transparent" 
                              />
                              <motion.circle 
                                cx="48" 
                                cy="48" 
                                r="40" 
                                stroke="#6366f1" 
                                strokeWidth="6.5" 
                                fill="transparent" 
                                strokeDasharray={251.2}
                                initial={{ strokeDashoffset: 251.2 }}
                                animate={{ strokeDashoffset: 251.2 - (251.2 * 74) / 100 }}
                                transition={{ duration: 1.5, ease: 'easeOut' }}
                                strokeLinecap="round"
                              />
                            </svg>
                            <div className="absolute flex flex-col items-center justify-center">
                              <span className="text-2xl font-black font-sans text-white tracking-tighter">74</span>
                              <span className="text-[9px] font-mono text-slate-500 uppercase leading-none font-bold">OUT OF 100</span>
                            </div>
                          </div>

                          <div className="text-xs font-semibold text-indigo-400 bg-indigo-950/60 px-2.5 py-0.5 rounded-full border border-indigo-900/50">
                            Maturity Phase: Scaling
                          </div>
                        </div>

                        {/* Growth Potential Index™ Card */}
                        <div className="bg-slate-950/40 rounded-xl p-3.5 border border-slate-850/80 flex flex-col gap-1.5 justify-center">
                          <div className="flex items-center justify-between text-[10px] font-mono uppercase text-slate-400">
                            <span>GROWTH POTENTIAL INDEX™</span>
                            <span className="text-emerald-400 font-bold">88 / 100</span>
                          </div>
                          {/* Linear progress bar */}
                          <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                            <motion.div 
                              className="h-full bg-emerald-500 rounded-full"
                              initial={{ width: '0%' }}
                              animate={{ width: '88%' }}
                              transition={{ duration: 1.2, delay: 0.3 }}
                            />
                          </div>
                          <span className="text-[10px] text-slate-500 leading-tight">
                            Indicates a +14 capacity for margin optimization.
                          </span>
                        </div>

                      </div>

                      {/* Right half: Custom SVG Radar Chart */}
                      <div className="md:col-span-7 flex flex-col justify-center items-center bg-slate-950/30 rounded-xl border border-slate-850 p-4 min-h-[220px]">
                        <span className="text-[9px] font-mono uppercase tracking-widest text-slate-400 mb-2">
                          7-ENGINE DIAGNOSTIC ALIGNMENT
                        </span>
                        
                        <div className="relative w-full max-w-[190px] h-[190px] flex items-center justify-center">
                          <svg viewBox="0 0 200 200" className="w-full h-full overflow-visible">
                            {/* Outer reference rings */}
                            <circle cx="100" cy="100" r={maxRadius} fill="none" stroke="#334155" strokeWidth="0.5" strokeDasharray="2 2" />
                            <circle cx="100" cy="100" r={maxRadius * 0.75} fill="none" stroke="#334155" strokeWidth="0.5" strokeDasharray="2 2" />
                            <circle cx="100" cy="100" r={maxRadius * 0.5} fill="none" stroke="#334155" strokeWidth="0.5" strokeDasharray="2 2" />
                            <circle cx="100" cy="100" r={maxRadius * 0.25} fill="none" stroke="#334155" strokeWidth="0.5" strokeDasharray="2 2" />

                            {/* Axis lines */}
                            {radarPoints.map((p, i) => (
                              <line 
                                key={i} 
                                x1="100" 
                                y1="100" 
                                x2={center + maxRadius * Math.cos(p.angle)} 
                                y2={center + maxRadius * Math.sin(p.angle)} 
                                stroke="#1e293b" 
                                strokeWidth="1" 
                              />
                            ))}

                            {/* Shaded polygon of scores */}
                            <polygon 
                              points={polyPointsString} 
                              fill="rgba(99, 102, 241, 0.25)" 
                              stroke="#6366f1" 
                              strokeWidth="2" 
                            />

                            {/* Vertex interaction circles */}
                            {radarPoints.map((p, i) => {
                              const isSelected = selectedEngine?.id === p.rawEng.id;
                              return (
                                <g 
                                  key={i} 
                                  className="cursor-pointer group"
                                  onClick={() => setSelectedEngine(p.rawEng)}
                                >
                                  <circle 
                                    cx={p.x} 
                                    cy={p.y} 
                                    r={isSelected ? 5 : 3.5} 
                                    fill={isSelected ? '#818cf8' : '#475569'} 
                                    stroke={isSelected ? '#ffffff' : '#334155'} 
                                    strokeWidth="1.5"
                                    className="transition-all duration-200 group-hover:scale-150"
                                  />
                                  {/* Small label dots */}
                                  <text
                                    x={center + (maxRadius + 14) * Math.cos(p.angle)}
                                    y={center + (maxRadius + 10) * Math.sin(p.angle) + 3}
                                    fill={isSelected ? '#ffffff' : '#94a3b8'}
                                    fontSize="8"
                                    fontFamily="monospace"
                                    textAnchor="middle"
                                    fontWeight={isSelected ? 'bold' : 'normal'}
                                    className="transition-all duration-200"
                                  >
                                    {p.rawEng.name.replace(' Score', '')}
                                  </text>
                                </g>
                              );
                            })}
                          </svg>
                        </div>

                        {/* Interactive Helper Indicator */}
                        <div className="flex items-center gap-1.5 mt-2.5 text-[9px] font-mono text-slate-500 bg-slate-900/60 px-2 py-1 rounded border border-slate-850">
                          <Info className="h-3 w-3 text-slate-400" />
                          <span>Click vertices to inspect engine diagnostic profiles</span>
                        </div>
                      </div>

                    </motion.div>
                  )}

                  {/* MATRIX TAB */}
                  {activeTab === 'matrix' && (
                    <motion.div
                      key="matrix"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.25 }}
                      className="flex flex-col gap-4"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
                          GROWTH PRIORITY MATRIX™
                        </span>
                        <span className="text-[10.5px] font-mono text-indigo-400 font-bold bg-indigo-950/50 border border-indigo-900/40 px-2 py-0.5 rounded">
                          Quadrants Updated
                        </span>
                      </div>

                      {/* 2x2 Matrix Styling */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-slate-950/45 p-3 rounded-lg border border-slate-850 flex flex-col justify-between min-h-[100px]">
                          <div>
                            <span className="text-[9px] font-mono uppercase text-rose-400 bg-rose-950/60 px-1.5 py-0.5 rounded font-bold">
                              Q1: High Impact / High Complexity
                            </span>
                            <h5 className="text-xs font-bold text-slate-200 mt-1.5">Technology Infrastructure</h5>
                            <p className="text-[10px] text-slate-400 leading-relaxed mt-1">
                              Migrate legacy silo databases into custom automated workflow engines.
                            </p>
                          </div>
                          <span className="text-[9px] font-mono text-slate-500 block text-right mt-1">Est Margin: +6.5%</span>
                        </div>

                        <div className="bg-slate-950/45 p-3 rounded-lg border border-slate-850 flex flex-col justify-between min-h-[100px]">
                          <div>
                            <span className="text-[9px] font-mono uppercase text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded font-bold">
                              Q2: High Impact / Low Complexity
                            </span>
                            <h5 className="text-xs font-bold text-slate-200 mt-1.5">Operational Delivery Workflow</h5>
                            <p className="text-[10px] text-slate-400 leading-relaxed mt-1">
                              Automate CRM to project dispatching sequence.
                            </p>
                          </div>
                          <span className="text-[9px] font-mono text-slate-500 block text-right mt-1">Est Margin: +4.2%</span>
                        </div>

                        <div className="bg-slate-950/45 p-3 rounded-lg border border-slate-850 flex flex-col justify-between min-h-[100px]">
                          <div>
                            <span className="text-[9px] font-mono uppercase text-amber-400 bg-amber-950/60 px-1.5 py-0.5 rounded font-bold">
                              Q3: Low Impact / Low Complexity
                            </span>
                            <h5 className="text-xs font-bold text-slate-200 mt-1.5">Internal Knowledge Matrix</h5>
                            <p className="text-[10px] text-slate-400 leading-relaxed mt-1">
                              Index operating procedures in a searchable registry.
                            </p>
                          </div>
                          <span className="text-[9px] font-mono text-slate-500 block text-right mt-1">Est Margin: +1.5%</span>
                        </div>

                        <div className="bg-slate-950/45 p-3 rounded-lg border border-slate-850 flex flex-col justify-between min-h-[100px]">
                          <div>
                            <span className="text-[9px] font-mono uppercase text-slate-400 bg-slate-900 px-1.5 py-0.5 rounded font-bold">
                              Q4: Low Impact / High Complexity
                            </span>
                            <h5 className="text-xs font-bold text-slate-200 mt-1.5">Custom HR Sourcing Portal</h5>
                            <p className="text-[10px] text-slate-400 leading-relaxed mt-1">
                              Custom applicant portal integration with AI matching.
                            </p>
                          </div>
                          <span className="text-[9px] font-mono text-slate-500 block text-right mt-1">Est Margin: +0.8%</span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* OPPORTUNITIES TAB */}
                  {activeTab === 'opportunities' && (
                    <motion.div
                      key="opportunities"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.25 }}
                      className="flex flex-col gap-3"
                    >
                      <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block mb-1">
                        TOP 3 GROWTH OPPORTUNITIES
                      </span>

                      <div className="space-y-2.5">
                        {OPPORTUNITIES.map((opp, idx) => (
                          <div key={idx} className="bg-slate-950/40 border border-slate-850 p-3 rounded-lg flex items-start gap-3">
                            <div className="h-7 w-7 rounded-full bg-emerald-950/60 border border-emerald-900/50 text-emerald-400 flex items-center justify-center shrink-0 text-xs font-bold">
                              {idx + 1}
                            </div>
                            <div className="flex-grow">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-slate-200">{opp.title}</span>
                                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded font-bold border border-emerald-900/30">
                                  {opp.impact}
                                </span>
                              </div>
                              <p className="text-[10.5px] text-slate-400 leading-normal mt-0.5">{opp.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* RISKS TAB */}
                  {activeTab === 'risks' && (
                    <motion.div
                      key="risks"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.25 }}
                      className="flex flex-col gap-3"
                    >
                      <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block mb-1">
                        TOP 3 DETECTED RISK BOTTLENECK POINTS
                      </span>

                      <div className="space-y-2.5">
                        {RISKS.map((risk, idx) => (
                          <div key={idx} className="bg-slate-950/40 border border-slate-850 p-3 rounded-lg flex items-start gap-3">
                            <div className="h-7 w-7 rounded-full bg-rose-950/60 border border-rose-900/50 text-rose-400 flex items-center justify-center shrink-0 text-xs font-bold">
                              <AlertTriangle className="h-3.5 w-3.5" />
                            </div>
                            <div className="flex-grow">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-slate-200">{risk.title}</span>
                                <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold border ${
                                  risk.severity === 'High' 
                                    ? 'text-rose-400 bg-rose-950/50 border-rose-900/30' 
                                    : risk.severity === 'Medium' 
                                    ? 'text-amber-400 bg-amber-950/50 border-amber-900/30' 
                                    : 'text-slate-400 bg-slate-800 border-slate-700/50'
                                }`}>
                                  {risk.severity} Severity
                                </span>
                              </div>
                              <p className="text-[10.5px] text-slate-400 leading-normal mt-0.5">{risk.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                </AnimatePresence>

                {/* Bottom Interactive Detail Card */}
                <div className="mt-5 pt-4 border-t border-slate-850 flex flex-col md:flex-row md:items-center justify-between gap-3 bg-slate-950/20 p-3 rounded-lg border border-slate-850/50">
                  <div className="flex items-center gap-3">
                    {selectedEngine && (
                      <>
                        <div className="h-8 w-8 rounded bg-slate-800 flex items-center justify-center text-slate-200">
                          <selectedEngine.icon className="h-4 w-4" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[10px] font-mono text-slate-500 uppercase leading-none">ACTIVE METRIC DETAIL</span>
                          <span className="text-xs font-bold text-slate-200 mt-1">{selectedEngine.name}</span>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex flex-col text-right">
                      <span className="text-[9px] font-mono text-slate-500 uppercase leading-none">SCORE</span>
                      <span className="text-sm font-black text-slate-100 mt-0.5">{selectedEngine?.score}/100</span>
                    </div>
                    <div className="h-5.5 w-[1px] bg-slate-850" />
                    <div className="flex flex-col">
                      <span className="text-[9px] font-mono text-slate-500 uppercase leading-none">IMPACT PROFILE</span>
                      <span className={`text-xs font-semibold leading-normal mt-0.5 ${
                        (selectedEngine?.score ?? 100) < 60 ? 'text-amber-400' : 'text-emerald-400'
                      }`}>
                        {(selectedEngine?.score ?? 100) < 60 ? 'Critical Constraint' : 'Highly Optimized'}
                      </span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Simulated Intelligence Summary Footer */}
              <div className="bg-slate-950 px-5 py-3.5 border-t border-slate-850 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>NARRATIVE INTERPRETATION SYSTEM ONLINE</span>
                </div>
                <span className="text-[10px] text-slate-500 uppercase font-medium">BGOS™ CALIBRATION MODULE v1.2</span>
              </div>

            </motion.div>

            {/* Subtle floating background cards to add exquisite McKinsey/Stripe layering depth */}
            <motion.div 
              animate={{ 
                y: [0, -5, 0],
              }}
              transition={{ 
                duration: 5, 
                repeat: Infinity,
                ease: "easeInOut" 
              }}
              className="absolute -top-6 -right-6 h-14 bg-slate-900 border border-slate-800 rounded-lg p-3 shadow-lg hidden md:flex items-center gap-3 z-20 pointer-events-none"
            >
              <div className="h-8 w-8 rounded-full bg-emerald-950/40 border border-emerald-800 text-emerald-400 flex items-center justify-center">
                <TrendingUp className="h-4 w-4" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[8px] font-mono text-slate-500 uppercase font-medium leading-none">REVENUE POTENTIAL</span>
                <span className="text-xs font-bold text-white mt-1">+14.2% Growth Cap</span>
              </div>
            </motion.div>

            <motion.div 
              animate={{ 
                y: [0, 6, 0],
              }}
              transition={{ 
                duration: 6, 
                repeat: Infinity,
                ease: "easeInOut" 
              }}
              className="absolute -bottom-6 -left-6 h-14 bg-slate-900 border border-slate-800 rounded-lg p-3 shadow-lg hidden md:flex items-center gap-3 z-20 pointer-events-none"
            >
              <div className="h-8 w-8 rounded bg-indigo-950/40 border border-indigo-800 text-indigo-400 flex items-center justify-center">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[8px] font-mono text-slate-500 uppercase font-medium leading-none">COMPLIANCE CODE</span>
                <span className="text-xs font-bold text-white mt-1">SECURE // ISO_27001</span>
              </div>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}
