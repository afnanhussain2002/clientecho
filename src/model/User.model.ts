import mongoose,{Schema, Document} from "mongoose";

export interface Message extends Document{
    content:string
    createdAt: Date
}

const MessageSchema: Schema<Message> = new Schema({
    content:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        required:true,
        default: Date.now
    }
})

// user interface

export interface User extends Document{
    username:string
    email:string
    password:string
    verifyCode:string
    verifyCodeExpiry:Date
    isAcceptMessage:boolean
    message:Message[]
}