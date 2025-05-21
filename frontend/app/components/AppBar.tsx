"use client";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Music, Users, Radio, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Header = () => {
  const session = useSession();
  console.log("session", session.data?.user);
  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800 bg-zinc-950/95 backdrop-blur supports-[backdrop-filter]:bg-zinc-950/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Music className="h-6 w-6 text-purple-500" />
          <span className="text-xl font-bold">StreamConnect</span>
        </div>
        <div>
          {session.data?.user && (
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-purple-500">
                {session.data.user.name}
              </span>
              <Button
                variant="outline"
                className="border-purple-500 text-purple-500 hover:bg-purple-950 hover:text-purple-400"
                onClick={() => signOut()}
              >
                Logout
              </Button>
            </div>
          )}
          {!session.data?.user && (
            <Button
              variant="outline"
              className="border-purple-500 text-purple-500 hover:bg-purple-950 hover:text-purple-400"
              onClick={() => signIn()}
            >
              Sign In
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

{
  /* <div className="flex justify-between m-2 p-2 bg-gray-200 rounded-lg">
      <div className="text-black font-bold text-xl">Muzi</div>
      <div>
        {session.data?.user && (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2 p-2"
            onClick={() => signOut()}
          >
            Logout
          </button>
        )}
        {!session.data?.user && (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2 p-2"
            onClick={() => signIn()}
          >
            SignIn
          </button>
        )}
      </div>
    </div> */
}
