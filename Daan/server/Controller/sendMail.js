import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service:'gmail',
    auth: {
      user: "ujjawal.arora2004@gmail.com",
      pass: "rfeatzmdoutiqwrg"
    },
  });
  async function main() {
    const info = await transporter.sendMail({
      from: '"ujjawal.arora2004@gmail.com',
      to: "ujjawal.arora4812@gmail.com", 
      subject: "Hello ✔",
      text: "Hello world?", 
      html: "<b>Hello world?</b>", 
    });
  
    console.log("Message sent: %s", info.messageId);
  }
  
  main().catch(console.error);
