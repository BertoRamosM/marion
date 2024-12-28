// src/app/api/send-email/route.js
import nodemailer from 'nodemailer';

export async function POST(req) {
  try {
    const { email, name, message } = await req.json();

    if (!email || !name || !message) {
      return new Response(
        JSON.stringify({ error: 'All fields are required' }),
        { status: 400 }
      );
    }

    // Configure the Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Use Gmail's SMTP service
      auth: {
        user: process.env.GMAIL_USER, // Your Gmail address
        pass: process.env.GMAIL_PASSWORD, // Your app password (not regular Gmail password)
      },
    });

    // Set up the email content
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: email, // Send to the user's email
      subject: 'Thank you for your message!',
      text: `Hello ${name},\n\nThank you for reaching out. We received your message: "${message}". We will get back to you shortly!`,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);

    return new Response(
      JSON.stringify({ message: 'Email sent successfully!' }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(
      JSON.stringify({ error: `Failed to send email. ${error.message}` }),
      { status: 500 }
    );
  }
}
