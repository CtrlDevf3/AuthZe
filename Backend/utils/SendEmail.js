import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
});

const sendOTPEmailHTML = (otp) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
        
        body { margin: 0; padding: 0; background-color: #f9fafb; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
        .wrapper { width: 100%; padding: 40px 0; background-color: #f9fafb; }
        .container { max-width: 520px; margin: 0 auto; background-color: #ffffff; border: 1px solid #edf2f7; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
        .header { padding: 32px; text-align: center; border-bottom: 1px solid #f3f4f6; }
        .logo-text { font-size: 24px; font-weight: 800; color: #111827; letter-spacing: -1px; text-decoration: none; }
        .content { padding: 40px 32px; text-align: center; }
        .title { margin-bottom: 8px; font-size: 22px; font-weight: 700; color: #111827; }
        .subtitle { font-size: 15px; line-height: 24px; color: #4b5563; margin-bottom: 32px; }
        
        /* Premium OTP Box */
        .otp-wrapper { background-color: #f8fafc; border-radius: 12px; padding: 24px; margin: 0 auto 32px; display: inline-block; width: 80%; border: 1px solid #e2e8f0; }
        .otp-code { font-family: 'Courier New', Courier, monospace; font-size: 42px; font-weight: 700; color: #f59e0b; letter-spacing: 12px; margin: 0; padding-left: 12px; }
        
        .timer { font-size: 13px; color: #9ca3af; margin-top: 12px; font-weight: 500; }
        .security-note { font-size: 13px; color: #6b7280; line-height: 20px; padding: 20px; background-color: #fffbeb; border-radius: 8px; margin-top: 24px; text-align: left; border-left: 4px solid #f59e0b; }
        .footer { padding: 32px; text-align: center; background-color: #ffffff; }
        .footer-text { font-size: 12px; color: #9ca3af; line-height: 18px; }
    </style>
</head>
<body>
    <div class="wrapper">
        <div class="container">
            <div class="header">
                 <div class="logo-text">AuthZe</div>
            </div>
            <div class="content">
                <h2 class="title">Verification required</h2>
                <p class="subtitle">Enter the following code to secure your account and proceed with the login session.</p>
                
                <div class="otp-wrapper">
                    <div class="otp-code">${otp}</div>
                    <div class="timer">This code expires in 5 minutes</div>
                </div>

                <div class="security-note">
                    <strong>Security Notice:</strong> If you did not initiate this request, someone may be trying to access your account. Please update your security settings immediately.
                </div>
            </div>
            <div class="footer">
                <p class="footer-text">
                    &copy; 2024 <strong>AuthZe Inc.</strong> Precision in Security.<br>
                    Global HQ: 123 Tech Plaza, Silicon Valley, CA.
                </p>
            </div>
        </div>
    </div>
</body>
</html>
`;

export const sendOTPEmail = async (email, otp) => {
    try {
        await transporter.sendMail({
            from: `"AuthZe Security" <${process.env.MAIL_USER}>`,
            to: email,
            subject: `${otp} is your verification code`,
            html: sendOTPEmailHTML(otp)
        });
        console.log("Premium OTP email delivered.");
    } catch (error) {
        console.error("Failed to deliver premium OTP email:", error.message);
    }
};