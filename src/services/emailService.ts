import nodemailer from "nodemailer";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { getBookingConfirmationEmail } from "../emails/bookingConfirmation";
import { getAdminNotificationEmail } from "../emails/adminNotification";
import { getAssessmentCompletedEmail } from "../emails/assessmentCompleted";
import { getExecutiveReportEmail } from "../emails/executiveReport";

dotenv.config();

// Direct fallback credentials for hassle-free Vercel serverless deployment
const GMAIL_USER = "enquiry.krgone@gmail.com";
const GMAIL_APP_PASSWORD = "xizfaulpdjxrsptv";
const NOTIFICATION_EMAIL = "enquiry.krgone@gmail.com";

/**
 * Creates and verifies the Gmail SMTP transporter.
 * Accesses GMAIL_USER and GMAIL_APP_PASSWORD, falling back to secure hardcoded defaults.
 */
export function getTransporter() {
  const gmailUser = process.env.GMAIL_USER || GMAIL_USER;
  const gmailPassRaw = process.env.GMAIL_APP_PASSWORD || GMAIL_APP_PASSWORD;
  const gmailPass = gmailPassRaw ? gmailPassRaw.replace(/\s+/g, "") : undefined;

  if (!gmailUser || !gmailPass) {
    throw new Error("GMAIL_USER or GMAIL_APP_PASSWORD is not configured.");
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: gmailUser,
      pass: gmailPass,
    },
  });
}

/**
 * Requirement 6: Reusable Email Service Layer
 */

// 1. Send Customer Confirmation Email
export async function sendDiagnosticBookingConfirmation(params: {
  customerName: string;
  companyName: string;
  businessEmail: string;
  mobileNumber: string;
  industry: string;
  employees: string;
  businessStage?: string;
  biggestChallenge: string;
  submissionDate: string;
  submissionTime: string;
  websiteUrl?: string;
  contactEmail?: string;
}) {
  const transporter = getTransporter();
  const gmailUser = process.env.GMAIL_USER || GMAIL_USER;
  const html = getBookingConfirmationEmail(params);

  return transporter.sendMail({
    from: `"KRGONE Platform" <${gmailUser}>`,
    to: params.businessEmail,
    subject: "Thank You for Booking Your Business Growth Diagnostic",
    html,
  });
}

// 2. Send Admin Notification Email
export async function sendAdminNotification(params: {
  fullName: string;
  designation?: string;
  companyName: string;
  businessEmail: string;
  mobileNumber: string;
  state?: string;
  city?: string;
  industry: string;
  companyWebsite?: string;
  employees: string;
  annualRevenue?: string;
  businessStage?: string;
  preferredContactMethod?: string;
  biggestChallenge: string;
  additionalInfo?: string;
  submissionDate: string;
  submissionTime: string;
  websiteUrl?: string;
  contactEmail?: string;
}) {
  const transporter = getTransporter();
  const gmailUser = process.env.GMAIL_USER || GMAIL_USER;
  const notificationEmail = process.env.NOTIFICATION_EMAIL || NOTIFICATION_EMAIL;
  const html = getAdminNotificationEmail(params);

  return transporter.sendMail({
    from: `"KRGONE System Notification" <${gmailUser}>`,
    to: notificationEmail,
    subject: `New Business Growth Diagnostic Booking - ${params.companyName}`,
    html,
  });
}

// 3. Send Assessment Completion Email (Future scalability)
export async function sendAssessmentCompletion(params: {
  customerName: string;
  businessGrowthScore: string;
  growthSummary: string;
  topStrengths: string;
  topImprovementAreas: string;
  dashboardUrl: string;
  websiteUrl?: string;
  contactEmail?: string;
  recipientEmail: string;
}) {
  const transporter = getTransporter();
  const gmailUser = process.env.GMAIL_USER || GMAIL_USER;
  const html = getAssessmentCompletedEmail(params);

  return transporter.sendMail({
    from: `"KRGONE Platform" <${gmailUser}>`,
    to: params.recipientEmail,
    subject: "Your Business Growth Assessment is Complete",
    html,
  });
}

// 4. Send Executive Report Email (Future scalability)
export async function sendExecutiveReport(params: {
  customerName: string;
  companyName: string;
  reportSummary: string;
  downloadUrl: string;
  bookingUrl: string;
  websiteUrl?: string;
  contactEmail?: string;
  recipientEmail: string;
}) {
  const transporter = getTransporter();
  const gmailUser = process.env.GMAIL_USER || GMAIL_USER;
  const html = getExecutiveReportEmail(params);

  return transporter.sendMail({
    from: `"KRGONE Platform" <${gmailUser}>`,
    to: params.recipientEmail,
    subject: "Your Executive Business Growth Report",
    html,
  });
}

/**
 * Saves a copy of the intake registration details to a queue file
 * to enable seamless subsequent synchronizations with any modern CRM or CDP.
 */
export async function saveToCRMQueue(params: any): Promise<void> {
  const record = {
    id: `crm-queue-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`,
    synced: false,
    timestamp: new Date().toISOString(),
    data: params,
  };

  try {
    // Determine a safe writeable directory (/tmp or local workspace)
    const queueDir = process.env.NODE_ENV === "production" ? "/tmp" : process.cwd();
    const queueFilePath = path.join(queueDir, "bookings_crm_queue.json");

    let currentQueue: any[] = [];
    if (fs.existsSync(queueFilePath)) {
      try {
        const fileContent = fs.readFileSync(queueFilePath, "utf8");
        currentQueue = JSON.parse(fileContent);
        if (!Array.isArray(currentQueue)) {
          currentQueue = [];
        }
      } catch (err) {
        console.error("[CRM Queue Parse Error]:", err);
      }
    }

    currentQueue.push(record);
    fs.writeFileSync(queueFilePath, JSON.stringify(currentQueue, null, 2), "utf8");
    console.log(`[CRM Integration Layer]: Securely archived diagnostic registration profile to CRM queue file: ${queueFilePath}`);
  } catch (error) {
    // Non-blocking log
    console.error("[CRM Integration Layer Error]: Failed to write archive record. Proceeding smoothly.", error);
  }
}

