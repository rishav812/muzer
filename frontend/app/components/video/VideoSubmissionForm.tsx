"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

interface VideoSubmissionFormProps {
  onSubmit: (videoData: any) => void;
}

export default function VideoSubmissionForm({
  onSubmit,
}: VideoSubmissionFormProps) {
  const [url, setUrl] = useState("");
  const [preview, setPreview] = useState<null | {
    id: string;
    smallImg: string;
  }>(null);
  const [error, setError] = useState<string | null>(null);

  // Extract YouTube video ID from URL
  const extractVideoId = (url: string) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  // Handle URL input change
  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
    setError(null);
    setPreview(null);
  };

  // Preview the video
  const handlePreview = () => {
    const videoId = extractVideoId(url);

    if (!videoId) {
      setError("Invalid YouTube URL. Please enter a valid YouTube video link.");
      setPreview(null);
      return;
    }

    // In a real application, you would fetch the video details from YouTube API
    // For this demo, we'll mock the response
    setPreview({
      id: videoId,
      smallImg: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
    });
    setError(null);
  };

  // Submit the video to the queue
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!preview) {
      handlePreview();
      return;
    }

    onSubmit({
      id: preview.id,
      url: url,
    });

    // Reset form
    setUrl("");
    setPreview(null);
  };

  console.log("Preview state:", preview);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="Paste YouTube video URL"
          value={url}
          onChange={handleUrlChange}
          className="flex-1 bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-zinc-700"
        />
        <Button
          type="button"
          onClick={handlePreview}
          disabled={!url}
          className="bg-zinc-800 hover:bg-zinc-700 text-zinc-100"
        >
          Preview
        </Button>
      </div>

      {error && (
        <Alert
          variant="destructive"
          className="bg-red-900/50 border-red-800 text-red-200"
        >
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {preview && (
        <div className="bg-zinc-900 p-4 rounded-lg border border-zinc-800">
          <h3 className="font-medium mb-2 text-zinc-200">Video Preview</h3>
          <div className="flex gap-4 items-start">
            <img  
              src={preview.smallImg || "/placeholder.svg"}
              alt="Video thumbnail"
              className="w-32 h-24 object-cover rounded"
            />
            <div className="flex-1">
              {/* <p className="text-sm font-medium mb-2 text-zinc-300">
                {preview.title}
              </p> */}
              <Button
                type="submit"
                className="bg-purple-700 hover:bg-purple-600 text-white"
              >
                Add to Queue
              </Button>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}
