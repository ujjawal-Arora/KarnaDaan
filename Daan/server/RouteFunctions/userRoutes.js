import { SignUpSchema, SigninSchema } from "../Zod/zod.js";
import User from "../models/userModel.js";
import storeotp from "../Session/storeOtp.js";
import sendMail from "../Controller/sendOtpMail.js";

const SignUp = async (req, res) => {
  const body = req.body;
  console.log(body);
  const { success } = SignUpSchema.safeParse(body);
  console.log(success);

  if (!success) return res.status(400).json({ error: "zod error" });
  const { userName, firstName, lastName, password } = req.body;

  const useAlreadyExsists = await User.findOne({
    userName: userName,
  });
  if (useAlreadyExsists) {
    return res.status(400).json({ error: "User name already exists" });
  }
  const user = await User.create({
    userName,
    firstName,
    lastName,
    password,
  });

  return res.status(200).json({
    message: "user created",
  });
};

const SignIn = async (req, res) => {
  const body = req.body;
  const { success } = SigninSchema.safeParse(body);
  console.log(success);

  if (!success) return res.status(400).json({ error: "zod error" });
  const { userName, password } = req.body;

  const useAlreadyExsists = await User.findOne({
    userName: userName,
  });
  if (!useAlreadyExsists) {
    return res.status(400).json({ error: "User doesnot exists" });
  }

  if (useAlreadyExsists.password != password) {
    return res.status(400).json({ error: "Password is incorrect" });
  }

  const userId = useAlreadyExsists._id;

  // await generateOtp();
  const otp = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP
  // const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

  // const otpEntry = new OTP({
  //     otp,
  //     userId: userId,
  //     expiresAt,
  //   });
  //   await otpEntry.save();
  console.log("otp at this point",otp);
  req.session.userId = userId;
  req.session.userName = userName;
  storeotp({ req: req, otp: otp });

  await sendMail({ userName: userName, otp: otp });
  res.status(200).json({ message: "OTP sent to your email." });
};
const UpdatePassword = async (req, res) => {
  const userId = req.session.userId;
  console.log(userId);
  const { password } = req.body;

  if (!password) {
    return res.status(400).json({ error: "Password is required" });
  }

  try {
    const user = await User.findByIdAndUpdate(userId, { password }, { new: true });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    return res.status(500).json({ error: "An error occurred while updating the password" });
  }
};

export { SignUp, SignIn,UpdatePassword };
