# Contact Form Setup Guide

## How the Contact Form Works

The contact form is now fully functional with the following features:

### Frontend (Client)
- Form validation (all fields required)
- Loading state while submitting
- Success/error messages
- Form data is sent to `/api/contact` endpoint

### Backend (Server)
- Receives form data via POST request
- Validates all required fields
- Logs submissions to console
- Returns success/error responses

## Current Setup

The form is **ready to use** and will:
1. Collect user information (name, email, phone, message)
2. Send it to the backend server
3. Log the data in the server console
4. Show success/error messages to the user

## Running the Application

### 1. Start the Backend Server
```bash
cd server
npm install  # If not already installed
npm start
```
Server runs on: http://localhost:3001

### 2. Start the Frontend (in a new terminal)
```bash
cd client
npm install  # If not already installed
npm run dev
```
Client runs on: http://localhost:5173

## Adding Email Notifications (Optional)

To send emails when someone submits the form, follow these steps:

### 1. Install Nodemailer
```bash
cd server
npm install nodemailer
```

### 2. Create Email Configuration

Add to your `.env` file in the `server` folder:
```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
RECIPIENT_EMAIL=contact@proprenet77.com
```

### 3. Update server/index.js

Add at the top:
```javascript
import nodemailer from 'nodemailer';
```

Replace the TODO comment in `/api/contact` with:
```javascript
// Configure email transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Send email
await transporter.sendMail({
  from: process.env.EMAIL_USER,
  to: process.env.RECIPIENT_EMAIL,
  subject: `Nouvelle demande de devis - ${name}`,
  html: `
    <h2>Nouvelle demande de devis</h2>
    <p><strong>Nom:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Téléphone:</strong> ${phone}</p>
    <p><strong>Message:</strong></p>
    <p>${message}</p>
  `,
});
```

### Gmail Setup (if using Gmail)
1. Go to Google Account settings
2. Enable 2-factor authentication
3. Generate an "App Password" for nodemailer
4. Use that password in your `.env` file

## Testing the Form

1. Make sure both servers are running
2. Open http://localhost:5173
3. Scroll to "Demander un devis" section
4. Fill in the form and submit
5. Check server console for logged data
6. If email is configured, check your inbox

## What's Already Done

✅ Form UI with validation
✅ Submit handler with loading states
✅ Success/error messages
✅ Backend API endpoint
✅ Data validation
✅ Console logging
✅ Vite proxy configuration

## What You Need to Configure

⚠️ Email sending (optional but recommended)
⚠️ Production deployment settings
⚠️ CORS settings for production domain
