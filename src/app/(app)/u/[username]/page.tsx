"use client";
import PublicForm from "@/components/PublicForm";
import { User } from "@/model/User.model";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useState } from "react";

const PublicProfile = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <Loader2 />;
  }
  if (!session || !session.user) {
    return <div>User Not Found</div>;
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
            <span className="font-semibold">@{session?.user.username}</span>
          </p>
          <PublicForm />
        </div>
      </div>
    </div>
  );
};

export default PublicProfile;
