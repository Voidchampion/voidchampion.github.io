import { Link } from "@tanstack/react-router";
import { Bell, Compass, Sun } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-background/70 border-b border-border/50">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="size-10 rounded-xl bg-gradient-to-br from-sky-deep to-primary flex items-center justify-center text-primary-foreground font-bold text-lg shadow-soft">
            ◆
          </div>
          <span className="font-display text-lg font-bold tracking-tight">
            eagler<span className="text-primary">launch</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1 bg-card/80 rounded-full px-2 py-1.5 border border-border/60 shadow-card">
          <NavPill to="/" exact label="Launcher" highlight />
          <NavPill to="/games" label="Games" />
          <NavLinkPill href="#downloads" label="Downloads" />
          <NavLinkPill href="#resources" label="Resources" />
          <NavLinkPill href="#legal" label="Legal" />
        </nav>

        <div className="flex items-center gap-2">
          <IconButton><Bell className="size-4" /></IconButton>
          <IconButton><Compass className="size-4" /></IconButton>
          <IconButton><Sun className="size-4" /></IconButton>
        </div>
      </div>
    </header>
  );
}

function NavPill({ to, label, exact, highlight }: { to: "/" | "/games"; label: string; exact?: boolean; highlight?: boolean }) {
  return (
    <Link
      to={to}
      activeOptions={exact ? { exact: true } : undefined}
      className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
        highlight ? "bg-primary text-primary-foreground shadow-soft" : "text-muted-foreground hover:text-foreground"
      }`}
      activeProps={{ className: "bg-primary text-primary-foreground shadow-soft px-4 py-1.5 rounded-full text-sm font-medium" }}
    >
      {label}
    </Link>
  );
}

function NavLinkPill({ href, label }: { href: string; label: string }) {
  return (
    <a href={href} className="px-4 py-1.5 rounded-full text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
      {label}
    </a>
  );
}

function IconButton({ children }: { children: React.ReactNode }) {
  return (
    <button className="size-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-soft hover:scale-105 transition-transform">
      {children}
    </button>
  );
}
