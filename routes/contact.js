const express = require('express');
const router = express.Router();
const { Resend } = require('resend');

// @route   POST /api/contact
// @desc    Send contact form email via Resend
// @access  Public
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Basic validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required.',
      });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey || apiKey === 'your_resend_api_key_here') {
      console.warn('RESEND_API_KEY not configured.');
      return res.status(503).json({ success: false, message: 'Email service not configured yet.' });
    }

    const resend = new Resend(apiKey);
    const recipientEmail = process.env.CONTACT_EMAIL || process.env.ADMIN_EMAIL;

    if (!recipientEmail) {
      return res.status(500).json({
        success: false,
        message: 'Server email configuration is missing.',
      });
    }

    const now = new Date().toLocaleString('en-US', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
      hour: '2-digit', minute: '2-digit', timeZoneName: 'short'
    });

    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: [recipientEmail],
      replyTo: email,
      subject: `✉ New Message: ${subject}`,
      html: `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#111110;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#111110;padding:40px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <!-- Header Bar -->
        <tr>
          <td style="background:#C2340A;padding:4px 32px;">
            <p style="margin:0;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.25em;color:#fff;line-height:28px;">
              Portfolio — New Message Received
            </p>
          </td>
        </tr>

        <!-- Main Card -->
        <tr>
          <td style="background:#1A1A18;border:1px solid #2B2B28;border-top:none;padding:36px 32px 32px;">

            <!-- Subject -->
            <h1 style="margin:0 0 28px 0;font-size:26px;font-weight:900;color:#F0EDE6;letter-spacing:-0.02em;line-height:1.2;text-transform:uppercase;">
              ${subject}
            </h1>

            <!-- Sender Info -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;border:1px solid #2B2B28;">
              <tr>
                <td style="padding:12px 16px;background:#111110;border-bottom:1px solid #2B2B28;width:90px;">
                  <span style="font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:0.2em;color:#5C5C57;">From</span>
                </td>
                <td style="padding:12px 16px;background:#111110;border-bottom:1px solid #2B2B28;">
                  <span style="font-size:15px;color:#F0EDE6;font-weight:600;">${name}</span>
                </td>
              </tr>
              <tr>
                <td style="padding:12px 16px;background:#111110;">
                  <span style="font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:0.2em;color:#5C5C57;">Email</span>
                </td>
                <td style="padding:12px 16px;background:#111110;">
                  <a href="mailto:${email}" style="font-size:15px;color:#C2340A;text-decoration:none;font-weight:500;">${email}</a>
                </td>
              </tr>
            </table>

            <!-- Message -->
            <div style="margin-bottom:32px;">
              <p style="margin:0 0 10px 0;font-size:9px;font-weight:700;text-transform:uppercase;letter-spacing:0.2em;color:#5C5C57;">Message</p>
              <div style="background:#111110;border:1px solid #2B2B28;border-left:3px solid #C2340A;padding:20px 20px 20px 20px;">
                <p style="margin:0;font-size:15px;line-height:1.75;color:#D0CCC4;white-space:pre-wrap;">${message}</p>
              </div>
            </div>

            <!-- CTA Button -->
            <table cellpadding="0" cellspacing="0">
              <tr>
                <td style="background:#C2340A;">
                  <a href="mailto:${email}?subject=Re: ${subject}" style="display:inline-block;padding:12px 28px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.18em;color:#fff;text-decoration:none;">
                    Reply to ${name} →
                  </a>
                </td>
              </tr>
            </table>

          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding:20px 32px;border:1px solid #2B2B28;border-top:none;background:#0D0D0B;">
            <p style="margin:0;font-size:10px;color:#3A3A38;text-transform:uppercase;letter-spacing:0.12em;">
               ${now}
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(500).json({ success: false, message: 'Failed to send email.' });
    }

    console.log('Email sent:', data);
    res.json({ success: true, message: 'Message sent successfully.' });
  } catch (error) {
    console.error('Contact route error:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

module.exports = router;
