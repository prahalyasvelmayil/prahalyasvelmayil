import Image from "next/image";
import Link from "next/link";
import Navbar from "./components/Navbar";

export default function Home() {
  const pureKanchi = [
    { id: 1, name: "Bridal Crimson", image: "/saree_1.png", tagline: "Strength in every fold. Grace in every glance.", price: "₹18,500" },
    { id: 2, name: "Emerald Temple", image: "/saree_2.png", tagline: "Prosperity in every prayer.", price: "₹16,800" },
    { id: 7, name: "Magenta Korvai", image: "/saree_3.png", tagline: "Vibrance in every weave.", price: "₹19,500" },
    { id: 11, name: "Violet Brocade", image: "/saree_4.png", tagline: "Tradition in every thread.", price: "₹21,000" },
  ];
  const semiKanchi = [
    { id: 5, name: "Silver Zari", image: "/saree_5.png", tagline: "Purity in every drape.", price: "₹9,800" },
    { id: 6, name: "Dual Tone Brown", image: "/saree_6.png", tagline: "Balance in every hue.", price: "₹11,200" },
    { id: 9, name: "Mustard Checks", image: "/saree_7.png", tagline: "Rooted in culture.", price: "₹12,500" },
    { id: 10, name: "Rose Pink", image: "/saree_8.png", tagline: "Cultivated in culture.", price: "₹10,800" },
  ];

  return (
    <div className="min-h-screen" style={{ background: "var(--cream)" }}>
      <Navbar />
      <section className="relative overflow-hidden">
        <div className="hero-shimmer relative">
          <Image src="/banner-1.png" alt="Prahalya's Vel Mayil Collection – Premium Sarees" width={1440} height={600} className="w-full object-cover" priority />
        </div>
      </section>
      <div className="flex items-center gap-4 max-w-7xl mx-auto px-8 py-10">
        <div className="temple-divider flex-1" />
        <div className="font-display italic text-[var(--gold)] text-sm tracking-widest">✦ Woven in Tradition ✦</div>
        <div className="temple-divider flex-1" />
      </div>
      <section className="max-w-7xl mx-auto px-4 sm:px-8 pb-16">
        <div className="mb-8">
          <p className="text-[10px] tracking-[0.3em] text-[var(--gold)] uppercase mb-1">Heritage Weave</p>
          <h2 className="font-display text-4xl font-semibold text-[var(--maroon)]">Pure Kanchi Silk</h2>
          <p className="text-[var(--text-muted)] text-sm mt-1 font-light">Authentic Kanchipuram silk, handwoven with real gold zari — a legacy worn with pride.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {pureKanchi.map((s) => (
            <div key={s.id} className="silk-card rounded-lg overflow-hidden">
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image src={s.image} alt={s.name} fill className="object-cover object-top transition-transform duration-500 hover:scale-105" />
              </div>
              <div className="p-3">
                <h3 className="font-display font-semibold text-[var(--maroon)] text-base">{s.name}</h3>
                <p className="text-[10px] text-[var(--text-muted)] italic mt-0.5">{s.tagline}</p>
                <p className="text-[var(--gold)] font-semibold text-sm mt-1">{s.price}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <Link href="/catalogue?category=Pure+Kanchi+Silk" className="btn-gold px-10 py-3 rounded text-sm tracking-widest uppercase inline-block">See More →</Link>
        </div>
      </section>
      <div className="flex items-center gap-4 max-w-7xl mx-auto px-8 pb-6">
        <div className="temple-divider flex-1" />
        <div className="font-display italic text-[var(--gold)] text-sm tracking-widest">✦ Elegance Redefined ✦</div>
        <div className="temple-divider flex-1" />
      </div>
      <section className="max-w-7xl mx-auto px-4 sm:px-8 pb-20">
        <div className="mb-8">
          <p className="text-[10px] tracking-[0.3em] text-[var(--gold)] uppercase mb-1">Everyday Grace</p>
          <h2 className="font-display text-4xl font-semibold text-[var(--maroon)]">Semi Kanchi Silk</h2>
          <p className="text-[var(--text-muted)] text-sm mt-1 font-light">The grace of Kanchipuram woven for everyday celebrations — beautiful, accessible, timeless.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {semiKanchi.map((s) => (
            <div key={s.id} className="silk-card rounded-lg overflow-hidden">
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image src={s.image} alt={s.name} fill className="object-cover object-top transition-transform duration-500 hover:scale-105" />
              </div>
              <div className="p-3">
                <h3 className="font-display font-semibold text-[var(--maroon)] text-base">{s.name}</h3>
                <p className="text-[10px] text-[var(--text-muted)] italic mt-0.5">{s.tagline}</p>
                <p className="text-[var(--gold)] font-semibold text-sm mt-1">{s.price}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <Link href="/catalogue?category=Semi+Kanchi+Silk" className="btn-maroon px-10 py-3 rounded text-sm tracking-widest uppercase text-white inline-block">See More →</Link>
        </div>
      </section>
      <footer className="bg-[var(--maroon)] text-white/80 py-10 px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center">
            <Image src="/logo.png" alt="Logo" width={40} height={40} className="rounded-full opacity-90" />
            <div>
              <div className="font-display text-white text-lg">Prahalya's Vel Mayil Collection</div>
            </div>
          </div>
          <div className="text-center text-sm">
            <p>+91 9740567229</p>
          </div>
          <div className="text-[10px] text-white/40">© 2026 Prahalya's Vel Mayil</div>
        </div>
      </footer>
    </div>
  );
}
