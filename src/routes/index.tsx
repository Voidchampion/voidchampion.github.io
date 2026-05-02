import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { GameCard } from "@/components/GameCard";
import { PixelButton } from "@/components/PixelButton";
import { games } from "@/data/games";
import heroImg from "@/assets/hero-pixel.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PixelArcade — Free Browser Games for School" },
      {
        name: "description",
        content:
          "Play Eaglercraft, Moto X3M, Paper.io 2 and 3, and more retro pixel-art browser games — free, unblocked, and fun.",
      },
      { property: "og:title", content: "PixelArcade — Free Browser Games" },
      {
        property: "og:description",
        content: "Eaglercraft, Moto X3M, Paper.io and more — straight in your browser.",
      },
    ],
  }),
  component: HomePage,
});

const categories = ["All", "Sandbox", "Racing", "IO Arena"];

function HomePage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />

      {/* HERO */}
      <section className="relative overflow-hidden border-b-4 border-foreground">
        <div className="mx-auto max-w-7xl px-6 py-16 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 border-2 border-foreground bg-card px-3 py-1.5">
              <span className="size-2 bg-neon-pink animate-blink"></span>
              <span className="font-pixel text-[10px] uppercase">Now Playing — 47 games</span>
            </div>
            <h1 className="font-pixel text-4xl md:text-6xl uppercase leading-[1.1]">
              <span className="text-neon-pink">Press</span>
              <br />
              <span className="text-foreground">Start</span>
              <br />
              <span className="text-neon-cyan">2 Play</span>
            </h1>
            <p className="text-2xl text-muted-foreground max-w-md leading-snug">
              Your retro arcade for school break. Eaglercraft, Moto X3M, Paper.io and more — boot up and go.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <PixelButton variant="primary" onClick={() => document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" })}>
                ▶ Insert Coin
              </PixelButton>
              <PixelButton variant="ghost" onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}>
                ? About
              </PixelButton>
            </div>
            <div className="flex gap-6 pt-4">
              <Stat label="Games" value="47" color="text-neon-pink" />
              <Stat label="Players" value="56K" color="text-neon-cyan" />
              <Stat label="Coins" value="∞" color="text-neon-yellow" />
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-2 bg-neon-pink translate-x-2 translate-y-2"></div>
            <div className="relative pixel-border bg-card overflow-hidden">
              <img
                src={heroImg}
                alt="Pixel arcade hero"
                width={1536}
                height={768}
                className="w-full aspect-[3/2] object-cover"
              />
              <div className="absolute inset-0 crt-overlay pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between border-t-4 border-foreground bg-background/90 px-4 py-2">
                <span className="font-pixel text-[10px] uppercase text-neon-yellow animate-blink">● REC</span>
                <span className="font-pixel text-[10px] uppercase">High Score: 999,999</span>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 border-4 border-foreground bg-neon-yellow px-3 py-2 rotate-6 animate-float">
              <span className="font-pixel text-[10px] uppercase text-primary-foreground">1UP!</span>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section id="catalog" className="border-b-4 border-foreground bg-card">
        <div className="mx-auto max-w-7xl px-6 py-6 flex flex-wrap items-center gap-3">
          <span className="font-pixel text-xs uppercase text-muted-foreground mr-2">Filter:</span>
          {categories.map((c, i) => (
            <button
              key={c}
              className={`pixel-border font-pixel text-[10px] uppercase px-3 py-2 transition-transform hover:-translate-y-0.5 ${
                i === 0 ? "bg-neon-pink text-primary-foreground" : "bg-background"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      {/* GAMES GRID */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="font-pixel text-[10px] uppercase text-neon-cyan mb-2">// Catalog</p>
            <h2 className="font-pixel text-2xl md:text-3xl uppercase">
              Pick Your <span className="text-neon-pink">Quest</span>
            </h2>
          </div>
          <span className="hidden sm:block font-pixel text-[10px] uppercase text-muted-foreground">
            {games.length} games loaded
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {games.map((g) => (
            <GameCard key={g.slug} game={g} />
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="border-t-4 border-foreground bg-card">
        <div className="mx-auto max-w-7xl px-6 py-16 grid md:grid-cols-3 gap-8">
          <Feature
            color="bg-neon-pink"
            title="No Installs"
            body="Every game runs in your browser. Click it, play it. No downloads, no fuss."
          />
          <Feature
            color="bg-neon-cyan"
            title="Unblocked Vibes"
            body="Curated for study hall energy. Bookmark, refresh, play through the bell."
          />
          <Feature
            color="bg-neon-yellow"
            title="Pixel Forever"
            body="Built with love for chunky pixels, CRT scanlines, and the golden age of arcades."
          />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t-4 border-foreground bg-background py-8">
        <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-pixel text-[10px] uppercase text-muted-foreground">
            © 2026 PixelArcade — Made with ▣▣▣
          </span>
          <span className="font-pixel text-[10px] uppercase text-muted-foreground animate-blink">
            ▮ Press F to pay respects
          </span>
        </div>
      </footer>
    </div>
  );
}

function Stat({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div>
      <div className={`font-pixel text-2xl ${color}`}>{value}</div>
      <div className="font-pixel text-[9px] uppercase text-muted-foreground mt-1">{label}</div>
    </div>
  );
}

function Feature({ color, title, body }: { color: string; title: string; body: string }) {
  return (
    <div className="pixel-border bg-background p-6 shadow-[6px_6px_0_0_var(--color-foreground)]">
      <div className={`size-10 ${color} mb-4 border-2 border-foreground`}></div>
      <h3 className="font-pixel text-sm uppercase mb-3">{title}</h3>
      <p className="text-lg text-muted-foreground leading-snug">{body}</p>
    </div>
  );
}
