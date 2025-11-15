import { useState } from "react";
import type { OmdbSearchItem } from "../../types/omdb";
import { Heart, HeartOff } from "lucide-react";

interface MovieCardProps {
  movie: OmdbSearchItem;
  onClick?: () => void;
  isFavorite?: boolean;
  onToggleFavorite?: (movie: OmdbSearchItem) => void;
}

export function MovieCard({
  movie,
  onClick,
  isFavorite,
  onToggleFavorite,
}: MovieCardProps) {
  const isPosterAvailable = movie.Poster && movie.Poster !== "N/A";
  const [imageError, setImageError] = useState(false);

  const fallbackPoster = (
    <div className="flex h-full w-full items-center justify-center bg-slate-800 text-slate-400 text-xs px-2 text-center">
      Sin póster
    </div>
  );

  return (
    <div
      className="
        group relative overflow-hidden rounded-xl bg-slate-900/60 
        border border-slate-700/60 
        hover:border-indigo-400/80
        shadow-md hover:shadow-xl 
        transition-transform duration-200
        hover:-translate-y-1
        text-left
      "
    >
      {/* Botón favorito */}
      {onToggleFavorite && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(movie);
          }}
          className="absolute top-2 right-2 z-10 p-1 rounded-full bg-black/50 hover:bg-black/70 transition"
          aria-label="Favorito"
        >
          {isFavorite ? (
            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
          ) : (
            <HeartOff className="w-4 h-4 text-white" />
          )}
        </button>
      )}

      <button onClick={onClick} className="w-full h-full text-left">
        <div className="aspect-2/3 w-full overflow-hidden bg-slate-900">
          {isPosterAvailable && !imageError ? (
            <img
              src={movie.Poster}
              alt={movie.Title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              onError={() => setImageError(true)}
            />
          ) : (
            fallbackPoster
          )}
        </div>

        <div className="p-3">
          <h3 className="text-sm font-semibold text-slate-50 line-clamp-2">
            {movie.Title}
          </h3>

          <div className="mt-1 flex items-center justify-between text-xs text-slate-300/80">
            <span>{movie.Year}</span>
            <span className="uppercase rounded-full bg-slate-700/60 px-2 py-0.5 text-[0.7rem]">
              {movie.Type}
            </span>
          </div>
        </div>
      </button>
    </div>
  );
}
