/**
 * EmailButton Component
 * Generates a bulletproof, responsive, and cross-client compatible HTML button.
 */
export function EmailButton(label: string, url: string, variant: 'primary' | 'secondary' | 'success' | 'warning' = 'primary'): string {
  let bgColor = '#4f46e5'; // Primary Indigo
  let textColor = '#ffffff';
  let border = 'none';

  if (variant === 'secondary') {
    bgColor = '#0f172a'; // Deep Slate
    textColor = '#ffffff';
  } else if (variant === 'success') {
    bgColor = '#10b981'; // Emerald Green
    textColor = '#ffffff';
  } else if (variant === 'warning') {
    bgColor = '#f59e0b'; // Amber Accent
    textColor = '#ffffff';
  }

  return `
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin: 32px 0; text-align: center;">
      <tr>
        <td align="center">
          <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate;">
            <tr>
              <td align="center" style="border-radius: 9999px; background-color: ${bgColor}; border: ${border}; box-shadow: 0 4px 6px -1px rgba(79, 70, 229, 0.1), 0 2px 4px -1px rgba(79, 70, 229, 0.06);">
                <a href="${url}" target="_blank" style="display: inline-block; padding: 16px 40px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 15px; font-weight: 700; color: ${textColor}; text-decoration: none; letter-spacing: -0.01em; text-align: center; white-space: nowrap;">
                  ${label}
                </a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `;
}
