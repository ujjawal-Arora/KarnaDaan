import { transporter } from "./MailTranspoter.js";


async function sendWelcomeMail({email}) {
  const info = await transporter.sendMail({
    from: '"कर्ण Daan" <ujjawal.arora2004@gmail.com>', // Sender address
    to: email, // Recipient address
    subject: "Sucessfully Logined to  कर्ण Daan", // Subject line
    text: "WELCOME TO  कर्ण Daan?",
    html: `<html>
                <head>
                    <style>
                        @media only screen and (max-width: 600px) {
                            .main {
                                width: 320px !important;
                            }
                            .top-image {
                                width: 100% !important;
                            }
                            .inside-footer {
                                width: 320px !important;
                            }
                            table.contenttable {
                                width: 320px !important;
                                text-align: left !important;
                            }
                            td.force-col {
                                display: block !important;
                            }
                            td.rm-col {
                                display: none !important;
                            }
                            .mt {
                                margin-top: 15px !important;
                            }
                            *[class].width300 { 
                                width: 255px !important; 
                            }
                            *[class].block { 
                                display: block !important; 
                            }
                            *[class].blockcol { 
                                display: none !important; 
                            }
                            .emailButton {
                                width: 100% !important;
                            }
                            .emailButton a {
                                display: block !important;
                                font-size: 18px !important;
                            }
                        }
                    </style>
                </head>
                <body style="font-family: Arial, sans-serif; color: #555; margin: 0; padding: 0;">
                    <table class="main contenttable" align="center" style="font-weight: normal; border-collapse: collapse; border: 0; margin-left: auto; margin-right: auto; padding: 0; font-size: 16px; line-height: 26px; width: 600px; background-color: white;">
                        <tr>
                            <td class="border" style="border-collapse: collapse; border: 1px solid #eeeff0; padding: 0; color: #555; font-size: 16px; line-height: 26px;">
                                <table style="font-weight: normal; border-collapse: collapse; border: 0; margin: 0; padding: 0;">
                                    <tr>
                                        <td class="side title" style="border-collapse: collapse; border: 0; padding: 20px; color: #555; font-size: 16px; line-height: 26px; vertical-align: top; background-color: white;">
                                            <table style="font-weight: normal; border-collapse: collapse; border: 0; margin: 0; padding: 0;">
                                                <tr>
                                                    <td class="head-title" style="color: #333; font-size: 28px; line-height: 34px; font-weight: bold; text-align: center;">
                                                        Welcome to कर्ण Daan!
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="sub-title" style="color: #555; font-size: 18px; line-height: 29px; font-weight: bold; text-align: center;">
                                                        We're excited to have you on board!
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="top-padding" style="padding: 5px;"></td>
                                                </tr>
                                                <tr>
                                                    <td class="grey-block" style="color: #555; font-size: 16px; line-height: 26px; background-color: #f9f9f9; text-align: center;">                                                        <strong>What's next?</strong><br>
Explore our features, and get started with donating, requesting resources, or funding essential needs. <br><br>

                                                        <a href="https://fitwave-smartwave.netlify.app/" style="color: #ffffff; background-color: #FFAC1C; border: 10px solid #FFA500; border-radius: 3px; text-decoration: none; padding: 10px 20px; display: inline-block;">Get Started</a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="top-padding" style="padding: 15px 0;">
                                                        <hr size="1" color="#eeeff0">
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="text" style="color: #555; font-size: 16px; line-height: 26px;">
                                                       <p>Hello,</p>
<p>Welcome to कर्ण Daan! We’re excited to have you as part of our community dedicated to making a difference. Whether you’re here to donate resources, request support, or fund essential needs, our platform is here to connect you with those who care.</p>
<p>Take your time to explore the possibilities and see how you can contribute or receive the help you need. If you have any questions or need assistance, our support team is always ready to help.</p>
<p>Best regards,<br>The कर्ण Daan Team</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="text" style="text-align: center;">
                                                        <a href="https://your-platform-url.com/contact" style="color: #ffffff; background-color: #FFAC1C; border: 20px solid #FFA500; border-radius: 3px; text-decoration: none; padding: 10px 20px; display: inline-block;">Contact Us</a>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td valign="top" align="center" style="padding: 20px; font-size: 16px; line-height: 26px; background-color: #f9f9f9; text-align: center;">
                                            <table>
                                                <tr>
                                                    <td style="padding: 10px;">
                                                        <a href="https://x.com/Ujjawal43235783" style="color: #FFA500;">Twitter</a>
                                                    </td>
                                                    <td style="padding: 10px;">
                                                        <a href="https://www.linkedin.com/in/ujjawal-arora-9934b1261/" style="color: #FFA500;">Linked In</a>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr bgcolor="#fff" style="border-top: 4px solid #FFAC1C;">
                                        <td valign="top" class="footer" style="color: #555; font-size: 12px; line-height: 16px; text-align: center;">
                                            <table style="font-weight: normal; border-collapse: collapse; border: 0; margin: 0; padding: 0;">
                                                <tr>
                                                    <td class="inside-footer" align="center" valign="middle">
                                                        <div id="address">
                                                            <b>कर्ण Daan</b><br>
                                                            Sector 32 Mohali St.<br>
                                                
                                                            <a href="" style="color: #FFA500;">Contact Us</a>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </body>
            </html>`,
  });

  console.log("Message sent: %s", info.messageId);
}
export {sendWelcomeMail};

