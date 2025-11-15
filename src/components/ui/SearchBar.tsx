import { useState } from "react";
import { ChevronDown, Search } from "lucide-react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  filterType: string;
  setFilterType: (type: string) => void;
}

export function SearchBar({
  onSearch,
  filterType,
  setFilterType,
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");

  const handleSearch = () => {
    if (!query.trim()) {
      setError("Escribe algo para buscar.");
      return;
    }

    if (query.length > 50) {
      setError("Máximo 50 caracteres.");
      return;
    }

    setError("");
    onSearch(query.trim());
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <div
        className="
          flex w-full 
          bg-white/10 backdrop-blur-md 
          border border-white/10 
          rounded-xl overflow-hidden 
          focus-within:ring-2 focus-within:ring-indigo-500
        "
      >
        {/* Select */}
        <div className="relative">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="
              appearance-none
              bg-slate-900/70 
              text-sm text-slate-200 
              px-4 pr-10 py-2 
              border-r border-white/10
              rounded-l-md
              h-full
            "
          >
            <option value="">Todos</option>
            <option value="movie">Películas</option>
            <option value="series">Series</option>
          </select>

          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </div>
        </div>

        {/* Input */}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Buscar título..."
          className="
            flex-1 
            bg-transparent 
            px-4 py-2 
            text-sm text-white 
            outline-none
          "
        />

        {/* Botón lupa */}
        <button
          onClick={handleSearch}
          className="
            px-4 
            bg-slate-900/70
            border-l border-white/10
            text-slate-300 hover:text-white 
            flex items-center justify-center 
            rounded-r-md
        "
          aria-label="Buscar"
        >
          <Search className="w-5 h-5" />
        </button>
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}
    </div>
  );
}
