import dbConnect from "@/lib/dbConnect";
import { getServerSession, User } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import mongoose from "mongoose";
import UserModel from "@/model/User.model";


export async function DELETE(request:Request,{params}:{params:{messageId:string}}){
    const messageId = params.messageId;
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

    try {
      const updateResult =  await UserModel.updateOne(
            {id:user._id},
            {$pull:{messages:{_id:messageId}}}
        )
        if (updateResult?.modifiedCount == 0) {
            return Response.json(
                {
                  success: false,
                  message: "Message not found or already deleted",
                },
                { status: 501 }
              );
              
        }
        return Response.json(
            {
              success: true,
              message: "Message Deleted",
            },
            { status: 200 }
          );
          
    } catch (error) {
        
    }




}