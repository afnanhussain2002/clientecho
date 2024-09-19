"use client";
import PublicForm from "@/components/PublicForm";
import { User } from "@/model/User.model";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";

const PublicProfile = () => {

// const [loading, setLoading] = useState(false)
const params = useParams()
const {username} = params
 

  /* if (loading) {
    <div className="flex justify-center items-center h-screen bg-gray-100">
    <Loader2 className="w-12 h-12" />
  </div>
  } */
  if (!username) {
    return <div className="flex justify-center items-center h-screen bg-gray-100">User Not Found</div>;
  }
  return (
    <div className="mt-10 flex justify-center">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h1 className="text-center text-4xl font-bold mb-4">
          Public Profile Link
        </h1>
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="text-center text-lg mb-4">
            Send Anonymous Message to{" "}
            <span className="font-semibold">@{username}</span>
          </p>
          <PublicForm />
        </div>
      </div>
    </div>
  );
};

export default PublicProfile;
