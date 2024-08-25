import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ujjawal.arora2004@gmail.com",
    pass: "rfeatzmdoutiqwrg",
  },
});
export {transporter}