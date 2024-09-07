import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User.model";
import { Message } from "@/model/User.model";

export async function POST(request:Request){
    await dbConnect()

    const {username, content} = await request.json()

    const user = await UserModel.findOne({username})

    if (!user) {
        return Response.json(
            {
              success: false,
              message: "User not found",
            },
            { status: 401 }
          );
    }
    // is user accept message

    if (!user.isAcceptMessage) {
        return Response.json(
            {
              success: false,
              message: "User not accept message",
            },
            { status: 401 }
          );
    }
} 