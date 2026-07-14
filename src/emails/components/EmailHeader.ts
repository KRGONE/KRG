import { COMPANY_CONFIG } from '../../config/company';

/**
 * EmailHeader Component
 * Generates the premium, responsive header section for KRGONE emails.
 */
export function EmailHeader(preheaderText: string = "KRGONE Business Growth Intelligence"): string {
  const absoluteLogoUrl = `${COMPANY_CONFIG.website}/logo.png`;
  
  return `
    <!-- Preheader Text (Invisible but shown in inbox previews) -->
    <div style="display: none; max-height: 0px; overflow: hidden;">
      ${preheaderText}
    </div>
    
    <!-- Header Table Container -->
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #0f172a; border-radius: 16px 16px 0 0; overflow: hidden;">
      <tr>
        <td style="padding: 32px 40px; text-align: left;">
          <!-- KRGONE Brand Signature -->
          <table border="0" cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td>
                <img src="${absoluteLogoUrl}" alt="${COMPANY_CONFIG.name} Logo" border="0" width="140" style="display: block; width: 140px; height: auto; outline: none; text-decoration: none; margin-bottom: 8px;" />
                <div style="font-family: 'JetBrains Mono', 'Fira Code', monospace; font-size: 10px; color: #94a3b8; letter-spacing: 0.15em; text-transform: uppercase; margin-top: 6px; font-weight: bold;">
                  ${COMPANY_CONFIG.tagline}
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `;
}
