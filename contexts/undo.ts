import { Undo } from "@/types/undo";
import { createContext } from "react";

export const UndoContext = createContext<Undo>(null)
export const SetUndoContext = createContext((undo:Undo) => {})