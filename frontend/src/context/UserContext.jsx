import { createContext, useState, useEffect } from "react";
import { getUserProfile } from "../services/UserApi";

export const UserContext = createContext();

const initialState = {
  userInfo: null,
  isLogin: false,
};

export function UserProvider({ children }) {
  const [user, setUser] = useState(initialState);
  useEffect(() => {
    async function updateUser() {
      try {
        const result = await getUserProfile();
        if (result && result.data) {
          setUser((prev) => ({
            ...prev,
            userInfo: {
              name: result.data,
            },
            isLogin: true,
          }));
        } else {
          throw new Error("사용자가 없습니다.");
        }
      } catch (e) {
        console.log(e.message);
        setUser((prev) => ({ ...prev, ...initialState }));
      }
    }
    updateUser();
  }, []);
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}
