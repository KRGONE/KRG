import React, { useState } from 'react';
import { COMPANY_CONFIG } from '../config/company';
import { 
  getBookingConfirmationEmail 
} from '../emails/bookingConfirmation';
import { 
  getAdminNotificationEmail 
} from '../emails/adminNotification';
import { 
  getAssessmentCompletedEmail 
} from '../emails/assessmentCompleted';
import { 
  getExecutiveReportEmail 
} from '../emails/executiveReport';
import { 
  Mail, 
  Eye, 
  Code, 
  Layers, 
  CheckCircle, 
  ArrowLeft,
  ChevronRight,
  Sparkles,
  Clipboard,
  Smartphone,
  Monitor
} from 'lucide-react';

interface EmailTemplatePreviewProps {
  onBackToHome: () => void;
}

export default function EmailTemplatePreview({ onBackToHome }: EmailTemplatePreviewProps) {
  const [activeTemplate, setActiveTemplate] = useState<'confirmation' | 'admin' | 'assessment' | 'report'>('confirmation');
  const [viewMode, setViewMode] = useState<'preview' | 'code'>('preview');
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [copied, setCopied] = useState(false);

  // Sample data to hydrate placeholders
  const sampleData = {
    customerName: 'Aman Shrivastav',
    designation: 'CEO & Founder',
    companyName: 'Shrivastav Technologies Private Limited',
    companyWebsite: 'https://www.shrivastavtech.in',
    businessEmail: 'aman@shrivastavtech.in',
    mobileNumber: '9876543210',
    state: 'Maharashtra',
    city: 'Mumbai',
    industry: 'Technology & Software',
    employees: '11 - 50 employees',
    annualRevenue: '₹5 Crore – ₹10 Crore',
    businessStage: 'Scaling Business',
    preferredContactMethod: 'WhatsApp',
    biggestChallenge: 'Marketing & Lead Generation',
    additionalInfo: 'Looking to optimize our digital campaigns and improve sales team consistency across India.',
    submissionDate: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
    submissionTime: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    
    // Assessment & Report specifics
    businessGrowthScore: '78',
    growthSummary: 'Strong execution fundamentals with a defined product-market fit, but lacking structured marketing automation rhythms and operational documentation metrics.',
    topStrengths: 'Solid core product, high leadership alignment, high customer retention metrics.',
    topImprovementAreas: 'Marketing scalability, high reliance on manual processes, loose governance controls.',
    dashboardUrl: 'https://platform.krgone.com/dashboard/demo-123',
    downloadUrl: 'https://platform.krgone.com/reports/download/secure-pdf-123',
    bookingUrl: 'https://platform.krgone.com/sessions/book/aman-shrivastav'
  };

  const getActiveHtml = () => {
    switch (activeTemplate) {
      case 'confirmation':
        return getBookingConfirmationEmail(sampleData);
      case 'admin':
        return getAdminNotificationEmail(sampleData);
      case 'assessment':
        return getAssessmentCompletedEmail(sampleData);
      case 'report':
        return getExecutiveReportEmail(sampleData);
      default:
        return '';
    }
  };

  const activeHtml = getActiveHtml();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(activeHtml);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const templates = [
    { 
      id: 'confirmation', 
      title: 'Customer Booking Confirmation', 
      desc: 'Immediate reply with registration summary & custom roadmap',
      icon: <Mail className="h-5 w-5 text-indigo-600" /> 
    },
    { 
      id: 'admin', 
      title: 'Admin Lead Intake Notification', 
      desc: 'Instant internal alert with deep organizational metadata',
      icon: <Layers className="h-5 w-5 text-indigo-600" /> 
    },
    { 
      id: 'assessment', 
      title: 'Maturity Assessment Completed', 
      desc: 'Scores customer KPIs and maps critical growth insights',
      icon: <Sparkles className="h-5 w-5 text-indigo-600" /> 
    },
    { 
      id: 'report', 
      title: 'Executive PDF Report Delivery', 
      desc: 'Delivers high-trust PDF summary with strategic session triggers',
      icon: <CheckCircle className="h-5 w-5 text-indigo-600" /> 
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Action Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-200">
          <div>
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-slate-600 hover:text-slate-900 transition-colors mb-3 cursor-pointer"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Back to Platform
            </button>
            <h1 className="text-3xl font-black text-slate-900 font-sans tracking-tight">
              {COMPANY_CONFIG.name}™ Email Blueprint System
            </h1>
            <p className="text-sm text-slate-600 mt-1 font-medium">
              Interactive design blueprints optimized for Gmail, Apple Mail, and Outlook.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={copyToClipboard}
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 py-3 px-5 rounded-xl shadow-xs transition-all active:scale-98 cursor-pointer font-bold"
            >
              <Clipboard className="h-4 w-4 text-slate-600" />
              {copied ? 'Copied HTML!' : 'Copy Raw HTML'}
            </button>
          </div>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Panel: Template Selectors */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs">
              <h3 className="text-xs font-extrabold text-slate-400 tracking-wider uppercase font-mono mb-4 px-1">
                SELECT EMAIL BLUEPRINT
              </h3>
              
              <div className="space-y-3">
                {templates.map(t => (
                  <button
                    key={t.id}
                    onClick={() => {
                      setActiveTemplate(t.id as any);
                    }}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-start gap-4 cursor-pointer relative ${
                      activeTemplate === t.id
                        ? 'bg-slate-900 border-slate-900 text-white shadow-sm'
                        : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700 hover:text-slate-900'
                    }`}
                  >
                    <div className={`p-2.5 rounded-lg shrink-0 ${
                      activeTemplate === t.id ? 'bg-slate-800 text-white' : 'bg-slate-100'
                    }`}>
                      {t.icon}
                    </div>
                    <div className="space-y-0.5">
                      <div className="text-sm font-extrabold tracking-tight leading-tight">
                        {t.title}
                      </div>
                      <div className={`text-[11px] leading-relaxed font-medium ${
                        activeTemplate === t.id ? 'text-slate-350' : 'text-slate-500'
                      }`}>
                        {t.desc}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Design Guideline Details */}
            <div className="bg-slate-900 text-white border border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-indigo-400"></span>
                <span className="text-xs font-mono uppercase tracking-widest text-indigo-300 font-bold">
                  Email Engine Spec v1.0
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                Every layout is developed with inline tables to preserve pixel-perfect alignments across cross-platform email managers. Compatible with Nodemailer, AWS SES, Resend, and Microsoft 365.
              </p>
              <div className="text-[10px] font-mono text-slate-400 border-t border-slate-800 pt-3 mt-3">
                Score: 99/100 Mobile Responsiveness index
              </div>
            </div>
          </div>

          {/* Right Panel: Interactive Canvas & Toggle Controls */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Control Bar */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs flex flex-wrap items-center justify-between gap-4">
              <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200/50">
                <button
                  onClick={() => setViewMode('preview')}
                  className={`inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-lg transition-all cursor-pointer ${
                    viewMode === 'preview'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Eye className="h-3.5 w-3.5" /> Live Preview
                </button>
                <button
                  onClick={() => setViewMode('code')}
                  className={`inline-flex items-center gap-1.5 text-xs font-bold px-4 py-2 rounded-lg transition-all cursor-pointer ${
                    viewMode === 'code'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Code className="h-3.5 w-3.5" /> Source Code
                </button>
              </div>

              {viewMode === 'preview' && (
                <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200/50">
                  <button
                    onClick={() => setPreviewDevice('desktop')}
                    className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                      previewDevice === 'desktop'
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Monitor className="h-3.5 w-3.5" /> Desktop
                  </button>
                  <button
                    onClick={() => setPreviewDevice('mobile')}
                    className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                      previewDevice === 'mobile'
                        ? 'bg-white text-slate-900 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    <Smartphone className="h-3.5 w-3.5" /> Mobile (600px max)
                  </button>
                </div>
              )}
            </div>

            {/* Main Interactive Screen */}
            <div className="bg-slate-200 border border-slate-300 rounded-3xl overflow-hidden p-4 sm:p-8 flex justify-center shadow-xs">
              
              {viewMode === 'preview' ? (
                <div 
                  className={`bg-slate-100 border border-slate-300 rounded-2xl overflow-hidden shadow-md transition-all duration-350 ${
                    previewDevice === 'mobile' ? 'max-w-[420px] w-full' : 'w-full'
                  }`}
                  style={{ height: '700px' }}
                >
                  <iframe
                    title="Live Email Preview"
                    srcDoc={activeHtml}
                    className="w-full h-full border-none bg-white"
                  />
                </div>
              ) : (
                <div className="w-full bg-slate-900 text-slate-300 p-5 rounded-2xl font-mono text-xs overflow-auto leading-relaxed border border-slate-800" style={{ maxHeight: '700px' }}>
                  <pre className="whitespace-pre-wrap select-all">{activeHtml}</pre>
                </div>
              )}

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
