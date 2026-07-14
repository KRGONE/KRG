/**
 * EmailCard Component
 * Generates structured, responsive informational cards for executive data representation.
 */
export interface CardField {
  label: string;
  value: string;
  isHighlight?: boolean;
}

export function EmailCard(title: string, fields: CardField[], variant: 'light' | 'dark' | 'success' | 'warning' = 'light'): string {
  // Theme styling definitions
  let bg = '#f8fafc';
  let border = '1px solid #e2e8f0';
  let textTitle = '#0f172a';
  let labelColor = '#64748b';
  let valueColor = '#0f172a';
  
  if (variant === 'dark') {
    bg = '#0f172a';
    border = '1px solid #1e293b';
    textTitle = '#ffffff';
    labelColor = '#94a3b8';
    valueColor = '#f1f5f9';
  } else if (variant === 'success') {
    bg = '#f0fdf4';
    border = '1px solid #bbf7d0';
    textTitle = '#166534';
    labelColor = '#15803d';
    valueColor = '#14532d';
  } else if (variant === 'warning') {
    bg = '#fffbeb';
    border = '1px solid #fde68a';
    textTitle = '#92400e';
    labelColor = '#b45309';
    valueColor = '#78350f';
  }

  const rowsHtml = fields.map(field => `
    <tr style="border-bottom: 1px solid #e2e8f0;">
      <td style="padding: 14px 16px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 13px; font-weight: 700; color: ${labelColor}; width: 40%; text-transform: uppercase; letter-spacing: 0.02em; vertical-align: top;">
        ${field.label}
      </td>
      <td style="padding: 14px 16px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 15px; font-weight: ${field.isHighlight ? '800' : '600'}; color: ${field.isHighlight ? '#4f46e5' : valueColor}; vertical-align: top;">
        ${field.value || '—'}
      </td>
    </tr>
  `).join('');

  return `
    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: ${bg}; border: ${border}; border-radius: 12px; margin-bottom: 24px; border-collapse: separate; overflow: hidden;">
      ${title ? `
        <tr>
          <td colspan="2" style="padding: 20px 20px 10px 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 16px; font-weight: 800; color: ${textTitle}; letter-spacing: -0.01em; border-bottom: 1px dashed #cbd5e1;">
            ${title}
          </td>
        </tr>
      ` : ''}
      ${rowsHtml}
    </table>
  `;
}
