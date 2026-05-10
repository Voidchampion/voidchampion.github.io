import { useRouter } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import grassBlock from "@/assets/grass-block.png";

type Phase = "idle" | "cover" | "uncover";

const COVER_MS = 500;
const UNCOVER_MS = 500;

const TRANSITION_EVENT = "eagler:navigate";

/** Programmatic trigger from anywhere in the app. */
export function playTransitionTo(href: string) {
  window.dispatchEvent(new CustomEvent(TRANSITION_EVENT, { detail: { href } }));
}

/**
 * mcpvp-style page transition. Cover phase fully hides the screen BEFORE
 * navigation, then uncovers. Works for <a> link clicks and programmatic
 * navigations via playTransitionTo().
 */
export function RouteTransition() {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("idle");
  const phaseRef = useRef<Phase>("idle");
  const coverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const uncoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  useEffect(() => {
    const img = new Image();
    img.src = grassBlock;
  }, []);

  useEffect(() => {
    const startTransition = (dest: string) => {
      if (phaseRef.current !== "idle") return;
      const url = (() => {
        try {
          return new URL(dest, window.location.href);
        } catch {
          return null;
        }
      })();
      if (!url) return;
      const target = url.pathname + url.search + url.hash;
      const current = window.location.pathname + window.location.search + window.location.hash;
      if (target === current) return;

      phaseRef.current = "cover";
      setPhase("cover");

      if (coverTimer.current) clearTimeout(coverTimer.current);
      coverTimer.current = setTimeout(() => {
        router.navigate({ to: target });
        requestAnimationFrame(() => {
          window.scrollTo(0, 0);
          phaseRef.current = "uncover";
          setPhase("uncover");
          if (uncoverTimer.current) clearTimeout(uncoverTimer.current);
          uncoverTimer.current = setTimeout(() => {
            phaseRef.current = "idle";
            setPhase("idle");
          }, UNCOVER_MS);
        });
      }, COVER_MS);
    };

    const onClick = (e: MouseEvent) => {
      if (phaseRef.current !== "idle") return;
      if (e.defaultPrevented) return;
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const anchor = (e.target as HTMLElement | null)?.closest?.("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return;
      const tgt = anchor.getAttribute("target");
      if (tgt && tgt !== "" && tgt !== "_self") return;

      let url: URL;
      try {
        url = new URL(href, window.location.href);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin) return;

      e.preventDefault();
      startTransition(url.href);
    };

    const onCustom = (e: Event) => {
      const detail = (e as CustomEvent<{ href: string }>).detail;
      if (detail?.href) startTransition(detail.href);
    };

    document.addEventListener("click", onClick);
    window.addEventListener(TRANSITION_EVENT, onCustom as EventListener);
    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener(TRANSITION_EVENT, onCustom as EventListener);
      if (coverTimer.current) clearTimeout(coverTimer.current);
      if (uncoverTimer.current) clearTimeout(uncoverTimer.current);
    };
  }, [router]);

  return (
    <div aria-hidden className={`route-transition rt-${phase}`}>
      <div className="route-transition__panel route-transition__panel--top" />
      <div className="route-transition__panel route-transition__panel--bottom" />
      <div className="route-transition__block">
        <img src={grassBlock} alt="" className="route-transition__img" draggable={false} />
      </div>
    </div>
  );
}
