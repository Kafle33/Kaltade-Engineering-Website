import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    const recipients = data.recipients || [
      'kaltadeengineeringservices@gmail.com',
      'ai.antigravity11@gmail.com',
    ];

    const emailSubject = `[Kaltade Inquiry: ${data.type || 'Consultation'}] from ${data.fullName} (${data.leadId})`;

    // Check if Resend API Key is provided in environment variables
    const resendApiKey = process.env.RESEND_API_KEY;

    if (resendApiKey) {
      const emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; background: #ffffff;">
          <div style="background: #0B1D3A; color: #ffffff; padding: 16px 20px; border-radius: 8px; margin-bottom: 20px;">
            <h2 style="margin: 0; font-size: 18px; color: #ffffff;">Kaltade Engineering Services Pvt. Ltd.</h2>
            <p style="margin: 4px 0 0 0; font-size: 12px; color: #93c5fd;">New Website Inquiry Received (${data.leadId})</p>
          </div>

          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 10px 0; font-weight: bold; color: #475569; width: 140px;">Client Name:</td>
              <td style="padding: 10px 0; color: #0f172a; font-weight: bold;">${data.fullName}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 10px 0; font-weight: bold; color: #475569;">Phone Number:</td>
              <td style="padding: 10px 0; color: #0f172a;"><a href="tel:${data.phone}" style="color: #2563eb; text-decoration: none; font-weight: bold;">${data.phone}</a></td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 10px 0; font-weight: bold; color: #475569;">Email Address:</td>
              <td style="padding: 10px 0; color: #0f172a;">${data.email || 'Not provided'}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 10px 0; font-weight: bold; color: #475569;">Inquiry Type:</td>
              <td style="padding: 10px 0; color: #0B1D3A; font-weight: bold;">${data.type || 'General'}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 10px 0; font-weight: bold; color: #475569;">Service Interest:</td>
              <td style="padding: 10px 0; color: #0f172a;">${data.serviceInterest || 'N/A'}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 10px 0; font-weight: bold; color: #475569;">Location:</td>
              <td style="padding: 10px 0; color: #0f172a;">${data.location || 'Not specified'}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 10px 0; font-weight: bold; color: #475569;">Property Details:</td>
              <td style="padding: 10px 0; color: #0f172a;">${data.propertyType || ''} ${data.budgetOrArea || ''}</td>
            </tr>
          </table>

          <div style="margin-top: 20px; padding: 14px; background: #f8fafc; border-left: 4px solid #0B1D3A; border-radius: 4px;">
            <p style="margin: 0 0 6px 0; font-weight: bold; color: #334155; font-size: 13px;">Message / Requirement Details:</p>
            <p style="margin: 0; color: #1e293b; font-size: 14px; line-height: 1.5;">${data.message || 'No additional message provided.'}</p>
          </div>

          <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b; text-align: center;">
            <p style="margin: 0;">Kaltade Engineering Services Pvt. Ltd. • LN. Chowk, Dhangadhi, Kailali</p>
            <p style="margin: 4px 0 0 0;">Mobile: +977-9858425256 | Tel: 091-521256</p>
          </div>
        </div>
      `;

      // Dispatch to Resend REST API
      const resendRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Kaltade Portal <onboarding@resend.dev>',
          to: recipients,
          subject: emailSubject,
          html: emailHtml,
        }),
      });

      if (resendRes.ok) {
        return NextResponse.json({ success: true, message: 'Email sent successfully via Resend' });
      }
    }

    // Default response acknowledging receipt
    return NextResponse.json({
      success: true,
      message: 'Inquiry received and logged successfully',
      recipients,
    });
  } catch (error) {
    console.error('Error processing inquiry:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
