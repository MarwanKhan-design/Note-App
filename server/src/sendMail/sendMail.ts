import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendOTPEmail(to: string, OTP: number) {
    try {
        const { data, error } = await resend.emails.send({
            from: "Notes App <onboarding@resend.dev>", // ✅ replace with a verified sender
            to: [to],
            subject: "OTP FOR NOTES INTERN PROJECT",
            html: `<p>Your OTP is <strong>${OTP}</strong></p>`,
        });

        if (error) {
            console.error("❌ Failed to send email:", error);
            console.error("❌ Resend error:", JSON.stringify(error, null, 2));
            throw new Error(error.message);

        }

        console.log("✅ Email sent:", data?.id);
    } catch (err) {
        console.error("❌ Unexpected email error:", err);
        throw err;
    }
}
