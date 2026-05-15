import { createFileRoute, Link } from "@tanstack/react-router";
import { Rocket, Globe, Wrench, Check, X, AlertTriangle, Users } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { Launcher } from "@/components/Launcher";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "eaglerlaunch — Play Eaglercraft in your browser" },
      { name: "description", content: "Clean, ad-free Eaglercraft launcher. Pick a version and play instantly — no downloads, no clutter." },
      { property: "og:title", content: "eaglerlaunch — Eaglercraft Launcher" },
      { property: "og:description", content: "Clean, ad-free Eaglercraft launcher. Multiple versions, instant play." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />

      {/* HERO + LAUNCHER */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 starfield opacity-60 pointer-events-none" aria-hidden />
        <div className="mx-auto max-w-5xl px-6 pt-16 pb-20">
          <Launcher />

          {/* Feature row */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <Feature icon={<Rocket className="size-6" />} title="Play Instantly" body="No downloads needed. Play in your browser." />
            <Feature icon={<Globe className="size-6" />} title="Multiplayer" body="Join friends and play together online." />
            <Feature icon={<Wrench className="size-6" />} title="Multiple Versions" body="Choose your favorite Minecraft version." />
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section id="about" className="mx-auto max-w-5xl px-6 py-20">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold text-primary uppercase tracking-wider">★ Why Choose Us?</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3">Most launchers have problems.</h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Walls of text, ads everywhere, clutter, outdated designs. We decided to do something different.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Problem
            icon={<X className="size-5" />}
            tone="negative"
            title="Not User-Focused"
            body="Most sites plaster ads everywhere, force video ads, and bury you in pop-ups and walls of SEO text."
          />
          <Problem
            icon={<AlertTriangle className="size-5" />}
            tone="warn"
            title="Limited Client Options"
            body="Most sites assume you only want one or two versions. PvP clients, QoL mods, betas — usually missing."
          />
          <Problem
            icon={<Check className="size-5" />}
            tone="positive"
            title="User-Focused"
            body="100% ad-free with zero hassle. Play instantly, anywhere. Designed for what's best for you."
          />
          <Problem
            icon={<Users className="size-5" />}
            tone="positive"
            title="Community-Focused"
            body="We listen to suggestions and add what players actually want. Your favorite client missing? Tell us."
          />
        </div>
      </section>

      {/* FOOTER */}
      <footer id="legal" className="border-t border-border/60 bg-card/40 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-6 py-10 grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="size-8 rounded-lg bg-gradient-to-br from-sky-deep to-primary flex items-center justify-center text-primary-foreground font-bold">◆</div>
              <span className="font-bold">eaglerlaunch</span>
            </div>
            <p className="text-sm text-muted-foreground">Clean, ad-free Eaglercraft launcher.</p>
          </div>
          <FooterCol
            title="Launcher"
            links={[
              { label: "All Clients", to: "/games" },
              { label: "Downloads", to: "/downloads" },
              { label: "Launcher", to: "/" },
              { label: "Games", to: "/games" },
            ]}
          />
          <FooterCol
            title="Resources"
            links={[
              { label: "Server List", to: "/resources", hash: "servers-list" },
              { label: "Guides", to: "/resources", hash: "guides" },
              { label: "FAQ", to: "/resources", hash: "faq" },
              { label: "Discord", href: "https://discord.gg/", external: true },
            ]}
          />
          <FooterCol
            title="Legal"
            links={[
              { label: "Disclaimer", to: "/legal", hash: "disclaimer" },
              { label: "Privacy", to: "/legal", hash: "privacy" },
              { label: "Terms", to: "/legal", hash: "terms" },
              { label: "DMCA", to: "/legal", hash: "dmca" },
            ]}
          />
        </div>
        <div className="border-t border-border/60 py-5 text-center text-xs text-muted-foreground">
          © 2026 eaglerlaunch · Not affiliated with Mojang or Microsoft.
        </div>
      </footer>
    </div>
  );
}

function Feature({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div className="text-center px-4">
      <div className="size-14 mx-auto rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4 animate-float-soft">
        {icon}
      </div>
      <h3 className="font-bold text-lg">{title}</h3>
      <p className="text-sm text-muted-foreground mt-1">{body}</p>
    </div>
  );
}

function Problem({ icon, title, body, tone }: { icon: React.ReactNode; title: string; body: string; tone: "negative" | "warn" | "positive" }) {
  const toneClasses = {
    negative: "bg-destructive/10 text-destructive",
    warn: "bg-sun/20 text-foreground",
    positive: "bg-primary/10 text-primary",
  }[tone];
  return (
    <div className="soft-card p-6">
      <div className="flex items-center gap-3 mb-2">
        <div className={`size-9 rounded-lg flex items-center justify-center ${toneClasses}`}>{icon}</div>
        <h3 className="font-bold">{title}</h3>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
    </div>
  );
}

type FooterLink =
  | { label: string; to: "/" | "/games" | "/downloads" | "/resources" | "/legal"; hash?: string }
  | { label: string; href: string; external?: boolean };

function FooterCol({ title, links }: { title: string; links: FooterLink[] }) {
  return (
    <div>
      <h4 className="font-semibold text-sm mb-3">{title}</h4>
      <ul className="space-y-2 text-sm text-muted-foreground">
        {links.map((l) => (
          <li key={l.label}>
            {"to" in l ? (
              <Link to={l.to} hash={l.hash} className="hover:text-foreground transition-colors">
                {l.label}
              </Link>
            ) : (
              <a
                href={l.href}
                target={l.external ? "_blank" : undefined}
                rel={l.external ? "noreferrer" : undefined}
                className="hover:text-foreground transition-colors"
              >
                {l.label}
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
