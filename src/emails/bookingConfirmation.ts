import { EmailHeader } from './components/EmailHeader';
import { EmailFooter } from './components/EmailFooter';
import { EmailCard, CardField } from './components/EmailCard';
import { EmailButton } from './components/EmailButton';
import { COMPANY_CONFIG } from '../config/company';

/**
 * Booking Confirmation Email Template
 * Sent to the customer immediately after requesting a Business Growth Diagnostic.
 */
export function getBookingConfirmationEmail(customParams?: {
  customerName?: string;
  companyName?: string;
  businessEmail?: string;
  mobileNumber?: string;
  industry?: string;
  employees?: string;
  businessStage?: string;
  biggestChallenge?: string;
  submissionDate?: string;
  submissionTime?: string;
  websiteUrl?: string;
  contactEmail?: string;
}): string {
  // Use either supplied arguments or standard placeholders for future-ready integration
  const customerName = customParams?.customerName || '{{CustomerName}}';
  const companyName = customParams?.companyName || '{{Company}}';
  const businessEmail = customParams?.businessEmail || '{{BusinessEmail}}';
  const mobileNumber = customParams?.mobileNumber || '{{MobileNumber}}';
  const industry = customParams?.industry || '{{Industry}}';
  const employees = customParams?.employees || '{{Employees}}';
  const businessStage = customParams?.businessStage || '{{BusinessStage}}';
  const biggestChallenge = customParams?.biggestChallenge || '{{BiggestBusinessChallenge}}';
  const submissionDate = customParams?.submissionDate || '{{SubmissionDate}}';
  const submissionTime = customParams?.submissionTime || '{{SubmissionTime}}';
  const websiteUrl = customParams?.websiteUrl || COMPANY_CONFIG.website;
  const contactEmail = customParams?.contactEmail || COMPANY_CONFIG.email;

  const cardFields: CardField[] = [
    { label: 'Full Name', value: customerName },
    { label: 'Company', value: companyName },
    { label: 'Business Email', value: businessEmail },
    { label: 'Mobile Number', value: mobileNumber },
    { label: 'Industry', value: industry },
    { label: 'Employees', value: employees },
    { label: 'Business Stage', value: businessStage },
    { label: 'Biggest Challenge', value: biggestChallenge, isHighlight: true },
    { label: 'Submission Date', value: submissionDate },
    { label: 'Submission Time', value: submissionTime }
  ];

  const detailsCardHtml = EmailCard('Registration Profile Summary', cardFields, 'light');

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Thank You for Booking Your Business Growth Diagnostic</title>
      <style>
        /* Embedded Client Resilience Styles */
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
                  ${EmailHeader('We received your Business Growth Diagnostic booking.')}
                </td>
              </tr>
              
              <!-- Content Body -->
              <tr>
                <td style="padding: 40px;" class="email-body">
                  
                  <!-- Greeting -->
                  <h2 style="margin: 0 0 24px 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 22px; font-weight: 800; color: #0f172a; letter-spacing: -0.02em;">
                    Dear ${customerName},
                  </h2>
                  
                  <!-- Message -->
                  <p style="margin: 0 0 16px 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 15px; line-height: 1.6; color: #334155; font-weight: 500;">
                    Thank you for requesting your Business Growth Diagnostic. We have successfully received your request and mapped your organization's criteria to our baseline platform registry.
                  </p>
                  
                  <p style="margin: 0 0 28px 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 15px; line-height: 1.6; color: #334155; font-weight: 500;">
                    Our business analysis specialists are currently reviewing your parameters. <strong>Our team will contact you within one business day</strong> to align schedules and launch your diagnostics.
                  </p>

                  <!-- Card block -->
                  ${detailsCardHtml}

                  <!-- "What Happens Next?" Rounded Information Card -->
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #fdfdfd; border: 1px solid #e2e8f0; border-radius: 12px; margin-bottom: 24px; border-collapse: separate; overflow: hidden;">
                    <tr>
                      <td style="padding: 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                        <h4 style="margin: 0 0 16px 0; font-size: 14px; font-weight: 800; color: #0f172a; letter-spacing: 0.05em; text-transform: uppercase;">
                          What Happens Next?
                        </h4>
                        
                        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top: 12px;">
                          <tr>
                            <td valign="top" style="padding-bottom: 12px; width: 28px;">
                              <span style="display: inline-block; background-color: #eff6ff; border: 1px solid #bfdbfe; color: #1d4ed8; font-size: 11px; font-weight: 800; height: 20px; width: 20px; line-height: 20px; text-align: center; border-radius: 50%;">1</span>
                            </td>
                            <td style="padding-bottom: 12px; font-size: 14px; color: #334155; font-weight: 500; line-height: 1.5;">
                              We review your submitted business information against active industry trends.
                            </td>
                          </tr>
                          <tr>
                            <td valign="top" style="padding-bottom: 12px; width: 28px;">
                              <span style="display: inline-block; background-color: #eff6ff; border: 1px solid #bfdbfe; color: #1d4ed8; font-size: 11px; font-weight: 800; height: 20px; width: 20px; line-height: 20px; text-align: center; border-radius: 50%;">2</span>
                            </td>
                            <td style="padding-bottom: 12px; font-size: 14px; color: #334155; font-weight: 500; line-height: 1.5;">
                              A dedicated ${COMPANY_CONFIG.name} Business Growth Specialist will reach out to you via your preferred method.
                            </td>
                          </tr>
                          <tr>
                            <td valign="top" style="padding-bottom: 12px; width: 28px;">
                              <span style="display: inline-block; background-color: #eff6ff; border: 1px solid #bfdbfe; color: #1d4ed8; font-size: 11px; font-weight: 800; height: 20px; width: 20px; line-height: 20px; text-align: center; border-radius: 50%;">3</span>
                            </td>
                            <td style="padding-bottom: 12px; font-size: 14px; color: #334155; font-weight: 500; line-height: 1.5;">
                              We schedule your exclusive, high-context Business Growth Diagnostic Briefing.
                            </td>
                          </tr>
                          <tr>
                            <td valign="top" style="width: 28px;">
                              <span style="display: inline-block; background-color: #eff6ff; border: 1px solid #bfdbfe; color: #1d4ed8; font-size: 11px; font-weight: 800; height: 20px; width: 20px; line-height: 20px; text-align: center; border-radius: 50%;">4</span>
                            </td>
                            <td style="font-size: 14px; color: #334155; font-weight: 500; line-height: 1.5;">
                              You receive practical, actionable growth recommendations tailored to help expand your business.
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>

                  <!-- Closing Message -->
                  <p style="margin: 0 0 8px 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 14px; line-height: 1.6; color: #475569; font-weight: 600;">
                    Thank you for choosing ${COMPANY_CONFIG.name}.
                  </p>
                  <p style="margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 14px; line-height: 1.6; color: #475569; font-weight: 600;">
                    We look forward to helping you build a stronger, more resilient, and more profitable business enterprise.
                  </p>

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
