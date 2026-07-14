/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Navigation Types
 */
export interface NavItem {
  label: string;
  href: string;
  id: string;
}

export type PageId =
  | 'home'
  | 'assessment'
  | 'solutions'
  | 'platform'
  | 'frameworks'
  | 'why-krgone'
  | 'resources'
  | 'about'
  | 'contact'
  | 'book-diagnostic'
  | 'email-templates'
  | 'privacy';

/**
 * Seven Growth Engines Structure
 */
export type GrowthEngineId =
  | 'market'
  | 'sales'
  | 'operations'
  | 'finance'
  | 'talent'
  | 'technology'
  | 'leadership';

export interface GrowthEngine {
  id: GrowthEngineId;
  name: string;
  description: string;
  iconName: string;
}

/**
 * Maturity Assessment Types
 */
export type MaturityLevel = 'Initial' | 'Emerging' | 'Scaling' | 'Optimized' | 'Enterprise';

export interface AssessmentQuestion {
  id: string;
  engineId: GrowthEngineId;
  question: string;
  description: string;
  options: {
    score: number;
    text: string;
    description?: string;
  }[];
}

export interface AssessmentScore {
  overallScore: number; // 0 to 100
  engineScores: Record<GrowthEngineId, number>; // scores mapped by engine
  maturityLevel: MaturityLevel;
  recommendations: string[];
}

export interface AssessmentResponse {
  answers: Record<string, number>; // questionId -> chosen option score
  currentQuestionIndex: number;
  isComplete: boolean;
  scoreResult?: AssessmentScore;
}

/**
 * Diagnostic Booking Request Type
 */
export interface DiagnosticBooking {
  fullName: string;
  email: string;
  companyName: string;
  companySize: string;
  revenueRange: string;
  growthChallenge: string;
  preferredDate: string;
  preferredTime: string;
  isBooked: boolean;
}
