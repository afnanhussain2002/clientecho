import dbConnect from "@/lib/dbConnect";
import { getServerSession, User } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
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




}