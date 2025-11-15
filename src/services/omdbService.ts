import type {
  OmdbSearchResponse,
  OmdbMovieDetailResponse,
} from "../types/omdb";

const API_BASE_URL = "https://www.omdbapi.com/";
const API_KEY = import.meta.env.VITE_OMDB_API_KEY || "b9d7f5ad";

export async function searchMovies(
  query: string,
  page: number = 1
): Promise<OmdbSearchResponse> {
  const url = `${API_BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(
    query
  )}&page=${page}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Error al conectar con la API");

  return res.json() as Promise<OmdbSearchResponse>;
}

// 🔽 NUEVO: detalle de película por ID
export async function getMovieById(
  imdbId: string
): Promise<OmdbMovieDetailResponse> {
  const url = `${API_BASE_URL}?apikey=${API_KEY}&i=${imdbId}&plot=full`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Error al obtener el detalle de la película.");
  }

  return res.json() as Promise<OmdbMovieDetailResponse>;
}
