import Image from "next/image";
import Link from "next/link";
import Navbar from "./components/Navbar";

export default function Home() {
const pureKanchi = [
  {
    id: 1,
    name: "Radiant Yellow with Royal Purple Border",
    image: "/images/saree_1.jpeg",
    tagline: "A vibrant blend of sunshine yellow and regal purple elegance.",
    price: "₹12,000",
  },
  {
    id: 2,
    name: "Ivory Gold Zari",
    image: "/images/saree_2.jpeg",
    tagline: "Classic ivory silk adorned with rich golden zari artistry.",
    price: "₹12,000",
  },
  {
    id: 3,
    name: "Emerald Green Heritage",
    image: "/images/saree_3.jpeg",
    tagline: "Traditional emerald weaves crafted for timeless celebrations.",
    price: "₹12,000",
  },
];

const semiKanchi = [
  {
    id: 4,
    name: "Golden Mustard Aqua",
    image: "/images/saree_4.jpeg",
    tagline: "A refreshing combination of golden mustard and aqua elegance.",
    price: "₹5,000",
  },
  {
    id: 5,
    name: "Royal Blue Pink Korvai",
    image: "/images/saree_5.jpeg",
    tagline: "Bold royal blue accented with vibrant pink and gold zari.",
    price: "₹5,000",
  },
  {
    id: 6,
    name: "Parrot Green Royal Border",
    image: "/images/saree_6.jpeg",
    tagline: "Fresh green tones enhanced with majestic blue-gold borders.",
    price: "₹5,000",
  },
  {
    id: 7,
    name: "Crimson Red Aqua Border",
    image: "/images/saree_7.jpeg",
    tagline: "Rich crimson silk paired with a graceful aqua contrast border.",
    price: "₹5,000",
  },
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
