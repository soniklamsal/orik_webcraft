import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Rate limiting map (in production, use Redis or a proper rate limiter)
const ipRequestMap = new Map<string, { count: number; resetTime: number }>();

function getRateLimitInfo(ip: string) {
  const now = Date.now();
  const info = ipRequestMap.get(ip);

  if (!info || now > info.resetTime) {
    // Reset or create new entry (5 requests per hour)
    ipRequestMap.set(ip, { count: 1, resetTime: now + 60 * 60 * 1000 });
    return { allowed: true, remaining: 4 };
  }

  if (info.count >= 5) {
    return { allowed: false, remaining: 0 };
  }

  info.count++;
  return { allowed: true, remaining: 5 - info.count };
}

function getClientIP(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const clientIP = getClientIP(request);
    const { allowed, remaining } = getRateLimitInfo(clientIP);

    if (!allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { name, business, email, phone, package: pkg, message, website } = body;

    // Honeypot check
    if (website && website.trim() !== "") {
      return NextResponse.json(
        { error: "This enquiry could not be accepted." },
        { status: 400 }
      );
    }

    // Validation
    if (!name || !business || !email || !phone) {
      return NextResponse.json(
        { error: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || "smtp.gmail.com",
      port: parseInt(process.env.EMAIL_PORT || "587"),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Email content
    const mailOptions = {
      from: `"ORIK Webcraft Contact Form" <${process.env.EMAIL_USER}>`,
      to: process.env.NOTIFICATION_EMAIL || process.env.EMAIL_USER,
      replyTo: email,
      subject: `New Enquiry from ${name} - ${business}`,
      text: `
New Contact Form Submission

Name: ${name}
Business: ${business}
Email: ${email}
Phone: ${phone}
Package: ${pkg || "Not specified"}

Message:
${message || "No message provided"}

---
Submitted at: ${new Date().toLocaleString("en-US", { timeZone: "Asia/Kathmandu" })}
IP Address: ${clientIP}
      `.trim(),
      html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #008454; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
    .content { background: #f5f5f7; padding: 20px; border-radius: 0 0 8px 8px; }
    .field { margin: 15px 0; }
    .label { font-weight: bold; color: #008454; }
    .value { margin-top: 5px; }
    .footer { margin-top: 20px; padding-top: 20px; border-top: 2px solid #ddd; font-size: 12px; color: #666; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>🎉 New Contact Form Submission</h2>
    </div>
    <div class="content">
      <div class="field">
        <div class="label">Name:</div>
        <div class="value">${name}</div>
      </div>
      <div class="field">
        <div class="label">Business:</div>
        <div class="value">${business}</div>
      </div>
      <div class="field">
        <div class="label">Email:</div>
        <div class="value"><a href="mailto:${email}">${email}</a></div>
      </div>
      <div class="field">
        <div class="label">Phone / WhatsApp:</div>
        <div class="value"><a href="tel:${phone}">${phone}</a> | <a href="https://wa.me/${phone.replace(/[^0-9]/g, "")}">WhatsApp</a></div>
      </div>
      <div class="field">
        <div class="label">Package:</div>
        <div class="value">${pkg || "Not specified"}</div>
      </div>
      <div class="field">
        <div class="label">Message:</div>
        <div class="value">${message || "No message provided"}</div>
      </div>
      <div class="footer">
        <strong>Submitted:</strong> ${new Date().toLocaleString("en-US", { timeZone: "Asia/Kathmandu" })}<br>
        <strong>IP Address:</strong> ${clientIP}
      </div>
    </div>
  </div>
</body>
</html>
      `.trim(),
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { 
        success: true, 
        message: "Enquiry sent successfully!",
        rateLimit: { remaining } 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send enquiry. Please try again or contact us directly." },
      { status: 500 }
    );
  }
}