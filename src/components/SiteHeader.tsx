import { Link } from "@tanstack/react-router";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b-4 border-foreground bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="grid grid-cols-2 grid-rows-2 gap-[2px] size-8">
            <span className="bg-neon-pink"></span>
            <span className="bg-neon-cyan"></span>
            <span className="bg-neon-yellow"></span>
            <span className="bg-neon-green"></span>
          </div>
          <span className="font-pixel text-lg uppercase">
            Pixel<span className="text-neon-pink">Arcade</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 font-pixel text-[10px] uppercase">
          <Link
            to="/"
            activeOptions={{ exact: true }}
            className="hover:text-neon-pink transition-colors"
            activeProps={{ className: "text-neon-pink" }}
          >
            [01] Home
          </Link>
          <Link
            to="/games"
            className="hover:text-neon-cyan transition-colors"
            activeProps={{ className: "text-neon-cyan" }}
          >
            [02] All Games
          </Link>
          <a href="#about" className="hover:text-neon-yellow transition-colors">
            [03] About
          </a>
        </nav>

        <div className="hidden sm:flex items-center gap-2 border-2 border-foreground px-3 py-1.5">
          <span className="size-2 bg-neon-green animate-blink"></span>
          <span className="font-pixel text-[9px] uppercase">Online</span>
        </div>
      </div>
    </header>
  );
}
