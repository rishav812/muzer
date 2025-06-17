import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prismaClient } from "../../../lib/db";
import { getServerSession } from "next-auth";

const downvoteSchema = z.object({
  streamId: z.string(),
});

export const POST = async (req: NextRequest) => {
  const session = await getServerSession();
  console.log("session=====", session);
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
    const data = downvoteSchema.parse(await req.json());
    const { streamId } = data;
    const response= await prismaClient.upvote.delete({
        where: {
            userId_streamId: {
              userId: userData.id,
              streamId: streamId,
            },
          },
    });
    return NextResponse.json(
      {
        message: "successfully downvoted",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("error", error);
    return NextResponse.json(
      {
        message: "Error while downvoting",
      },
      {
        status: 403,
      }
    );
  }
};
