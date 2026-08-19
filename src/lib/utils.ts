import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNPR(amount: number): string {
  if (!amount || isNaN(amount)) return 'NPR Price on Request';
  if (amount >= 10000000) {
    const cr = (amount / 10000000).toFixed(2);
    return `NPR ${parseFloat(cr)} Crore`;
  }
  if (amount >= 100000) {
    const lakh = (amount / 100000).toFixed(2);
    return `NPR ${parseFloat(lakh)} Lakh`;
  }
  return `NPR ${amount.toLocaleString('en-IN')}`;
}

export function formatAreaSqFt(sqFt: number): string {
  if (!sqFt) return '';
  return `${sqFt.toLocaleString('en-US')} sq.ft.`;
}

/**
 * Converts area in Sq. Feet to Terai measurement units (Bigha - Katha - Dhur)
 * 1 Bigha = 20 Katha = 400 Dhur = 72,900 sq.ft. (approx. 6772.63 sq.m in Nepal survey standard: 1 Bigha = 6,772.63 m² ~ 72,900 sq ft or 1 Katha = 3,645 sq ft, 1 Dhur = 182.25 sq ft)
 */
export function sqFtToTeraiUnits(sqFt: number): { bigha: number; katha: number; dhur: number; label: string } {
  const SQFT_PER_BIGHA = 72900;
  const SQFT_PER_KATHA = 3645;
  const SQFT_PER_DHUR = 182.25;

  let remaining = sqFt;
  const bigha = Math.floor(remaining / SQFT_PER_BIGHA);
  remaining %= SQFT_PER_BIGHA;

  const katha = Math.floor(remaining / SQFT_PER_KATHA);
  remaining %= SQFT_PER_KATHA;

  const dhur = parseFloat((remaining / SQFT_PER_DHUR).toFixed(1));

  const parts = [];
  if (bigha > 0) parts.push(`${bigha} Bigha`);
  if (katha > 0) parts.push(`${katha} Katha`);
  if (dhur > 0 || parts.length === 0) parts.push(`${dhur} Dhur`);

  return {
    bigha,
    katha,
    dhur,
    label: parts.join(' ')
  };
}

/**
 * Converts area in Sq. Feet to Hilly measurement units (Ropani - Aana - Paisa - Daam)
 * 1 Ropani = 16 Aana = 5,476 sq.ft.
 * 1 Aana = 4 Paisa = 342.25 sq.ft.
 * 1 Paisa = 4 Daam = 85.5625 sq.ft.
 * 1 Daam = 21.39 sq.ft.
 */
export function sqFtToHillyUnits(sqFt: number): { ropani: number; aana: number; paisa: number; daam: number; label: string } {
  const SQFT_PER_ROPANI = 5476;
  const SQFT_PER_AANA = 342.25;
  const SQFT_PER_PAISA = 85.5625;
  const SQFT_PER_DAAM = 21.39;

  let remaining = sqFt;
  const ropani = Math.floor(remaining / SQFT_PER_ROPANI);
  remaining %= SQFT_PER_ROPANI;

  const aana = Math.floor(remaining / SQFT_PER_AANA);
  remaining %= SQFT_PER_AANA;

  const paisa = Math.floor(remaining / SQFT_PER_PAISA);
  remaining %= SQFT_PER_PAISA;

  const daam = parseFloat((remaining / SQFT_PER_DAAM).toFixed(1));

  const parts = [];
  if (ropani > 0) parts.push(`${ropani} Ropani`);
  if (aana > 0) parts.push(`${aana} Aana`);
  if (paisa > 0) parts.push(`${paisa} Paisa`);
  if (daam > 0 || parts.length === 0) parts.push(`${daam} Daam`);

  return {
    ropani,
    aana,
    paisa,
    daam,
    label: parts.join(' ')
  };
}

export interface EmailPayload {
  leadId?: string;
  type: string;
  fullName: string;
  phone: string;
  email?: string;
  serviceInterest?: string;
  location?: string;
  propertyType?: string;
  budgetOrArea?: string;
  message?: string;
  urgency?: string;
}

export function generateWhatsAppUrl(lead: EmailPayload): string {
  const text = `*New Inquiry for Kaltade Engineering Services*
---------------------------------------
👤 *Name:* ${lead.fullName}
📞 *Phone:* ${lead.phone}
${lead.email ? `✉️ *Email:* ${lead.email}\n` : ''}🏛️ *Service:* ${lead.serviceInterest || lead.type}
${lead.location ? `📍 *Location:* ${lead.location}\n` : ''}${lead.propertyType ? `🏢 *Property Type:* ${lead.propertyType}\n` : ''}${lead.budgetOrArea ? `📐 *Budget / Area:* ${lead.budgetOrArea}\n` : ''}
💬 *Message:*
${lead.message || 'I would like to inquire about this service.'}
---------------------------------------
_Sent via Kaltade Engineering Services Website_`;

  return `https://wa.me/9779858425256?text=${encodeURIComponent(text)}`;
}
