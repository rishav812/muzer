"use client";
import { signIn, signOut, useSession } from "next-auth/react";

export const AppBar = () => {
  const session = useSession();
  console.log("session", session.data?.user);
  return (
    <div className="flex justify-between m-2 p-2 bg-gray-200 rounded-lg">
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
    </div>
  );
};
