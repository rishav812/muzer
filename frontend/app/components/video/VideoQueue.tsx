"use client";

import { ThumbsDown, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import "./video-queue.css";
import { useState } from "react";

type Video = {
  id: string;
  title: string;
  type: string;
  bigImg: string;
  smallImg: string;
  url: string;
  extractedId?: string;
  thumbnail: string;
  votes: number;
  isVoted: boolean;
  submittedBy: string;
};

interface VideoQueueProps {
  queue: Video[];
  onVote: (id: string, isVoted: boolean) => void;
}

export default function VideoQueue({ queue, onVote }: VideoQueueProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  return (
    <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-zinc-900">
      {queue.length === 0 ? (
        <div className="text-center py-8 bg-zinc-900 rounded-lg border border-zinc-800">
          <p className="text-zinc-400">No songs in queue</p>
        </div>
      ) : (
        queue.map((video) => (
          <div
            key={video.id}
            className="flex flex-col bg-zinc-900 rounded-lg shadow overflow-hidden border border-zinc-800 hover:border-zinc-700 transition-colors"
          >
            <div className="relative">
              <img
                src={video.smallImg || "/placeholder.svg"}
                alt={video.title}
                className="w-full h-32 object-cover"
              />
              <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-zinc-100 px-2 py-1 text-xs rounded">
                {video.votes} votes
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-medium text-sm mb-1 line-clamp-2 text-zinc-200">
                {video.title}
              </h3>
              <p className="text-xs text-zinc-400 mb-3">
                Added by {video.submittedBy}
              </p>
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={video.isVoted || isLoading}
                  onClick={() => {
                    setIsLoading(true);
                    onVote(video.id, video.isVoted);
                    setIsLoading(false);
                  }}
                  className={`flex items-center gap-1 border-zinc-700 text-zinc-200 bg-transparent hover:bg-white hover:text-zinc-900 transition-colors cursor-pointer ${
                    video.isVoted ? "already-upVoted" : ""
                  }`}
                >
                  <ThumbsUp className="h-4 w-4" />
                  <span>Upvote</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={video.isVoted ? false : true || isLoading}
                  onClick={() => onVote(video.id, video.isVoted)}
                  className={`flex items-center gap-1 border-zinc-700 text-zinc-200 bg-transparent hover:bg-white hover:text-zinc-900 transition-colors cursor-pointer ${
                    video.isVoted ? "already-downVoted" : ""
                  }`}
                >
                  <ThumbsDown className="h-4 w-4" />
                  <span>Downvote</span>
                </Button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
