import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prismaClient } from "../../../lib/db";

export const GET = async (req: NextRequest) => {
  const session = await getServerSession();
  const user = await prismaClient.user.findFirst({
    where: { email: session?.user?.email ?? "" },
  });
  console.log("user-id============", user?.id);
  if (!user) {
    return NextResponse.json({ message: "unauthenticated" }, { status: 403 });
  }

  const streams = await prismaClient.stream.findMany({
    where: {
      userId: user.id,
    },
    include: {
      _count: {
        select: {
          upvotes: true,
        },
      },
      upvotes: {
        where: {
          userId: user.id,
        },
      },
    },
  });
  console.log("streams", streams);
  return NextResponse.json(
    {
      data: streams.map((stream) => ({
        ...stream,
        votes: stream._count.upvotes,
        isVoted: stream.upvotes.length > 0,
      })),
    },
    { status: 200 }
  );
};
