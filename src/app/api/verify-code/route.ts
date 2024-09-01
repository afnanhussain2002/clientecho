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
            {status:500}
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


