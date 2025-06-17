import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { prismaClient } from "../../../lib/db";
import { v4 as uuidv4 } from "uuid";

export const GET = async (req: NextRequest) => {
  const session = await getServerSession();

  const user = await prismaClient.user.findFirst({
    where: { email: session?.user?.email ?? "" },
  });
  console.log("user=========", user);
  if (!user) {
    return NextResponse.json({ message: "unauthenticated" }, { status: 403 });
  }

  const mostUpvotedStreams = await prismaClient.stream.findFirst({
    where: { userId: user.id },
    orderBy: { upvotes: { _count: "desc" } },
  });

  console.log("mostUpvotedStream=========", mostUpvotedStreams);

  if (!mostUpvotedStreams) {
    return NextResponse.json(
      { message: "No streams found for user" },
      { status: 404 }
    );
  }

  await Promise.all([
    await prismaClient.currentStream.upsert({
      where: { userId: user.id },
      update: {
        type: mostUpvotedStreams?.type,
        url: mostUpvotedStreams?.url,
        extractedId: mostUpvotedStreams?.extractedId,
        title: mostUpvotedStreams?.title,
        smallImg: mostUpvotedStreams?.smallImg,
        bigImg: mostUpvotedStreams?.bigImg,
      },
      create: {
        userId: user.id,
        type: mostUpvotedStreams?.type,
        url: mostUpvotedStreams?.url,
        extractedId: mostUpvotedStreams?.extractedId,
        title: mostUpvotedStreams?.title,
        smallImg: mostUpvotedStreams?.smallImg,
        bigImg: mostUpvotedStreams?.bigImg,
      },
    }),
    prismaClient.stream.delete({
      where: { id: mostUpvotedStreams.id },
    }),
  ]);

  return NextResponse.json({
    message: "Stream updated successfully",
    data: mostUpvotedStreams,
  });
};
