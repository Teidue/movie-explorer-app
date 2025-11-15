import { useEffect, useRef, useState } from "react";
import type { OmdbMovieDetail } from "../../types/omdb";

interface MovieDetailModalProps {
  movie: OmdbMovieDetail;
  onClose: () => void;
}

export function MovieDetailModal({ movie, onClose }: MovieDetailModalProps) {
  const [imageError, setImageError] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const hasPoster = movie.Poster && movie.Poster !== "N/A" && !imageError;

  const fallbackPoster = (
    <div className="flex h-full w-full items-center justify-center text-slate-400 text-sm bg-slate-800 p-4 text-center">
      Sin póster
    </div>
  );

  // 🔒 Scroll lock + focus + ESC + focus trap
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      // Cerrar con ESC
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }

      // Focus trap con Tab
      if (e.key === "Tab" && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<
          HTMLButtonElement | HTMLAnchorElement | HTMLInputElement
        >(
          'button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])'
        );

        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        const current = document.activeElement;

        if (!current) return;

        if (!e.shiftKey && current === last) {
          e.preventDefault();
          (first as HTMLElement).focus();
        } else if (e.shiftKey && current === first) {
          e.preventDefault();
          (last as HTMLElement).focus();
        }
      }
    };

    // Focus inicial en el botón de cerrar (o el primer elemento del modal)
    setTimeout(() => {
      if (modalRef.current) {
        const firstFocusable = modalRef.current.querySelector<
          HTMLElement
        >(
          'button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])'
        );
        firstFocusable?.focus();
      }
    }, 10);

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="
        fixed inset-0 z-50 
        flex items-center justify-center 
        bg-black/70 backdrop-blur-md
        px-4
      "
      onClick={onClose} // cerrar al hacer click fuera
    >
      {/* Backdrop dinámico con el poster difuminado */}
      {hasPoster && (
        <div
          className="
            pointer-events-none
            fixed inset-0 -z-10
            opacity-40
            blur-3xl
            scale-110
            bg-cover bg-center
          "
          style={{
            backgroundImage: `url("${movie.Poster}")`,
          }}
        />
      )}

      <div
        ref={modalRef}
        className="
          relative 
          max-w-4xl w-full 
          bg-slate-950/95 
          border border-slate-700/70 
          rounded-2xl 
          shadow-2xl 
          overflow-hidden
          text-white
          flex flex-col md:flex-row
          animate-modalIn
        "
        onClick={(e) => e.stopPropagation()} // no cerrar si clic dentro
        role="dialog"
        aria-modal="true"
        aria-label={`Detalle de ${movie.Title}`}
      >
        {/* POSTER */}
        <div className="md:w-1/3 w-full bg-slate-900">
          {hasPoster ? (
            <img
              src={movie.Poster}
              alt={movie.Title}
              className="h-full w-full object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            fallbackPoster
          )}
        </div>

        {/* CONTENIDO */}
        <div className="md:w-2/3 w-full p-6 md:p-8 flex flex-col gap-3">
          {/* Botón cerrar */}
          <button
            onClick={onClose}
            className="
              absolute top-3 right-3 
              rounded-full bg-slate-800/80 
              hover:bg-slate-700 
              w-8 h-8 flex items-center justify-center
              text-sm
              focus:outline-none focus:ring-2 focus:ring-indigo-500
            "
          >
            ✕
          </button>

          {/* Título */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-1">
              {movie.Title}
            </h2>
            <div className="flex flex-wrap items-center gap-2 text-sm text-slate-300">
              <span>{movie.Year}</span>
              {movie.Runtime && movie.Runtime !== "N/A" && (
                <span>• {movie.Runtime}</span>
              )}
              {movie.Rated && movie.Rated !== "N/A" && (
                <span>• {movie.Rated}</span>
              )}
              <span>• {movie.Type.toUpperCase()}</span>
            </div>
          </div>

          {/* Rating + Género */}
          <div className="flex flex-wrap items-center gap-3 text-sm mt-1">
            {movie.imdbRating && movie.imdbRating !== "N/A" && (
              <div className="flex items-center gap-1">
                <span className="text-yellow-400">★</span>
                <span className="font-semibold">{movie.imdbRating}</span>
                <span className="text-xs text-slate-400">/ 10 IMDb</span>
              </div>
            )}

            {movie.Genre && movie.Genre !== "N/A" && (
              <span className="text-slate-300">{movie.Genre}</span>
            )}
          </div>

          {/* Plot */}
          <div className="mt-2 text-sm text-slate-200 leading-relaxed">
            {movie.Plot}
          </div>

          {/* Info adicional */}
          <div className="mt-3 space-y-1 text-xs md:text-sm text-slate-300">
            {movie.Director && movie.Director !== "N/A" && (
              <p>
                <span className="font-semibold text-slate-100">
                  Director:
                </span>{" "}
                {movie.Director}
              </p>
            )}

            {movie.Writer && movie.Writer !== "N/A" && (
              <p>
                <span className="font-semibold text-slate-100">
                  Guion:
                </span>{" "}
                {movie.Writer}
              </p>
            )}

            {movie.Actors && movie.Actors !== "N/A" && (
              <p>
                <span className="font-semibold text-slate-100">
                  Reparto:
                </span>{" "}
                {movie.Actors}
              </p>
            )}

            {movie.Awards && movie.Awards !== "N/A" && (
              <p>
                <span className="font-semibold text-slate-100">
                  Premios:
                </span>{" "}
                {movie.Awards}
              </p>
            )}

            {movie.Country && movie.Country !== "N/A" && (
              <p>
                <span className="font-semibold text-slate-100">
                  País:
                </span>{" "}
                {movie.Country}
              </p>
            )}

            {movie.Language && movie.Language !== "N/A" && (
              <p>
                <span className="font-semibold text-slate-100">
                  Idioma:
                </span>{" "}
                {movie.Language}
              </p>
            )}

            {movie.BoxOffice && movie.BoxOffice !== "N/A" && (
              <p>
                <span className="font-semibold text-slate-100">
                  Box Office:
                </span>{" "}
                {movie.BoxOffice}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
