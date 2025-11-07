import { createContext, useContext, useReducer } from "react";
import { api } from "../api/axios";

const AuthContext = createContext();

const initial = {
  user: null,
  token: localStorage.getItem("token") || null,
};

function reducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload.user, token: action.payload.token };
    case "LOGOUT":
      return { user: null, token: null };
    default:
      return state;
  }
}

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initial);

  const signup = async (name, email, password) => {
    const { data } = await api.post("/auth/signup", { name, email, password });
    dispatch({ type: "LOGIN", payload: data });
    localStorage.setItem("token", data.token);
    return data;
  };

  const signin = async (email, password) => {
    const { data } = await api.post("/auth/signin", { email, password });
    dispatch({ type: "LOGIN", payload: data });
    localStorage.setItem("token", data.token);
    return data;
  };

  const signout = async () => {
    await api.get("/auth/signout");
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signup,
        signin,
        signout, // ✅ must be here
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ✅ export hook
export const useAuth = () => useContext(AuthContext);
