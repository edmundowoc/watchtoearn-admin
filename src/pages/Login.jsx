import React, { useState } from "react";
import { adminLogin } from "../api";

export default function Login({ onSuccess }) {
  const [email, setEmail] = useState(import.meta.env.VITE_ADMIN_EMAIL || "admin@watchtoearn.com");
  const [pass, setPass] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await adminLogin(email, pass);
      onSuccess(data.token);
    } catch (e) {
      alert(e?.response?.data?.error || "Błąd logowania");
    }
  };

  return (
    <div style={{ minHeight:"100vh", display:"grid", placeItems:"center" }}>
      <form onSubmit={submit} style={{ background:"#fff", padding:24, borderRadius:16, width:360, boxShadow:"0 10px 30px rgba(0,0,0,0.06)" }}>
        <h2 style={{ margin:"0 0 8px" }}>Panel admina</h2>
        <p style={{ margin:"0 0 16px", color:"#666" }}>Zaloguj się, aby zarządzać wypłatami</p>

        <label style={{ fontSize:12 }}>E-mail</label>
        <input value={email} onChange={e=>setEmail(e.target.value)} style={input} placeholder="admin@watchtoearn.com" />

        <label style={{ fontSize:12 }}>Hasło</label>
        <input type="password" value={pass} onChange={e=>setPass(e.target.value)} style={input} placeholder="••••••••" />

        <button type="submit" style={btn}>Zaloguj</button>
      </form>
    </div>
  );
}

const input = { width:"100%", padding:12, borderRadius:10, border:"1px solid #e5e7eb", margin:"6px 0 14px", outline:"none" };
const btn   = { width:"100%", padding:12, borderRadius:12, border:"none", background:"#111827", color:"#fff", fontWeight:700, cursor:"pointer" };