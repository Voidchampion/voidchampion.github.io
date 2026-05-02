import { Link } from "@tanstack/react-router";
import { Play } from "lucide-react";
import type { Client } from "@/data/games";

export function GameCard({ game }: { game: Client }) {
  return (
    <Link
      to="/play/$slug"
      params={{ slug: game.slug }}
      className="group soft-card p-6 hover:-translate-y-1 transition-transform duration-200 block"
    >
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="size-12 rounded-xl bg-gradient-to-br from-sky-deep to-primary flex items-center justify-center text-primary-foreground text-xl font-bold shadow-soft">
          ◆
        </div>
        {game.badge && (
          <span className="text-xs font-medium bg-primary/10 text-primary px-2.5 py-1 rounded-full">
            {game.badge}
          </span>
        )}
      </div>

      <h3 className="text-lg font-bold leading-tight">
        {game.title} <span className="text-muted-foreground font-medium">{game.version}</span>
      </h3>
      <p className="text-sm text-muted-foreground mt-1">{game.tagline}</p>

      <div className="mt-5 pt-4 border-t border-border/60 flex items-center justify-between">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          {game.category}
        </span>
        <span className="flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-2.5 transition-all">
          Launch <Play className="size-3.5 fill-current" />
        </span>
      </div>
    </Link>
  );
}
