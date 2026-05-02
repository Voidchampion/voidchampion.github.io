import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Rocket, ChevronDown } from "lucide-react";
import { clients } from "@/data/games";

export function Launcher() {
  const [selected, setSelected] = useState<string>("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const current = clients.find((c) => c.slug === selected);

  const handleLaunch = () => {
    if (!selected) return;
    navigate({ to: "/play/$slug", params: { slug: selected } });
  };

  return (
    <div className="relative">
      <div className="absolute -inset-4 bg-primary/10 blur-2xl rounded-[2rem]" aria-hidden />
      <div className="relative soft-card p-8 md:p-10 starfield">
        <div className="flex items-center gap-3 mb-2">
          <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Rocket className="size-5 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">Eaglercraft Launcher</h2>
            <p className="text-sm text-muted-foreground">Select a version and click Launch</p>
          </div>
        </div>

        <div className="mt-8 grid md:grid-cols-[1fr_auto] gap-3">
          <div className="relative">
            <label className="block text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">
              Select Client
            </label>
            <button
              onClick={() => setOpen(!open)}
              className="w-full bg-primary text-primary-foreground rounded-2xl px-6 py-4 flex items-center justify-between shadow-soft hover:scale-[1.01] transition-transform text-left"
            >
              <span className="font-medium">
                {current ? `${current.title} ${current.version}` : "Choose a client..."}
              </span>
              <ChevronDown className={`size-5 transition-transform ${open ? "rotate-180" : ""}`} />
            </button>

            {open && (
              <div className="absolute z-20 mt-2 w-full soft-card overflow-hidden">
                {clients.map((c) => (
                  <button
                    key={c.slug}
                    onClick={() => {
                      setSelected(c.slug);
                      setOpen(false);
                    }}
                    className="w-full px-5 py-3 text-left hover:bg-accent flex items-center justify-between border-b border-border/50 last:border-0"
                  >
                    <div>
                      <div className="font-semibold">
                        {c.title} <span className="text-muted-foreground font-normal">{c.version}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">{c.tagline}</div>
                    </div>
                    {c.badge && (
                      <span className="text-xs font-medium bg-primary/10 text-primary px-2.5 py-1 rounded-full">
                        {c.badge}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex md:items-end">
            <button
              onClick={handleLaunch}
              disabled={!selected}
              className="w-full md:w-auto sky-button px-10 py-4 text-base hover:[&:not(:disabled)]:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Launch
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
