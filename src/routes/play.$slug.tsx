import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { PixelButton } from "@/components/PixelButton";
import { games, getGame } from "@/data/games";

export const Route = createFileRoute("/play/$slug")({
  loader: ({ params }) => {
    const game = getGame(params.slug);
    if (!game) throw notFound();
    return { game };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.game.title} — Play on PixelArcade` },
          { name: "description", content: loaderData.game.description },
          { property: "og:title", content: `${loaderData.game.title} — PixelArcade` },
          { property: "og:description", content: loaderData.game.description },
          { property: "og:image", content: loaderData.game.image },
        ]
      : [{ title: "Play — PixelArcade" }],
  }),
  notFoundComponent: () => (
    <div className="min-h-screen">
      <SiteHeader />
      <div className="mx-auto max-w-2xl px-6 py-24 text-center">
        <h1 className="font-pixel text-4xl uppercase text-neon-pink mb-4">404</h1>
        <p className="font-pixel text-sm uppercase mb-8">Game Not Found</p>
        <Link to="/">
          <PixelButton>← Back to Arcade</PixelButton>
        </Link>
      </div>
    </div>
  ),
  errorComponent: ({ error, reset }) => (
    <div className="min-h-screen">
      <SiteHeader />
      <div className="mx-auto max-w-2xl px-6 py-24 text-center">
        <h1 className="font-pixel text-2xl uppercase text-destructive mb-4">Game Crashed</h1>
        <p className="text-lg text-muted-foreground mb-8">{error.message}</p>
        <PixelButton onClick={reset}>↻ Retry</PixelButton>
      </div>
    </div>
  ),
  component: PlayPage,
});

function PlayPage() {
  const { game } = Route.useLoaderData();
  const related = games.filter((g) => g.slug !== game.slug).slice(0, 3);

  return (
    <div className="min-h-screen">
      <SiteHeader />

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <Link
              to="/"
              className="font-pixel text-[10px] uppercase text-muted-foreground hover:text-neon-pink"
            >
              ← Back to Arcade
            </Link>
            <h1 className="font-pixel text-2xl md:text-4xl uppercase mt-2">
              {game.title}
            </h1>
            <p className="font-pixel text-[10px] uppercase text-neon-cyan mt-2">
              {game.category} · {game.tagline}
            </p>
          </div>
          <div className="flex gap-3">
            <div className="border-2 border-foreground bg-card px-3 py-2 font-pixel text-[10px] uppercase">
              ★ {game.rating}
            </div>
            <div className="border-2 border-foreground bg-card px-3 py-2 font-pixel text-[10px] uppercase text-neon-yellow">
              {game.players} online
            </div>
          </div>
        </div>

        {/* Game frame */}
        <div className="relative">
          <div className="absolute -inset-2 bg-neon-cyan translate-x-2 translate-y-2"></div>
          <div className="relative pixel-border bg-black overflow-hidden">
            <div className="flex items-center justify-between border-b-4 border-foreground bg-card px-4 py-2">
              <div className="flex gap-2">
                <span className="size-3 bg-neon-pink"></span>
                <span className="size-3 bg-neon-yellow"></span>
                <span className="size-3 bg-neon-green"></span>
              </div>
              <span className="font-pixel text-[10px] uppercase text-muted-foreground">
                {game.slug}.exe
              </span>
              <span className="font-pixel text-[10px] uppercase text-neon-green animate-blink">
                ● LIVE
              </span>
            </div>

            <div className="relative aspect-video bg-background flex items-center justify-center crt-overlay">
              <img
                src={game.image}
                alt={game.title}
                className="absolute inset-0 w-full h-full object-cover opacity-30"
              />
              <div className="relative z-10 text-center space-y-6 p-6">
                <div className="font-pixel text-xs uppercase text-neon-yellow animate-blink">
                  ▮ Loading game files...
                </div>
                <div className="font-pixel text-2xl md:text-4xl uppercase">
                  {game.title}
                </div>
                <p className="font-pixel text-[10px] uppercase text-muted-foreground max-w-md mx-auto leading-relaxed">
                  Game embed pending. Drop in your iframe URL or game files to launch.
                </p>
                <div className="pt-2">
                  <PixelButton variant="primary">▶ Press Start</PixelButton>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="md:col-span-2 pixel-border bg-card p-6 shadow-[6px_6px_0_0_var(--color-foreground)]">
            <h2 className="font-pixel text-sm uppercase mb-4 text-neon-pink">
              // About this game
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {game.description}
            </p>
          </div>
          <div className="pixel-border bg-card p-6 shadow-[6px_6px_0_0_var(--color-foreground)] space-y-4">
            <h3 className="font-pixel text-sm uppercase text-neon-cyan">// Controls</h3>
            <ul className="space-y-2 font-pixel text-[10px] uppercase">
              <li className="flex justify-between"><span>Move</span><span className="text-neon-yellow">WASD</span></li>
              <li className="flex justify-between"><span>Jump</span><span className="text-neon-yellow">SPACE</span></li>
              <li className="flex justify-between"><span>Action</span><span className="text-neon-yellow">CLICK</span></li>
              <li className="flex justify-between"><span>Pause</span><span className="text-neon-yellow">ESC</span></li>
            </ul>
          </div>
        </div>

        {/* Related */}
        <div className="mt-16">
          <h2 className="font-pixel text-xl uppercase mb-6">
            More <span className="text-neon-pink">Quests</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {related.map((g) => (
              <Link
                key={g.slug}
                to="/play/$slug"
                params={{ slug: g.slug }}
                className="group pixel-border bg-card overflow-hidden shadow-[6px_6px_0_0_var(--color-foreground)] hover:-translate-x-1 hover:-translate-y-1 transition-transform"
              >
                <img
                  src={g.image}
                  alt={g.title}
                  loading="lazy"
                  className="w-full aspect-video object-cover border-b-4 border-foreground"
                />
                <div className="p-4">
                  <h3 className="font-pixel text-xs uppercase">{g.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
