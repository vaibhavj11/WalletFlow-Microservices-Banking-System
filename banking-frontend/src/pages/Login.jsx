import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

export default function Login({ onLogin }) {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!form.username || !form.password) return setError("Please fill all fields");
    setLoading(true); setError("");
    try {
      const token = await api.login(form);
      localStorage.setItem("token", token);
      localStorage.setItem("username", form.username);

      const user = await api.getUserByUsername(form.username);
      localStorage.setItem("userId", user.id);

      onLogin();
      navigate("/dashboard");
    } catch {
      setError("Invalid username or password");
    } finally { setLoading(false); }
  };

  return (
    <div style={{
      minHeight: "100vh", background: "#f4f3ff",
      display: "flex", alignItems: "center", justifyContent: "center"
    }}>
      <div style={{
        background: "#fff", borderRadius: 20, padding: "40px",
        boxShadow: "0 8px 40px rgba(108,92,231,0.15)",
        width: 380, border: "1px solid #ede9ff"
      }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ fontSize: 48 }}>🏦</div>
          <h2 style={{ margin: "8px 0 4px", color: "#1a1a2e", fontFamily: "sans-serif" }}>Welcome Back</h2>
          <p style={{ color: "#999", fontSize: 13, margin: 0 }}>Sign in to your account</p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {["username", "password"].map(field => (
            <div key={field} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label style={{
                fontSize: 11, color: "#888", fontWeight: 600,
                letterSpacing: 1, textTransform: "uppercase", fontFamily: "sans-serif"
              }}>
                {field}
              </label>
              <input
                type={field === "password" ? "password" : "text"}
                placeholder={field === "username" ? "Enter username" : "Enter password"}
                value={form[field]}
                onChange={e => setForm(p => ({ ...p, [field]: e.target.value }))}
                onKeyDown={e => e.key === "Enter" && handleLogin()}
                style={{
                  border: "1.5px solid #eee", borderRadius: 10,
                  padding: "12px 16px", fontSize: 14,
                  outline: "none", color: "#1a1a2e", fontFamily: "sans-serif"
                }}
                onFocus={e => e.target.style.borderColor = "#6c5ce7"}
                onBlur={e => e.target.style.borderColor = "#eee"}
              />
            </div>
          ))}

          {error && (
            <div style={{ color: "#d63031", fontSize: 13, fontWeight: 600 }}>
              ⚠️ {error}
            </div>
          )}

          <button onClick={handleLogin} disabled={loading} style={{
            background: "linear-gradient(135deg, #6c5ce7, #a29bfe)",
            border: "none", color: "#fff", borderRadius: 12,
            padding: "14px", fontSize: 15, fontWeight: 700,
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.7 : 1, fontFamily: "sans-serif"
          }}>
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <p style={{ textAlign: "center", fontSize: 13, color: "#888", fontFamily: "sans-serif" }}>
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              style={{ color: "#6c5ce7", cursor: "pointer", fontWeight: 600 }}
            >
              Register
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}