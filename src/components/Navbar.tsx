"use client";
import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { User } from "next-auth";
import { Button } from "./ui/button";
const Navbar = () => {
  const { data: session } = useSession();

  const user: User = session?.user as User;
  return (
    <div className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <a href="#" className="text-white text-lg font-semibold">
          Client Echo
        </a>
        <div>
          {session ? (
            <>
              <span className="text-white mr-4">
                Welcome, {user.username || user.email}
              </span>
              <Button
                onClick={() => signOut()}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              >
                Logout
              </Button>
            </>
          ) : (
            <Link href={"/signin"}>
              <Button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
