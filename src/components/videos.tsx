"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const API_KEY = "9b702a6b89b0278738dab62417267c49";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

export default function SimilarMovies({ movieId }: { movieId: number }) {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${API_KEY}&language=en-US&page=1`
    )
      .then((res) => res.json())
      .then((data) => setMovies(data.results || []))
      .catch((err) => console.error(err));
  }, [movieId]);

  return (
    
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 p-4 bg-black">
      {movies.map((movie) => (
        <Link
          key={movie.id}
          href={`/MovieDetailPage/${movie.id}`} 
          className="bg-gray-900 rounded-lg overflow-hidden hover:scale-105 transition">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-auto"/>
          <h3 className="p-2 text-sm text-white">{movie.title}</h3>
        </Link>
      ))}
    </div>
  );
}
