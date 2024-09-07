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
    await UserModel.findByIdAndUpdate(
      userId,
      { isAcceptMessages: acceptMessages },
      { new: true }
    );
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
