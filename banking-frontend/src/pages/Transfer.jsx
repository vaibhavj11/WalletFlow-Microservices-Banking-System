import { useState } from "react";
import Navbar from "../components/Navbar";
import { api } from "../services/api";

export default function Transfer({ onLogout }) {
  const [form, setForm] = useState({ toUserId: "", amount: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const userId = localStorage.getItem("userId") || 1;

  const handleTransfer = async () => {
    if (!form.toUserId || !form.amount) return setError("Please fill all fields");
    if (Number(form.amount) <= 0) return setError("Amount must be greater than 0");
    setLoading(true); setError(""); setSuccess("");
    try {
      await api.transfer(userId, form.toUserId, form.amount);
      setSuccess(`✅ ₹${Number(form.amount).toLocaleString("en-IN")} transferred successfully!`);
      setForm({ toUserId: "", amount: "" });
    } catch {
      setError("Transfer failed. Check balance or receiver ID.");
    } finally { setLoading(false); }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f4f3ff" }}>
      <Navbar onLogout={onLogout} />
      <div style={{ maxWidth: 500, margin: "40px auto", padding: "0 24px" }}>
        <div style={{
          background: "#fff", borderRadius: 20, padding: "36px",
          boxShadow: "0 8px 40px rgba(108,92,231,0.12)"
        }}>
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <div style={{ fontSize: 48 }}>💸</div>
            <h2 style={{ margin: "8px 0 4px", color: "#1a1a2e", fontFamily: "sans-serif" }}>
              Send Money
            </h2>
            <p style={{ color: "#999", fontSize: 13, margin: 0, fontFamily: "sans-serif" }}>
              Transfer money to another user
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label style={{ fontSize: 11, color: "#888", fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", fontFamily: "sans-serif" }}>
                Receiver User ID
              </label>
              <input
                type="number" placeholder="Enter receiver's user ID"
                value={form.toUserId}
                onChange={e => setForm(p => ({ ...p, toUserId: e.target.value }))}
                style={{
                  border: "1.5px solid #eee", borderRadius: 10,
                  padding: "12px 16px", fontSize: 14,
                  outline: "none", color: "#1a1a2e", fontFamily: "sans-serif"
                }}
                onFocus={e => e.target.style.borderColor = "#6c5ce7"}
                onBlur={e => e.target.style.borderColor = "#eee"}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label style={{ fontSize: 11, color: "#888", fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", fontFamily: "sans-serif" }}>
                Amount (₹)
              </label>
              <input
                type="number" placeholder="Enter amount"
                value={form.amount}
                onChange={e => setForm(p => ({ ...p, amount: e.target.value }))}
                style={{
                  border: "1.5px solid #eee", borderRadius: 10,
                  padding: "12px 16px", fontSize: 14,
                  outline: "none", color: "#1a1a2e", fontFamily: "sans-serif"
                }}
                onFocus={e => e.target.style.borderColor = "#6c5ce7"}
                onBlur={e => e.target.style.borderColor = "#eee"}
              />
            </div>

            {error && <div style={{ color: "#d63031", fontSize: 13, fontWeight: 600 }}>⚠️ {error}</div>}
            {success && <div style={{ color: "#00b894", fontSize: 13, fontWeight: 600 }}>{success}</div>}

            <button onClick={handleTransfer} disabled={loading} style={{
              background: "linear-gradient(135deg, #6c5ce7, #a29bfe)",
              border: "none", color: "#fff", borderRadius: 12,
              padding: "14px", fontSize: 15, fontWeight: 700,
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1, fontFamily: "sans-serif"
            }}>
              {loading ? "Transferring..." : "Send Money 💸"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}