import express from 'express';
import nodemailer from 'nodemailer';

const router = express.Router();

// Simple in-memory rate limiter per IP (prevents spam abuse without a database)
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

// Middleware for in-memory rate limiting
function contactRateLimiter(req, res, next) {
  const ip = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
  const now = Date.now();
  const userRecord = rateLimitMap.get(ip);

  if (userRecord) {
    if (now - userRecord.startTime < RATE_LIMIT_WINDOW_MS) {
      if (userRecord.count >= MAX_REQUESTS_PER_WINDOW) {
        return res.status(429).json({
          success: false,
          error: 'Too Many Requests',
          message: 'Rate limit exceeded. Please wait 15 minutes before submitting another message.'
        });
      }
      userRecord.count += 1;
    } else {
      rateLimitMap.set(ip, { count: 1, startTime: now });
    }
  } else {
    rateLimitMap.set(ip, { count: 1, startTime: now });
  }

  // Periodic cleanup of stale rate limiter records
  if (rateLimitMap.size > 1000) {
    for (const [key, val] of rateLimitMap.entries()) {
      if (now - val.startTime > RATE_LIMIT_WINDOW_MS) {
        rateLimitMap.delete(key);
      }
    }
  }

  next();
}

// Basic email validation regex
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

// Sanitize helper to prevent script injection / XSS
function sanitize(input = '') {
  return String(input)
    .trim()
    .replace(/[<>]/g, '');
}

/**
 * @route   POST /api/contact
 * @desc    Accept and validate contact form submissions (No Database)
 * @access  Public
 */
router.post('/', contactRateLimiter, async (req, res, next) => {
  try {
    const rawName = req.body.name;
    const rawEmail = req.body.email;
    const rawSubject = req.body.subject || 'Portfolio Inquiry';
    const rawMessage = req.body.message;

    const errors = {};

    // 1. Name Validation
    if (!rawName || typeof rawName !== 'string' || !rawName.trim()) {
      errors.name = 'Full name is required.';
    } else if (rawName.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters long.';
    } else if (rawName.trim().length > 100) {
      errors.name = 'Name cannot exceed 100 characters.';
    }

    // 2. Email Validation
    if (!rawEmail || typeof rawEmail !== 'string' || !rawEmail.trim()) {
      errors.email = 'Valid email address is required.';
    } else if (!EMAIL_REGEX.test(rawEmail.trim())) {
      errors.email = 'Please provide a valid email format (e.g., you@domain.com).';
    } else if (rawEmail.trim().length > 120) {
      errors.email = 'Email address is too long.';
    }

    // 3. Message Validation
    if (!rawMessage || typeof rawMessage !== 'string' || !rawMessage.trim()) {
      errors.message = 'Message text is required.';
    } else if (rawMessage.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters long.';
    } else if (rawMessage.trim().length > 3000) {
      errors.message = 'Message cannot exceed 3000 characters.';
    }

    // If validation fails, return 400 with field-specific errors
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        success: false,
        error: 'Validation Error',
        message: 'Please review and correct the highlighted fields.',
        errors
      });
    }

    // Sanitize validated inputs
    const cleanData = {
      name: sanitize(rawName),
      email: sanitize(rawEmail).toLowerCase(),
      subject: sanitize(rawSubject),
      message: sanitize(rawMessage),
      receivedAt: new Date().toISOString()
    };

    // Optional email dispatch check
    const isEmailConfigured = Boolean(
      process.env.SMTP_HOST &&
      process.env.SMTP_PORT &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS &&
      process.env.CONTACT_EMAIL
    );

    if (isEmailConfigured) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT) || 587,
          secure: process.env.SMTP_SECURE === 'true',
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
          }
        });

        await transporter.sendMail({
          from: `"Portfolio Contact Form" <${process.env.SMTP_USER}>`,
          to: process.env.CONTACT_EMAIL,
          replyTo: cleanData.email,
          subject: `Portfolio Contact: ${cleanData.subject} (from ${cleanData.name})`,
          text: `Name: ${cleanData.name}\nEmail: ${cleanData.email}\nSubject: ${cleanData.subject}\n\nMessage:\n${cleanData.message}\n\nSent: ${cleanData.receivedAt}`,
          html: `
            <h3>New Contact Submission from Portfolio</h3>
            <p><strong>Name:</strong> ${cleanData.name}</p>
            <p><strong>Email:</strong> ${cleanData.email}</p>
            <p><strong>Subject:</strong> ${cleanData.subject}</p>
            <p><strong>Message:</strong></p>
            <blockquote style="background:#f4f4f5;padding:12px;border-left:4px solid #8b5cf6;">
              ${cleanData.message.replace(/\n/g, '<br/>')}
            </blockquote>
            <p style="color:#71717a;font-size:12px;">Submitted at ${cleanData.receivedAt} • Sent via Portfolio Express Backend</p>
          `
        });

        return res.status(200).json({
          success: true,
          delivered: true,
          databaseSaved: false,
          message: 'Thank you! Your message was validated and forwarded directly to Nagamounika via email.',
          submission: {
            name: cleanData.name,
            email: cleanData.email,
            subject: cleanData.subject,
            receivedAt: cleanData.receivedAt
          }
        });
      } catch (mailError) {
        console.error('Email transport failed:', mailError.message);
        return res.status(200).json({
          success: true,
          delivered: false,
          databaseSaved: false,
          message: 'Submission validated successfully! Note: Email delivery service encountered an issue, but your submission passed all client and server validations.',
          submission: {
            name: cleanData.name,
            email: cleanData.email,
            receivedAt: cleanData.receivedAt
          }
        });
      }
    }

    // Default response when no email service is configured
    return res.status(200).json({
      success: true,
      delivered: false,
      databaseSaved: false,
      message: 'Message received and validated successfully! Note: No email provider is configured in this environment and this server uses no database, so your message was processed in-memory but not permanently stored.',
      submission: {
        name: cleanData.name,
        email: cleanData.email,
        subject: cleanData.subject,
        characterCount: cleanData.message.length,
        receivedAt: cleanData.receivedAt
      }
    });

  } catch (error) {
    next(error);
  }
});

export default router;

