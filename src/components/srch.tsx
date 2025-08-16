"use client";

import { useState, useEffect } from "react";
import Card from "./card";

const API_KEY = "9b702a6b89b0278738dab62417267c49";

export default function Srch() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [genres, setGenres] = useState<{ id: number; name: string }[]>([]);


  useEffect(() => {
    const fetchGenres = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`
      );
      const data = await res.json();
      setGenres(data.genres);
    };
    fetchGenres();
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        let url;
        if (query.trim()) {
          url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`;
        } else if (selectedGenre) {
          url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${selectedGenre}`;
        } else {
          url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;
        }

        const res = await fetch(url);
        const data = await res.json();
        setMovies(data.results || []);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchMovies, 500);
    return () => clearTimeout(timer);
  }, [query, selectedGenre]);

  return (
    <div className="flex flex-col items-center gap-4 w-full p-4">

      <div className="flex gap-2 w-full max-w-2xl">
        <input
          className="w-full h-12 rounded-full border-none px-4 bg-white text-black"
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setSelectedGenre(null);
          }}
          placeholder="Search movies..."
        />
        <button
          className="px-6 py-2 rounded-full text-white bg-gradient-to-r from-[#631056] to-[#fc466b] whitespace-nowrap"
          type="button"
        >
          Search
        </button>
      </div>


      <div className="flex flex-wrap justify-center gap-2 w-full max-w-4xl">
        {genres.map((genre) => (
          <button
            key={genre.id}
            onClick={() => {
              setSelectedGenre(genre.id);
              setQuery(""); 
            }}
            className={`px-4 py-2 rounded-full transition-colors ${
              selectedGenre === genre.id
                ? "bg-gradient-to-r from-[#631056] to-[#fc466b] text-white"
                : "bg-gray-700 text-white hover:bg-gray-600"
            }`}
          >
            {genre.name}
          </button>
        ))}
      </div>


      {loading && <p className="text-white">Loading...</p>}
      {!loading && query.trim() && movies.length === 0 && (
        <p className="text-white">No results found</p>
      )}


      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 w-full p-10">
        {movies.map((movie: any) => (
          <Card
            key={movie.id}
            id={String(movie.id)}
            title={movie.title}
            img_url={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                : "/no-poster.jpg" 
            }
            vote_average={movie.vote_average}/>
        ))}
      </div>
    </div>
  );
}