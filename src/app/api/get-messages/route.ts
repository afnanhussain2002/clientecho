import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";

export async function POST(request:Request){
    dbConnect()

    const session = getServerSession(authOptions)
    
}