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
    
    // TODO: Add email sending functionality here
    // You can use SendGrid, Resend, or other email services on Vercel
    
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
