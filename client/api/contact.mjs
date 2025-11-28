// Vercel Serverless Function for Contact Form
import { Resend } from 'resend';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, phone, message } = req.body;
    
    // Validate required fields
    if (!name || !email || !phone || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'Tous les champs sont requis' 
      });
    }
    
    // Log submission
    console.log('📧 Contact form submission:', { 
      name, 
      email, 
      phone, 
      message,
      timestamp: new Date().toISOString()
    });
    
    // Check if API key exists
    console.log('🔑 API Key exists:', !!process.env.RESEND_API_KEY);
    
    if (!process.env.RESEND_API_KEY) {
      console.error('❌ RESEND_API_KEY is not set');
      return res.status(500).json({ 
        success: false, 
        message: 'Configuration error - API key missing' 
      });
    }
    
    // Initialize Resend
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    // Validate recipient email
    const recipientEmail = process.env.CONTACT_EMAIL || 'rozek.alexandre@gmail.com';
    console.log('📧 Sending to:', recipientEmail);
    
    // Send email - Using verified email address
    console.log('📧 Preparing to send email:', {
      from: 'PropreNet <onboarding@resend.dev>',
      to: recipientEmail,
      replyTo: email,
      subject: `Nouveau message de ${name}`
    });
    
    const { data, error } = await resend.emails.send({
      from: 'PropreNet <contact@proprenet77.com>',
      to: recipientEmail,
      replyTo: email,
      subject: `Nouveau message de ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #14794b;">Nouveau message depuis PropreNet</h2>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Nom:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Téléphone:</strong> <a href="tel:${phone}">${phone}</a></p>
          </div>
          <div style="margin: 20px 0;">
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
        </div>
      `
    });
    
    if (error) {
      console.error('❌ Resend error:', error);
      console.error('❌ Error details:', JSON.stringify(error, null, 2));
      console.error('❌ Error name:', error.name);
      console.error('❌ Error message:', error.message);
      
      // Check if it's an authentication error
      if (error.message && error.message.includes('API key')) {
        return res.status(500).json({ 
          success: false, 
          message: 'API key error. Please verify Resend configuration.',
          error_code: 'INVALID_API_KEY'
        });
      }
      
      // Check if it's an email verification error
      if (error.message && (error.message.includes('verify') || error.message.includes('domain'))) {
        return res.status(500).json({ 
          success: false, 
          message: 'Email verification required. Please verify your email in Resend dashboard.',
          error_code: 'EMAIL_NOT_VERIFIED'
        });
      }
      
      return res.status(500).json({ 
        success: false, 
        message: `Error sending email: ${error.message}`,
        error_code: 'RESEND_ERROR'
      });
    }
    
    console.log('✅ Email sent successfully:', data);
    
    return res.status(200).json({ 
      success: true, 
      message: 'Votre demande a été envoyée avec succès !' 
    });
    
  } catch (error) {
    console.error('❌ Error processing contact form:', error);
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    
    return res.status(500).json({ 
      success: false, 
      message: 'Une erreur est survenue lors du traitement de votre demande' 
    });
  }
}
