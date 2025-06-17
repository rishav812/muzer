"use client";

import { use, useState } from "react";
import withAuth from "./isAuth";
import { Button } from "@/components/ui/button";
import { Header } from "./AppBar";
import VideoPlayer from "./video/VideoPlayer";
import VideoQueue from "./video/VideoQueue";
import VideoSubmissionForm from "./video/VideoSubmissionForm";
import { useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { url } from "inspector";
import { Copy } from "lucide-react";
import { set } from "zod/v4";

// Mock data for the queue
const initialQueue = [
  {
    id: "dQw4w9WgXcQ",
    title: "Rick Astley - Never Gonna Give You Up",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg",
    votes: 15,
    submittedBy: "user123",
  },
  {
    id: "9bZkp7q19f0",
    title: "PSY - GANGNAM STYLE",
    thumbnail: "https://img.youtube.com/vi/9bZkp7q19f0/mqdefault.jpg",
    votes: 10,
    submittedBy: "user456",
  },
  {
    id: "JGwWNGJdvx8",
    title: "Ed Sheeran - Shape of You",
    thumbnail: "https://img.youtube.com/vi/JGwWNGJdvx8/mqdefault.jpg",
    votes: 8,
    submittedBy: "user789",
  },
];

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

const REFRESH_INTERVAL = 10000; // 10 seconds

function StreamView({ creatorId }: { creatorId: string }) {
  const [queue, setQueue] = useState<Video[]>([]);
  const [currentVideo, setCurrentVideo] = useState("dQw4w9WgXcQ");
  const [voted, setVoted] = useState<boolean>(false);

  const fetchStreams = async () => {
    try {
      const response = await axios.get(`/api/streams?creatorId=${creatorId}`);
      if (response.status !== 200) {
        throw new Error("Failed to fetch streams");
      } else if (response.status === 200 && response?.data?.data?.length > 0) {
        setQueue(response.data.data);
      }
      console.log("===========response", response);
    } catch (error) {
      console.error("Error fetching streams:", error);
    }
  };

  useEffect(() => {
    fetchStreams();
    const interval = setInterval(() => {}, REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, [voted,]);

  // Function to add a new video to the queue
  const addToQueue = async (videoData: { id: string; url: string }) => {
    // console.log("Adding video to queue:", videoData);
    await fetch("api/streams/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        creatorId: "8f33afd9-1784-423c-ba18-4a222ef8f1b9",
        url: videoData.url,
      }),
    })
      .then(async (response) => {
        if (response.status === 200) {
          const data = await response.json();
          console.log("Video added successfully", data);
          fetchStreams();
          toast.success("Video added to queue successfully");
        } else {
          toast.error("Failed to add video to queue");
          console.error("Failed to add video:", response.statusText);
        }
      })
      .catch((error) => {
        toast.error("Error adding video to queue");
        console.error("Error adding video:", error);
      });
    // setQueue([...queue, videoData]);
  };

  // Function to handle voting
  const handleVote = (id: string, isVoted: boolean) => {
    fetch(`/api/streams/${isVoted ? "downvote" : "upvote"}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ streamId: id }),
    })
      .then((data) => {
        if (data.status == 200) {
          setVoted(!isVoted);
          console.log("data", data);
          // Update the queue state with the new vote count
          setQueue(
            queue
              .map((video) => {
                if (video.id === id) {
                  return {
                    ...video,
                    votes: video.votes + (isVoted ? -1 : 1),
                  };
                }
                return video;
              })
              .sort((a, b) => b.votes - a.votes)
          );
          toast.success(isVoted ? "Downvote successful" : "Upvote successful");
          console.log("Vote successful");
        } else {
          toast.error("Vote failed");
          console.error("Vote failed");
        }
      })
      .catch((err) => {
        toast.error("Vote error");
        console.error("Vote error:", err);
      });
  };

  // Function to play the next video
  const playNext = async () => {
    try {
      if (queue.length > 0) {
        const data = await fetch("/api/streams/next", {
          method: "GET",
        });
        const json = await data.json();
        setCurrentVideo(json.data.extractedId);
        console.log("Next video data:", json);
        setQueue((prevQueue) =>
          prevQueue.filter((video) => video.id !== json.data.id)
        );
      }
    } catch (error) {
      console.error("Error playing next video:", error);
      toast.error("Failed to play next video");
    }
  };

  console.log("queue", queue);

  return (
    <div className="flex min-h-screen flex-col bg-zinc-950 text-zinc-100">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8 gap-4">
          <h1 className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 drop-shadow-lg tracking-tight flex-1 text-center">
            Stream Song Voting
          </h1>
          <Button
            onClick={() => {
              if (queue.length > 0) {
                const videoUrl = `${window.location.hostname}/creator/${creatorId}`;
                navigator.clipboard.writeText(videoUrl);
                toast.success("Link copied to clipboard!");
              }
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors cursor-pointer ml-2 flex items-center gap-2"
          >
            <Copy className="w-4 h-4" />
            Copy Link
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-zinc-200">
                Now Playing
              </h2>
              <VideoPlayer videoId={currentVideo} />
              <div className="mt-4 flex justify-end">
                <Button
                  onClick={playNext}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  Play Next Song
                </Button>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4 text-zinc-200">
                Submit a Song
              </h2>
              <VideoSubmissionForm onSubmit={addToQueue} />
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4 text-zinc-200">
              Upcoming Songs
            </h2>
            <VideoQueue queue={queue} onVote={handleVote} />
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default withAuth(StreamView);
