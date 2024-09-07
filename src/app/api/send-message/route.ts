import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User.model";
import { Message } from "@/model/User.model";

export async function POST(request:Request){
    await dbConnect()

try {
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
    
        const newMessage = {content, createdAt: new Date()}
    
        user.messages.push(newMessage as Message)
        await user.save()
        return Response.json(
            {
              success: true,
              message: "Message send successfully",
            },
            { status: 201 }
          );
} catch (error) {
    return Response.json(
        {
          success: false,
          message: "Something went wrong when send the message",
        },
        { status: 401 }
      );
}
} 