import { createContext, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";

export const NavigationContext = createContext();

export function NavigationProvider({ children }) {
  const navigate = useNavigate();
  const navigateRef = useRef(navigate);

  return (
    <NavigationContext.Provider value={navigateRef}>
      {children}
    </NavigationContext.Provider>
  );
}

export const useLinkNavigate = () => {
  const navigateRef = useContext(NavigationContext);
  return navigateRef.current;
};
