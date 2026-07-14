import { EmailHeader } from './components/EmailHeader';
import { EmailFooter } from './components/EmailFooter';
import { EmailCard, CardField } from './components/EmailCard';
import { EmailButton } from './components/EmailButton';
import { COMPANY_CONFIG } from '../config/company';

/**
 * Assessment Completed Email Template
 * Sent to the customer after they complete the Business Growth Assessment.
 */
export function getAssessmentCompletedEmail(customParams?: {
  customerName?: string;
  businessGrowthScore?: string;
  growthSummary?: string;
  topStrengths?: string; // Semicolon or comma-separated list
  topImprovementAreas?: string; // Semicolon or comma-separated list
  dashboardUrl?: string;
  websiteUrl?: string;
  contactEmail?: string;
}): string {
  const customerName = customParams?.customerName || '{{CustomerName}}';
  const businessGrowthScore = customParams?.businessGrowthScore || '{{BusinessGrowthScore}}';
  const growthSummary = customParams?.growthSummary || '{{GrowthSummary}}';
  const topStrengths = customParams?.topStrengths || '{{TopStrengths}}';
  const topImprovementAreas = customParams?.topImprovementAreas || '{{TopImprovementAreas}}';
  const dashboardUrl = customParams?.dashboardUrl || '{{DashboardURL}}';
  const websiteUrl = customParams?.websiteUrl || COMPANY_CONFIG.website;
  const contactEmail = customParams?.contactEmail || COMPANY_CONFIG.email;

  const cardFields: CardField[] = [
    { label: 'Business Growth Score™', value: `${businessGrowthScore}/100`, isHighlight: true },
    { label: 'Performance Summary', value: growthSummary },
    { label: 'Key Strengths Identified', value: topStrengths },
    { label: 'Key Development Areas', value: topImprovementAreas }
  ];

  const resultsCardHtml = EmailCard('Diagnostic Performance Index', cardFields, 'success');

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Your Business Growth Assessment is Complete</title>
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
                  ${EmailHeader('Your Growth Index profile is ready for analysis.')}
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
                    Congratulations on completing your qualitative maturity assessment. Our algorithms have calculated your operational metrics.
                  </p>
                  
                  <p style="margin: 0 0 28px 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 15px; line-height: 1.6; color: #334155; font-weight: 500;">
                    Your <strong>Business Growth Score™</strong> is detailed below. You can log into your personalized secure portal to view dynamic breakdown dashboards.
                  </p>

                  <!-- Card block -->
                  ${resultsCardHtml}

                  <!-- Call to action button -->
                  ${EmailButton('View Live Analytics Dashboard', dashboardUrl, 'success')}

                  <!-- Context Box -->
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; margin-bottom: 24px; border-collapse: separate; overflow: hidden;">
                    <tr>
                      <td style="padding: 24px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                        <h4 style="margin: 0 0 12px 0; font-size: 14px; font-weight: 800; color: #0f172a; letter-spacing: 0.05em; text-transform: uppercase;">
                          What Your Score Means
                        </h4>
                        <p style="margin: 0; font-size: 13px; line-height: 1.6; color: #475569; font-weight: 500;">
                          This index measures your organization's readiness across key pillars: strategic expansion, operations speed, sales consistency, and systemized automation. A specialist will walk you through these data segments during your upcoming session.
                        </p>
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
