export const getWelcomeEmailHTML = (name, email) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Welcome</title>
    </head>
    <body style="margin:0;padding:0;background:#f4f7fb;font-family:Arial,Helvetica,sans-serif;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f4f7fb;padding:40px 0;">
        <tr>
          <td align="center">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 12px 40px rgba(15,23,42,0.12);">
              <tr>
                <td style="background:linear-gradient(135deg,#0f172a 0%,#2563eb 50%,#22c55e 100%);padding:48px 40px;text-align:center;">
                  <div style="display:inline-block;width:72px;height:72px;line-height:72px;border-radius:18px;background:rgba(255,255,255,0.14);color:#fff;font-size:34px;font-weight:bold;margin-bottom:18px;">W</div>
                  <h1 style="margin:0;color:#ffffff;font-size:34px;line-height:1.2;font-weight:800;">Welcome aboard!</h1>
                  <p style="margin:14px 0 0;color:rgba(255,255,255,0.9);font-size:16px;line-height:1.7;">Your account has been created successfully.</p>
                </td>
              </tr>
              <tr>
                <td style="padding:40px;">
                  <h2 style="margin:0 0 16px;color:#0f172a;font-size:24px;line-height:1.3;">Hi there, ${name || "Friend"} 👋</h2>
                  <p style="margin:0 0 18px;color:#334155;font-size:16px;line-height:1.8;">Thanks for joining us. We're excited to have you here. You can now sign in, explore the platform, and start using your new account right away.</p>
                  <table role="presentation" cellspacing="0" cellpadding="0" style="margin:28px 0;">
                    <tr>
                      <td style="background:#2563eb;border-radius:12px;">
                        <a href="#" style="display:inline-block;padding:14px 26px;color:#ffffff;text-decoration:none;font-size:15px;font-weight:700;">Get Started</a>
                      </td>
                    </tr>
                  </table>
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:14px;">
                    <tr>
                      <td style="padding:18px 20px;">
                        <p style="margin:0;color:#0f172a;font-size:14px;line-height:1.7;"><strong style="color:#2563eb;">Email:</strong> ${email}</p>
                      </td>
                    </tr>
                  </table>
                  <p style="margin:28px 0 0;color:#64748b;font-size:14px;line-height:1.8;">If you did not create this account, you can safely ignore this email.</p>
                </td>
              </tr>
              <tr>
                <td style="padding:22px 40px;background:#f8fafc;border-top:1px solid #e2e8f0;text-align:center;">
                  <p style="margin:0;color:#94a3b8;font-size:12px;line-height:1.6;">© ${new Date().getFullYear()} Your Website. All rights reserved.</p>
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
      <title>Verify Your Account</title>
    </head>
    <body style="margin:0;padding:0;background:#f4f7fb;font-family:Arial,Helvetica,sans-serif;">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f4f7fb;padding:40px 0;">
        <tr>
          <td align="center">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 12px 40px rgba(15,23,42,0.12);">
              <tr>
                <td style="background:linear-gradient(135deg,#0f172a 0%,#2563eb 50%,#22c55e 100%);padding:48px 40px;text-align:center;">
                  <div style="display:inline-block;width:72px;height:72px;line-height:72px;border-radius:18px;background:rgba(255,255,255,0.14);color:#fff;font-size:34px;font-weight:bold;margin-bottom:18px;">🔐</div>
                  <h1 style="margin:0;color:#ffffff;font-size:34px;line-height:1.2;font-weight:800;">Verify Your Account</h1>
                  <p style="margin:14px 0 0;color:rgba(255,255,255,0.9);font-size:16px;line-height:1.7;">Enter the code below to verify your account.</p>
                </td>
              </tr>
              <tr>
                <td style="padding:40px;">
                  <h2 style="margin:0 0 16px;color:#0f172a;font-size:24px;line-height:1.3;">Hi ${name || "Friend"} 👋</h2>
                  <p style="margin:0 0 24px;color:#334155;font-size:16px;line-height:1.8;">We've received a request to verify your account. Use the One-Time Password (OTP) below to complete the verification process.</p>
                  
                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:32px 0;">
                    <tr>
                      <td align="center">
                        <table role="presentation" cellspacing="0" cellpadding="0" style="background:linear-gradient(135deg,#2563eb 0%,#1d4ed8 100%);border-radius:14px;border:2px solid #1d4ed8;">
                          <tr>
                            <td style="padding:20px 32px;text-align:center;">
                              <p style="margin:0;color:#ffffff;font-size:32px;font-weight:900;letter-spacing:6px;font-family:'Courier New',monospace;">${otp}</p>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>

                  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#fef3c7;border-left:4px solid #f59e0b;border-radius:8px;">
                    <tr>
                      <td style="padding:16px 20px;">
                        <p style="margin:0;color:#92400e;font-size:14px;line-height:1.6;"><strong>⏱️ This code expires in 24 hours</strong></p>
                      </td>
                    </tr>
                  </table>

                  <p style="margin:24px 0 0;color:#64748b;font-size:14px;line-height:1.8;">If you didn't request this verification code, please ignore this email or contact our support team.</p>
                  
                  <p style="margin:16px 0 0;color:#64748b;font-size:14px;line-height:1.8;"><strong>⚠️ Never share this code with anyone.</strong> We will never ask for this code via email or phone.</p>
                </td>
              </tr>
              <tr>
                <td style="padding:22px 40px;background:#f8fafc;border-top:1px solid #e2e8f0;text-align:center;">
                  <p style="margin:0;color:#94a3b8;font-size:12px;line-height:1.6;">© ${new Date().getFullYear()} Your Website. All rights reserved.</p>
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