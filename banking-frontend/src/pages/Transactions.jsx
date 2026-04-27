import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { api } from "../services/api";

export default function Transactions({ onLogout }) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("userId") || 1;

  useEffect(() => {
    api.getTransactions(userId)
      .then(data => setTransactions(data))
      .catch(() => setTransactions([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#f4f3ff" }}>
      <Navbar onLogout={onLogout} />
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "32px 24px" }}>
        <h2 style={{ fontFamily: "sans-serif", color: "#1a1a2e", marginBottom: 24 }}>
          📋 Transaction History
        </h2>

        {loading ? (
          <div style={{ textAlign: "center", padding: 60, color: "#888", fontFamily: "sans-serif" }}>
            Loading...
          </div>
        ) : transactions.length === 0 ? (
          <div style={{
            background: "#fff", borderRadius: 20, padding: 40,
            textAlign: "center", color: "#bbb", fontFamily: "sans-serif"
          }}>
            No transactions found
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {transactions.map((txn, i) => (
              <div key={i} style={{
                background: "#fff", borderRadius: 16, padding: "20px 24px",
                boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                display: "flex", justifyContent: "space-between", alignItems: "center",
                borderLeft: `4px solid ${txn.type === "DEPOSIT" ? "#00b894" : "#6c5ce7"}`
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: "50%",
                    background: txn.type === "DEPOSIT" ? "#00b89420" : "#6c5ce720",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 20
                  }}>
                    {txn.type === "DEPOSIT" ? "⬇️" : "⬆️"}
                  </div>
                  <div>
                    <div style={{ fontFamily: "sans-serif", fontWeight: 700, color: "#1a1a2e" }}>
                      {txn.type}
                    </div>
                    <div style={{ fontFamily: "sans-serif", fontSize: 12, color: "#999", marginTop: 2 }}>
                      {txn.fromUserId ? `From: User ${txn.fromUserId} → To: User ${txn.toUserId}` : `To: User ${txn.toUserId}`}
                    </div>
                    <div style={{ fontFamily: "sans-serif", fontSize: 11, color: "#bbb", marginTop: 2 }}>
                      {txn.createdAt ? new Date(txn.createdAt).toLocaleString("en-IN") : ""}
                    </div>
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{
                    fontFamily: "sans-serif", fontWeight: 800, fontSize: 18,
                    color: txn.type === "DEPOSIT" ? "#00b894" : "#d63031"
                  }}>
                    {txn.type === "DEPOSIT" ? "+" : "-"}₹{Number(txn.amount).toLocaleString("en-IN")}
                  </div>
                  <div style={{
                    fontFamily: "sans-serif", fontSize: 11, fontWeight: 600,
                    color: txn.status === "SUCCESS" ? "#00b894" : "#d63031",
                    marginTop: 4
                  }}>
                    {txn.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}