import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User.model";
import bcrypt from "bcryptjs"

export async function POST(request: Request){
    await dbConnect()

    try {
        
    } catch (error) {
        console.log("Error registering user", error);
        return Response.json(
            {
                success:true,
                message:"Error registering user"
            }
        )
    }
}

