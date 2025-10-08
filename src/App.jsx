import React, { useEffect, useState } from "react";
import Login from "./pages/Login";
import Withdrawals from "./pages/Withdrawals";
import { setAuthToken } from "./api";

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("w2e_admin_token") || "");

  useEffect(() => setAuthToken(token), [token]);

  if (!token) {
    return (
      <Login
        onSuccess={(t) => {
          localStorage.setItem("w2e_admin_token", t);
          setToken(t);
        }}
      />
    );
  }

  return (
    <Withdrawals
      onLogout={() => {
        localStorage.removeItem("w2e_admin_token");
        setToken("");
      }}
    />
  );
}
