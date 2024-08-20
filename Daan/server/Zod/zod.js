import zod from 'zod';
const SignUpSchema=zod.object({
    userName:zod.string().email(),
    firstName:zod.string(),
    lastName:zod.string(),
    password:zod.string().min(8),
    confirmPassword:zod.string().min(8),
 
   
 });
 const SigninSchema=zod.object({
    userName:zod.string().email(),
    password:zod.string().min(8),   
 });
 export  {SignUpSchema,SigninSchema};