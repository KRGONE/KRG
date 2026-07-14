import { COMPANY_CONFIG } from '../../config/company';

/**
 * EmailFooter Component
 * Generates the clean, premium, high-trust footer section for KRGONE emails.
 */
export function EmailFooter(websiteUrl: string = COMPANY_CONFIG.website, contactEmail: string = COMPANY_CONFIG.email): string {
  const currentYear = new Date().getFullYear();
  
  return `
    <!-- Footer Table Container -->
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f8fafc; border-top: 1px solid #e2e8f0; border-radius: 0 0 16px 16px;">
      <tr>
        <td style="padding: 40px; text-align: center;">
          <!-- Brand Statements -->
          <table border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td style="text-align: center; padding-bottom: 24px;">
                <p style="margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 13px; font-weight: 700; color: #475569; letter-spacing: 0.05em; text-transform: uppercase;">
                  ${COMPANY_CONFIG.taglineMeasure}
                </p>
                <p style="margin: 4px 0 0 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 12px; font-weight: 500; color: #64748b; letter-spacing: 0.02em;">
                  ${COMPANY_CONFIG.taglineTurning}
                </p>
              </td>
            </tr>
            
            <!-- Separator Line -->
            <tr>
              <td style="padding-bottom: 24px; text-align: center;">
                <table border="0" cellpadding="0" cellspacing="0" align="center" style="width: 80px; border-top: 2px solid #cbd5e1;">
                  <tr><td></td></tr>
                </table>
              </td>
            </tr>
            
            <!-- Platform & Details -->
            <tr>
              <td style="text-align: center; padding-bottom: 16px;">
                <span style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 14px; font-weight: 800; color: #0f172a; letter-spacing: -0.01em;">
                  ${COMPANY_CONFIG.name}<span style="color: #6366f1; font-size: 10px; vertical-align: super; font-weight: bold;">™</span>
                </span>
                <p style="margin: 4px 0 0 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 11px; color: #64748b; font-weight: 500;">
                  ${COMPANY_CONFIG.tagline}
                </p>
              </td>
            </tr>
            
            <!-- Action / Support Links -->
            <tr>
              <td style="text-align: center; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 12px; font-weight: 600; padding-bottom: 24px;">
                <a href="${websiteUrl}" target="_blank" style="color: #4f46e5; text-decoration: none; margin: 0 10px;">Visit Website</a>
                <span style="color: #cbd5e1;">|</span>
                <a href="mailto:${contactEmail}" style="color: #4f46e5; text-decoration: none; margin: 0 10px;">Contact Support</a>
                <span style="color: #cbd5e1;">|</span>
                <a href="${websiteUrl}/privacy" target="_blank" style="color: #4f46e5; text-decoration: none; margin: 0 10px;">Privacy Policy</a>
              </td>
            </tr>
            
            <!-- Legal/Copyright text -->
            <tr>
              <td style="text-align: center; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 11px; color: #94a3b8; line-height: 1.6; font-weight: 500;">
                © ${currentYear} ${COMPANY_CONFIG.name}. All rights reserved.<br>
                This email contains confidential operational details compiled by the ${COMPANY_CONFIG.name} ${COMPANY_CONFIG.tagline}. If you received this message by error, please contact support and delete this transmission immediately.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `;
}
