"use client";

import { useEffect } from "react";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

export default function withAuth<T extends {}>(Component: React.ComponentType<T>) {
  return function IsAuth(props: T) {
    const { data: session, status } = useSession();

    useEffect(() => {
      if (status === "unauthenticated") {
        redirect("/");
      }
    }, [status]);

    // While session is loading, you can return a loader or null
    if (status === "loading") {
      return (
        <div className="flex items-center justify-center min-h-screen bg-zinc-950">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <span className="text-zinc-300 text-lg font-semibold">Loading...</span>
          </div>
        </div>
      );
    }

    return <Component {...props} />;
  };
}
