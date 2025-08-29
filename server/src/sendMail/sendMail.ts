import nodemailer from "nodemailer";

export async function sendOTPEmail(to: string, OTP: Number) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.GOOGLE_MAIL,
            pass: process.env.GOOGLE_APP_PASS, // use your Gmail App Password
        },
    });

    const mailOptions = {
        from: "your-email@gmail.com",
        to: to,                // 👈 dynamic email here
        subject: "OTP FOR NOTES INTERN PROJECT",      // 👈 dynamic subject
        text: `Your OTP is ${OTP}`,         // 👈 dynamic message
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent to:", to, "| Message ID:", info.messageId);
}

// Example usage:

