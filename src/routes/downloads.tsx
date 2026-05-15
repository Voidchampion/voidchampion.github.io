import { createFileRoute, Link } from "@tanstack/react-router";
import { Download, Globe, HardDrive, Smartphone, Zap } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { clients } from "@/data/games";

export const Route = createFileRoute("/downloads")({
  head: () => ({
    meta: [
      { title: "Downloads — eaglerlaunch" },
      { name: "description", content: "Play in-browser or grab offline copies of every Eaglercraft client." },
      { property: "og:title", content: "Downloads — eaglerlaunch" },
      { property: "og:description", content: "Play in-browser or download Eaglercraft clients." },
    ],
  }),
  component: DownloadsPage,
});

function DownloadsPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <section className="mx-auto max-w-5xl px-6 py-16">
        <span className="text-xs font-semibold text-primary uppercase tracking-wider">Downloads</span>
        <h1 className="text-3xl md:text-5xl font-bold mt-3">Play your way</h1>
        <p className="text-muted-foreground mt-4 max-w-2xl">
          Everything runs straight in your browser — no install required. Prefer offline?
          Each client below is a self-contained HTML file you can save and run anywhere.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mt-10">
          <Card icon={<Globe className="size-6" />} title="Browser" body="Pick a client and hit Launch. Works on any modern browser." />
          <Card icon={<HardDrive className="size-6" />} title="Offline" body="Right-click any download below → Save Link As. Open the .html anywhere." />
          <Card icon={<Smartphone className="size-6" />} title="Mobile" body="Touch controls work in browser on phones and tablets." />
        </div>

        <div className="mt-14">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Zap className="size-5 text-primary" /> Direct downloads
          </h2>
          <div className="soft-card divide-y divide-border/60">
            {clients.map((c) => (
              <div key={c.slug} className="flex items-center justify-between gap-4 px-5 py-4">
                <div className="min-w-0">
                  <div className="font-semibold truncate">
                    {c.title} <span className="text-muted-foreground font-normal">{c.version}</span>
                  </div>
                  <div className="text-xs text-muted-foreground truncate">{c.tagline}</div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    to="/play/$slug"
                    params={{ slug: c.slug }}
                    className="text-sm font-semibold text-primary hover:underline"
                  >
                    Play
                  </Link>
                  {c.embedUrl && (
                    <a
                      href={c.embedUrl}
                      download
                      className="inline-flex items-center gap-1.5 text-sm font-medium bg-primary/10 text-primary px-3 py-1.5 rounded-full hover:bg-primary/20 transition-colors"
                    >
                      <Download className="size-3.5" /> .html
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function Card({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div className="soft-card p-6">
      <div className="size-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">{icon}</div>
      <h3 className="font-bold text-lg">{title}</h3>
      <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{body}</p>
    </div>
  );
}
