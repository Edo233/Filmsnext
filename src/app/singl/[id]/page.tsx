import { fetchMovieDetails } from "@/lib/api";
import Credits from "@/components/credits";
import VideoList from "@/components/video"; 
import ReviewsList from "@/components/coments";

export default async function MovieDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const movie = await fetchMovieDetails(params.id);

  return (
    <div>
      <div
        className="relative pt-10 bg-[#1A1818] text-white"
        style={{
          backgroundImage: movie.backdrop_path
            ? `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
            : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="relative z-10 p-8 max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>

          <div className="flex flex-col md:flex-row gap-8">
            {movie.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="rounded-lg w-full md:w-1/3 h-auto object-cover"
              />
            )}

            <div className="flex-1 flex flex-col justify-center">
              <p className="text-lg mb-6">{movie.overview}</p>

              <div className="flex gap-6 mb-6">
                <div className="bg-yellow-500 text-black px-4 py-2 rounded-full font-bold">
                  Rating: {movie.vote_average?.toFixed(1)}/10
                </div>
                <div className="bg-gray-700 px-4 py-2 rounded-full">
                  Release: {movie.release_date || "N/A"}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-bold">Runtime</h3>
                  {movie.runtime ? (
                    <p>
                      {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
                    </p>
                  ) : (
                    <p>Unknown</p>
                  )}
                </div>
                <div>
                  <h3 className="font-bold">Genres</h3>
                  <p>
                    {movie.genres?.length
                      ? movie.genres.map((g: { name: string }) => g.name).join(", ")
                      : "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full h-[500px]"></div>
      </div>

      <Credits movieId={Number(params.id)} />
      <VideoList movieId={Number(params.id)} />
      <ReviewsList movieId={Number(params.id)} />
    </div>
  );
}
