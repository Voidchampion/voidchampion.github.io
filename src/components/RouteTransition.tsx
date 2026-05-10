import { useRouter } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import grassBlock from "@/assets/grass-block.png";

type Phase = "idle" | "cover" | "uncover";

const COVER_MS = 500;
const UNCOVER_MS = 500;

/**
 * mcpvp-style page transition. Intercepts internal link clicks so the
 * cover phase fully hides the screen BEFORE navigation happens, then
 * uncovers to reveal the new page.
 */
export function RouteTransition() {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (phase !== "idle") return;
      if (e.defaultPrevented) return;
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const anchor = (e.target as HTMLElement | null)?.closest?.("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return;
      if (anchor.target && anchor.target !== "" && anchor.target !== "_self") return;

      // External link?
      let url: URL;
      try {
        url = new URL(href, window.location.href);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin) return;
      const dest = url.pathname + url.search + url.hash;
      const current = window.location.pathname + window.location.search + window.location.hash;
      if (dest === current) return;

      e.preventDefault();
      e.stopPropagation();
      setPhase("cover");
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => {
        router.navigate({ to: url.pathname + url.search + url.hash });
        // give the new route a tick to mount
        requestAnimationFrame(() => {
          window.scrollTo(0, 0);
          setPhase("uncover");
          timer.current = setTimeout(() => setPhase("idle"), UNCOVER_MS);
        });
      }, COVER_MS);
    };

    document.addEventListener("click", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      if (timer.current) clearTimeout(timer.current);
    };
  }, [phase, router]);

  return (
    <div aria-hidden className={`route-transition rt-${phase}`}>
      <div className="route-transition__panel route-transition__panel--top" />
      <div className="route-transition__panel route-transition__panel--bottom" />
      <div className="route-transition__block">
        <img src={grassBlock} alt="" className="route-transition__img" />
      </div>
    </div>
  );
}
