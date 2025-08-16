"use client";

import { useEffect, useState } from "react";

const API_KEY = "9b702a6b89b0278738dab62417267c49";

interface Review {
  author: string;
  content: string;
  author_details: {
    name: string 
    avatar_path: string
  };
}

interface Props {
  movieId: number;
}

export default function ReviewsList({ movieId }: Props) {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${API_KEY}`
    )
      .then((res) => res.json())
      .then((res) => setReviews(res.results || []))
      .catch((err) => console.error(err));
  }, [movieId]);

  return (
    <div className="bg-black text-white p-4 space-y-4">
      {reviews.length === 0 && (
        <p className="text-gray-400 text-center">No reviews found.</p>
      )}

      {reviews.map((review, i) => {
        const avatar = review.author_details.avatar_path
          ? `https://image.tmdb.org/t/p/w200${review.author_details.avatar_path}`
          : "https://via.placeholder.com/100";

        return (
          <div
            key={i}
            className="flex gap-4 p-4 bg-gray-800 rounded-lg shadow-lg  transition">
            <img
              src={avatar}
              alt={review.author}
              className="w-16 h-16 rounded-full object-cover border border-gray-600"
            />
            <div className="flex-1">
              <h3 className="text-lg font-semibold">
                {review.author_details.name || review.author}
              </h3>
              <p className="text-gray-300 text-sm mt-2 whitespace-pre-line">
                {review.content}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
