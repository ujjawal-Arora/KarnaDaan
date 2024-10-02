import zod from 'zod';

const SignUpSchema = zod.object({
  userName: zod.string().email({ message: "Invalid email address" }),
  firstName: zod.string().min(1, { message: "First name is required" }),
  lastName: zod.string().min(1, { message: "Last name is required" }),
  password: zod.string().min(8, { message: "Password must be at least 8 characters long" }), 
});

const SigninSchema = zod.object({
  userName: zod.string().email({ message: "Invalid email address" }),
  password: zod.string().min(8, { message: "Password must be at least 8 characters long" }),   
});

export { SignUpSchema, SigninSchema };
