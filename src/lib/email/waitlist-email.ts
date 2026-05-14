// src/lib/email/waitlist-email.ts
// Branded HTML confirmation email sent on waitlist signup.

export function waitlistEmailHTML(firstName: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>You're on the QuickQuo early access list</title>
</head>
<body style="margin:0;padding:0;background:#050508;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#050508;padding:48px 0;">
  <tr>
    <td align="center">
      <table width="540" cellpadding="0" cellspacing="0" border="0"
             style="max-width:540px;width:100%;padding:0 20px;">

        <!-- LOGO -->
        <tr>
          <td style="padding-bottom:36px;text-align:center;">
            <table cellpadding="0" cellspacing="0" border="0" style="display:inline-table;">
              <tr>
                <td style="width:32px;height:32px;border-radius:8px;
                           background:linear-gradient(135deg,#8b5cf6,#7c3aed);
                           text-align:center;vertical-align:middle;">
                  <span style="font-size:16px;font-weight:800;color:white;line-height:32px;">Q</span>
                </td>
                <td style="padding-left:9px;font-size:18px;font-weight:700;
                           color:#ededf5;letter-spacing:-0.5px;vertical-align:middle;">
                  Quick<span style="color:#a78bfa;">Quo</span>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- MAIN CARD -->
        <tr>
          <td style="background:#0e0e1c;border:1px solid rgba(255,255,255,0.07);
                     border-radius:16px;padding:44px 44px 40px;">

            <!-- Emoji -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td align="center" style="padding-bottom:24px;font-size:48px;line-height:1;">
                  🎉
                </td>
              </tr>
            </table>

            <!-- Headline -->
            <h1 style="margin:0 0 12px;font-size:28px;font-weight:700;
                       color:#ededf5;text-align:center;letter-spacing:-0.5px;line-height:1.2;">
              You're on the list, ${firstName}!
            </h1>
            <p style="margin:0 0 32px;font-size:15px;color:rgba(255,255,255,0.5);
                      text-align:center;line-height:1.7;">
              Welcome to QuickQuo early access. You're one of the first
              trades businesses to sign up — and you've locked in some
              good stuff.
            </p>

            <!-- Divider -->
            <div style="height:1px;background:rgba(255,255,255,0.06);margin:0 0 32px;"></div>

            <!-- What you've locked in -->
            <p style="margin:0 0 18px;font-size:11px;font-weight:700;letter-spacing:1.5px;
                      text-transform:uppercase;color:rgba(255,255,255,0.3);">
              WHAT YOU'VE LOCKED IN
            </p>

            <!-- Benefit rows -->
            ${benefit('✓', '#8b5cf6',
              '2 weeks completely free',
              'Full platform access from day one. No credit card, no catch.')}
            ${benefit('⚡', '#8b5cf6',
              'Early beta access',
              "You'll use QuickQuo before the public launch — and shape the product.")}
            ${benefit('🎯', '#8b5cf6',
              'Priority onboarding',
              'Personal setup support to get your account live and capturing leads fast.')}

            <!-- Divider -->
            <div style="height:1px;background:rgba(255,255,255,0.06);margin:28px 0;"></div>

            <!-- Body copy -->
            <p style="margin:0 0 8px;font-size:14px;color:rgba(255,255,255,0.5);line-height:1.75;">
              QuickQuo automatically handles your
              <strong style="color:#ededf5;">missed calls</strong>,
              generates <strong style="color:#ededf5;">AI-drafted quotes</strong>,
              sends <strong style="color:#ededf5;">WhatsApp follow-ups</strong>,
              and collects <strong style="color:#ededf5;">Google reviews</strong>
              — so you can focus on the work that earns money.
            </p>

            <!-- CTA button -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0"
                   style="margin-top:32px;">
              <tr>
                <td align="center">
                  <a href="https://quickquo.co.uk"
                     style="display:inline-block;
                            background:linear-gradient(135deg,#8b5cf6,#7c3aed);
                            color:white;font-size:15px;font-weight:700;
                            padding:14px 36px;border-radius:10px;
                            text-decoration:none;letter-spacing:-0.2px;">
                    Visit QuickQuo →
                  </a>
                </td>
              </tr>
            </table>

          </td>
        </tr>

        <!-- FOOTER -->
        <tr>
          <td style="padding:28px 0 0;text-align:center;">
            <p style="margin:0 0 6px;font-size:12px;color:rgba(255,255,255,0.2);">
              QuickQuo Ltd &nbsp;·&nbsp;
              <a href="mailto:hello@quickquo.co.uk"
                 style="color:rgba(255,255,255,0.25);text-decoration:none;">
                hello@quickquo.co.uk
              </a>
            </p>
            <p style="margin:0;font-size:11.5px;color:rgba(255,255,255,0.15);">
              You received this because you joined the QuickQuo waiting list.&nbsp;
              <a href="https://quickquo.co.uk/unsubscribe"
                 style="color:rgba(255,255,255,0.25);text-decoration:underline;">
                Unsubscribe
              </a>
            </p>
          </td>
        </tr>

      </table>
    </td>
  </tr>
</table>
</body>
</html>`
}

// ── Helper: benefit row ───────────────────────────────────
function benefit(
  icon: string,
  iconColor: string,
  title: string,
  desc: string
): string {
  return `
    <table width="100%" cellpadding="0" cellspacing="0" border="0"
           style="margin-bottom:14px;">
      <tr>
        <td style="width:38px;height:38px;vertical-align:middle;
                   background:rgba(139,92,246,0.12);
                   border:1px solid rgba(139,92,246,0.22);
                   border-radius:9px;text-align:center;
                   font-size:16px;line-height:38px;">
          ${icon}
        </td>
        <td style="padding-left:14px;vertical-align:middle;">
          <div style="font-size:14px;font-weight:600;color:#ededf5;margin-bottom:2px;">
            ${title}
          </div>
          <div style="font-size:12.5px;color:rgba(255,255,255,0.4);line-height:1.5;">
            ${desc}
          </div>
        </td>
      </tr>
    </table>`
}
