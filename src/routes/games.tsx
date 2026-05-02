import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { GameCard } from "@/components/GameCard";
import { clients } from "@/data/games";

export const Route = createFileRoute("/games")({
  head: () => ({
    meta: [
      { title: "All Clients — eaglerlaunch" },
      { name: "description", content: "Browse every Eaglercraft client and version available on eaglerlaunch." },
      { property: "og:title", content: "All Clients — eaglerlaunch" },
      { property: "og:description", content: "Every Eaglercraft version and client, in one place." },
    ],
  }),
  component: GamesPage,
});

function GamesPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <section className="mx-auto max-w-6xl px-6 py-16">
        <span className="text-xs font-semibold text-primary uppercase tracking-wider">Library</span>
        <h1 className="text-3xl md:text-5xl font-bold mt-3 mb-3">All Clients</h1>
        <p className="text-muted-foreground mb-10 max-w-2xl">
          Every Eaglercraft version and modded client we host. Click any card to launch.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {clients.map((c) => (
            <GameCard key={c.slug} game={c} />
          ))}
        </div>
      </section>
    </div>
  );
}
