import dbConnect from "@/lib/dbConnect";
import { getServerSession, User } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import mongoose from "mongoose";
import UserModel from "@/model/User.model";


export async function POST(request:Request){
   await dbConnect()

    const session = await getServerSession(authOptions)
    const user: User = session?.user as User
    if (!user) {
        return Response.json(
          {
            success: false,
            message: "Unauthorized",
          },
          { status: 401 }
        );
    }
    const userId = new mongoose.Types.ObjectId(user._id)

    try {
        const user = await UserModel.aggregate([
            {$match: {id:'$messages'}},
            {$unwind:'$messages'},
            {$sort:{'messages.createdAt':-1}},
            {$group:{_id:'$_id', message:{$push:'$messages'}}}
        ])

        if (!user || user.length === 0) {
            return Response.json(
                {
                  success: false,
                  message: "User not found",
                },
                { status: 401 }
              );
        }
        return Response.json(
            {
              success: true,
              messages: user[0].messages,
            },
            { status: 200 }
          );
    } catch (error) {
      console.log('Error form send message', error);
      return Response.json(
          {
            success: false,
            message: "Something went wrong when get the message",
          },
          { status: 501 }
        );
        
    }



}