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