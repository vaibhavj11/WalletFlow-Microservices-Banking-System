import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { api } from "../services/api";

export default function Dashboard({ onLogout }) {
  const [balance, setBalance] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [walletExists, setWalletExists] = useState(true);
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId") || 1;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const bal = await api.getBalance(userId);
      setBalance(bal);
      const txns = await api.getTransactions(userId);
      setTransactions(txns.slice(0, 5));
    } catch {
      setWalletExists(false);
    } finally { setLoading(false); }
  };

  const handleCreateWallet = async () => {
    try {
      await api.createWallet(userId);
      setWalletExists(true);
      fetchData();
    } catch (e) {
      alert("Failed to create wallet");
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f4f3ff" }}>
      <Navbar onLogout={onLogout} />
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "32px 24px" }}>

        {loading ? (
          <div style={{ textAlign: "center", padding: 60, fontFamily: "sans-serif", color: "#888" }}>
            Loading...
          </div>
        ) : !walletExists ? (
          <div style={{
            background: "#fff", borderRadius: 20, padding: 40,
            textAlign: "center", boxShadow: "0 4px 20px rgba(0,0,0,0.06)"
          }}>
            <div style={{ fontSize: 48 }}>💳</div>
            <h2 style={{ fontFamily: "sans-serif", color: "#1a1a2e" }}>No Wallet Found</h2>
            <p style={{ color: "#888", fontFamily: "sans-serif" }}>Create a wallet to start banking</p>
            <button onClick={handleCreateWallet} style={{
              background: "linear-gradient(135deg, #6c5ce7, #a29bfe)",
              border: "none", color: "#fff", borderRadius: 12,
              padding: "14px 32px", fontSize: 15, fontWeight: 700,
              cursor: "pointer", fontFamily: "sans-serif"
            }}>
              Create Wallet
            </button>
          </div>
        ) : (
          <>
            {/* Balance Card */}
            <div style={{
              background: "linear-gradient(135deg, #6c5ce7, #a29bfe)",
              borderRadius: 20, padding: "32px 36px",
              marginBottom: 24, color: "#fff"
            }}>
              <div style={{ fontFamily: "sans-serif", fontSize: 13, opacity: 0.8, marginBottom: 8 }}>
                TOTAL BALANCE
              </div>
              <div style={{ fontFamily: "sans-serif", fontSize: 42, fontWeight: 800 }}>
                ₹{Number(balance).toLocaleString("en-IN")}
              </div>
              <div style={{ marginTop: 20, display: "flex", gap: 12 }}>
                <button onClick={() => navigate("/transfer")} style={{
                  background: "#fff", color: "#6c5ce7",
                  border: "none", borderRadius: 10, padding: "10px 24px",
                  fontWeight: 700, cursor: "pointer", fontFamily: "sans-serif"
                }}>💸 Transfer</button>
                <button onClick={() => navigate("/transactions")} style={{
                  background: "transparent", color: "#fff",
                  border: "1px solid #fff", borderRadius: 10, padding: "10px 24px",
                  fontWeight: 700, cursor: "pointer", fontFamily: "sans-serif"
                }}>📋 History</button>
              </div>
            </div>

            {/* Recent Transactions */}
            <div style={{
              background: "#fff", borderRadius: 20, padding: "24px 28px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.06)"
            }}>
              <h3 style={{ margin: "0 0 20px", fontFamily: "sans-serif", color: "#1a1a2e" }}>
                Recent Transactions
              </h3>
              {transactions.length === 0 ? (
                <p style={{ color: "#bbb", fontFamily: "sans-serif", textAlign: "center", padding: 20 }}>
                  No transactions yet
                </p>
              ) : (
                transactions.map((txn, i) => (
                  <div key={i} style={{
                    display: "flex", justifyContent: "space-between",
                    alignItems: "center", padding: "14px 0",
                    borderBottom: i < transactions.length - 1 ? "1px solid #f0f0f0" : "none"
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{
                        width: 40, height: 40, borderRadius: "50%",
                        background: txn.type === "DEPOSIT" ? "#00b89420" : "#6c5ce720",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 18
                      }}>
                        {txn.type === "DEPOSIT" ? "⬇️" : "⬆️"}
                      </div>
                      <div>
                        <div style={{ fontFamily: "sans-serif", fontWeight: 600, color: "#1a1a2e", fontSize: 14 }}>
                          {txn.type}
                        </div>
                        <div style={{ fontFamily: "sans-serif", fontSize: 12, color: "#999" }}>
                          {txn.status}
                        </div>
                      </div>
                    </div>
                    <div style={{
                      fontFamily: "sans-serif", fontWeight: 700, fontSize: 16,
                      color: txn.type === "DEPOSIT" ? "#00b894" : "#d63031"
                    }}>
                      {txn.type === "DEPOSIT" ? "+" : "-"}₹{Number(txn.amount).toLocaleString("en-IN")}
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}