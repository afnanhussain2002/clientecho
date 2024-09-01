import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User.model";
import {z} from "zod"
import { usernameValidation } from "@/schemas/signUpSchema";



const UsernameQuerySchema = z.object({
    username:usernameValidation
})

export async function GET(request:Request){
    await dbConnect()

    try {
        
    } catch (error) {
        console.log("Error from checking username", error);
        
    }
}