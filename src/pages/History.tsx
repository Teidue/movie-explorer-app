import { useHistory } from "../hooks/useHistory";
import { Header } from "../components/layout/Header";
import { SearchX } from "lucide-react";

export function History() {
  const { history, removeEntry } = useHistory();
  console.log("🧾 Entradas cargadas en historial:", history);

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

        {/* Contenido */}
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-extrabold drop-shadow-lg mb-6">
            Historial 📜
          </h1>

          {history.length === 0 ? (
            <div className="flex flex-col items-center gap-2 text-slate-400 mt-10">
              <SearchX className="w-8 h-8 text-slate-500" />
              <p>No hay entradas en tu historial aún.</p>
            </div>
          ) : (
            <ul className="mt-10 space-y-4 text-left">
              {history.map((item) => (
                <li
                  key={item.timestamp}
                  className="flex items-center justify-between bg-slate-800/60 backdrop-blur-md p-4 rounded-xl border border-slate-600 shadow-sm"
                >
                  <div>
                    <p className="text-sm font-medium">
                      {item.type === "search" ? (
                        <>
                          🔍 Búsqueda:{" "}
                          <span className="italic">{item.query}</span>
                        </>
                      ) : (
                        <>
                          🎬 Película:{" "}
                          <span className="italic">{item.title}</span>
                        </>
                      )}
                    </p>
                    <p className="text-xs text-slate-400">
                      {new Date(item.timestamp).toLocaleString()}
                    </p>
                  </div>
                  <button
                    onClick={() => removeEntry(item.timestamp)}
                    className="text-xs text-red-400 hover:underline"
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}
