import { transporter } from "./MailTranspoter.js";

async function sendMail({userName,otp}) {
console.log(userName);
  const info = await transporter.sendMail({
    from: '"कर्ण Daan" ujjawal.arora2004@gmail.com', // Sender address
    to: userName, // Recipient address
    subject: "Your कर्ण Daan OTP Code", // Subject line
    text: `Your OTP code is: ${otp}`, // Plain text body
    html: `
      <html>
        <head>
          <style>
            @media only screen and (max-width: 600px) {
              .main {
                width: 320px !important;
              }
            }
          </style>
        </head>
        <body style="font-family: Arial, sans-serif; color: #555; margin: 0; padding: 0;">
          <table align="center" style="width: 600px; background-color: white; padding: 20px; border: 1px solid #eeeff0;">
            <tr>
              <td style="text-align: center; font-size: 24px; font-weight: bold; color: #333;">
                Your OTP Code
              </td>
            </tr>
            <tr>
              <td style="text-align: center; padding: 20px 0; font-size: 18px; color: #555;">
                <strong>${otp}</strong>
              </td>
            </tr>
            <tr>
              <td style="text-align: center; padding: 20px 0; color: #555; font-size: 16px;">
                Please enter this code to complete your authentication. The code is valid for 10 minutes.
              </td>
            </tr>
            <tr>
              <td style="text-align: center; padding: 20px 0; color: #999; font-size: 12px;">
                If you didn't request this OTP, please ignore this email.
              </td>
            </tr>
          </table>
        </body>
      </html>`,
  });

  console.log("Message sent: %s", info.messageId);
}

export default sendMail ;
