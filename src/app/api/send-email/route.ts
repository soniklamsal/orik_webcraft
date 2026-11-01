import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Hardcoded email configuration
const EMAIL_CONFIG = {
  host: "smtp.gmail.com",
  port: 587,
  user: "soniklamsal111@gmail.com",
  password: "crgmsxzetzzwyfbc",
  notificationEmail: "soniklamsal111@gmail.com",
};

// Rate limiting map
const ipRequestMap = new Map<string, { count: number; resetTime: number }>();

function getRateLimitInfo(ip: string) {
  const now = Date.now();
  const info = ipRequestMap.get(ip);

  if (!info || now > info.resetTime) {
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

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    console.log("🔧 Creating email transporter...");

    const transporter = nodemailer.createTransport({
      host: EMAIL_CONFIG.host,
      port: EMAIL_CONFIG.port,
      secure: false,
      auth: {
        user: EMAIL_CONFIG.user,
        pass: EMAIL_CONFIG.password,
      },
    });

    console.log("🔍 Verifying SMTP connection...");
    await transporter.verify();
    console.log("✅ SMTP verified");

    const timestamp = new Date().toLocaleString("en-US", { 
      timeZone: "Asia/Kathmandu",
      dateStyle: "full",
      timeStyle: "long"
    });

    const phoneClean = phone.replace(/[^0-9]/g, "");

    const mailOptions = {
      from: `"ORIK Webcraft" <${EMAIL_CONFIG.user}>`,
      to: EMAIL_CONFIG.notificationEmail,
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
Submitted: ${timestamp}
IP: ${clientIP}
      `.trim(),
      html: `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>New Enquiry - ORIK Webcraft</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f4f4f4;">
  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f4f4f4; padding: 40px 0;">
    <tr>
      <td align="center">
        <!-- Main Container -->
        <table border="0" cellpadding="0" cellspacing="0" width="600" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #008454 0%, #00683e 100%); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600; letter-spacing: -0.5px;">
                🎉 New Contact Form Submission
              </h1>
              <p style="margin: 15px 0 0 0; color: rgba(255,255,255,0.9); font-size: 16px; line-height: 1.5;">
                You have a new enquiry from your website!
              </p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              
              <!-- Name -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 20px; background-color: #f8f9fa; border-left: 4px solid #008454; border-radius: 6px;">
                <tr>
                  <td style="padding: 20px;">
                    <p style="margin: 0 0 8px 0; color: #008454; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
                      👤 NAME
                    </p>
                    <p style="margin: 0; color: #050038; font-size: 18px; font-weight: 500; line-height: 1.4;">
                      ${name}
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Business -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 20px; background-color: #f8f9fa; border-left: 4px solid #008454; border-radius: 6px;">
                <tr>
                  <td style="padding: 20px;">
                    <p style="margin: 0 0 8px 0; color: #008454; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
                      🏢 BUSINESS
                    </p>
                    <p style="margin: 0; color: #050038; font-size: 18px; font-weight: 500; line-height: 1.4;">
                      ${business}
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Email -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 20px; background-color: #f8f9fa; border-left: 4px solid #008454; border-radius: 6px;">
                <tr>
                  <td style="padding: 20px;">
                    <p style="margin: 0 0 8px 0; color: #008454; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
                      ✉️ EMAIL
                    </p>
                    <p style="margin: 0; color: #050038; font-size: 18px; font-weight: 500; line-height: 1.4;">
                      <a href="mailto:${email}" style="color: #008454; text-decoration: none; border-bottom: 2px solid #008454;">${email}</a>
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Phone -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 20px; background-color: #f8f9fa; border-left: 4px solid #008454; border-radius: 6px;">
                <tr>
                  <td style="padding: 20px;">
                    <p style="margin: 0 0 8px 0; color: #008454; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
                      📱 PHONE / WHATSAPP
                    </p>
                    <p style="margin: 0; color: #050038; font-size: 18px; font-weight: 500; line-height: 1.4;">
                      <a href="tel:${phone}" style="color: #008454; text-decoration: none; border-bottom: 2px solid #008454;">${phone}</a>
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Package -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 20px; background-color: #f8f9fa; border-left: 4px solid #008454; border-radius: 6px;">
                <tr>
                  <td style="padding: 20px;">
                    <p style="margin: 0 0 8px 0; color: #008454; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
                      📦 PACKAGE
                    </p>
                    <p style="margin: 0; color: #050038; font-size: 18px; font-weight: 500; line-height: 1.4;">
                      ${pkg || "Not specified"}
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Message -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 30px; background-color: #f8f9fa; border-left: 4px solid #008454; border-radius: 6px;">
                <tr>
                  <td style="padding: 20px;">
                    <p style="margin: 0 0 8px 0; color: #008454; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">
                      💬 MESSAGE
                    </p>
                    <p style="margin: 0; color: #050038; font-size: 16px; line-height: 1.6; white-space: pre-wrap;">
                      ${message || "No message provided"}
                    </p>
                  </td>
                </tr>
              </table>

              <!-- CTA Buttons -->
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top: 30px;">
                <tr>
                  <td align="center" style="padding: 20px 0;">
                    <table border="0" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding: 0 10px;">
                          <a href="mailto:${email}" style="display: inline-block; padding: 14px 28px; background-color: #008454; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 15px; box-shadow: 0 4px 12px rgba(0,132,84,0.3);">
                            📧 Reply via Email
                          </a>
                        </td>
                        <td style="padding: 0 10px;">
                          <a href="https://wa.me/${phoneClean}" style="display: inline-block; padding: 14px 28px; background-color: #25D366; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 15px; box-shadow: 0 4px 12px rgba(37,211,102,0.3);">
                            💬 WhatsApp
                          </a>
                        </td>
                        <td style="padding: 0 10px;">
                          <a href="tel:${phone}" style="display: inline-block; padding: 14px 28px; background-color: #0066cc; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 15px; box-shadow: 0 4px 12px rgba(0,102,204,0.3);">
                            📞 Call
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 30px; background-color: #f8f9fa; border-top: 2px solid #e0e0e0;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center">
                    <p style="margin: 0 0 10px 0; color: #666666; font-size: 13px; line-height: 1.6;">
                      <strong style="color: #008454;">Submitted:</strong> ${timestamp}
                    </p>
                    <p style="margin: 0; color: #999999; font-size: 12px;">
                      IP Address: ${clientIP} • Source: ORIK Webcraft Website
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
        <!-- End Main Container -->
      </td>
    </tr>
  </table>
</body>
</html>
      `.trim(),
    };

    console.log("📤 Sending email...");
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent:", info.messageId);

    return NextResponse.json(
      { 
        success: true, 
        message: "Enquiry sent successfully!",
        rateLimit: { remaining }
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("❌ Email error:", error.message);
    
    return NextResponse.json(
      { 
        error: "Failed to send enquiry. Please email us at orikwebcraft@gmail.com"
      },
      { status: 500 }
    );
  }
}