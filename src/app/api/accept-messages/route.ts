import dbConnect from "@/lib/dbConnect";
import { getServerSession, User } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import UserModel from "@/model/User.model";

export async function POST(request: Request) {
  dbConnect();

  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;
  if (!user) {
    return Response.json(
      {
        success: false,
        message: "Unauthorized",
      },
      { status: 401 }
    );
  }

  const userId = user._id;
  const {acceptMessages } = await request.json();

  try {
  const updateUser = await UserModel.findByIdAndUpdate(
      userId,
      { isAcceptMessages: acceptMessages },
      { new: true }
    );
    if (!updateUser) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      )
    }
    return Response.json(
      {
        success: true,
        message: "Message accept status update successfully",
        updateUser
      },
      { status: 200 }
    )
  } catch (error) {
    console.log("failed to update the user status to accept messages", error);
    return Response.json(
      {
        success: false,
        message: "Unauthorized",
      },
      { status: 401 }
    );
  }
}

export async function GET(request: Request) {
  dbConnect();

 
}