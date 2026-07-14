import { EmailHeader } from './components/EmailHeader';
import { EmailFooter } from './components/EmailFooter';
import { EmailCard, CardField } from './components/EmailCard';
import { EmailButton } from './components/EmailButton';
import { COMPANY_CONFIG } from '../config/company';

/**
 * Executive Report Delivery Email Template
 * Delivers the custom growth intelligence report with action buttons.
 */
export function getExecutiveReportEmail(customParams?: {
  customerName?: string;
  companyName?: string;
  reportSummary?: string;
  downloadUrl?: string;
  bookingUrl?: string;
  websiteUrl?: string;
  contactEmail?: string;
}): string {
  const customerName = customParams?.customerName || '{{CustomerName}}';
  const companyName = customParams?.companyName || '{{Company}}';
  const reportSummary = customParams?.reportSummary || '{{ReportSummary}}';
  const downloadUrl = customParams?.downloadUrl || '{{DownloadURL}}';
  const bookingUrl = customParams?.bookingUrl || '{{BookingURL}}';
  const websiteUrl = customParams?.websiteUrl || COMPANY_CONFIG.website;
  const contactEmail = customParams?.contactEmail || COMPANY_CONFIG.email;

  const cardFields: CardField[] = [
    { label: 'Recipient Organization', value: companyName },
    { label: 'Strategic Evaluation', value: reportSummary },
    { label: 'Document Format', value: 'Portable Document Format (Secure PDF)' }
  ];

  const reportCardHtml = EmailCard('Executive Summary Insights', cardFields, 'light');

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Your Executive Business Growth Report</title>
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
                  ${EmailHeader('Your customized strategic growth report is attached.')}
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
                    We are pleased to deliver your customized **${COMPANY_CONFIG.name} Executive Business Growth Report™**. This document has been compiled by our diagnostic advisors based on your intake parameters.
                  </p>
                  
                  <p style="margin: 0 0 28px 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 15px; line-height: 1.6; color: #334155; font-weight: 500;">
                    Please review the strategic summary below and click the action buttons to download your secure report or book your advisory session.
                  </p>

                  <!-- Card block -->
                  ${reportCardHtml}

                  <!-- Actions Box -->
                  <table border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                      <td align="center" style="padding-bottom: 12px;">
                        ${EmailButton('Download Complete Report (PDF)', downloadUrl, 'secondary')}
                      </td>
                    </tr>
                    <tr>
                      <td align="center">
                        ${EmailButton('Schedule Growth Strategy Session', bookingUrl, 'primary')}
                      </td>
                    </tr>
                  </table>

                  <!-- Disclaimer / Security block -->
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; margin-top: 16px; margin-bottom: 24px; border-collapse: separate; overflow: hidden;">
                    <tr>
                      <td style="padding: 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 13px; line-height: 1.5; color: #64748b; text-align: center; font-weight: 500;">
                        🔒 Security Notice: The downloaded document is end-to-end encrypted for your organization's security.
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
