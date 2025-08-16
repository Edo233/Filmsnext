"use client";

import { useState, useEffect } from "react";

const API_KEY = "9b702a6b89b0278738dab62417267c49";

interface CreditsMovieId {
  movieId: number;
}

interface Video {
  key: string;
  name: string;
  site: string;
}

export default function VideoList({ movieId }: CreditsMovieId) {
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        setVideos(data.results || []);
      })
      .catch((err) => console.error(err));
  }, [movieId]);

  return (
    <>
      <div className="bg-black flex gap-6 p-4 overflow-x-auto text-white">
        {videos
          .filter((elm) => elm.site === "YouTube")
          .map((elm) => (
            <div
              key={elm.key}
              onClick={() => setSelectedVideo(elm)}
              className="flex flex-col items-center cursor-pointer min-w-[300px] max-w-[300px] sm:min-w-[250px] sm:max-w-[250px] p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition"
            >
              <iframe
                className="w-full h-[200px] sm:h-[180px] pointer-events-none"
                src={`https://www.youtube.com/embed/${elm.key}`}
                allowFullScreen
              ></iframe>
              <p className="mt-2 text-sm text-center">{elm.name}</p>
            </div>
          ))}
      </div>
      
      {selectedVideo && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={() => setSelectedVideo(null)}
        >
          <div
            className="bg-black p-4 rounded-lg relative w-[90%] max-w-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-white text-2xl"
              onClick={() => setSelectedVideo(null)}
            >
              ✕
            </button>
            <iframe
              className="w-full h-[400px] sm:h-[300px]"
              src={`https://www.youtube.com/embed/${selectedVideo.key}?autoplay=1`}
              allowFullScreen
            ></iframe>
            <p className="mt-2 text-white text-center">{selectedVideo.name}</p>
          </div>
        </div>
      )}
    </>
  );
}
