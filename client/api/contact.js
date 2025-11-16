import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

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
    
    if (!name || !email || !phone || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'Tous les champs sont requis' 
      });
    }
    
    // Log the contact form submission
    console.log('📧 Contact form submission:', { 
      name, 
      email, 
      phone, 
      message,
      timestamp: new Date().toISOString()
    });
    
    // Send email using Resend
    await resend.emails.send({
      from: 'PropreNet <onboarding@resend.dev>', // Use verified domain or resend.dev for testing
      to: 'contact@proprenet77.com', // Your business email
      replyTo: email, // Customer's email for easy replies
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
    
    return res.status(200).json({ 
      success: true, 
      message: 'Votre demande a été envoyée avec succès !' 
    });
  } catch (error) {
    console.error('❌ Error processing contact form:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Une erreur est survenue' 
    });
  }
}
