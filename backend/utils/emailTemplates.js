export const getWelcomeEmailHTML = (name, email) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Welcome to AUTH-R18</title>
    </head>
    <body style="margin:0;padding:0;background:#0a0a0a;font-family:Arial,Helvetica,sans-serif;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#0a0a0a;padding:40px 0;">
        <tr>
          <td align="center">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;background:#1a1a1a;border-radius:20px;overflow:hidden;box-shadow:0 12px 40px rgba(250,204,21,0.2);border:1px solid #fbbf24;">
              <tr>
                <td style="background:linear-gradient(135deg,#1a1a1a 0%,#2d2d2d 100%);padding:48px 40px;text-align:center;border-bottom:2px solid #fbbf24;">
                  <div style="display:inline-block;margin-bottom:18px;">
                    <img src="https://i.ibb.co/pjPRyBfC/logo-white.png" alt="AUTH-R18" style="width:60px;height:60px;" />
                  </div>
                  <h1 style="margin:0;color:#fbbf24;font-size:34px;line-height:1.2;font-weight:800;">Welcome to AUTH-R18</h1>
                  <p style="margin:14px 0 0;color:#e5e5e5;font-size:16px;line-height:1.7;">Your account has been created successfully.</p>
                </td>
              </tr>
              <tr>
                <td style="padding:40px;">
                  <h2 style="margin:0 0 16px;color:#fbbf24;font-size:24px;line-height:1.3;">Hi ${name || "Friend"},</h2>
                  <p style="margin:0 0 18px;color:#d0d0d0;font-size:16px;line-height:1.8;">Thanks for joining AUTH-R18. We're excited to have you here.</p>
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#2d2d2d;border:1px solid #fbbf24;border-radius:14px;">
                    <tr>
                      <td style="padding:18px 20px;">
                        <p style="margin:0;color:#e5e5e5;font-size:14px;line-height:1.7;"><strong style="color:#fbbf24;">Email:</strong> ${email}</p>
                      </td>
                    </tr>
                  </table>
                  <p style="margin:28px 0 0;color:#a0a0a0;font-size:14px;line-height:1.8;">If you did not create this account, you can safely ignore this email.</p>
                </td>
              </tr>
              <tr>
                <td style="padding:22px 40px;background:#2d2d2d;border-top:1px solid #fbbf24;text-align:center;">
                  <p style="margin:0;color:#808080;font-size:12px;line-height:1.6;">© AUTH-R18.</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
};

export const getOtpEmailHTML = (name, otp) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Verify Your AUTH-R18 Account</title>
    </head>
    <body style="margin:0;padding:0;background:#0a0a0a;font-family:Arial,Helvetica,sans-serif;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#0a0a0a;padding:40px 0;">
        <tr>
          <td align="center">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;background:#1a1a1a;border-radius:20px;overflow:hidden;box-shadow:0 12px 40px rgba(250,204,21,0.2);border:1px solid #fbbf24;">
              <tr>
                <td style="background:linear-gradient(135deg,#1a1a1a 0%,#2d2d2d 100%);padding:48px 40px;text-align:center;border-bottom:2px solid #fbbf24;">
                  <div style="display:inline-block;margin-bottom:18px;">
                    <img src="https://i.ibb.co/pjPRyBfC/logo-white.png" alt="AUTH-R18" style="width:60px;height:60px;" />
                  </div>
                  <h1 style="margin:0;color:#fbbf24;font-size:34px;line-height:1.2;font-weight:800;">Verify Your Account</h1>
                </td>
              </tr>
              <tr>
                <td style="padding:40px;">
                  <h2 style="margin:0 0 16px;color:#fbbf24;font-size:24px;line-height:1.3;">Hi ${name || "Friend"},</h2>
                  <p style="margin:0 0 24px;color:#d0d0d0;font-size:16px;line-height:1.8;">We've received a request to verify your account. Use the One-Time Password (OTP) below to complete the verification process.</p>
                  
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:32px 0;">
                    <tr>
                      <td align="center">
                        <table role="presentation" cellspacing="0" cellpadding="0" style="background:linear-gradient(135deg,#fbbf24 0%,#f59e0b 100%);border-radius:14px;border:2px solid #fbbf24;">
                          <tr>
                            <td style="padding:20px 32px;text-align:center;">
                              <p style="margin:0;color:#000000;font-size:32px;font-weight:900;letter-spacing:6px;font-family:'Courier New',monospace;">${otp}</p>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>

                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#2d2d2d;border-left:4px solid #fbbf24;border-radius:8px;">
                    <tr>
                      <td style="padding:16px 20px;">
                        <p style="margin:0;color:#fbbf24;font-size:14px;line-height:1.6;"><strong>⏱️ This code expires in 24 hours</strong></p>
                      </td>
                    </tr>
                  </table>

                  <p style="margin:24px 0 0;color:#a0a0a0;font-size:14px;line-height:1.8;">If you didn't request this verification code, please ignore this email </p>
                  
                  <p style="margin:16px 0 0;color:#a0a0a0;font-size:14px;line-height:1.8;"><strong>Never share this code with anyone.</strong></p>
                </td>
              </tr>
              <tr>
                <td style="padding:22px 40px;background:#2d2d2d;border-top:1px solid #fbbf24;text-align:center;">
                  <p style="margin:0;color:#808080;font-size:12px;line-height:1.6;">© AUTH-R18.</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
};