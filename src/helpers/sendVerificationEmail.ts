import { resend } from "@/lib/resend";

import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
    email:string,
    username:string,
    verifyCode:string,

):Promise<ApiResponse>{
   try {
     await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: email,
        subject: 'Client Echo | Verification code',
        react:VerificationEmail({username,otp:verifyCode}) ,
      });
    return {success:true,message:"verification email send successfully"}
   } catch (emailError) {
    console.log("Error sending verification email");
    return {success:false,message:"Failed to send verification email"}
   }
}