import { useState, useEffect } from "react";
import { HistoryContext } from "./HistoryContext";
import type { ReactNode } from "react";
import type { HistoryItem } from "../types/history";

export interface HistoryContextValue {
  history: HistoryItem[];
  addSearch: (query: string) => void;
  addMovie: (id: string, title: string) => void;
  removeEntry: (timestamp: number) => void;
}

const STORAGE_KEY = "search_history";

export function HistoryProvider({ children }: { children: ReactNode }) {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setTimeout(() => {
            setHistory(parsed as HistoryItem[]);
          }, 0);
        }
      } catch {
        console.warn("Historial corrupto en localStorage.");
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  }, [history]);

  const addSearch = (query: string) => {
    if (!query.trim()) return;
    setHistory((prev) => {
      const filtered = prev.filter(
        (item) => item.type !== "search" || item.query !== query
      );
      return [
        { type: "search", query, timestamp: Date.now() } as const,
        ...filtered,
      ].slice(0, 20);
    });
  };

  const addMovie = (id: string, title: string) => {
    setHistory((prev) => {
      const filtered = prev.filter(
        (item) => item.type !== "movie" || item.id !== id
      );
      return [
        { type: "movie", id, title, timestamp: Date.now() } as const,
        ...filtered,
      ].slice(0, 20);
    });
  };

  const removeEntry = (timestamp: number) => {
    setHistory((prev) => prev.filter((item) => item.timestamp !== timestamp));
  };

  return (
    <HistoryContext.Provider
      value={{ history, addSearch, addMovie, removeEntry }}
    >
      {children}
    </HistoryContext.Provider>
  );
}
