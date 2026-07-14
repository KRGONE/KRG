import { EmailHeader } from './components/EmailHeader';
import { EmailFooter } from './components/EmailFooter';
import { EmailCard, CardField } from './components/EmailCard';
import { COMPANY_CONFIG } from '../config/company';

/**
 * Admin Notification Email Template
 * Sent to the operations/lead team immediately when a new registration is submitted.
 */
export function getAdminNotificationEmail(customParams?: {
  fullName?: string;
  designation?: string;
  companyName?: string;
  businessEmail?: string;
  mobileNumber?: string;
  state?: string;
  city?: string;
  industry?: string;
  companyWebsite?: string;
  employees?: string;
  annualRevenue?: string;
  businessStage?: string;
  preferredContactMethod?: string;
  biggestChallenge?: string;
  additionalInfo?: string;
  submissionDate?: string;
  submissionTime?: string;
  websiteUrl?: string;
  contactEmail?: string;
}): string {
  const fullName = customParams?.fullName || '{{CustomerName}}';
  const designation = customParams?.designation || '{{Designation}}';
  const companyName = customParams?.companyName || '{{Company}}';
  const businessEmail = customParams?.businessEmail || '{{BusinessEmail}}';
  const mobileNumber = customParams?.mobileNumber || '{{Mobile}}';
  const state = customParams?.state || '{{State}}';
  const city = customParams?.city || '{{City}}';
  const industry = customParams?.industry || '{{Industry}}';
  const companyWebsite = customParams?.companyWebsite || '{{CompanyWebsite}}';
  const employees = customParams?.employees || '{{Employees}}';
  const annualRevenue = customParams?.annualRevenue || '{{AnnualRevenue}}';
  const businessStage = customParams?.businessStage || '{{BusinessStage}}';
  const preferredContactMethod = customParams?.preferredContactMethod || '{{PreferredContactMethod}}';
  const biggestChallenge = customParams?.biggestChallenge || '{{BiggestChallenge}}';
  const additionalInfo = customParams?.additionalInfo || '{{AdditionalInformation}}';
  const submissionDate = customParams?.submissionDate || '{{SubmissionDate}}';
  const submissionTime = customParams?.submissionTime || '{{SubmissionTime}}';
  const websiteUrl = customParams?.websiteUrl || COMPANY_CONFIG.website;
  const contactEmail = customParams?.contactEmail || COMPANY_CONFIG.email;

  const cardFields: CardField[] = [
    { label: 'Full Name', value: fullName },
    { label: 'Designation', value: designation },
    { label: 'Company Name', value: companyName, isHighlight: true },
    { label: 'Business Email', value: businessEmail },
    { label: 'Mobile Number', value: mobileNumber },
    { label: 'State', value: state },
    { label: 'City', value: city },
    { label: 'Industry', value: industry },
    { label: 'Company Website', value: companyWebsite },
    { label: 'Employees Count', value: employees },
    { label: 'Annual Revenue', value: annualRevenue },
    { label: 'Business Stage', value: businessStage },
    { label: 'Preferred Contact', value: preferredContactMethod },
    { label: 'Biggest Challenge', value: biggestChallenge, isHighlight: true },
    { label: 'Additional Info', value: additionalInfo },
    { label: 'Submission Date', value: submissionDate },
    { label: 'Submission Time', value: submissionTime }
  ];

  const adminCardHtml = EmailCard('Onboarding Intake Parameters', cardFields, 'dark');

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Business Growth Diagnostic Request</title>
      <style>
        body {
          margin: 0;
          padding: 0;
          background-color: #f1f5f9;
          -webkit-text-size-adjust: 100%;
          -ms-text-size-adjust: 100%;
        }
        table, td {
          border-collapse: collapse;
          mso-table-lspace: 0pt;
          mso-table-rspace: 0pt;
        }
        img {
          border: 0;
          height: auto;
          line-height: 100%;
          outline: none;
          text-decoration: none;
        }
        @media screen and (max-width: 600px) {
          .email-container {
            width: 100% !important;
            padding: 10px !important;
          }
          .email-body {
            padding: 24px !important;
          }
        }
      </style>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f1f5f9; padding: 40px 0;">
      <!-- Outer Wrapper Center Block -->
      <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
          <td align="center">
            
            <!-- Standardized 600px Responsive Container -->
            <table border="0" cellpadding="0" cellspacing="0" width="600" class="email-container" style="background-color: #ffffff; border-radius: 16px; box-shadow: 0 10px 15px -3px rgba(15, 23, 42, 0.05), 0 4px 6px -4px rgba(15, 23, 42, 0.05); overflow: hidden; border: 1px solid #e2e8f0;">
              
              <!-- Header -->
              <tr>
                <td>
                  ${EmailHeader('A new diagnostic request has been submitted.')}
                </td>
              </tr>
              
              <!-- Content Body -->
              <tr>
                <td style="padding: 40px;" class="email-body">
                  
                  <!-- Display Tag -->
                  <div style="margin-bottom: 24px; text-align: left;">
                    <span style="display: inline-block; background-color: #eff6ff; border: 1px solid #dbeafe; color: #1e40af; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 11px; font-weight: 800; padding: 6px 14px; border-radius: 9999px; letter-spacing: 0.1em; text-transform: uppercase;">
                      NEW LEAD RECEIVED
                    </span>
                  </div>
                  
                  <!-- Subject / Action Header -->
                  <h2 style="margin: 0 0 14px 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 20px; font-weight: 800; color: #0f172a; letter-spacing: -0.02em;">
                    Intake Notification: ${companyName}
                  </h2>
                  
                  <p style="margin: 0 0 24px 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 14px; line-height: 1.5; color: #475569; font-weight: 500;">
                    An executive diagnostic booking form has been submitted for Indian market routing. Please review the detailed parameters below.
                  </p>

                  <!-- Card with client metadata in dark mode -->
                  ${adminCardHtml}

                  <!-- Action Box -->
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #fffbeb; border: 1px solid #fde68a; border-radius: 12px; margin-top: 12px; margin-bottom: 24px; border-collapse: separate; overflow: hidden;">
                    <tr>
                      <td style="padding: 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; text-align: center; color: #92400e; font-size: 14px; font-weight: 800;">
                        ⚠️ ACTION REQUIRED: Please contact this customer within one business day.
                      </td>
                    </tr>
                  </table>

                </td>
              </tr>
              
              <!-- Footer -->
              <tr>
                <td>
                  ${EmailFooter(websiteUrl, contactEmail)}
                </td>
              </tr>
              
            </table>
            
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}
