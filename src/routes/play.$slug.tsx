import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { ArrowLeft, Loader2, Maximize2 } from "lucide-react";
import { useRef } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { clients, getClient } from "@/data/games";

export const Route = createFileRoute("/play/$slug")({
  loader: ({ params }) => {
    const game = getClient(params.slug);
    if (!game) throw notFound();
    return { game };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.game.title} ${loaderData.game.version} — Launch` },
          { name: "description", content: loaderData.game.description },
          { property: "og:title", content: `${loaderData.game.title} ${loaderData.game.version}` },
          { property: "og:description", content: loaderData.game.description },
        ]
      : [{ title: "Launch — eaglerlaunch" }],
  }),
  notFoundComponent: () => (
    <div className="min-h-screen">
      <SiteHeader />
      <div className="mx-auto max-w-2xl px-6 py-24 text-center">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <p className="text-lg text-muted-foreground mb-8">Client not found</p>
        <Link to="/" className="sky-button inline-block px-6 py-3">← Back home</Link>
      </div>
    </div>
  ),
  errorComponent: ({ error, reset }) => {
    const router = useRouter();
    return (
      <div className="min-h-screen">
        <SiteHeader />
        <div className="mx-auto max-w-2xl px-6 py-24 text-center">
          <h1 className="text-2xl font-bold text-destructive mb-4">Something broke</h1>
          <p className="text-muted-foreground mb-8">{error.message}</p>
          <button onClick={() => { router.invalidate(); reset(); }} className="sky-button px-6 py-3">Retry</button>
        </div>
      </div>
    );
  },
  component: PlayPage,
});

function PlayPage() {
  const { game } = Route.useLoaderData();
  const related = clients.filter((c) => c.slug !== game.slug).slice(0, 3);

  return (
    <div className="min-h-screen">
      <SiteHeader />

      <section className="mx-auto max-w-7xl px-6 py-10">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="size-4" /> Back to launcher
        </Link>

        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs font-semibold text-primary uppercase tracking-wider">{game.category}</span>
            <h1 className="text-3xl md:text-5xl font-bold mt-2">
              {game.title} <span className="text-muted-foreground font-medium">{game.version}</span>
            </h1>
            <p className="text-muted-foreground mt-2">{game.tagline}</p>
          </div>
          {game.badge && (
            <span className="text-sm font-medium bg-primary/10 text-primary px-4 py-2 rounded-full">
              {game.badge}
            </span>
          )}
        </div>

        {/* Game frame */}
        <GameFrame game={game} />

        <div className="grid md:grid-cols-3 gap-6 mt-10">
          <div className="md:col-span-2 soft-card p-6">
            <h3 className="font-bold text-lg mb-3">About this version</h3>
            <p className="text-muted-foreground leading-relaxed">{game.description}</p>
          </div>
          <div className="soft-card p-6">
            <h3 className="font-bold text-lg mb-3">Default Controls</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between"><span className="text-muted-foreground">Move</span><span className="font-mono font-semibold">WASD</span></li>
              <li className="flex justify-between"><span className="text-muted-foreground">Jump</span><span className="font-mono font-semibold">SPACE</span></li>
              <li className="flex justify-between"><span className="text-muted-foreground">Inventory</span><span className="font-mono font-semibold">E</span></li>
              <li className="flex justify-between"><span className="text-muted-foreground">Pause</span><span className="font-mono font-semibold">ESC</span></li>
            </ul>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Other clients</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {related.map((c) => (
              <Link
                key={c.slug}
                to="/play/$slug"
                params={{ slug: c.slug }}
                className="soft-card p-5 hover:-translate-y-1 transition-transform"
              >
                <div className="size-10 rounded-lg bg-gradient-to-br from-sky-deep to-primary flex items-center justify-center text-primary-foreground font-bold mb-3">◆</div>
                <h3 className="font-bold">{c.title} {c.version}</h3>
                <p className="text-xs text-muted-foreground mt-1">{c.tagline}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function GameFrame({ game }: { game: ReturnType<typeof getClient> & {} }) {
  const wrapRef = useRef<HTMLDivElement>(null);

  const goFullscreen = () => {
    const el = wrapRef.current;
    if (!el) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      el.requestFullscreen?.().catch(() => {});
    }
  };

  return (
    <div ref={wrapRef} className="soft-card overflow-hidden relative group eagler-cursor bg-black">
      {game.embedUrl ? (
        <iframe
          src={game.embedUrl}
          title={`${game.title} ${game.version}`}
          className="w-full aspect-video bg-black block"
          allow="fullscreen; gamepad; pointer-lock; autoplay; clipboard-read; clipboard-write"
          allowFullScreen
        />
      ) : (
        <div className="aspect-video bg-gradient-to-br from-sky-soft to-accent flex items-center justify-center starfield relative">
          <div className="text-center space-y-4 max-w-md px-6">
            <div className="size-16 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center">
              <Loader2 className="size-7 text-primary animate-spin" />
            </div>
            <h2 className="text-2xl font-bold">Booting {game.title} {game.version}</h2>
            <p className="text-sm text-muted-foreground">
              Game embed pending. Drop in your iframe URL or game files to launch.
            </p>
          </div>
        </div>
      )}
      <button
        onClick={goFullscreen}
        title="Fullscreen"
        className="absolute top-3 right-3 z-10 size-10 rounded-xl bg-black/60 backdrop-blur text-white flex items-center justify-center hover:bg-black/80 transition opacity-0 group-hover:opacity-100 focus:opacity-100"
      >
        <Maximize2 className="size-5" />
      </button>
    </div>
  );
}
