"use client"

import { useState } from "react"
import withAuth from "../components/isAuth"
import { Button } from "@/components/ui/button"
import { Header } from "../components/AppBar"
import VideoPlayer from "../components/video/VideoPlayer"
import VideoQueue from "../components/video/VideoQueue"
import VideoSubmissionForm from "../components/video/VideoSubmissionForm"

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
]

type Video = {
  id: string
  title: string
  thumbnail: string
  votes: number
  submittedBy: string
}

function Dashboard() {
  const [queue, setQueue] = useState<Video[]>(initialQueue)
  const [currentVideo, setCurrentVideo] = useState("dQw4w9WgXcQ")

  // Function to add a new video to the queue
  const addToQueue = (videoData: Video) => {
    setQueue([...queue, videoData])
  }

  // Function to handle voting
  const handleVote = (id: string, increment: number) => {
    setQueue(
      queue
        .map((video) => {
          if (video.id === id) {
            return {
              ...video,
              votes: video.votes + increment,
            }
          }
          return video
        })
        .sort((a, b) => b.votes - a.votes),
    )
  }

  // Function to play the next video
  const playNext = () => {
    if (queue.length > 0) {
      setCurrentVideo(queue[0].id)
      setQueue(queue.slice(1))
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-zinc-950 text-zinc-100">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center text-zinc-100">Stream Song Voting</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-zinc-200">Now Playing</h2>
              <VideoPlayer videoId={currentVideo} />
              <div className="mt-4 flex justify-end">
                <Button onClick={playNext} className="bg-red-600 hover:bg-red-700 text-white">
                  Play Next Song
                </Button>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4 text-zinc-200">Submit a Song</h2>
              <VideoSubmissionForm onSubmit={addToQueue} />
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4 text-zinc-200">Upcoming Songs</h2>
            <VideoQueue queue={queue} onVote={handleVote} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default withAuth(Dashboard)

