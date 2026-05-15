import { Link, useNavigate } from "@tanstack/react-router";
import { Bell, Compass, Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

type RoutePath = "/" | "/games" | "/downloads" | "/resources" | "/legal";

export function SiteHeader() {
  const [dark, setDark] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const isDark = stored === "dark" || (!stored && window.matchMedia("(prefers-color-scheme: dark)").matches);
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

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
          <NavPill to="/" exact label="Launcher" />
          <NavPill to="/games" label="Games" />
          <NavPill to="/downloads" label="Downloads" />
          <NavPill to="/resources" label="Resources" />
          <NavPill to="/legal" label="Legal" />
        </nav>

        <div className="flex items-center gap-2">
          <IconButton title="What's new" onClick={() => navigate({ to: "/resources", hash: "faq" })}>
            <Bell className="size-4" />
          </IconButton>
          <IconButton title="Browse all clients" onClick={() => navigate({ to: "/games" })}>
            <Compass className="size-4" />
          </IconButton>
          <IconButton title="Toggle theme" onClick={toggleTheme}>
            {dark ? <Moon className="size-4" /> : <Sun className="size-4" />}
          </IconButton>
        </div>
      </div>
    </header>
  );
}

function NavPill({ to, label, exact }: { to: RoutePath; label: string; exact?: boolean }) {
  return (
    <Link
      to={to}
      activeOptions={exact ? { exact: true } : undefined}
      className="px-4 py-1.5 rounded-full text-sm font-medium transition-colors text-muted-foreground hover:text-foreground"
      activeProps={{ className: "bg-primary text-primary-foreground shadow-soft px-4 py-1.5 rounded-full text-sm font-medium" }}
    >
      {label}
    </Link>
  );
}

function IconButton({
  children, onClick, title,
}: { children: React.ReactNode; onClick?: () => void; title?: string }) {
  return (
    <button
      onClick={onClick}
      title={title}
      aria-label={title}
      className="size-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-soft hover:scale-105 transition-transform"
    >
      {children}
    </button>
  );
}
