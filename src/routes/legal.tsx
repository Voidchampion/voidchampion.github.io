import { createFileRoute, Link } from "@tanstack/react-router";
import { Scale, ShieldCheck, FileText, AlertOctagon } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";

export const Route = createFileRoute("/legal")({
  head: () => ({
    meta: [
      { title: "Legal — eaglerlaunch" },
      { name: "description", content: "Disclaimer, privacy, terms and DMCA policy for eaglerlaunch." },
      { property: "og:title", content: "Legal — eaglerlaunch" },
      { property: "og:description", content: "Disclaimer, privacy, terms and DMCA for eaglerlaunch." },
    ],
  }),
  component: LegalPage,
});

function LegalPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <section className="mx-auto max-w-3xl px-6 py-16">
        <span className="text-xs font-semibold text-primary uppercase tracking-wider">Legal</span>
        <h1 className="text-3xl md:text-5xl font-bold mt-3">The boring but important stuff</h1>
        <p className="text-muted-foreground mt-4">
          Plain-English summaries of how this site works.
        </p>

        <Section id="disclaimer" icon={<AlertOctagon className="size-5" />} title="Disclaimer">
          <p>
            eaglerlaunch is a fan-made web launcher. We are not affiliated with, endorsed by,
            or connected to Mojang Studios, Microsoft, or any official Minecraft project.
          </p>
          <p>
            "Minecraft" is a trademark of Mojang AB. All client builds linked here are
            community-made browser ports distributed under their original authors' terms.
          </p>
        </Section>

        <Section id="privacy" icon={<ShieldCheck className="size-5" />} title="Privacy">
          <p>
            We don't run trackers, ads, or analytics that profile you. Saved worlds and
            settings live entirely inside your browser's local storage on your device.
          </p>
          <p>
            If you connect to a multiplayer server, that server may see your IP address and
            in-game name. That's between you and the server operator.
          </p>
        </Section>

        <Section id="terms" icon={<FileText className="size-5" />} title="Terms of Use">
          <p>
            Play for personal, non-commercial use. Don't use the site to harass others, host
            illegal content, attack other servers, or break any law that applies to you.
          </p>
          <p>
            The service is provided "as is" with no warranty. Browser games can crash, lose
            saves, or break — keep backups of anything you care about.
          </p>
        </Section>

        <Section id="dmca" icon={<Scale className="size-5" />} title="DMCA">
          <p>
            If you're a rights holder and believe content here infringes your copyright,
            email a takedown notice including: the work in question, the URL, your contact
            info, and a good-faith statement.
          </p>
          <p>
            We review every notice and remove infringing content promptly.
          </p>
        </Section>

        <div className="mt-14 text-center">
          <Link to="/" className="sky-button inline-block px-6 py-3">Back to launcher</Link>
        </div>
      </section>
    </div>
  );
}

function Section({
  id, icon, title, children,
}: { id: string; icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div id={id} className="soft-card p-6 mt-8 scroll-mt-24">
      <div className="flex items-center gap-3 mb-3">
        <div className="size-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">{icon}</div>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
      <div className="text-sm text-muted-foreground leading-relaxed space-y-3">{children}</div>
    </div>
  );
}
