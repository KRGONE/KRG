import React, { useEffect } from 'react';
import { 
  ArrowLeft, 
  Shield, 
  Lock, 
  Eye, 
  Users, 
  FileText, 
  CheckCircle, 
  Clock, 
  Mail, 
  Phone, 
  MapPin, 
  Building,
  Briefcase,
  HelpCircle,
  Smartphone
} from 'lucide-react';
import { COMPANY_CONFIG } from '../config/company';

interface PrivacyPolicyProps {
  onBackToHome: () => void;
}

export default function PrivacyPolicy({ onBackToHome }: PrivacyPolicyProps) {
  // Scroll to top when page mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const businessInfo = {
    name: COMPANY_CONFIG.name,
    tagline: COMPANY_CONFIG.tagline,
    legalEntity: COMPANY_CONFIG.legalEntity,
    founder: COMPANY_CONFIG.founder,
    website: COMPANY_CONFIG.website,
    email: COMPANY_CONFIG.email,
    phone: COMPANY_CONFIG.phone,
    address: COMPANY_CONFIG.addressLines
  };

  const collectedFields = [
    { label: 'Name', desc: 'Helps us address you properly during our communication.' },
    { label: 'Designation', desc: 'Helps us understand your role and responsibility within the company.' },
    { label: 'Company Name', desc: 'Helps us identify your business entity for the assessment.' },
    { label: 'Business Email', desc: 'Used to communicate with you regarding your diagnostic request and our services.' },
    { label: 'Mobile Number', desc: 'Used to contact you directly for scheduling or sharing quick updates.' },
    { label: 'State & City', desc: 'Helps us understand where your business operates.' },
    { label: 'Industry', desc: 'Helps us understand your specific market sector.' },
    { label: 'Company Website', desc: 'Helps us learn more about your business and digital presence.' },
    { label: 'Number of Employees', desc: 'Helps us understand the size of your team and organization.' },
    { label: 'Annual Revenue', desc: 'Helps us understand the size of your business and provide more relevant recommendations.' },
    { label: 'Business Stage', desc: 'Helps us identify whether your business is in the startup, growth, or scaling stage.' },
    { label: 'Business Challenges', desc: 'Helps us identify the exact areas where your business needs help.' },
    { label: 'Voluntary Details', desc: 'Any additional information you voluntarily share to help us better understand your situation.' },
  ];

  const usagePoints = [
    { 
      title: 'Business Growth Diagnostic™', 
      desc: 'Conducting calls to understand your business and identify growth opportunities.',
      icon: <Briefcase className="h-5 w-5 text-indigo-600" />
    },
    { 
      title: 'Business Growth Assessment™', 
      desc: 'Analyzing your answers to calculate your business performance and growth scores.',
      icon: <FileText className="h-5 w-5 text-indigo-600" />
    },
    { 
      title: 'Business Consulting', 
      desc: 'Providing customized advice, growth frameworks, and actionable strategies for your business.',
      icon: <Users className="h-5 w-5 text-indigo-600" />
    },
    { 
      title: 'Customer Communication & Support', 
      desc: 'Sending booking confirmations, sharing diagnostic reports, and responding to your messages.',
      icon: <Mail className="h-5 w-5 text-indigo-600" />
    },
    { 
      title: 'Platform Improvement', 
      desc: 'Improving our assessment tools, website usability, and consulting templates.',
      icon: <Clock className="h-5 w-5 text-indigo-600" />
    },
    { 
      title: 'Responding to Enquiries', 
      desc: 'Answering your questions, support tickets, and general enquiries.',
      icon: <HelpCircle className="h-5 w-5 text-indigo-600" />
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-800 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* Decorative Top Accent line */}
      <div className="h-1.5 w-full bg-gradient-to-r from-indigo-500 via-slate-950 to-indigo-600"></div>

      {/* Hero Header Block */}
      <header className="bg-white border-b border-slate-200/80 py-16 sm:py-24 relative overflow-hidden">
        {/* Subtle decorative mesh background */}
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
            <defs>
              <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-pattern)" />
          </svg>
        </div>

        <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-slate-500 hover:text-indigo-600 transition-colors mb-8 cursor-pointer group focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-lg p-1"
            id="back-to-home-privacy-top"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
            Back to Platform Sandbox
          </button>

          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-indigo-700 font-mono text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full w-fit">
                <Shield className="h-3.5 w-3.5" /> Security & Trust Compliance
              </div>
              <img
                src={COMPANY_CONFIG.logoPath}
                alt={`${COMPANY_CONFIG.name} Logo`}
                referrerPolicy="no-referrer"
                className="h-10 w-auto object-contain"
              />
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 font-sans leading-tight">
              Privacy Policy
            </h1>
            
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl leading-relaxed font-medium">
              Your privacy and your business information are important to us. We are committed to protecting your information through professional security practices and responsible data management.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 pt-3 border-t border-slate-100 mt-6 max-w-fit">
              <span className="flex items-center gap-1.5 font-semibold text-slate-500">
                <Clock className="h-3.5 w-3.5 text-slate-400" />
                Last Updated: July 2026
              </span>
              <span className="text-slate-300">|</span>
              <span>Version: 1.0</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Reading Canvas */}
      <main className="max-w-4xl mx-auto px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-16 items-start">
          
          {/* Left Anchor/TOC - Sticky sidebar */}
          <aside className="lg:col-span-4 lg:sticky lg:top-8 space-y-6">
            
            {/* Quick Navigation Panel */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs">
              <h3 className="text-[10px] font-bold text-slate-400 tracking-wider uppercase font-mono mb-4 border-b border-slate-100 pb-2">
                Policy Outline
              </h3>
              <nav className="space-y-2">
                {[
                  { id: 'introduction', label: '1. Introduction' },
                  { id: 'collection', label: '2. Information We Collect' },
                  { id: 'usage', label: '3. How We Use Information' },
                  { id: 'confidentiality', label: '4. Confidentiality Safeguard' },
                  { id: 'security', label: '5. Data Security Standards' },
                  { id: 'partners', label: '6. Trusted Third Parties' },
                  { id: 'cookies', label: '7. Cookies & Tokens' },
                  { id: 'rights', label: '8. Client & User Rights' },
                  { id: 'children', label: '9. Professional Age Boundary' },
                  { id: 'updates', label: '10. Periodic Updates' },
                  { id: 'contact', label: '11. Contact Enterprise' },
                ].map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="block text-xs font-semibold text-slate-600 hover:text-indigo-600 transition-colors py-1.5 px-2 rounded-lg hover:bg-slate-50"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>

            {/* Quick Advisory Callout */}
            <div className="bg-slate-950 text-white rounded-2xl p-6 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 opacity-5">
                <Lock className="h-32 w-32" />
              </div>
              <div className="space-y-4 relative z-10">
                <span className="font-mono text-[9px] uppercase tracking-widest text-indigo-400 font-bold block">
                  Confidentiality Pledge
                </span>
                <p className="text-xs text-slate-300 leading-relaxed font-medium">
                  We guarantee that your business challenges, revenue details, and growth plans will be treated with absolute confidentiality and will never be shared with competitors.
                </p>
                <div className="text-[10px] text-slate-400 font-mono pt-3 border-t border-slate-900">
                  Protected by SSL Encryption
                </div>
              </div>
            </div>

          </aside>

          {/* Right Reading Column - Constrained to 850px max total width, very clear typography */}
          <div className="lg:col-span-8 space-y-16">
            
            {/* Section 1: Introduction */}
            <section id="introduction" className="space-y-4 scroll-mt-6">
              <div className="flex items-center gap-2">
                <span className="h-6 w-1 rounded-full bg-indigo-600 block"></span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                  1. Introduction
                </h2>
              </div>
              <p className="text-slate-600 leading-relaxed text-[15px] sm:text-base font-medium">
                At <strong>{businessInfo.name}</strong>, operated by <strong>{businessInfo.legalEntity}</strong>, we respect your privacy and value your business information. We are committed to protecting your details and using them responsibly through professional security practices and responsible data management.
              </p>
              <p className="text-slate-600 leading-relaxed text-[15px] sm:text-base font-medium">
                This Privacy Policy explains how we collect, protect, and use the information shared through our Business Growth Diagnostic™ forms, online assessments, and consulting services. When you use our services, we make sure your information is handled with the highest level of care and confidentiality.
              </p>
            </section>

            <hr className="border-slate-200" />

            {/* Section 2: Information We Collect */}
            <section id="collection" className="space-y-6 scroll-mt-6">
              <div className="flex items-center gap-2">
                <span className="h-6 w-1 rounded-full bg-indigo-600 block"></span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                  2. Information We Collect
                </h2>
              </div>
              <p className="text-slate-600 leading-relaxed text-[15px] sm:text-base font-medium">
                To create custom growth roadmaps, calculate accurate scores for your assessment, and provide professional advice, we collect standard business details. This includes information you voluntarily share when you fill out our forms or register for a call:
              </p>
              
              {/* Table of collected data */}
              <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-2xs">
                <div className="grid grid-cols-3 bg-slate-50 border-b border-slate-200 p-3.5 text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
                  <div className="col-span-1">Data Field</div>
                  <div className="col-span-2">Purpose</div>
                </div>
                <div className="divide-y divide-slate-100">
                  {collectedFields.map((field, idx) => (
                    <div key={idx} className="grid grid-cols-3 p-3.5 text-xs sm:text-sm items-center hover:bg-slate-50/50 transition-colors">
                      <div className="col-span-1 font-bold text-slate-800">{field.label}</div>
                      <div className="col-span-2 text-slate-600 font-medium">{field.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <hr className="border-slate-200" />

            {/* Section 3: How We Use Your Information */}
            <section id="usage" className="space-y-6 scroll-mt-6">
              <div className="flex items-center gap-2">
                <span className="h-6 w-1 rounded-full bg-indigo-600 block"></span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                  3. How We Use Your Information
                </h2>
              </div>
              <p className="text-slate-600 leading-relaxed text-[15px] sm:text-base font-medium">
                We only use your information to provide professional consulting and growth advisory services. Specifically, we use your details for:
              </p>

              {/* Grid of uses */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {usagePoints.map((item, idx) => (
                  <div key={idx} className="p-5 bg-white border border-slate-200/85 rounded-xl space-y-2.5 shadow-3xs hover:border-slate-300 transition-colors">
                    <div className="p-2 bg-indigo-50 text-indigo-700 rounded-lg max-w-fit">
                      {item.icon}
                    </div>
                    <h4 className="text-sm font-bold text-slate-950 font-sans tracking-tight">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed font-medium">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <hr className="border-slate-200" />

            {/* Section 4: Business Information Confidentiality - CRITICAL HIGHLIGHT BOX */}
            <section id="confidentiality" className="space-y-6 scroll-mt-6">
              <div className="flex items-center gap-2">
                <span className="h-6 w-1 rounded-full bg-indigo-600 block"></span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                  4. Business Information Confidentiality
                </h2>
              </div>
              
              <div className="bg-gradient-to-br from-indigo-950 via-slate-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 space-y-6 relative overflow-hidden shadow-md">
                <div className="absolute top-0 right-0 transform translate-x-6 -translate-y-6 opacity-5 pointer-events-none">
                  <Shield className="h-44 w-44 text-white" />
                </div>
                
                <div className="flex items-center gap-2.5">
                  <span className="h-2 w-2 rounded-full bg-indigo-400"></span>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-indigo-300 font-extrabold">
                    Corporate Non-Disclosure Affirmation
                  </span>
                </div>

                {/* Mandated statement in premium typography styling */}
                <p className="text-base sm:text-lg font-medium leading-relaxed text-slate-100 font-sans tracking-tight border-l-2 border-indigo-500 pl-4 sm:pl-6 italic">
                  "{COMPANY_CONFIG.name} understands that business information is highly confidential. Any operational, financial, strategic or organisational information shared with us during assessments, diagnostic requests or consulting engagements will be treated as confidential. We use this information solely for providing our professional consulting services. We do not sell, rent or disclose client business information to any third party except where required by applicable law or with the client's explicit permission."
                </p>

                <div className="flex items-center gap-2 text-xs font-mono text-slate-400 pt-4 border-t border-slate-900">
                  <Lock className="h-4 w-4 text-indigo-400" />
                  <span>Professional Data Protection Standards</span>
                </div>
              </div>
            </section>

            <hr className="border-slate-200" />

            {/* Section 5: Data Security */}
            <section id="security" className="space-y-4 scroll-mt-6">
              <div className="flex items-center gap-2">
                <span className="h-6 w-1 rounded-full bg-indigo-600 block"></span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                  5. Data Security
                </h2>
              </div>
              <p className="text-slate-600 leading-relaxed text-[15px] sm:text-base font-medium">
                We use reasonable technical and organizational security measures to protect your information from unauthorized access, loss, or alteration. All information you submit is encrypted in transit and stored securely.
              </p>
              <p className="text-slate-600 leading-relaxed text-[15px] sm:text-base font-medium">
                While we take professional steps to secure your information, no system is completely immune to security risks. We encourage you to safeguard your personal devices and email accounts when interacting with us.
              </p>
            </section>

            <hr className="border-slate-200" />

            {/* Section 6: Third Party Services */}
            <section id="partners" className="space-y-4 scroll-mt-6">
              <div className="flex items-center gap-2">
                <span className="h-6 w-1 rounded-full bg-indigo-600 block"></span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                  6. Third Party Services
                </h2>
              </div>
              <p className="text-slate-600 leading-relaxed text-[15px] sm:text-base font-medium">
                To deliver our services reliably, we work with trusted technology partners who assist us with website hosting and email delivery. These service providers only process your information to carry out specific tasks on our behalf, like sending booking confirmation emails, and they are committed to protecting your privacy.
              </p>
            </section>

            <hr className="border-slate-200" />

            {/* Section 7: Cookies */}
            <section id="cookies" className="space-y-4 scroll-mt-6">
              <div className="flex items-center gap-2">
                <span className="h-6 w-1 rounded-full bg-indigo-600 block"></span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                  7. Cookies
                </h2>
              </div>
              <p className="text-slate-600 leading-relaxed text-[15px] sm:text-base font-medium">
                We keep things simple. Our website only uses essential cookies that are necessary for the website to function properly and to provide you with a smooth user experience. We do not use intrusive tracking cookies.
              </p>
            </section>

            <hr className="border-slate-200" />

            {/* Section 8: User Rights */}
            <section id="rights" className="space-y-4 scroll-mt-6">
              <div className="flex items-center gap-2">
                <span className="h-6 w-1 rounded-full bg-indigo-600 block"></span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                  8. User Rights
                </h2>
              </div>
              <p className="text-slate-600 leading-relaxed text-[15px] sm:text-base font-medium">
                You have full control over your information. You may contact us at any time to request:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                {[
                  { title: 'Access', body: 'Request a copy of the information you have submitted to us.', icon: <Eye className="h-4 w-4" /> },
                  { title: 'Correction', body: 'Update or correct any incorrect business details, contact numbers, or email addresses.', icon: <CheckCircle className="h-4 w-4" /> },
                  { title: 'Deletion', body: 'Request us to permanently delete your information and completed reports from our systems.', icon: <Lock className="h-4 w-4" /> },
                ].map((right, i) => (
                  <div key={i} className="p-4 bg-white border border-slate-200 rounded-xl space-y-2">
                    <div className="flex items-center gap-2 text-indigo-700 font-bold text-sm">
                      <span className="p-1 bg-indigo-50 rounded-md">{right.icon}</span>
                      {right.title}
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed font-medium">{right.body}</p>
                  </div>
                ))}
              </div>
              <p className="text-slate-600 leading-relaxed text-[13px] font-medium pt-2">
                To make any of these requests, please email our team directly at <a href={`mailto:${businessInfo.email}`} className="text-indigo-600 hover:underline font-semibold">{businessInfo.email}</a>.
              </p>
            </section>

            <hr className="border-slate-200" />

            {/* Section 9: Children's Privacy */}
            <section id="children" className="space-y-4 scroll-mt-6">
              <div className="flex items-center gap-2">
                <span className="h-6 w-1 rounded-full bg-indigo-600 block"></span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                  9. Children's Privacy
                </h2>
              </div>
              <p className="text-slate-600 leading-relaxed text-[15px] sm:text-base font-medium bg-slate-100 border border-slate-200/60 p-5 rounded-xl">
                Our services are intended for business owners, entrepreneurs, executives and professionals who are 18 years of age or older. We do not knowingly collect information from children under 18.
              </p>
            </section>

            <hr className="border-slate-200" />

            {/* Section 10: Changes to this Privacy Policy */}
            <section id="updates" className="space-y-4 scroll-mt-6">
              <div className="flex items-center gap-2">
                <span className="h-6 w-1 rounded-full bg-indigo-600 block"></span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                  10. Changes to this Privacy Policy
                </h2>
              </div>
              <p className="text-slate-600 leading-relaxed text-[15px] sm:text-base font-medium">
                We may update this Privacy Policy from time to time. The latest version will always be available on our website, and we will update the version and date at the top of the page whenever changes are made.
              </p>
            </section>

            <hr className="border-slate-200" />

            {/* Section 11: Contact Us & Business Info Card */}
            <section id="contact" className="space-y-6 scroll-mt-6">
              <div className="flex items-center gap-2">
                <span className="h-6 w-1 rounded-full bg-indigo-600 block"></span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                  11. Contact Us
                </h2>
              </div>
              <p className="text-slate-600 leading-relaxed text-[15px] sm:text-base font-medium">
                For security audits, data access requests, or specific queries regarding our confidential storage practices, contact the {COMPANY_CONFIG.name} enterprise desk:
              </p>

              {/* Grid of Contact Elements */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Contact Card */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-3xs space-y-4">
                  <div className="flex flex-col">
                    <span className="text-base font-extrabold text-slate-900 tracking-tight font-sans">
                      {businessInfo.name}
                    </span>
                    <span className="text-[10px] font-mono tracking-wider text-slate-400 uppercase font-semibold leading-none mt-1">
                      {businessInfo.tagline}
                    </span>
                  </div>

                  <div className="space-y-3 text-xs sm:text-sm pt-2">
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 bg-slate-100 text-slate-500 rounded-lg shrink-0">
                        <Building className="h-4 w-4" />
                      </div>
                      <span className="text-slate-700 font-semibold">{businessInfo.legalEntity}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 bg-slate-100 text-slate-500 rounded-lg shrink-0">
                        <Users className="h-4 w-4" />
                      </div>
                      <span className="text-slate-600 font-semibold">Founder: {businessInfo.founder}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 bg-indigo-50 text-indigo-700 rounded-lg shrink-0">
                        <Mail className="h-4 w-4" />
                      </div>
                      <a href={`mailto:${businessInfo.email}`} className="text-indigo-600 hover:underline font-bold">
                        {businessInfo.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 bg-indigo-50 text-indigo-700 rounded-lg shrink-0">
                        <Phone className="h-4 w-4" />
                      </div>
                      <a href={`tel:${businessInfo.phone.replace(/\s+/g, '')}`} className="text-slate-700 font-bold hover:text-indigo-600 transition-colors">
                        {businessInfo.phone}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Address Card */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-3xs space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-slate-400 font-bold border-b border-slate-100 pb-2">
                    <MapPin className="h-4 w-4 text-slate-400" />
                    Registrar Address
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-slate-600 leading-relaxed space-y-1 py-1">
                    {businessInfo.address.map((line, index) => (
                      <p key={index}>{line}</p>
                    ))}
                  </div>
                  <div className="text-[10px] text-indigo-600 font-mono font-bold bg-indigo-50 px-3 py-1.5 rounded-lg inline-block">
                    Inbound Jurisdiction: Jaipur, India
                  </div>
                </div>

              </div>
            </section>

          </div>

        </div>

        {/* Lower Navigation Button Row */}
        <div className="border-t border-slate-200 mt-20 pt-10 flex justify-center">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 bg-slate-900 text-white hover:bg-slate-850 px-6 py-3 rounded-xl shadow-xs hover:shadow-sm transition-all text-xs font-mono uppercase tracking-widest font-bold cursor-pointer active:scale-98 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2"
            id="back-to-home-privacy-bottom"
          >
            <ArrowLeft className="h-4 w-4" /> Return to Sandbox Home
          </button>
        </div>

      </main>

      {/* Embedded Specific Minimalist Footer to reinforce standards */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 text-center">
        <div className="max-w-4xl mx-auto px-6 space-y-4">
          <div className="flex justify-center mb-4">
            <img
              src={COMPANY_CONFIG.logoPath}
              alt={`${COMPANY_CONFIG.name} Logo`}
              referrerPolicy="no-referrer"
              className="h-8 w-auto object-contain brightness-95"
            />
          </div>
          <p className="text-[11px] font-mono tracking-widest uppercase text-indigo-400 font-bold">
            {COMPANY_CONFIG.taglineMeasure}
          </p>
          <p className="text-[11px] font-mono tracking-wider uppercase text-slate-400 font-semibold">
            {COMPANY_CONFIG.taglineTurning}
          </p>
          <div className="text-xs text-slate-500 font-medium pt-2">
            © 2026 {COMPANY_CONFIG.name}. All Rights Reserved.
          </div>
        </div>
      </footer>

    </div>
  );
}
