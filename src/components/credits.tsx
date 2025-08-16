import React from 'react'
const API_KEY = "9b702a6b89b0278738dab62417267c49";

interface CreditsProps {
  id: number;
  name: string;
  character?: string;
  profile_path?: string;
}

interface CreditsMovieId {
  movieId: number;
}

export default async function Credits({ movieId }: CreditsMovieId) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}`,
    { cache: "no-store" }
  );
  const data = await res.json();
  return (
    <div className="overflow-x-auto  bg-[#000000]">
      <div className="flex gap-4 flex-nowrap  p-10">
        {data.cast.map((e: CreditsProps) => (
          <div key={e.id} className="min-w-[150px] flex-shrink-0 text-center cursor-pointer ">
            {e.profile_path && (
              <img src={`https://image.tmdb.org/t/p/w200${e.profile_path}`} alt={e.name} className="w-32 h-48 object-cover rounded-lg mx-auto"/>)}
            <p className="mt-2 font-semibold text-white">{e.name}</p>
            {e.character && <p className="text-sm text-white">as {e.character}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
