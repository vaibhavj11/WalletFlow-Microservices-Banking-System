import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar({ onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();

  const links = [
    { path: "/dashboard", label: "🏠 Dashboard" },
    { path: "/transfer", label: "💸 Transfer" },
    { path: "/transactions", label: "📋 Transactions" },
  ];

  return (
    <div style={{
      background: "#1a1a2e", height: 64,
      display: "flex", alignItems: "center",
      justifyContent: "space-between", padding: "0 40px",
      boxShadow: "0 2px 20px rgba(0,0,0,0.2)",
      position: "sticky", top: 0, zIndex: 100
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 24 }}>🏦</span>
        <span style={{ color: "#fff", fontWeight: 800, fontSize: 18, fontFamily: "sans-serif" }}>
          WalletFlow BankApp
        </span>
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        {links.map(link => (
          <button key={link.path} onClick={() => navigate(link.path)} style={{
            background: location.pathname === link.path ? "#6c5ce7" : "transparent",
            border: "1px solid #6c5ce7",
            color: "#fff", borderRadius: 8,
            padding: "8px 16px", cursor: "pointer",
            fontFamily: "sans-serif", fontSize: 13, fontWeight: 600
          }}>
            {link.label}
          </button>
        ))}
        <button onClick={onLogout} style={{
          background: "transparent", border: "1px solid #ff4d4d",
          color: "#ff4d4d", borderRadius: 8,
          padding: "8px 16px", cursor: "pointer",
          fontFamily: "sans-serif", fontSize: 13, fontWeight: 600
        }}>
          🚪 Logout
        </button>
      </div>
    </div>
  );
}