import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, MessageCircle, Server, HelpCircle, ExternalLink } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: "Resources — eaglerlaunch" },
      { name: "description", content: "Server lists, guides, FAQ and community links for Eaglercraft." },
      { property: "og:title", content: "Resources — eaglerlaunch" },
      { property: "og:description", content: "Server lists, guides and community links for Eaglercraft." },
    ],
  }),
  component: ResourcesPage,
});

const servers = [
  { name: "EaglercraftX Hub", ip: "wss://hub.eaglerx.net", desc: "Big lobby, minigames, survival." },
  { name: "ShadowNode PvP", ip: "wss://pvp.shadownode.gg", desc: "Competitive 1.8 PvP and duels." },
  { name: "Pixel Survival", ip: "wss://play.pixelsmp.io", desc: "Long-running vanilla survival." },
  { name: "ClassicCraft", ip: "wss://classic.eagler.land", desc: "Beta and Classic-era nostalgia." },
];

const faqs = [
  { q: "Is this safe?", a: "Yes. Everything runs sandboxed in your browser. We don't collect logins or world saves." },
  { q: "Can I join real Minecraft servers?", a: "No. Eaglercraft uses WebSocket servers (wss://). The list above shows compatible ones." },
  { q: "Worlds keep disappearing.", a: "Browsers can clear site data. Use the in-game world export, or pick a stable browser profile." },
  { q: "Why is FPS low?", a: "Try Resent or PixelClient — both are tuned for performance. Closing other tabs helps too." },
];

function ResourcesPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <section id="servers" className="mx-auto max-w-5xl px-6 py-16">
        <span className="text-xs font-semibold text-primary uppercase tracking-wider">Resources</span>
        <h1 className="text-3xl md:text-5xl font-bold mt-3">Get the most out of it</h1>
        <p className="text-muted-foreground mt-4 max-w-2xl">
          Servers to join, guides to read, and people to play with.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mt-10">
          <Card
            icon={<Server className="size-5" />}
            title="Server List"
            body="Curated WebSocket servers compatible with Eaglercraft."
            href="#servers"
          />
          <Card
            icon={<MessageCircle className="size-5" />}
            title="Discord"
            body="Find friends, suggest clients, get help."
            href="https://discord.gg/"
            external
          />
          <Card
            icon={<BookOpen className="size-5" />}
            title="Guides"
            body="Settings, controls and PvP basics for new players."
            href="#guides"
          />
          <Card
            icon={<HelpCircle className="size-5" />}
            title="FAQ"
            body="Common questions answered below."
            href="#faq"
          />
        </div>

        <h2 id="servers-list" className="text-2xl font-bold mt-16 mb-5 flex items-center gap-2">
          <Server className="size-5 text-primary" /> Server List
        </h2>
        <div className="soft-card divide-y divide-border/60">
          {servers.map((s) => (
            <div key={s.ip} className="px-5 py-4 flex items-center justify-between gap-4">
              <div className="min-w-0">
                <div className="font-semibold">{s.name}</div>
                <div className="text-xs text-muted-foreground">{s.desc}</div>
              </div>
              <code className="text-xs bg-muted px-3 py-1.5 rounded-md font-mono shrink-0">{s.ip}</code>
            </div>
          ))}
        </div>

        <h2 id="guides" className="text-2xl font-bold mt-16 mb-5 flex items-center gap-2">
          <BookOpen className="size-5 text-primary" /> Quick Guides
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="soft-card p-6">
            <h3 className="font-bold mb-2">First-time setup</h3>
            <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside leading-relaxed">
              <li>Pick a client from the launcher.</li>
              <li>Click Singleplayer → Create New World.</li>
              <li>Lock the cursor by clicking the screen.</li>
              <li>Press <span className="font-mono">Esc</span> to release the cursor.</li>
            </ol>
          </div>
          <div className="soft-card p-6">
            <h3 className="font-bold mb-2">PvP basics</h3>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside leading-relaxed">
              <li>Use 1.8.8 or Resent for Hypixel-style combat.</li>
              <li>Bind shortcuts in the Controls menu.</li>
              <li>Lower render distance for higher FPS.</li>
              <li>Practice on a duels server before joining ranked.</li>
            </ul>
          </div>
        </div>

        <h2 id="faq" className="text-2xl font-bold mt-16 mb-5 flex items-center gap-2">
          <HelpCircle className="size-5 text-primary" /> FAQ
        </h2>
        <div className="space-y-4">
          {faqs.map((f) => (
            <div key={f.q} className="soft-card p-5">
              <h3 className="font-semibold mb-1">{f.q}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link to="/" className="sky-button inline-block px-6 py-3">Back to launcher</Link>
        </div>
      </section>
    </div>
  );
}

function Card({
  icon, title, body, href, external,
}: { icon: React.ReactNode; title: string; body: string; href: string; external?: boolean }) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="soft-card p-6 block hover:-translate-y-0.5 transition-transform"
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">{icon}</div>
        <h3 className="font-bold flex items-center gap-1.5">
          {title} {external && <ExternalLink className="size-3.5 text-muted-foreground" />}
        </h3>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">{body}</p>
    </a>
  );
}
