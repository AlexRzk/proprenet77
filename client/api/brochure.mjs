// Vercel Serverless Function for Brochure Request
import { Resend } from 'resend';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
    const { email } = req.body;
    
    // Validate email
    if (!email) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email is required' 
      });
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid email format' 
      });
    }
    
    console.log('📄 Brochure request from:', email);
    
    // Check if API key exists
    if (!process.env.RESEND_API_KEY) {
      console.error('❌ RESEND_API_KEY is not set');
      return res.status(500).json({ 
        success: false, 
        message: 'Configuration error' 
      });
    }
    
    // Initialize Resend
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    // Try to read PDF - In production, the PDF should be in public folder
    let attachmentContent = null;
    try {
      // Try multiple possible paths
      const possiblePaths = [
        path.join(__dirname, '../public/brochure.pdf'),
        path.join('/var/task/public/brochure.pdf'),
        path.join(process.cwd(), 'public/brochure.pdf'),
      ];
      
      for (const pdfPath of possiblePaths) {
        try {
          if (fs.existsSync(pdfPath)) {
            attachmentContent = fs.readFileSync(pdfPath);
            console.log('✅ PDF found at:', pdfPath);
            break;
          }
        } catch (e) {
          continue;
        }
      }
      
      if (!attachmentContent) {
        console.warn('⚠️ PDF file not found - sending email without attachment');
      }
    } catch (err) {
      console.warn('⚠️ Error reading PDF:', err.message);
    }
    
    // Prepare attachment
    const attachments = attachmentContent ? [
      {
        filename: 'PropreNet_Brochure.pdf',
        content: attachmentContent,
      }
    ] : [];
    
    // Send email with optional PDF attachment
    const { data, error } = await resend.emails.send({
      from: 'PropreNet <onboarding@resend.dev>',
      to: email,
      subject: 'Votre brochure PropreNet',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 20px; border-radius: 10px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h2 style="color: #00a41d; margin: 0;">Bienvenue chez PropreNet !</h2>
          </div>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <p style="color: #333; font-size: 16px; line-height: 1.6;">
              Merci de votre intérêt pour nos services de nettoyage professionnel en Seine-et-Marne.
            </p>
            <p style="color: #333; font-size: 16px; line-height: 1.6;">
              ${attachmentContent ? 'Veuillez trouver ci-joint notre brochure complète avec tous nos services détaillés.' : 'Veuillez consulter notre site web pour découvrir nos services détaillés.'}
            </p>
          </div>
          
          <div style="background: #f0f7f4; padding: 15px; border-radius: 8px; border-left: 4px solid #00a41d; margin-bottom: 20px;">
            <p style="color: #00a41d; font-weight: bold; margin: 0 0 10px 0;">Nos Services :</p>
            <ul style="color: #333; margin: 0; padding-left: 20px;">
              <li>Hôtels & Restaurants</li>
              <li>Cabinets Médicaux</li>
              <li>Entreprises & Bureaux</li>
              <li>Particuliers</li>
              <li>Locations Airbnb</li>
            </ul>
          </div>
          
          <div style="border-top: 1px solid #ddd; padding-top: 20px;">
            <p style="color: #666; font-size: 14px; margin: 10px 0;">
              <strong>Vous souhaitez un devis ?</strong>
            </p>
            <p style="color: #666; font-size: 14px; margin: 10px 0;">
              📞 Appelez-nous : <a href="tel:0764515942" style="color: #00a41d; text-decoration: none;">07 64 51 59 42</a>
            </p>
            <p style="color: #666; font-size: 14px; margin: 10px 0;">
              🌐 Visitez notre site : <a href="https://www.proprenet77.com" style="color: #00a41d; text-decoration: none;">www.proprenet77.com</a>
            </p>
          </div>
          
          <p style="color: #999; font-size: 12px; text-align: center; margin-top: 30px;">
            PropreNet - Nettoyage Professionnel en Seine-et-Marne
          </p>
        </div>
      `,
      attachments,
    });
    
    if (error) {
      console.error('❌ Resend error:', error);
      return res.status(500).json({ 
        success: false, 
        message: 'Error sending brochure' 
      });
    }
    
    console.log('✅ Brochure email sent successfully:', data);
    
    return res.status(200).json({ 
      success: true, 
      message: 'Brochure sent successfully!' 
    });
    
  } catch (error) {
    console.error('❌ Error processing brochure request:', error);
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    
    return res.status(500).json({ 
      success: false, 
      message: 'Error processing request' 
    });
  }
}
