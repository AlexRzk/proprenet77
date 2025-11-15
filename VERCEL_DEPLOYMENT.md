# Vercel Deployment Guide

## Option 1: Separate Deployments (Recommended)

### Deploy Backend (API) to Vercel

1. **Create a separate Vercel project for the server:**
   ```bash
   cd server
   vercel
   ```

2. **Note the deployment URL** (e.g., `https://your-api.vercel.app`)

3. **Configure CORS in `server/index.js`:**
   - Update the CORS configuration to allow your frontend domain

### Deploy Frontend to Vercel

1. **Add environment variable to client:**
   
   Create `client/.env.production`:
   ```env
   VITE_API_URL=https://your-api.vercel.app/api
   ```

2. **Deploy the client:**
   ```bash
   cd client
   vercel
   ```

3. **In Vercel dashboard:**
   - Go to your frontend project settings
   - Add environment variable: `VITE_API_URL` = `https://your-api.vercel.app/api`

## Option 2: Serverless Functions (Simpler)

Move the API into the client project as a Vercel serverless function:

### Steps:

1. **Create API folder in client:**
   ```bash
   mkdir client/api
   ```

2. **Create `client/api/contact.js`:**
   ```javascript
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
       
       console.log('Contact form:', { name, email, phone, message });
       
       // TODO: Send email here with nodemailer or SendGrid
       
       return res.status(200).json({ 
         success: true, 
         message: 'Message reçu' 
       });
     } catch (error) {
       console.error('Error:', error);
       return res.status(500).json({ 
         success: false, 
         message: 'Erreur serveur' 
       });
     }
   }
   ```

3. **Update `client/src/App.tsx`:**
   - The API will be at `/api/contact` (same domain)
   - No need for `VITE_API_URL` environment variable

4. **Deploy just the client:**
   ```bash
   cd client
   vercel
   ```

## Option 3: Use Email Service (Easiest)

Skip the backend entirely and use a service like:

- **EmailJS** (free tier available)
- **Formspree** 
- **SendGrid**
- **Resend**

### Example with EmailJS:

1. **Install EmailJS:**
   ```bash
   cd client
   npm install @emailjs/browser
   ```

2. **Update form submit handler:**
   ```typescript
   import emailjs from '@emailjs/browser';
   
   const handleSubmit = async (e: React.FormEvent) => {
     e.preventDefault();
     setIsSubmitting(true);
     
     try {
       await emailjs.send(
         'YOUR_SERVICE_ID',
         'YOUR_TEMPLATE_ID',
         {
           from_name: formData.name,
           from_email: formData.email,
           phone: formData.phone,
           message: formData.message,
         },
         'YOUR_PUBLIC_KEY'
       );
       
       setSubmitStatus('success');
       setFormData({ name: '', email: '', phone: '', message: '' });
     } catch (error) {
       setSubmitStatus('error');
     } finally {
       setIsSubmitting(false);
     }
   };
   ```

## Recommended Approach for Your Project

**I recommend Option 2 (Serverless Functions)** because:
- ✅ Single deployment (simpler)
- ✅ No need to manage separate backend
- ✅ Vercel handles scaling automatically
- ✅ Works out of the box with Vercel's infrastructure

Would you like me to implement Option 2 for you?
