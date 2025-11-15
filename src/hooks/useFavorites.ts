import { useEffect, useState } from "react";
import type { OmdbSearchItem } from "../types/omdb";

const FAVORITES_KEY = "favorites";

export function useFavorites() {
  // Inicializar desde localStorage
  const [favorites, setFavorites] = useState<OmdbSearchItem[]>(() => {
    const stored = localStorage.getItem(FAVORITES_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  // Guardar en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const isFavorite = (id: string) => favorites.some((m) => m.imdbID === id);

  const toggleFavorite = (movie: OmdbSearchItem) => {
    setFavorites((prev) =>
      prev.some((m) => m.imdbID === movie.imdbID)
        ? prev.filter((m) => m.imdbID !== movie.imdbID)
        : [...prev, movie]
    );
  };

  return { favorites, isFavorite, toggleFavorite };
}
