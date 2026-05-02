import { Link } from "@tanstack/react-router";
import type { Game } from "@/data/games";
import { cn } from "@/lib/utils";

const accentBg: Record<Game["accent"], string> = {
  pink: "bg-neon-pink",
  cyan: "bg-neon-cyan",
  yellow: "bg-neon-yellow",
  green: "bg-neon-green",
};

const accentText: Record<Game["accent"], string> = {
  pink: "text-neon-pink",
  cyan: "text-neon-cyan",
  yellow: "text-neon-yellow",
  green: "text-neon-green",
};

export function GameCard({ game }: { game: Game }) {
  return (
    <Link
      to="/play/$slug"
      params={{ slug: game.slug }}
      className="group block pixel-border bg-card transition-transform duration-100 hover:-translate-x-[3px] hover:-translate-y-[3px] shadow-[6px_6px_0_0_var(--color-foreground)] hover:shadow-[9px_9px_0_0_var(--color-foreground)]"
    >
      <div className="relative aspect-video overflow-hidden border-b-4 border-foreground">
        <img
          src={game.image}
          alt={game.title}
          loading="lazy"
          width={800}
          height={500}
          className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
        />
        <div className="absolute inset-0 crt-overlay pointer-events-none" />
        <div className={cn("absolute top-0 left-0 px-2 py-1 font-pixel text-[9px] uppercase text-primary-foreground", accentBg[game.accent])}>
          {game.category}
        </div>
        <div className="absolute bottom-2 right-2 border-2 border-foreground bg-background/90 px-2 py-1 font-pixel text-[9px] uppercase">
          ★ {game.rating}
        </div>
      </div>

      <div className="p-4 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-pixel text-sm uppercase leading-tight">
            {game.title}
          </h3>
          <span className={cn("font-pixel text-[9px] uppercase whitespace-nowrap", accentText[game.accent])}>
            {game.players}
          </span>
        </div>
        <p className="text-base text-muted-foreground leading-tight">
          {game.tagline}
        </p>
        <div className="pt-2 flex items-center justify-between border-t-2 border-dashed border-muted">
          <span className="font-pixel text-[9px] uppercase text-muted-foreground">
            Press start
          </span>
          <span className={cn("font-pixel text-xs uppercase animate-blink", accentText[game.accent])}>
            ▶ Play
          </span>
        </div>
      </div>
    </Link>
  );
}
