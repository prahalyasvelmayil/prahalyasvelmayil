"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import AuthModal from "./AuthModal";

function getCookie(name: string) {
  if (typeof document === "undefined") return null;
  const v = document.cookie.split(";").find((c) => c.trim().startsWith(name + "="));
  return v ? decodeURIComponent(v.split("=")[1]) : null;
}

function deleteCookie(name: string) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [session, setSession] = useState<string | null>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");

  useEffect(() => {
    setSession(getCookie("vb_session"));
  }, []);

  const handleLogout = () => {
    deleteCookie("vb_session");
    setSession(null);
    setMenuOpen(false);
  };

  const openLogin = () => { setAuthMode("login"); setShowAuth(true); setMenuOpen(false); };
  const openRegister = () => { setAuthMode("register"); setShowAuth(true); setMenuOpen(false); };

  const onAuthSuccess = (email: string) => {
    setSession(email);
    setShowAuth(false);
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-[rgba(200,146,42,0.15)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image src="/logo.png" alt="Prahalya's Vel Mayil" width={44} height={44} className="rounded-full" />
            <div>
              <div className="font-display font-semibold text-lg leading-tight" style={{ color: "#6B1A2A" }}>Prahalya's Vel Mayil</div>
              <div className="text-[12px] tracking-[0.2em] uppercase" style={{ color: "#C8922A" }}>Collection</div>
            </div>
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="nav-link">Home</Link>
            <Link href="/catalogue" className="nav-link">Catalogue</Link>
            <a href="https://wa.me/919740567229" target="_blank" rel="noopener noreferrer" className="nav-link" style={{ color: "#25D366" }}>
              WhatsApp
            </a>

            {session ? (
              <div className="flex items-center gap-3">
                <Link href="/admin" className="text-[11px] tracking-wider font-medium truncate max-w-[130px]" style={{ color: "#6B1A2A" }}>
                  {session === "guest" ? "Guest" : session}
                </Link>
                <button onClick={handleLogout} className="text-[11px] px-3 py-1.5 rounded transition-all" style={{ border: "1px solid rgba(107,26,42,0.3)", color: "#6B1A2A" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "#6B1A2A"; e.currentTarget.style.color = "white"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = ""; e.currentTarget.style.color = "#6B1A2A"; }}>
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button onClick={openLogin} className="btn-gold text-[11px] tracking-widest uppercase px-4 py-2 rounded">
                  Login
                </button>
                <button onClick={openRegister} className="text-[11px] tracking-widest uppercase px-4 py-2 rounded transition-all" style={{ border: "1px solid rgba(107,26,42,0.4)", color: "#6B1A2A" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "#6B1A2A"; e.currentTarget.style.color = "white"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = ""; e.currentTarget.style.color = "#6B1A2A"; }}>
                  Register
                </button>
              </div>
            )}
          </div>

          {/* Hamburger */}
          <button className="md:hidden p-2 flex flex-col gap-1.5" onClick={() => setMenuOpen(!menuOpen)}>
            <div className="w-5 h-0.5 bg-[#1C1C1C] transition-all" style={{ transform: menuOpen ? "rotate(45deg) translateY(7px)" : "" }} />
            <div className="w-5 h-0.5 bg-[#1C1C1C] transition-all" style={{ opacity: menuOpen ? 0 : 1 }} />
            <div className="w-5 h-0.5 bg-[#1C1C1C] transition-all" style={{ transform: menuOpen ? "rotate(-45deg) translateY(-7px)" : "" }} />
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-[rgba(200,146,42,0.1)] px-6 py-5 flex flex-col gap-4">
            <Link href="/" className="nav-link" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link href="/catalogue" className="nav-link" onClick={() => setMenuOpen(false)}>Catalogue</Link>
            <a href="https://wa.me/919740567229" target="_blank" rel="noopener noreferrer" className="nav-link" style={{ color: "#25D366" }}>WhatsApp</a>
            <div style={{ height: 1, background: "rgba(200,146,42,0.15)" }} />
            {session ? (
              <>
                <Link href="/admin" className="text-sm font-medium" style={{ color: "#6B1A2A" }} onClick={() => setMenuOpen(false)}>
                  {session === "guest" ? "Guest" : session}
                </Link>
                <button onClick={handleLogout} className="text-left text-sm" style={{ color: "#EF4444" }}>Logout</button>
              </>
            ) : (
              <div className="flex gap-3">
                <button onClick={openLogin} className="btn-gold flex-1 text-[11px] tracking-widest uppercase py-2.5 rounded">Login</button>
                <button onClick={openRegister} className="flex-1 text-[11px] tracking-widest uppercase py-2.5 rounded transition-all" style={{ border: "1px solid rgba(107,26,42,0.4)", color: "#6B1A2A" }}>Register</button>
              </div>
            )}
          </div>
        )}
      </nav>

      {showAuth && (
        <AuthModal
          defaultMode={authMode}
          onClose={() => setShowAuth(false)}
          onSuccess={onAuthSuccess}
        />
      )}
    </>
  );
}
