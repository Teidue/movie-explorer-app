import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="px-6 py-4 bg-black/90 text-white flex justify-between items-center shadow">
      <Link to="/" className="text-lg font-bold hover:text-indigo-400">🎬 Movie Explorer</Link>
      <nav className="flex gap-4 text-sm">
        <Link to="/" className="hover:text-indigo-400">Inicio</Link>
        <Link to="/favoritos" className="hover:text-indigo-400">Favoritos</Link>
        <Link to="/historial" className="hover:text-indigo-400">Historial de Búsquedas</Link>
      </nav>
    </header>
  );
}
