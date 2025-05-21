"use client";

import { useEffect } from "react";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

export default function withAuth(Component: any) {
  return function IsAuth(props: any) {
    const { data: session, status } = useSession();

    console.log("session", session);
    console.log("status", status);

    useEffect(() => {
      if (status === "unauthenticated") {
        redirect("/");
      }
    }, [status]);

    // While session is loading, you can return a loader or null
    if (status === "loading") {
      return <div>Loading...</div>; // or return null;
    }

    return <Component {...props} />;
  };
}
