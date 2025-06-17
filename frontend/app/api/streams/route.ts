import { z } from "zod";
import { prismaClient } from "../../lib/db";
import { NextRequest, NextResponse } from "next/server";
// @ts-expect-error
import youtubesearchapi from "youtube-search-api";

const YT_REGEX = new RegExp(
  /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
);

const cretaeStreamSchema = z.object({
  creatorId: z.string(),
  url: z.string(),
});

export const POST = async (req: NextRequest) => {
  try {
    // console.log("req", await req.json());
    const data = cretaeStreamSchema.parse(await req.json());
    const { creatorId, url } = data;
    console.log("userId", creatorId);
    console.log("url", url);

    const is_yt = YT_REGEX.test(url);
    console.log("is_yt", is_yt);

    if (!is_yt) {
      return NextResponse.json({ message: "Invalid URL" }, { status: 400 });
    }

    const extractedId = url.split("v=")[1]?.split("&")[0];
    const result = await youtubesearchapi.GetVideoDetails(extractedId);
    console.log("result=======", result);
    if (!result || !result.thumbnail || !result.thumbnail.thumbnails) {
      return NextResponse.json(
        { message: "Could not fetch video details or thumbnails" },
        { status: 400 }
      );
    }
    const thumbnails = result.thumbnail.thumbnails.sort(
      (a: { width: number }, b: { width: number }) =>
        a.width < b.width ? -1 : 1
    );
    console.log("sorted thumbnails", thumbnails);

    const stream = await prismaClient.stream.create({
      data: {
        userId: creatorId,
        active: true,
        url,
        extractedId,
        title: result?.title ?? "No video title",
        bigImg: thumbnails[thumbnails.length - 1].url ?? "",
        smallImg:
          thumbnails.length > 1
            ? thumbnails[thumbnails.length - 2].url
            : thumbnails[thumbnails.length - 1].url ?? "",
        type: "Youtube",
      },
    });

    return NextResponse.json(
      {
        message: "Stream created successfully",
        stream_id: stream.id,
        data: stream,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error creating stream:", err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};

export const GET = async (req: NextRequest) => {
  const creatorId = req.nextUrl.searchParams.get("creatorId");

  if (!creatorId) {
    return NextResponse.json({ message: "unauthenticated" }, { status: 403 });
  }

  const [streams, activeStream] = await Promise.all([
    await prismaClient.stream.findMany({
      where: {
        userId: creatorId,
      },
      include: {
        _count: {
          select: {
            upvotes: true,
          },
        },
        upvotes: {
          where: {
            userId: creatorId,
          },
        },
      },
    }),
    await prismaClient.currentStream.findFirst({
      where: {
        userId: creatorId,
      },
    }),
  ]);
  console.log("streams", streams);
  return NextResponse.json(
    {
      data: streams.map((stream) => ({
        ...stream,
        votes: stream._count.upvotes,
        isVoted: stream.upvotes.length > 0,
      })),
      activeStream,
    },
    { status: 200 }
  );
};
