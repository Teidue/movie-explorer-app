// src/types/history.ts
export type HistoryItem =
  | { type: "search"; query: string; timestamp: number }
  | { type: "movie"; id: string; title: string; timestamp: number };
