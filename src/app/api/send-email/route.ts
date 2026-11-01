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
    "127.0.0.1"
  );
}

export async function POST(request: NextRequest) {
  console.log("📧 Email API called");
  
  try {
    // Check environment variables
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.error("❌ Missing email credentials in environment variables");
      return NextResponse.json(
        { error: "Email service not configured. Please contact support." },
        { status: 500 }
      );
    }

    console.log("✅ Email credentials found");

    // Rate limiting
    const clientIP = getClientIP(request);
    console.log(`🌐 Client IP: ${clientIP}`);
    
    const { allowed, remaining } = getRateLimitInfo(clientIP);

    if (!allowed) {
      console.log("⚠️ Rate limit exceeded");
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    console.log("📝 Form data received:", { name: body.name, email: body.email });
    
    const { name, business, email, phone, package: pkg, message, website } = body;

    // Honeypot check
    if (website && website.trim() !== "") {
      console.log("🤖 Bot detected via honeypot");
      return NextResponse.json(
        { error: "This enquiry could not be accepted." },
        { status: 400 }
      );
    }

    // Validation
    if (!name || !business || !email || !phone) {
      console.log("❌ Missing required fields");
      return NextResponse.json(
        { error: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log("❌ Invalid email format");
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    console.log("🔧 Creating email transporter...");

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || "smtp.gmail.com",
      port: parseInt(process.env.EMAIL_PORT || "587"),
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
      debug: true, // Enable debug output
      logger: true, // Log to console
    });

    console.log("✅ Transporter created");

    // Verify connection
    console.log("🔍 Verifying SMTP connection...");
    await transporter.verify();
    console.log("✅ SMTP connection verified");

    const timestamp = new Date().toLocaleString("en-US", { 
      timeZone: "Asia/Kathmandu",
      dateStyle: "full",
      timeStyle: "long"
    });

    // Email content
    const mailOptions = {
      from: `"ORIK Webcraft Contact Form" <${process.env.EMAIL_USER}>`,
      to: process.env.NOTIFICATION_EMAIL || process.env.EMAIL_USER,
      replyTo: email,
      subject: `🎉 New Enquiry from ${name} - ${business}`,
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
Submitted at: ${timestamp}
IP Address: ${clientIP}
      `.trim(),
      html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 20px auto; }
    .header { background: linear-gradient(135deg, #008454 0%, #00683e 100%); color: white; padding: 30px 20px; text-align: center; }
    .header h1 { margin: 0; font-size: 24px; }
    .content { background: #ffffff; padding: 30px; border: 1px solid #e0e0e0; }
    .field { margin: 20px 0; padding: 15px; background: #f5f5f7; border-left: 4px solid #008454; }
    .label { font-weight: bold; color: #008454; font-size: 14px; text-transform: uppercase; margin-bottom: 5px; }
    .value { font-size: 16px; color: #050038; }
    .value a { color: #008454; text-decoration: none; }
    .value a:hover { text-decoration: underline; }
    .footer { margin-top: 30px; padding-top: 20px; border-top: 2px solid #e0e0e0; font-size: 12px; color: #666; text-align: center; }
    .cta { display: inline-block; margin: 10px 5px; padding: 10px 20px; background: #008454; color: white; text-decoration: none; border-radius: 5px; }
    .cta:hover { background: #00683e; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎉 New Contact Form Submission</h1>
      <p style="margin: 10px 0 0 0; opacity: 0.9;">You have a new enquiry from your website!</p>
    </div>
    <div class="content">
      <div class="field">
        <div class="label">Name</div>
        <div class="value">${name}</div>
      </div>
      <div class="field">
        <div class="label">Business</div>
        <div class="value">${business}</div>
      </div>
      <div class="field">
        <div class="label">Email</div>
        <div class="value"><a href="mailto:${email}">${email}</a></div>
      </div>
      <div class="field">
        <div class="label">Phone / WhatsApp</div>
        <div class="value">
          <a href="tel:${phone}">${phone}</a>
        </div>
      </div>
      <div class="field">
        <div class="label">Package</div>
        <div class="value">${pkg || "Not specified"}</div>
      </div>
      <div class="field">
        <div class="label">Message</div>
        <div class="value">${message || "No message provided"}</div>
      </div>
      
      <div style="text-align: center; margin-top: 30px;">
        <a href="mailto:${email}" class="cta">📧 Reply via Email</a>
        <a href="https://wa.me/${phone.replace(/[^0-9]/g, "")}" class="cta">💬 WhatsApp</a>
        <a href="tel:${phone}" class="cta">📞 Call</a>
      </div>

      <div class="footer">
        <strong>Submitted:</strong> ${timestamp}<br>
        <strong>IP Address:</strong> ${clientIP}<br>
        <strong>Source:</strong> ORIK Webcraft Website
      </div>
    </div>
  </div>
</body>
</html>
      `.trim(),
    };

    console.log("📤 Sending email...");
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully:", info.messageId);

    return NextResponse.json(
      { 
        success: true, 
        message: "Enquiry sent successfully!",
        rateLimit: { remaining },
        messageId: info.messageId
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("❌ Error sending email:");
    console.error("Error name:", error.name);
    console.error("Error message:", error.message);
    console.error("Error code:", error.code);
    console.error("Full error:", error);
    
    return NextResponse.json(
      { 
        error: "Failed to send enquiry. Please try again or email us at orikwebcraft@gmail.com",
        details: error.message
      },
      { status: 500 }
    );
  }
}