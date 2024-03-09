import { createContext, useReducer } from "react";
import DarkModeReducer from "./darkModeReducer";

const INITIAL_STATE = {
  dark: false,
};

export const DarkModeContext = createContext(INITIAL_STATE);

export function DarkModeProvider({ children }) {
  const [state, dispatch] = useReducer(DarkModeReducer, INITIAL_STATE);

  return (
    <DarkModeContext.Provider value={{ dark: state.dark, dispatch }}>
      {children}
    </DarkModeContext.Provider>
  );
}
