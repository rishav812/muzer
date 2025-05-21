import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { prismaClient } from "../../../lib/db";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    async signIn(param) {
      try{
        if (!param.user.email) {
          return false;
        }
        await prismaClient.user.upsert({
          where: {
            email: param.user.email ?? "",
          },
          update: {
            name: param.user.name ?? "", // optionally update name if needed
          },
          create: {
            name: param.user.name ?? "",
            email: param.user.email ?? "",
            provider: "Google",
          },
        });
        
        return true;
      }catch (error) {
        console.log("error", error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
