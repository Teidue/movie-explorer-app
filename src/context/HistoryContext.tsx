import { createContext } from "react";
import type { HistoryContextValue } from "./HistoryProvider";

export const HistoryContext = createContext<HistoryContextValue | undefined>(
  undefined
);
