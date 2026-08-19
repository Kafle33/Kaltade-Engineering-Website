export const NOTIFICATION_PHONE = '9779858425256';

export interface EmailPayload {
  leadId: string;
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

/**
 * Formats a clean pre-filled WhatsApp message for instant one-click messaging
 */
export function generateWhatsAppUrl(lead: EmailPayload): string {
  const text = `*New Inquiry for Kaltade Engineering Services*
---------------------------------------
📋 *Ref ID:* ${lead.leadId}
👤 *Name:* ${lead.fullName}
📞 *Phone:* ${lead.phone}
${lead.email ? `✉️ *Email:* ${lead.email}\n` : ''}🏛️ *Service:* ${lead.serviceInterest || lead.type}
${lead.location ? `📍 *Location:* ${lead.location}\n` : ''}${lead.propertyType ? `🏢 *Property Type:* ${lead.propertyType}\n` : ''}${lead.budgetOrArea ? `📐 *Budget / Area:* ${lead.budgetOrArea}\n` : ''}
💬 *Message:*
${lead.message || 'I would like to inquire about this service.'}
---------------------------------------
_Sent via Kaltade Engineering Services Website_`;

  return `https://wa.me/${NOTIFICATION_PHONE}?text=${encodeURIComponent(text)}`;
}

/**
 * Since the site is fully static without a backend, this function now 
 * redirects the user's inquiry directly to WhatsApp instead of sending an email.
 */
export async function sendInquiryNotification(lead: EmailPayload): Promise<{ success: boolean; message?: string }> {
  if (typeof window !== 'undefined') {
    const url = generateWhatsAppUrl(lead);
    window.open(url, '_blank');
  }
  return { success: true, message: 'Redirected to WhatsApp' };
}
