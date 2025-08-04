import { Resend } from "resend";
import dotenv from "dotenv";
dotenv.config();
const resend = new Resend(process.env.RESEND_API);
if (!process.env.RESEND_API) {
  throw new Error("RESEND_API is not defined in .env file");
}
const sendemail = async ({ sendto, subject, html }) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "Lensify<onboarding@resend.dev>",
      to: sendto,
      subject: subject,
      html: html,
    });
    if (error) {
      return console.error({ error });
    }
    return data;
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export default sendemail;
