const API_KEY = "9b702a6b89b0278738dab62417267c49";

export async function fetchMovieDetails(id: string) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
  );
  if (!res.ok) throw new Error("Failed to fetch movie");
  return res.json();
}