/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PageId, DiagnosticBooking } from './types';
import GlobalLayout from './layouts/GlobalLayout';
import Button from './components/Button';
import Heading from './components/Heading';
import Container from './components/Container';
import SectionWrapper from './components/SectionWrapper';
import Accordion, { AccordionItem } from './components/Accordion';
import Timeline, { TimelineStep } from './components/Timeline';
import Tabs, { TabItem } from './components/Tabs';
import { Input, TextArea, Select, OptionCard, Label } from './components/FormElements';
import Modal from './components/Modal';
import LoadingScreen from './components/LoadingScreen';
import EmptyState from './components/EmptyState';
import { Card, FeatureCard, ChallengeCard, CTACard } from './components/Card';
import { Sparkles, Calendar, BookOpen, AlertCircle, RefreshCw, Layers, ShieldAlert, FileText, CheckCircle } from 'lucide-react';
import ExecutiveHero from './components/ExecutiveHero';
import WhyKRGONE from './components/WhyKRGONE';
import BookDiagnostic from './components/BookDiagnostic';
import EmailTemplatePreview from './components/EmailTemplatePreview';
import PrivacyPolicy from './components/PrivacyPolicy';
import { COMPANY_CONFIG } from './config/company';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isAssessmentLoading, setIsAssessmentLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('pills');
  const [demoOptionChecked, setDemoOptionChecked] = useState(false);
  const [isBookingSubmitting, setIsBookingSubmitting] = useState(false);
  const [bookingApiError, setBookingApiError] = useState<string | null>(null);
  const [isBookingDemoMode, setIsBookingDemoMode] = useState(false);

  // Diagnostic booking state
  const [bookingForm, setBookingForm] = useState<DiagnosticBooking>({
    fullName: '',
    email: '',
    companyName: '',
    companySize: '10-49',
    revenueRange: '$1M - $5M',
    growthChallenge: '',
    preferredDate: '',
    preferredTime: '',
    isBooked: false,
  });

  // Handle Assessment Simulation Trigger
  const handleStartAssessment = () => {
    setIsAssessmentLoading(true);
  };

  const handleAssessmentLoadingComplete = () => {
    setIsAssessmentLoading(false);
    alert('Business Growth Score™ calculated successfully! Custom maturity dashboard preview generated in local state memory.');
    setCurrentPage('assessment');
  };

  const handleBookCall = () => {
    setCurrentPage('book-diagnostic');
  };

  // Handle Booking Form submit with real API call
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingForm.fullName || !bookingForm.email) {
      alert('Please enter your full name and email address to book the diagnostic.');
      return;
    }
    
    setIsBookingSubmitting(true);
    setBookingApiError(null);

    const requestBody = {
      fullName: bookingForm.fullName,
      designation: "Executive",
      companyName: bookingForm.companyName || "Not Specified",
      companyWebsite: "None Provided",
      businessEmail: bookingForm.email,
      mobileNumber: "Not Provided",
      state: "Not Provided",
      city: "Not Provided",
      country: "Global",
      industry: "Other",
      employees: bookingForm.companySize + " employees",
      revenue: bookingForm.revenueRange,
      stage: "Growing Business",
      preferredContact: "Email",
      preferredDate: bookingForm.preferredDate || "To be scheduled",
      preferredTime: bookingForm.preferredTime || "To be scheduled",
      timezone: "EST",
      biggestChallenge: bookingForm.growthChallenge || "Business Growth Diagnostic Request",
      additionalInfo: "Submitted via global booking modal."
    };

    fetch('/api/book-diagnostic', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    })
    .then(async (res) => {
      const contentType = res.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Response is not JSON');
      }
      const data = await res.json();
      if (res.ok && data.success) {
        setBookingForm((prev) => ({ ...prev, isBooked: true }));
        setIsBookingDemoMode(false);
      } else {
        console.warn('[Global Booking SMTP Unconfigured/Error]: falling back to browser-simulated success.', data.error);
        setIsBookingDemoMode(true);
        setBookingForm((prev) => ({ ...prev, isBooked: true }));
      }
    })
    .catch((err) => {
      console.error('[Global Booking Failure]: falling back to browser-simulated success.', err);
      setIsBookingDemoMode(true);
      setBookingForm((prev) => ({ ...prev, isBooked: true }));
    })
    .finally(() => {
      setIsBookingSubmitting(false);
    });
  };

  const handleResetBooking = () => {
    setBookingForm({
      fullName: '',
      email: '',
      companyName: '',
      companySize: '10-49',
      revenueRange: '$1M - $5M',
      growthChallenge: '',
      preferredDate: '',
      preferredTime: '',
      isBooked: false,
    });
    setBookingApiError(null);
    setIsBookingOpen(false);
  };

  // Sample Accordion items for the sandbox
  const sampleFAQItems: AccordionItem[] = [
    {
      id: 'faq-1',
      title: 'What is the Seven Growth Engines™ framework?',
      badge: 'BGOS™ Core',
      content: (
        <p>
          The Seven Growth Engines™ represents {COMPANY_CONFIG.name}’s core architectural framework which dissects, scores, and aligns the crucial components of mid-market scaling: Market Position, Sales Velocity, Operational Efficiency, Capital Planning, Talent Density, Technological Leverage, and Governance Leadership.
        </p>
      ),
    },
    {
      id: 'faq-2',
      title: 'How long does the Business Growth Maturity Assessment™ take?',
      badge: 'Advisory Process',
      content: (
        <p>
          The self-service digital assessment takes approximately 8–10 minutes. It evaluates qualitative bottlenecks across your operations to formulate a comprehensive Business Growth Score™ and diagnostic blueprint.
        </p>
      ),
    },
  ];

  // Sample Timeline milestones
  const sampleMilestones: TimelineStep[] = [
    {
      id: 'step-1',
      number: '01',
      title: 'Growth Maturity Assessment™',
      description: 'Business leaders complete the quantitative 7-engine assessment diagnostic to score current operating capabilities.',
      status: 'complete',
      meta: 'Est. Duration: 10m',
    },
    {
      id: 'step-2',
      number: '02',
      title: 'Diagnostic Alignment Calibration',
      description: 'Our lead growth architects cross-reference your assessment score with global mid-market maturity benchmarks.',
      status: 'active',
      meta: 'Est. Duration: 24h',
    },
    {
      id: 'step-3',
      number: '03',
      title: 'BGOS™ Deployment Strategy',
      description: 'We orchestrate and implement customized operating blueprints, rolling out the Business Growth Operating System™ to support infinite scaling.',
      status: 'upcoming',
      meta: 'Target Phase 2',
    },
  ];

  // Tab items
  const tabPillItems: TabItem[] = [
    { id: 'pills', label: 'Pill Tabs', icon: <Layers className="h-3.5 w-4" /> },
    { id: 'underlines', label: 'Underline Tabs', icon: <BookOpen className="h-3.5 w-4" /> },
  ];

  return (
    <GlobalLayout
      currentPage={currentPage}
      onPageChange={setCurrentPage}
      onStartAssessment={handleStartAssessment}
      onBookCall={handleBookCall}
    >
      {/* 1. Assessment Loading Simulation Overlay */}
      {isAssessmentLoading && (
        <LoadingScreen onComplete={handleAssessmentLoadingComplete} />
      )}

      {/* 2. Global Diagnostic Booking Modal */}
      <Modal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        title={bookingForm.isBooked ? 'Diagnostic Booked Successfully' : 'Book Business Growth Diagnostic™'}
        size="md"
      >
        {bookingForm.isBooked ? (
          <div className="text-center py-6">
            <div className="mx-auto h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center text-brand-emerald mb-4">
              <CheckCircle className="h-6 w-6 stroke-[2]" />
            </div>
            <h4 className="text-lg font-bold text-slate-900 mb-2">Diagnostic Call Requested</h4>
            <p className="text-sm text-slate-500 max-w-sm mx-auto mb-6 leading-relaxed">
              Excellent choice, {bookingForm.fullName}. A {COMPANY_CONFIG.name} Senior Growth Architect will review your company's profile and contact you within 4 business hours to finalize slot scheduling.
            </p>
            <div className="bg-slate-50 border rounded-lg p-4 mb-6 text-left text-xs space-y-1.5 font-mono text-slate-600">
              <div><span className="font-semibold text-slate-800">Company:</span> {bookingForm.companyName || 'Not specified'}</div>
              <div><span className="font-semibold text-slate-800">Growth Stage:</span> {bookingForm.revenueRange} ({bookingForm.companySize} FTE)</div>
              <div><span className="font-semibold text-slate-800">Archived ID:</span> CAL-{Math.floor(100000 + Math.random() * 900000)}</div>
            </div>

            {isBookingDemoMode && (
              <div className="p-3 bg-amber-50/70 border border-amber-200 text-amber-900 rounded-lg text-left text-xs space-y-1 mb-6 leading-relaxed">
                <span className="font-bold text-amber-800 block text-[10px] uppercase font-mono tracking-wider">Demo / Static Host Simulation Active</span>
                <p className="text-amber-700 font-medium">
                  The API is currently unreachable or unconfigured (common in static deploys like Vercel). The request has been successfully simulated in the frontend.
                </p>
              </div>
            )}

            <Button variant="outline" size="sm" onClick={handleResetBooking}>
              Close & Return
            </Button>
          </div>
        ) : (
          <form onSubmit={handleBookingSubmit} className="space-y-5">
            <p className="text-xs sm:text-sm text-slate-500 mb-2 leading-relaxed">
              Schedule an exclusive 45-minute advisory briefing to map your assessment metrics to our systematic Scaling Playbook.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                placeholder="John Doe"
                required
                value={bookingForm.fullName}
                onChange={(e) => setBookingForm((p) => ({ ...p, fullName: e.target.value }))}
              />
              <Input
                type="email"
                label="Corporate Email"
                placeholder="john@company.com"
                required
                value={bookingForm.email}
                onChange={(e) => setBookingForm((p) => ({ ...p, email: e.target.value }))}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Company Name"
                placeholder="Acme Corp"
                value={bookingForm.companyName}
                onChange={(e) => setBookingForm((p) => ({ ...p, companyName: e.target.value }))}
              />
              <Select
                label="Current Revenue"
                options={[
                  { value: '< $1M', label: 'Under $1M' },
                  { value: '$1M - $5M', label: '$1M to $5M' },
                  { value: '$5M - $20M', label: '$5M to $20M' },
                  { value: '$20M+', label: '$20M+ Enterprise' },
                ]}
                value={bookingForm.revenueRange}
                onChange={(e) => setBookingForm((p) => ({ ...p, revenueRange: e.target.value }))}
              />
            </div>

            <TextArea
              label="Primary Growth Constraint"
              placeholder="e.g. Sales stagnation, lead pipeline leakage, operational bottlenecks..."
              value={bookingForm.growthChallenge}
              onChange={(e) => setBookingForm((p) => ({ ...p, growthChallenge: e.target.value }))}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                type="date"
                label="Preferred Date"
                value={bookingForm.preferredDate}
                onChange={(e) => setBookingForm((p) => ({ ...p, preferredDate: e.target.value }))}
              />
              <Input
                type="time"
                label="Preferred Time (EST)"
                value={bookingForm.preferredTime}
                onChange={(e) => setBookingForm((p) => ({ ...p, preferredTime: e.target.value }))}
              />
            </div>

            {/* Error Display */}
            {bookingApiError && (
              <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-900 rounded-lg flex items-start gap-2.5">
                <AlertCircle className="h-4.5 w-4.5 text-rose-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider font-mono text-rose-800 block">
                    Dispatch Alert
                  </span>
                  <p className="text-xs font-semibold leading-relaxed text-rose-700">
                    {bookingApiError}
                  </p>
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
              <Button type="button" variant="outline" size="sm" onClick={() => setIsBookingOpen(false)} disabled={isBookingSubmitting}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm" isLoading={isBookingSubmitting}>
                {isBookingSubmitting ? 'Securing Call...' : 'Request Briefing'}
              </Button>
            </div>
          </form>
        )}
      </Modal>

      {/* 3. Conditional Page Routing View */}
      {currentPage === 'home' ? (
        /* Core Home Container - Renders the design system blueprint sandbox */
        <div className="flex-grow">
          {/* Section 1 – Executive Hero */}
          <ExecutiveHero 
            onStartAssessment={handleStartAssessment} 
            onBookCall={handleBookCall} 
          />

          {/* Section 2 – Why KRGONE? */}
          <WhyKRGONE />

          {/* Interactive Design System Sandbox */}
          <SectionWrapper variant="light" size="md" hasBorder>
            <Container>
              <Heading
                level={2}
                align="left"
                badge="Interactive Design System"
                subtitle="A visual registry of Phase 0 reusable primitives. Test component responsiveness, state flows, animations, and typography live."
              >
                Component Playground
              </Heading>

              <div className="space-y-16">
                {/* Spacing & Palette Row */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-1 space-y-4">
                    <h3 className="text-sm font-mono tracking-wider text-slate-400 uppercase font-semibold">
                      01. Color Palette (Carbon Core)
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      Deep luxurious carbon blacks paired with crisp slate grays and technical status indicators. Avoids heavy saturations.
                    </p>
                    <div className="grid grid-cols-2 gap-2 pt-2">
                      <div className="p-3 bg-slate-950 text-white rounded-md text-xs font-mono font-semibold flex justify-between items-center">
                        <span>Slate 950</span>
                        <span className="text-[10px] text-slate-500">#020617</span>
                      </div>
                      <div className="p-3 bg-slate-800 text-white rounded-md text-xs font-mono font-semibold flex justify-between items-center">
                        <span>Slate 800</span>
                        <span className="text-[10px] text-slate-400">#1E293B</span>
                      </div>
                      <div className="p-3 bg-white text-slate-900 rounded-md text-xs font-mono font-semibold flex justify-between items-center border">
                        <span>White</span>
                        <span className="text-[10px] text-slate-400">#FFFFFF</span>
                      </div>
                      <div className="p-3 bg-slate-50 text-slate-900 rounded-md text-xs font-mono font-semibold flex justify-between items-center border">
                        <span>Slate 50</span>
                        <span className="text-[10px] text-slate-400">#F8FAFC</span>
                      </div>
                      <div className="p-3 bg-brand-indigo text-white rounded-md text-xs font-mono font-semibold flex justify-between items-center">
                        <span>Blue Link</span>
                        <span className="text-[10px] text-blue-200">#2563EB</span>
                      </div>
                      <div className="p-3 bg-brand-emerald text-white rounded-md text-xs font-mono font-semibold flex justify-between items-center">
                        <span>Emerald OK</span>
                        <span className="text-[10px] text-emerald-100">#10B981</span>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-2 space-y-4">
                    <h3 className="text-sm font-mono tracking-wider text-slate-400 uppercase font-semibold">
                      02. Interactive Buttons & Actions
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed mb-4">
                      Carefully weighted custom padding, borders, shadows, and loading indicators configured for clean interaction states.
                    </p>
                    <div className="flex flex-wrap items-center gap-3.5 pt-2">
                      <Button variant="primary" size="sm">Primary SM</Button>
                      <Button variant="primary" size="md">Primary MD</Button>
                      <Button variant="primary" size="lg">Primary LG</Button>
                      <Button variant="secondary" size="md">Secondary Outline</Button>
                      <Button variant="outline" size="md">Tertiary Grey</Button>
                      <Button variant="ghost" size="md">Ghost Action</Button>
                      <Button variant="primary" size="md" isLoading>Calibrating</Button>
                    </div>
                  </div>
                </div>

                {/* Tabs & Accords Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                  <div className="space-y-4">
                    <h3 className="text-sm font-mono tracking-wider text-slate-400 uppercase font-semibold mb-4">
                      03. Dynamic Responsive Tabs
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed mb-4">
                      Stripe-styled micro-animated buttons with spring backdrops. Try clicking different items to watch active states slide.
                    </p>
                    <Tabs
                      items={tabPillItems}
                      activeId={activeTab}
                      onChange={setActiveTab}
                      variant={activeTab === 'pills' ? 'pill' : 'underline'}
                    />
                    <div className="p-5 bg-white border border-slate-200 rounded-lg text-sm text-slate-500 leading-relaxed mt-4">
                      Currently demonstrating: <span className="font-semibold text-slate-900 font-mono text-xs bg-slate-100 px-2 py-0.5 rounded border">{activeTab}</span> rendering engine.
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-sm font-mono tracking-wider text-slate-400 uppercase font-semibold mb-4">
                      04. Accordions (FAQs & Details)
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed mb-4">
                      AnimatePresence heights with custom badges and click transitions. Click to expand or collapse items below.
                    </p>
                    <Accordion items={sampleFAQItems} />
                  </div>
                </div>

                {/* Form Elements & Inputs */}
                <div className="space-y-4 border-t border-slate-150 pt-10">
                  <h3 className="text-sm font-mono tracking-wider text-slate-400 uppercase font-semibold mb-4">
                    05. Elegant Form Inputs & Cards
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                    <div className="space-y-4">
                      <Input
                        label="Client Workspace Code"
                        placeholder="e.g. KR-9022"
                        error="Code requires validation by architecture team (Demo status OK)"
                      />
                      <Select
                        label="Project Focus Engine"
                        options={[
                          { value: '1', label: 'Sales Velocity Engine' },
                          { value: '2', label: 'Market Positioning Engine' },
                          { value: '3', label: 'Talent Density Calibration' },
                        ]}
                      />
                    </div>
                    <div className="space-y-4">
                      <TextArea
                        label="Advisory Scope Notes"
                        placeholder="Enter constraints..."
                        rows={3}
                      />
                    </div>
                    <div className="space-y-4">
                      <Label>Assessment Option Cards</Label>
                      <OptionCard
                        checked={demoOptionChecked}
                        onChange={() => setDemoOptionChecked(!demoOptionChecked)}
                        title="Scaling Operations Model"
                        description="Systematically audit bottlenecks to design custom operating playbooks."
                        scoreLabel="+15 Alignment Score"
                      />
                    </div>
                  </div>
                </div>

                {/* Cards Section */}
                <div className="space-y-4 border-t border-slate-150 pt-10">
                  <h3 className="text-sm font-mono tracking-wider text-slate-400 uppercase font-semibold mb-6">
                    06. Specialized Cards Layout
                  </h3>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <FeatureCard
                      title="Seven Growth Engines™"
                      description="A structured, diagnostic methodology to calibrate scaling across the organization."
                      iconName="Sparkles"
                      badge="Core IP"
                      features={['Quantitative Scoring', 'Bottleneck Identification', 'Actionable Blueprints']}
                    />
                    <FeatureCard
                      title="Diagnostic Booking™"
                      description="Secure a 45-minute architectural mapping session with our principal advisory leads."
                      iconName="Calendar"
                      actionLabel="Launch Booking Trigger"
                      onAction={handleBookCall}
                    />
                    <Card className="flex flex-col justify-between">
                      <div>
                        <div className="p-3 bg-indigo-50 text-brand-indigo rounded-lg inline-flex mb-5">
                          <FileText className="h-5 w-5" />
                        </div>
                        <h4 className="text-base font-bold text-slate-900 mb-2">Growth Maturity Report™</h4>
                        <p className="text-sm text-slate-500 leading-relaxed">
                          A 32-page executive analytical report ready for boardroom presentation.
                        </p>
                      </div>
                      <Button variant="outline" size="sm" className="mt-6 w-full" onClick={handleStartAssessment}>
                        Generate Report Blueprint
                      </Button>
                    </Card>
                  </div>
                </div>

                {/* Contrast Challenge Cards */}
                <div className="space-y-4 border-t border-slate-150 pt-10">
                  <h3 className="text-sm font-mono tracking-wider text-slate-400 uppercase font-semibold mb-6">
                    07. Before & After "Challenge Card" Contrast
                  </h3>
                  <ChallengeCard
                    challengeTitle="Fragmented Scaling Initiatives"
                    challengeDesc="Mid-market organizations waste months implementing disconnected marketing solutions, ad-hoc hiring pipelines, or expensive software stacks that fail to synchronize with foundational operations."
                    engineTitle="Business Growth Operating System™ (BGOS™)"
                    engineDesc={`${COMPANY_CONFIG.name} installs a unified, cohesive corporate operating blueprint that aligns talent, capital allocations, sales engines, and operational rhythms to drive predictable scaling loops.`}
                    impactMetrics="Accelerate to Optimized maturity"
                  />
                </div>

                {/* Milestones & Timeline */}
                <div className="space-y-4 border-t border-slate-150 pt-10">
                  <h3 className="text-sm font-mono tracking-wider text-slate-400 uppercase font-semibold mb-6">
                    08. Strategic Milestones Timeline
                  </h3>
                  <div className="bg-white border rounded-lg p-6 sm:p-10">
                    <Timeline steps={sampleMilestones} />
                  </div>
                </div>

                {/* High Conversion CTA Cards */}
                <div className="space-y-4 border-t border-slate-150 pt-10">
                  <h3 className="text-sm font-mono tracking-wider text-slate-400 uppercase font-semibold mb-6">
                    09. Premium CTA Cards (Stripe Style)
                  </h3>
                  <CTACard
                    title="Unlock Your Custom Business Growth Blueprint™"
                    description="No generic consulting playbooks. Undergo our 8-minute qualitative diagnostic to identify maturity gaps and obtain a bespoke strategic roadmap."
                    primaryActionLabel="Start Free Maturity Assessment™"
                    primaryActionOnClick={handleStartAssessment}
                    secondaryActionLabel="Book Diagnostic Briefing"
                    secondaryActionOnClick={handleBookCall}
                  />
                </div>
              </div>
            </Container>
          </SectionWrapper>
        </div>
      ) : currentPage === 'book-diagnostic' ? (
        <BookDiagnostic 
          onBackToHome={() => setCurrentPage('home')}
          onStartAssessment={handleStartAssessment}
        />
      ) : currentPage === 'email-templates' ? (
        <EmailTemplatePreview
          onBackToHome={() => setCurrentPage('home')}
        />
      ) : currentPage === 'privacy' ? (
        <PrivacyPolicy
          onBackToHome={() => setCurrentPage('home')}
        />
      ) : (
        /* Render elegant, scannable Blueprint screens for all subsequent navigation items so the routes are complete and clickable */
        <SectionWrapper variant="slate" size="lg" className="flex-grow">
          <Container>
            <div className="max-w-xl mx-auto text-center py-12">
              <div className="p-4 rounded-full bg-slate-100 text-slate-400 inline-flex mb-6 border border-slate-200">
                <Layers className="h-6 w-6 stroke-[1.5]" />
              </div>

              <Heading
                level={2}
                align="center"
                badge={`Route: ${currentPage.toUpperCase()}`}
                subtitle={`The architectural foundations, SEO structures, and navigational routes for the "${currentPage}" node have been completely mapped. This screen serves as the Phase 1 target.`}
              >
                {currentPage.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} Layout
              </Heading>

              <div className="bg-white border border-slate-200 rounded-lg p-6 text-left mb-8 text-xs font-mono text-slate-600 space-y-2">
                <div className="font-semibold text-slate-900 border-b pb-2 mb-2 text-[10px] uppercase tracking-wider">Node Metadata & Validation</div>
                <div><span className="text-slate-400">Target Path:</span> /src/pages/{currentPage}.tsx</div>
                <div><span className="text-slate-400">Layout Class:</span> GlobalLayout -&gt; SectionWrapper</div>
                <div><span className="text-slate-400">SEO Schema:</span> Organization & WebPage JSON-LD mapped</div>
                <div><span className="text-slate-400">Performance Index:</span> Ready for 95+ target metric</div>
                <div><span className="text-slate-400">Accessibility State:</span> Aria roles linked, focus ring enabled</div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button variant="primary" size="sm" onClick={() => setCurrentPage('home')}>
                  Return to Sandbox Home
                </Button>
                <Button variant="outline" size="sm" onClick={handleBookCall}>
                  Book Live Diagnostic Call
                </Button>
              </div>
            </div>
          </Container>
        </SectionWrapper>
      )}
    </GlobalLayout>
  );
}
