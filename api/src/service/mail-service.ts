import nodemailer, { Transporter } from "nodemailer";
import config from "@/config";

const templates = {
  emailVerification: {
    subject: "Verify your email",
    html: `
          <html>
            <head>
              <style> 
                .wrapper {
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                  width: 60%;
                  margin: 0 auto;
                }
                .code {
                  text-align: center;
                  font-size: 24px;
                  font-weight: bold;
                  letter-spacing: 20px;
                  color: #0B6BCB; 
                }

                h3 {
                  color: #9fa6ad
                }
              </style>
            </head>
            <body>
              <div class="wrapper">
                <div>
                  <h1>Login code</h1>
                  <h3>Here is your login approval code:</h3>
                  <div class="code">{{= code }}</div>
                </div>
              </div>
            </body>
          </html>
        `,
  },

  resetPassword: {
    subject: "Reset password email",
    html: `
          <div style="width: 60%; margin: 0 auto;">
            <h1>If you would like to change account password, please follow the link</h1>
            <a href="{{= url }}">Reset password</a>
          </div>
        `,
  },
};

class MailService {
  _transporter: Transporter;

  constructor() {
    this._transporter = nodemailer.createTransport({
      host: config.SMTP_HOST,
      port: config.SMTP_PORT,
      secure: false,
      auth: {
        user: config.SMTP_USER,
        pass: config.SMTP_PASSWORD,
      },
    });
  }

  async _send(email: string, subject: string, html: string) {
    await this._transporter.sendMail({
      // from: `"${config.EMAIL_FROM}" <${config.EMAIL_NO_REPLY}>`,
      from: process.env.SMTP_USER,
      to: email, // list of receivers
      subject,
      html,
    });
  }

  async sendEmail(email: string, key: keyof typeof templates, args: object) {
    let html = "";
    const template = templates[key];

    if (!template) return;

    Object.entries(args).forEach(([key, value]) => {
      html = template.html.replace(`{{= ${key} }}`, String(value));
    });

    this._send(email, template.subject, html);
  }
}

export default new MailService();
