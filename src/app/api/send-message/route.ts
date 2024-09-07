import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User.model";
import { Message } from "@/model/User.model";

export async function POST(request:Request){
    await dbConnect()

    const {username, content} = await request.json()
    
} 