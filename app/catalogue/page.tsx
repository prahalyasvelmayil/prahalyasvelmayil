"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";

interface Saree {
  id: number;
  name: string;
  category: string;
  color: string;
  type: string;
  price: number;
  image: string;
  tagline: string;
  zari: string;
  occasion: string;
}

function CatalogueContent() {
  const searchParams = useSearchParams();
  const [sarees, setSarees] = useState<Saree[]>([]);
  const [filtered, setFiltered] = useState<Saree[]>([]);
  const [filters, setFilters] = useState({
    category: searchParams.get("category") || "All",
    color: "All",
    type: "All",
    occasion: "All",
    maxPrice: 25000,
  });

  useEffect(() => {
    fetch("/sarees.json").then((r) => r.json()).then((data) => {
      setSarees(data);
      setFiltered(data);
    });
  }, []);

  useEffect(() => {
    let result = sarees;
    if (filters.category !== "All") result = result.filter((s) => s.category === filters.category);
    if (filters.color !== "All") result = result.filter((s) => s.color === filters.color);
    if (filters.type !== "All") result = result.filter((s) => s.type === filters.type);
    if (filters.occasion !== "All") result = result.filter((s) => s.occasion === filters.occasion);
    result = result.filter((s) => s.price <= filters.maxPrice);
    setFiltered(result);
  }, [filters, sarees]);

  const categories = ["All", ...Array.from(new Set(sarees.map((s) => s.category)))];
  const colors = ["All", ...Array.from(new Set(sarees.map((s) => s.color)))];
  const types = ["All", ...Array.from(new Set(sarees.map((s) => s.type)))];
  const occasions = ["All", ...Array.from(new Set(sarees.map((s) => s.occasion)))];

  const waMsg = (saree: Saree) =>
    `https://wa.me/919740567229?text=${encodeURIComponent(`Hi! I'm interested in the *${saree.name}* (${saree.category}) priced at ₹${saree.price.toLocaleString()}. Could you share more details?`)}`;

  const handleLogInterest = (saree: Saree) => {
    const existing = JSON.parse(localStorage.getItem("sareeInterests") || "[]");
    const entry = { sareeId: saree.id, sareeName: saree.name, category: saree.category, timestamp: new Date().toISOString() };
    localStorage.setItem("sareeInterests", JSON.stringify([...existing, entry]));
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--cream)" }}>
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10">
        <div className="mb-8">
          <Link href="/" className="text-[10px] tracking-widest text-[var(--gold)] uppercase hover:underline">← Back to Home</Link>
          <h1 className="font-display text-5xl font-semibold text-[var(--maroon)] mt-2">Our Collection</h1>
          <p className="text-[var(--text-muted)] text-sm mt-1">{filtered.length} sarees found</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters sidebar */}
          <aside className="lg:w-56 shrink-0">
            <div className="silk-card rounded-xl p-5 sticky top-20">
              <h2 className="font-display text-lg font-semibold text-[var(--maroon)] mb-4">Filters</h2>

              <div className="mb-4">
                <label className="text-[10px] tracking-widest uppercase text-[var(--gold)] block mb-2">Category</label>
                {categories.map((c) => (
                  <button
                    key={c}
                    onClick={() => setFilters((f) => ({ ...f, category: c }))}
                    className={`block w-full text-left text-sm py-1 px-2 rounded transition-all mb-0.5 ${filters.category === c ? "bg-[var(--maroon)] text-white" : "text-[var(--charcoal)] hover:bg-[rgba(200,146,42,0.1)]"}`}
                  >
                    {c}
                  </button>
                ))}
              </div>

              <div className="mb-4">
                <label className="text-[10px] tracking-widest uppercase text-[var(--gold)] block mb-2">Occasion</label>
                {occasions.map((o) => (
                  <button
                    key={o}
                    onClick={() => setFilters((f) => ({ ...f, occasion: o }))}
                    className={`block w-full text-left text-sm py-1 px-2 rounded transition-all mb-0.5 ${filters.occasion === o ? "bg-[var(--maroon)] text-white" : "text-[var(--charcoal)] hover:bg-[rgba(200,146,42,0.1)]"}`}
                  >
                    {o}
                  </button>
                ))}
              </div>

              <div className="mb-4">
                <label className="text-[10px] tracking-widest uppercase text-[var(--gold)] block mb-2">Type</label>
                <select
                  value={filters.type}
                  onChange={(e) => setFilters((f) => ({ ...f, type: e.target.value }))}
                  className="w-full text-sm border border-[rgba(200,146,42,0.3)] rounded px-2 py-1.5 bg-white"
                >
                  {types.map((t) => <option key={t}>{t}</option>)}
                </select>
              </div>

              <div className="mb-4">
                <label className="text-[10px] tracking-widest uppercase text-[var(--gold)] block mb-2">Color</label>
                <select
                  value={filters.color}
                  onChange={(e) => setFilters((f) => ({ ...f, color: e.target.value }))}
                  className="w-full text-sm border border-[rgba(200,146,42,0.3)] rounded px-2 py-1.5 bg-white"
                >
                  {colors.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>

              <div className="mb-4">
                <label className="text-[10px] tracking-widest uppercase text-[var(--gold)] block mb-2">
                  Max Price: ₹{filters.maxPrice.toLocaleString()}
                </label>
                <input
                  type="range"
                  min={8000}
                  max={25000}
                  step={500}
                  value={filters.maxPrice}
                  onChange={(e) => setFilters((f) => ({ ...f, maxPrice: Number(e.target.value) }))}
                  className="w-full accent-[var(--gold)]"
                />
              </div>

              <button
                onClick={() => setFilters({ category: "All", color: "All", type: "All", occasion: "All", maxPrice: 25000 })}
                className="text-xs text-[var(--text-muted)] hover:text-[var(--maroon)] underline mt-1"
              >
                Clear all filters
              </button>
            </div>
          </aside>

          {/* Grid */}
          <div className="flex-1">
            {filtered.length === 0 ? (
              <div className="text-center py-20 text-[var(--text-muted)] font-display text-2xl italic">
                No sarees match your filters
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                {filtered.map((saree) => (
                  <div key={saree.id} className="silk-card rounded-xl overflow-hidden flex flex-col">
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <Image src={saree.image} alt={saree.name} fill className="object-cover object-top transition-transform duration-500 hover:scale-105" />
                      <div className="absolute top-2 left-2">
                        <span className={`text-[9px] tracking-widest uppercase px-2 py-0.5 rounded-full font-medium ${saree.category === "Pure Kanchi Silk" ? "bg-[var(--maroon)] text-white" : "bg-[var(--gold)] text-white"}`}>
                          {saree.category === "Pure Kanchi Silk" ? "Pure Kanchi" : "Semi Kanchi"}
                        </span>
                      </div>
                    </div>
                    <div className="p-4 flex flex-col flex-1">
                      <div className="flex-1">
                        <h3 className="font-display font-semibold text-[var(--maroon)] text-lg">{saree.name}</h3>
                        <p className="text-[11px] text-[var(--text-muted)] italic mt-0.5">{saree.tagline}</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          <span className="text-[9px] bg-[rgba(200,146,42,0.1)] text-[var(--gold)] px-2 py-0.5 rounded-full">{saree.color}</span>
                          <span className="text-[9px] bg-[rgba(107,26,42,0.08)] text-[var(--maroon)] px-2 py-0.5 rounded-full">{saree.type}</span>
                          <span className="text-[9px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{saree.occasion}</span>
                        </div>
                        <p className="text-[var(--gold)] font-bold text-lg mt-2">₹{saree.price.toLocaleString()}</p>
                        <p className="text-[10px] text-[var(--text-muted)]">{saree.zari}</p>
                      </div>
                      <a
                        href={waMsg(saree)}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => handleLogInterest(saree)}
                        className="mt-3 flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white text-sm font-medium py-2.5 px-4 rounded-lg transition-all"
                      >
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.555 4.116 1.529 5.843L.057 23.857l6.181-1.442A11.944 11.944 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.002-1.37l-.359-.213-3.72.868.936-3.617-.234-.372A9.818 9.818 0 1112 21.818z"/>
                        </svg>
                        WhatsApp to Buy
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <footer className="bg-[var(--maroon)] text-white/80 py-8 px-8 mt-12">
        <div className="max-w-7xl mx-auto text-center text-sm">
          <p>Prahalya's Vel Mayil Collection · +91 9740567229</p>
        </div>
      </footer>
    </div>
  );
}

export default function CataloguePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-[var(--gold)] font-display text-2xl">Loading...</div>}>
      <CatalogueContent />
    </Suspense>
  );
}
