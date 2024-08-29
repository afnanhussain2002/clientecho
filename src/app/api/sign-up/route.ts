import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User.model";
import bcrypt from "bcryptjs"

export async function POST(request: Request){
    await dbConnect()

    try {
    const {username, email, password} = await request.json() 
    
    const existingUserVerifiedByUsername = await UserModel.findOne({
        username,
        isVerified:true
    })
    if (existingUserVerifiedByUsername) {
        return Response.json({
            success:false,
            message:"Username is already taken"
        }, {status:400})
    }
   const existingUserByEmail = await UserModel.findOne({email})
   const verifyCode = Math.floor(100000 + Math.random() * 900000).toString()
    if (existingUserByEmail) {
        true
    }else{
      const hashedPassword = await bcrypt.hash(password,10)
      const expiryDate = new Date()
      expiryDate.setHours(expiryDate.getHours() + 1)

    }
    } catch (error) {
        console.log("Error registering user", error);
        return Response.json(
            {
                success:true,
                message:"Error registering user"
            },
            {status:500}
        )
    }
}

