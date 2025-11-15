import { useContext } from "react";
import { HistoryContext } from "../context/HistoryContext";

export function useHistory() {
  const context = useContext(HistoryContext);
  if (!context) {
    throw new Error("useHistory debe usarse dentro de <HistoryProvider>");
  }
  return context;
}
