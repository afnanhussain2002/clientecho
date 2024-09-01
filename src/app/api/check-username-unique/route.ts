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
      const {searchParams} = new URL(request.url)
      const queryParam = {
        username:searchParams.get('username')
      }
    // validate with zod

    const result = UsernameQuerySchema.safeParse(queryParam)
    console.log('main result',result);

    if (!result.success) {
        const usernameErrors = result.error.format().username?._errors || []

        return Response.json(
            {
                success:false,
                message:usernameErrors.length > 0? usernameErrors.join(', ') : 'Invalid query parameters'
            },
            {status:500}
        )
    }

    const {username} = result.data

   const existingVerifiedUser =  await UserModel.findOne({username, isVerified:true})








        
    } catch (error) {
        console.log("Error from checking username", error);
        return Response.json(
            {
                success:false,
                message:"Username validation error"
            },
            {status:500}
        )
    }
}