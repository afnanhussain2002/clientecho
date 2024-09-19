"use client";
import AiSuggestMessage from "@/components/AiSuggestMessage";
import PublicForm from "@/components/PublicForm";
import { User } from "@/model/User.model";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";

const PublicProfile = () => {

// const [loading, setLoading] = useState(false)
const params = useParams()
let {username} = params
 
if (Array.isArray(username)) {
  username = username[0];
}
  if (!username) {
    return <div className="flex justify-center items-center h-screen bg-gray-100">User Not Found</div>;
  }
  return (
    <div className="mt-10 flex justify-center h-[600px]">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h1 className="text-center text-4xl font-bold mb-4">
          Public Profile Link
        </h1>
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="text-center text-lg mb-4">
            Send Anonymous Message to{" "}
            <span className="font-semibold">@{username}</span>
          </p>
          <PublicForm username={username}/>
        </div>
      </div>
      <AiSuggestMessage/>
    </div>
  );
};

export default PublicProfile;
