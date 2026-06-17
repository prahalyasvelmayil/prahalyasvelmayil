"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import AuthModal from "../components/AuthModal";

const ADMIN_EMAIL = "admin@saree.com";
const COOKIE_KEY = "vb_session";

interface User {
  email: string;
  name: string;
  createdAt: string;
}

interface Interest {
  sareeId: number;
  sareeName: string;
  category: string;
  timestamp: string;
}

function getCookie(name: string) {
  if (typeof document === "undefined") return null;
  const v = document.cookie.split(";").find((c) => c.trim().startsWith(name + "="));
  return v ? decodeURIComponent(v.split("=")[1]) : null;
}

function deleteCookie(name: string) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
}

export default function AdminPage() {
  const [session, setSession] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [interests, setInterests] = useState<Interest[]>([]);
  const [tab, setTab] = useState<"users" | "interests">("users");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const s = getCookie(COOKIE_KEY);
    setSession(s);
    setIsAdmin(s === ADMIN_EMAIL);
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (isAdmin) {
      fetch("/api/users").then((r) => r.json()).then(setUsers).catch(() => setUsers([]));
      const raw = localStorage.getItem("sareeInterests") || "[]";
      setInterests(JSON.parse(raw));
    }
  }, [isAdmin]);

  const handleLogout = () => {
    deleteCookie(COOKIE_KEY);
    setSession(null);
    setIsAdmin(false);
  };

  const onAuthSuccess = (email: string) => {
    setSession(email);
    setIsAdmin(email === ADMIN_EMAIL);
    setShowAuth(false);
  };

  if (!loaded) return null;

  // Not logged in
  if (!session) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4" style={{ background: "var(--cream)" }}>
        <Image src="/logo.png" alt="Logo" width={80} height={80} className="rounded-full mb-4" />
        <h1 className="font-display text-4xl font-semibold mb-1" style={{ color: "#6B1A2A" }}>Prahalya's Vel Mayil</h1>
        <p className="text-sm mb-8" style={{ color: "#7A6A5A" }}>Member & Admin Portal</p>
        <div className="flex flex-col gap-3 w-64">
          <button onClick={() => setShowAuth(true)} className="btn-gold py-3 rounded-lg text-sm tracking-widest uppercase">Login / Register</button>
          <Link href="/" className="text-center py-3 rounded-lg text-sm transition-all" style={{ border: "1px solid rgba(107,26,42,0.3)", color: "#6B1A2A" }}>← Back to Home</Link>
        </div>
        {showAuth && <AuthModal defaultMode="login" onClose={() => setShowAuth(false)} onSuccess={onAuthSuccess} />}
      </div>
    );
  }

  // Logged in but not admin
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4" style={{ background: "var(--cream)" }}>
        <div className="silk-card rounded-2xl p-10 text-center max-w-sm w-full">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl" style={{ background: "#C8922A" }}>✓</div>
          <h2 className="font-display text-2xl font-semibold mb-1" style={{ color: "#6B1A2A" }}>Welcome!</h2>
          <p className="text-sm mb-1" style={{ color: "#7A6A5A" }}>Signed in as</p>
          <p className="font-medium text-sm mb-2">{session === "guest" ? "Guest Visitor" : session}</p>
          <p className="text-xs italic mb-6" style={{ color: "#7A6A5A" }}>Admin access is restricted to authorised users.</p>
          <div className="flex flex-col gap-3">
            <Link href="/catalogue" className="btn-gold py-2.5 rounded-lg text-sm tracking-widest uppercase text-center">Browse Sarees</Link>
            <Link href="/" className="btn-maroon py-2.5 rounded-lg text-sm text-white text-center">Back to Home</Link>
            <button onClick={handleLogout} className="text-xs underline mt-1" style={{ color: "#7A6A5A" }}>Logout</button>
          </div>
        </div>
      </div>
    );
  }

  // Admin dashboard
  return (
    <div className="min-h-screen" style={{ background: "var(--cream)" }}>
      {/* Admin navbar */}
      <nav className="sticky top-0 z-50 px-8 py-4 flex items-center justify-between" style={{ background: "#6B1A2A" }}>
        <div className="flex items-center">
          <Image src="/logo.png" alt="Logo" width={36} height={36} className="rounded-full opacity-90" />
          <div>
            <div className="font-display text-white font-semibold">Prahalya's Vel Mayil Admin</div>
            <div className="text-[9px] tracking-widest uppercase" style={{ color: "#E8B84B" }}>Dashboard</div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-white/70">{session}</span>
          <Link href="/" className="text-xs text-white/70 hover:text-white transition-all">View Site</Link>
          <button onClick={handleLogout} className="text-xs px-3 py-1.5 rounded transition-all" style={{ border: "1px solid rgba(255,255,255,0.3)", color: "white" }}>Logout</button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          {[
            { label: "Registered Users", value: users.length },
            { label: "Interest Events", value: interests.length },
            { label: "Total Sarees", value: 11 },
          ].map((stat) => (
            <div key={stat.label} className="silk-card rounded-xl p-6">
              <p className="text-[10px] tracking-widest uppercase mb-1" style={{ color: "#C8922A" }}>{stat.label}</p>
              <p className="font-display text-4xl font-semibold" style={{ color: "#6B1A2A" }}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-3 mb-6">
          {(["users", "interests"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="px-6 py-2 rounded-lg text-sm tracking-wider uppercase transition-all"
              style={{ background: tab === t ? "#6B1A2A" : "transparent", color: tab === t ? "white" : "#7A6A5A", border: tab === t ? "none" : "1px solid rgba(200,146,42,0.3)" }}
            >
              {t === "users" ? `Users (${users.length})` : `Interests (${interests.length})`}
            </button>
          ))}
        </div>

        {/* Users table */}
        {tab === "users" && (
          <div className="silk-card rounded-xl overflow-hidden">
            <div className="p-5 border-b border-[rgba(200,146,42,0.15)]">
              <h2 className="font-display text-xl font-semibold" style={{ color: "#6B1A2A" }}>Registered Members</h2>
              <p className="text-xs mt-0.5" style={{ color: "#7A6A5A" }}>All data saved in users.json</p>
            </div>
            {users.length === 0 ? (
              <div className="p-10 text-center font-display text-2xl italic" style={{ color: "#7A6A5A" }}>No registered users yet.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead style={{ background: "rgba(200,146,42,0.08)" }}>
                    <tr>
                      {["#", "Name", "Email", "Registered On"].map((h) => (
                        <th key={h} className="text-left px-5 py-3 text-[10px] tracking-widest uppercase" style={{ color: "#C8922A" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u, i) => (
                      <tr key={u.email} className="border-t" style={{ borderColor: "rgba(200,146,42,0.08)" }}>
                        <td className="px-5 py-3" style={{ color: "#7A6A5A" }}>{i + 1}</td>
                        <td className="px-5 py-3 font-medium">{u.name || "—"}</td>
                        <td className="px-5 py-3">{u.email}</td>
                        <td className="px-5 py-3" style={{ color: "#7A6A5A" }}>{new Date(u.createdAt).toLocaleString("en-IN")}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Interests table */}
        {tab === "interests" && (
          <div className="silk-card rounded-xl overflow-hidden">
            <div className="p-5 border-b border-[rgba(200,146,42,0.15)]">
              <h2 className="font-display text-xl font-semibold" style={{ color: "#6B1A2A" }}>WhatsApp Interest Clicks</h2>
              <p className="text-xs mt-0.5" style={{ color: "#7A6A5A" }}>Logged when visitors click "WhatsApp to Buy"</p>
            </div>
            {interests.length === 0 ? (
              <div className="p-10 text-center font-display text-2xl italic" style={{ color: "#7A6A5A" }}>No interest events recorded yet.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead style={{ background: "rgba(200,146,42,0.08)" }}>
                    <tr>
                      {["#", "Saree", "Category", "Time"].map((h) => (
                        <th key={h} className="text-left px-5 py-3 text-[10px] tracking-widest uppercase" style={{ color: "#C8922A" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {interests.map((item, i) => (
                      <tr key={i} className="border-t" style={{ borderColor: "rgba(200,146,42,0.08)" }}>
                        <td className="px-5 py-3" style={{ color: "#7A6A5A" }}>{i + 1}</td>
                        <td className="px-5 py-3 font-medium">{item.sareeName}</td>
                        <td className="px-5 py-3">
                          <span className="text-[9px] tracking-widest uppercase px-2 py-0.5 rounded-full" style={{ background: item.category === "Pure Kanchi Silk" ? "#6B1A2A" : "#C8922A", color: "white" }}>
                            {item.category}
                          </span>
                        </td>
                        <td className="px-5 py-3" style={{ color: "#7A6A5A" }}>{new Date(item.timestamp).toLocaleString("en-IN")}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
