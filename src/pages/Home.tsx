import { useState } from "react";
import { SearchBar } from "../components/ui/SearchBar";
import { MovieCard } from "../components/movies/MovieCard";
import { searchMovies, getMovieById } from "../services/omdbService";
import { useFavorites } from "../hooks/useFavorites";
import type {
  OmdbSearchResponseSuccess,
  OmdbMovieDetail,
  OmdbSearchItem,
} from "../types/omdb";
import { MovieDetailModal } from "../components/movies/MovieDetailModal";
import { SearchX } from "lucide-react";
import { Header } from "../components/layout/Header";
import { useHistory } from "../hooks/useHistory";

export function Home() {
  console.log("Home page rendered");

  const [movies, setMovies] = useState<OmdbSearchItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { isFavorite, toggleFavorite } = useFavorites();
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const totalPages = Math.ceil(totalResults / 10);
  const [lastQuery, setLastQuery] = useState("");
  const [selectedMovie, setSelectedMovie] = useState<OmdbMovieDetail | null>(
    null
  );
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState<string | null>(null);
  const [filterType, setFilterType] = useState("");
  const { addSearch } = useHistory();

  const handleSearch = async (query: string) => {
    setLastQuery(query);
    setPage(1);
    await fetchMovies(query, 1);
    addSearch(query); // ← ✅ Aquí guardas la búsqueda en el historial
  };

  const fetchMovies = async (query: string, page: number) => {
    try {
      setLoading(true);
      setError(null);

      const data = await searchMovies(query, page);

      if (data.Response === "False") {
        setMovies([]);
        setTotalResults(0);

        // Solo mostrar errores distintos a "Movie not found"
        if (data.Error !== "Movie not found!") {
          setError(data.Error);
        } else {
          setError(null); // para evitar mostrarlo en rojo
        }

        return;
      }

      const success = data as OmdbSearchResponseSuccess;
      const raw = success.Search;

      // Filtrar por tipo
      const filtered = filterType
        ? raw.filter((m) => m.Type.toLowerCase() === filterType.toLowerCase())
        : raw;

      setMovies(filtered);
      setTotalResults(Number(success.totalResults));
    } catch {
      setError("Hubo un error al obtener las películas.");
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = async (nextPage: number) => {
    if (nextPage < 1 || nextPage > totalPages) return;

    setPage(nextPage);
    await fetchMovies(lastQuery, nextPage);
  };

  const openMovieDetail = async (imdbID: string) => {
    try {
      setDetailLoading(true);
      setDetailError(null);
      setSelectedMovie(null);

      const data = await getMovieById(imdbID);

      if (data.Response === "False") {
        setDetailError(data.Error);
        return;
      }

      setSelectedMovie(data);
    } catch {
      setDetailError("Hubo un error al cargar el detalle de la película.");
    } finally {
      setDetailLoading(false);
    }
  };

  const closeMovieDetail = () => {
    setSelectedMovie(null);
    setDetailError(null);
  };

  return (
    <>
      <Header />
      <section className="relative min-h-screen w-full px-6 py-16 text-white">
        {/* fondo cinematográfico */}
        <div
          className="absolute inset-0 bg-cover bg-center blur-[3px] brightness-[0.55]"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=1400&q=80")',
          }}
        />
        <div className="absolute inset-0 bg-black/60" />

        {/* hero */}
        <div className="relative z-10 max-w-4xl mx-auto text-center mb-10">
          <h1 className="text-5xl md:text-7xl font-extrabold drop-shadow-lg mb-6">
            Movie Explorer
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8">
            Busca entre películas y series usando OMDb. Escribe un título y
            explora.
          </p>

          {/* barra de búsqueda + filtro tipo */}
          <div
            className="
            relative z-10 
            max-w-3xl mx-auto 
            mt-6 
            p-5 
            rounded-2xl 
            bg-white/10 backdrop-blur-xl 
            shadow-xl 
            border border-white/10
            flex flex-col gap-5
            animate-fadeIn
          "
          >
            <SearchBar
              onSearch={handleSearch}
              filterType={filterType}
              setFilterType={setFilterType}
            />
          </div>
        </div>

        {/* estado */}
        <div className="relative z-10 max-w-5xl mx-auto mt-6">
          {loading && <p className="text-center">Cargando...</p>}
          {error && <p className="text-center text-red-400">{error}</p>}
        </div>

        {/* grid */}
        {movies.length > 0 && !loading && (
          <div className="relative z-10 max-w-5xl mx-auto mt-8">
            <div
              className="
              grid gap-5
              grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5
            "
            >
              {movies.map((movie) => (
                <MovieCard
                  key={movie.imdbID}
                  movie={movie}
                  onClick={() => openMovieDetail(movie.imdbID)}
                  isFavorite={isFavorite(movie.imdbID)}
                  onToggleFavorite={toggleFavorite}
                />
              ))}
            </div>

            {/* paginación */}
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center gap-4 text-sm">
                <button
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                  className="px-3 py-1 rounded bg-slate-800 disabled:opacity-40"
                >
                  Anterior
                </button>
                <span className="text-gray-200">
                  Página {page} de {totalPages}
                </span>
                <button
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === totalPages}
                  className="px-3 py-1 rounded bg-slate-800 disabled:opacity-40"
                >
                  Siguiente
                </button>
              </div>
            )}
          </div>
        )}

        {/* mensaje si no hay resultados */}
        {!loading && movies.length === 0 && lastQuery && (
          <div className="relative z-10 mt-12 text-center text-slate-400 flex flex-col items-center gap-2">
            <SearchX className="w-10 h-10 text-slate-500" />

            <p className="text-lg">
              No se encontraron resultados para &quot;
              <span className="font-medium">{lastQuery}</span>&quot;
              {filterType && (
                <span className="ml-1 text-sm text-slate-500">
                  (
                  {filterType === "movie"
                    ? "película"
                    : filterType === "series"
                    ? "serie"
                    : filterType}
                  )
                </span>
              )}
            </p>
          </div>
        )}

        {/* Modal */}
        {selectedMovie && (
          <MovieDetailModal movie={selectedMovie} onClose={closeMovieDetail} />
        )}

        {/* error modal */}
        {detailError && !selectedMovie && (
          <div className="fixed bottom-4 inset-x-0 z-50 flex justify-center">
            <div className="px-4 py-2 rounded-lg bg-red-700/90 text-sm">
              {detailError}
            </div>
          </div>
        )}

        {/* loading modal */}
        {detailLoading && (
          <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40">
            <p className="text-sm text-gray-100">Cargando detalle...</p>
          </div>
        )}
      </section>
    </>
  );
}
