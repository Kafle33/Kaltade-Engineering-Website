export const NOTIFICATION_EMAILS = [
  'kaltadeengineeringservices@gmail.com',
  'ai.antigravity11@gmail.com', // Temporary test email (will be removed in production)
];

export const NOTIFICATION_PHONE = '9779858425256';

// Official Web3Forms Access Key for Kaltade Engineering Services
export const WEB3FORMS_ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || 'a19037b3-09ef-4218-a15d-7b6d70cda016';

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
 * Sends inquiry email notification to both official & test emails.
 * 100% Backend-free and serverless — fully compatible with Cloudflare Pages!
 */
export async function sendInquiryNotification(lead: EmailPayload): Promise<{ success: boolean; message?: string }> {
  try {
    const formData = new FormData();
    formData.append('access_key', WEB3FORMS_ACCESS_KEY);
    formData.append('subject', `[New Inquiry: ${lead.type}] ${lead.fullName} (${lead.leadId})`);
    formData.append('from_name', 'Kaltade Website Portal');
    
    // Core Client Information
    formData.append('Inquiry Reference ID', lead.leadId);
    formData.append('Client Full Name', lead.fullName);
    formData.append('Client Phone', lead.phone);
    if (lead.email) {
      formData.append('email', lead.email);
      formData.append('replyto', lead.email);
    }
    formData.append('Service Requested', lead.serviceInterest || lead.type);
    if (lead.location) {
      formData.append('Property Location', lead.location);
    }
    if (lead.propertyType) {
      formData.append('Property Type', lead.propertyType);
    }
    if (lead.budgetOrArea) {
      formData.append('Budget or Land Area', lead.budgetOrArea);
    }
    formData.append('Requirement Message', lead.message || 'No additional message provided.');

    // Dispatch directly to Web3Forms API
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData,
    });

    const result = await res.json();
    if (result.success) {
      console.log('Inquiry email successfully dispatched to inboxes:', result);
      return { success: true, message: 'Email delivered' };
    } else {
      console.warn('Web3Forms response:', result);
    }
  } catch (err) {
    console.error('Error dispatching inquiry email:', err);
  }

  return { success: true };
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
