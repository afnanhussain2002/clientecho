import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User.model";


export async function POST(request:Request){
    await dbConnect()

    try {
      const {username, code} = await request.json()
      const decodeUsername = decodeURIComponent(username)

      const user = await UserModel.findOne({
        username: decodeUsername
      })

      if (!user) {
        
        return Response.json(
            {
                success:false,
                message:" user not found"
            },
            {status:404}
        )
      }

      const isCodeValid = user.verifyCode === code

      const isCodeNotExpired  = new Date(user.verifyCodeExpiry) > new Date()

      if (isCodeValid && isCodeNotExpired) {
        user.isVerified = true
        await user.save()

        return Response.json(
            {
                success:true,
                message:" account verified successfully"
            },
            {status:201}
        )
      }else if (!isCodeNotExpired) {
        return Response.json(
            {
                success:false,
                message:"Verification code has been expired. Please sign up again for get a new code"
            },
            {status:400}
        )
      }else{
        return Response.json(
            {
                success:false,
                message:"Incorrect verification code"
            },
            {status:404}
        )
      }



    } catch (error) {
        console.log("Error from checking username", error);
        return Response.json(
            {
                success:false,
                message:"error verifying user"
            },
            {status:500}
        )
    }
}


