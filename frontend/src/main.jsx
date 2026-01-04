import React, { createContext, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import API from "./utils/api.js";   // 👈 IMPORTANT

export const Context = createContext({
  isAuthorized: false,
});

const AppWrapper = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [user, setUser] = useState(null);

  // ✅ THIS WAS MISSING
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get("/api/v1/user/getuser");
        setUser(res.data.user);
        setIsAuthorized(true);
      } catch (error) {
        setUser(null);
        setIsAuthorized(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <Context.Provider
      value={{
        isAuthorized,
        setIsAuthorized,
        user,
        setUser,
      }}
    >
      <App />
    </Context.Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);
