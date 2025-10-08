import React, { useEffect, useState } from "react";
import { fetchWithdrawals, updateWithdrawal } from "../api";

export default function Withdrawals({ onLogout }) {
  const [items, setItems] = useState([]);

  async function load() {
    try {
      const { data } = await fetchWithdrawals();
      setItems(data.items || []);
    } catch (e) {
      alert(e.response?.data?.error || "Błąd pobierania wypłat");
    }
  }

  useEffect(() => { load(); }, []);

  async function setStatus(id, status) {
    try {
      await updateWithdrawal(id, status);
      await load();
      alert(status === "approved" ? "Zatwierdzono ✅" : "Odrzucono ❌");
    } catch (e) {
      alert(e.response?.data?.error || "Błąd aktualizacji");
    }
  }

  return (
    <div style={{ maxWidth:900, margin:"40px auto", padding:"0 16px" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
        <h2>Wypłaty</h2>
        <button onClick={onLogout} style={logout}>Wyloguj</button>
      </div>

      <div style={{ background:"#fff", borderRadius:16, overflow:"hidden", boxShadow:"0 10px 30px rgba(0,0,0,0.06)" }}>
        <table style={{ width:"100%", borderCollapse:"collapse" }}>
          <thead style={{ background:"#f9fafb" }}>
            <tr>
              <th style={cell}>ID</th>
              <th style={cell}>Użytkownik (uid)</th>
              <th style={cell}>PayPal</th>
              <th style={cell}>Punkty</th>
              <th style={cell}>Status</th>
              <th style={cell}>Akcje</th>
            </tr>
          </thead>
          <tbody>
            {items.map(it => (
              <tr key={it.id}>
                <td style={cell}>{it.id}</td>
                <td style={cell}>{it.uid}</td>
                <td style={cell}>{it.paypalEmail}</td>
                <td style={cell}>{it.points}</td>
                <td style={cell}><span style={{ padding:"4px 10px", borderRadius:999, background: badgeColor(it.status) }}>{it.status}</span></td>
                <td style={cell}>
                  <button onClick={() => setStatus(it.id, "approved")} style={ok}>✅</button>
                  <button onClick={() => setStatus(it.id, "rejected")} style={no}>❌</button>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr><td colSpan="6" style={{ padding:20, textAlign:"center", color:"#666" }}>Brak wniosków</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const cell   = { padding:"12px 14px", borderBottom:"1px solid #eef2f7", textAlign:"left", fontSize:14 };
const logout = { padding:"8px 12px", borderRadius:8, border:"1px solid #e5e7eb", background:"#fff", cursor:"pointer" };
const ok     = { padding:"8px 10px", marginRight:6, borderRadius:8, border:"none", background:"#10b981", color:"#fff", cursor:"pointer" };
const no     = { padding:"8px 10px", borderRadius:8, border:"none", background:"#ef4444", color:"#fff", cursor:"pointer" };

function badgeColor(status) {
  if (status === "approved") return "#d1fae5";
  if (status === "rejected") return "#fee2e2";
  return "#e5e7eb";
}