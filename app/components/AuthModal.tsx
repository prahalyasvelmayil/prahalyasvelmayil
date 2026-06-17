"use client";
import { useState } from "react";
import Image from "next/image";

function hashPass(p: string) {
  let hash = 0;
  for (let i = 0; i < p.length; i++) hash = (hash << 5) - hash + p.charCodeAt(i);
  return (hash >>> 0).toString(16);
}

function setCookie(name: string, value: string, days = 7) {
  const exp = new Date(Date.now() + days * 86400000).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${exp}; path=/`;
}

const ADMIN_EMAIL = "admin@saree.com";
const ADMIN_PASSWORD = "admin@12saree";

interface Props {
  onClose: () => void;
  onSuccess: (email: string) => void;
  defaultMode?: "login" | "register";
}

export default function AuthModal({ onClose, onSuccess, defaultMode = "login" }: Props) {
  const [mode, setMode] = useState<"login" | "register">(defaultMode);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError("");
    if (!email || !password) { setError("Please fill all required fields."); return; }

    // Admin shortcut
    if (mode === "login" && email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setCookie("vb_session", email);
      onSuccess(email);
      return;
    }

    setLoading(true);
    try {
      if (mode === "register") {
        if (!name.trim()) { setError("Please enter your name."); setLoading(false); return; }
        if (password.length < 6) { setError("Password must be at least 6 characters."); setLoading(false); return; }
        if (password !== confirmPassword) { setError("Passwords do not match."); setLoading(false); return; }
        if (email === ADMIN_EMAIL) { setError("Email already registered."); setLoading(false); return; }
      }

      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: mode, email, name, passwordHash: hashPass(password) }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Something went wrong."); return; }
      setCookie("vb_session", email);
      onSuccess(email);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGuest = () => {
    setCookie("vb_session", "guest");
    onSuccess("guest");
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.55)" }} onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        style={{ border: "1px solid rgba(200,146,42,0.2)" }}
      >
        {/* Header */}
        <div className="relative px-8 pt-8 pb-5 text-center" style={{ background: "linear-gradient(135deg, #FAF6EF, #FDF9F3)" }}>
          <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-all text-xl leading-none">×</button>
          <Image src="/logo.png" alt="Logo" width={52} height={52} className="rounded-full mx-auto mb-3" />
          <h2 className="font-display text-2xl font-semibold" style={{ color: "#6B1A2A" }}>
            {mode === "login" ? "Welcome Back" : "Create Account"}
          </h2>
          <p className="text-xs mt-1" style={{ color: "#7A6A5A" }}>
            {mode === "login" ? "Sign in to your Prahalya's Vel Mayil account" : "Join Prahalya's Vel Mayil Collection"}
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex mx-6 mt-5 rounded-lg overflow-hidden" style={{ border: "1px solid rgba(200,146,42,0.25)" }}>
          <button
            onClick={() => { setMode("login"); setError(""); }}
            className="flex-1 py-2.5 text-sm font-medium transition-all"
            style={{ background: mode === "login" ? "#6B1A2A" : "transparent", color: mode === "login" ? "white" : "#7A6A5A" }}
          >
            Login
          </button>
          <button
            onClick={() => { setMode("register"); setError(""); }}
            className="flex-1 py-2.5 text-sm font-medium transition-all"
            style={{ background: mode === "register" ? "#6B1A2A" : "transparent", color: mode === "register" ? "white" : "#7A6A5A" }}
          >
            Register
          </button>
        </div>

        {/* Form */}
        <div className="px-6 py-5 space-y-4">
          {mode === "register" && (
            <div>
              <label className="block text-[10px] tracking-[0.2em] uppercase mb-1.5 font-medium" style={{ color: "#C8922A" }}>Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                className="w-full px-4 py-2.5 text-sm rounded-lg outline-none transition-all"
                style={{ border: "1px solid rgba(200,146,42,0.3)", background: "#FAFAFA" }}
                onFocus={(e) => e.target.style.borderColor = "#C8922A"}
                onBlur={(e) => e.target.style.borderColor = "rgba(200,146,42,0.3)"}
              />
            </div>
          )}

          <div>
            <label className="block text-[10px] tracking-[0.2em] uppercase mb-1.5 font-medium" style={{ color: "#C8922A" }}>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-2.5 text-sm rounded-lg outline-none transition-all"
              style={{ border: "1px solid rgba(200,146,42,0.3)", background: "#FAFAFA" }}
              onFocus={(e) => e.target.style.borderColor = "#C8922A"}
              onBlur={(e) => e.target.style.borderColor = "rgba(200,146,42,0.3)"}
            />
          </div>

          <div>
            <label className="block text-[10px] tracking-[0.2em] uppercase mb-1.5 font-medium" style={{ color: "#C8922A" }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 text-sm rounded-lg outline-none transition-all"
              style={{ border: "1px solid rgba(200,146,42,0.3)", background: "#FAFAFA" }}
              onFocus={(e) => e.target.style.borderColor = "#C8922A"}
              onBlur={(e) => e.target.style.borderColor = "rgba(200,146,42,0.3)"}
              onKeyDown={(e) => { if (e.key === "Enter" && mode === "login") handleSubmit(); }}
            />
          </div>

          {mode === "register" && (
            <div>
              <label className="block text-[10px] tracking-[0.2em] uppercase mb-1.5 font-medium" style={{ color: "#C8922A" }}>Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 text-sm rounded-lg outline-none transition-all"
                style={{ border: "1px solid rgba(200,146,42,0.3)", background: "#FAFAFA" }}
                onFocus={(e) => e.target.style.borderColor = "#C8922A"}
                onBlur={(e) => e.target.style.borderColor = "rgba(200,146,42,0.3)"}
                onKeyDown={(e) => { if (e.key === "Enter") handleSubmit(); }}
              />
            </div>
          )}

          {error && (
            <div className="text-sm text-red-600 px-3 py-2 rounded-lg" style={{ background: "rgba(220,38,38,0.07)" }}>
              {error}
            </div>
          )}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-3 rounded-lg text-sm tracking-widest uppercase font-medium transition-all disabled:opacity-60"
            style={{ background: "linear-gradient(135deg, #C8922A, #A67620)", color: "white" }}
          >
            {loading ? "Please wait…" : mode === "login" ? "Login" : "Create Account"}
          </button>

          <div className="flex items-center gap-3">
            <div style={{ flex: 1, height: 1, background: "rgba(200,146,42,0.2)" }} />
            <span className="text-xs" style={{ color: "#7A6A5A" }}>or</span>
            <div style={{ flex: 1, height: 1, background: "rgba(200,146,42,0.2)" }} />
          </div>

          <button
            onClick={handleGuest}
            className="w-full py-2.5 rounded-lg text-sm transition-all"
            style={{ border: "1px solid rgba(200,146,42,0.3)", color: "#7A6A5A" }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#C8922A")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(200,146,42,0.3)")}
          >
            Continue as Guest
          </button>
        </div>
      </div>
    </div>
  );
}
