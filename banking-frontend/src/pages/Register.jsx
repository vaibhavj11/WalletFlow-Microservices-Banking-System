import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", username: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fields = [
    { key: "name", label: "Full Name", placeholder: "Vaibhav Jagtap", type: "text" },
    { key: "email", label: "Email", placeholder: "vaibhav@gmail.com", type: "email" },
    { key: "username", label: "Username", placeholder: "vaibhav", type: "text" },
    { key: "password", label: "Password", placeholder: "••••••••", type: "password" },
  ];

  const handleRegister = async () => {
    if (!form.name || !form.email || !form.username || !form.password)
      return setError("Please fill all fields");
    setLoading(true); setError("");
    try {
      await api.register(form);
      setSuccess("Account created! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch {
      setError("Registration failed. Username may already exist.");
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
        width: 400, border: "1px solid #ede9ff"
      }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ fontSize: 48 }}>📝</div>
          <h2 style={{ margin: "8px 0 4px", color: "#1a1a2e", fontFamily: "sans-serif" }}>Create Account</h2>
          <p style={{ color: "#999", fontSize: 13, margin: 0 }}>Join BankApp today</p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {fields.map(f => (
            <div key={f.key} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label style={{ fontSize: 11, color: "#888", fontWeight: 600, letterSpacing: 1, textTransform: "uppercase", fontFamily: "sans-serif" }}>
                {f.label}
              </label>
              <input
                type={f.type} placeholder={f.placeholder}
                value={form[f.key]}
                onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
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

          {error && <div style={{ color: "#d63031", fontSize: 13, fontWeight: 600 }}>⚠️ {error}</div>}
          {success && <div style={{ color: "#00b894", fontSize: 13, fontWeight: 600 }}>✅ {success}</div>}

          <button onClick={handleRegister} disabled={loading} style={{
            background: "linear-gradient(135deg, #6c5ce7, #a29bfe)",
            border: "none", color: "#fff", borderRadius: 12,
            padding: "14px", fontSize: 15, fontWeight: 700,
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.7 : 1, fontFamily: "sans-serif"
          }}>
            {loading ? "Creating..." : "Create Account"}
          </button>

          <p style={{ textAlign: "center", fontSize: 13, color: "#888", fontFamily: "sans-serif" }}>
            Already have an account?{" "}
            <span onClick={() => navigate("/login")} style={{ color: "#6c5ce7", cursor: "pointer", fontWeight: 600 }}>
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}