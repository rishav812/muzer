import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prismaClient } from "../../../lib/db";
import { getServerSession } from "next-auth";

const upvoteSchema = z.object({
  streamId: z.string(),
});

export const POST = async (req: NextRequest) => {
  const session = await getServerSession();
  const userData = await prismaClient.user.findFirst({
    where: { email: session?.user?.email ?? "" },
  });
  if (!userData) {
    return NextResponse.json(
      {
        message: "unauthenticated",
      },
      {
        status: 403,
      }
    );
  }
  try {
    const data = upvoteSchema.parse(await req.json());
    const { streamId } = data;
    console.log("userId", userData.id);
    console.log("streamId", streamId);
    await prismaClient.upvote.create({ 
      data: {
        userId: userData.id,
        streamId: streamId,
      },
    });
    return NextResponse.json(
      {
        message: "successfully upvoted",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("error", error);
    return NextResponse.json(
      {
        message: "Error while upvoting",
      },
      {
        status: 403,
      }
    );
  }
};
