import { useFavorites } from "../hooks/useFavorites";
import { MovieCard } from "../components/movies/MovieCard";
import { Header } from "../components/layout/Header";
import { SearchX } from "lucide-react";

export function Favorites() {
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  return (
    <>
      <Header />

      <section className="relative min-h-screen w-full px-6 py-16 text-white">
        {/* Fondo cinematográfico igual al de Home */}
        <div
          className="absolute inset-0 bg-cover bg-center blur-[3px] brightness-[0.55]"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=1400&q=80")',
          }}
        />
        <div className="absolute inset-0 bg-black/60" />

        {/* Contenido */}
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <h1 className="text-5xl font-extrabold drop-shadow-lg mb-6">
            Tus favoritos ❤️
          </h1>

          {favorites.length === 0 ? (
            <div className="flex flex-col items-center gap-3 mt-12 text-slate-400">
              <SearchX className="w-10 h-10 text-slate-500" />
              <p className="text-lg">No has agregado favoritos aún.</p>
            </div>
          ) : (
            <div
              className="
                mt-10 grid gap-5
                grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5
              "
            >
              {favorites.map((movie) => (
                <MovieCard
                  key={movie.imdbID}
                  movie={movie}
                  onClick={() => {}}
                  onToggleFavorite={() => toggleFavorite(movie)}
                  isFavorite={isFavorite(movie.imdbID)}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
