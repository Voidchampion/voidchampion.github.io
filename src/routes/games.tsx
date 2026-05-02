import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { GameCard } from "@/components/GameCard";
import { games } from "@/data/games";

export const Route = createFileRoute("/games")({
  head: () => ({
    meta: [
      { title: "All Games — PixelArcade" },
      { name: "description", content: "Browse the full PixelArcade catalog: Eaglercraft, Moto X3M, Paper.io and more." },
      { property: "og:title", content: "All Games — PixelArcade" },
      { property: "og:description", content: "The full retro arcade catalog." },
    ],
  }),
  component: GamesPage,
});

function GamesPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <section className="mx-auto max-w-7xl px-6 py-16">
        <p className="font-pixel text-[10px] uppercase text-neon-cyan mb-2">// Library</p>
        <h1 className="font-pixel text-3xl md:text-5xl uppercase mb-10">
          All <span className="text-neon-pink">Games</span>
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {games.map((g) => (
            <GameCard key={g.slug} game={g} />
          ))}
        </div>
      </section>
    </div>
  );
}
