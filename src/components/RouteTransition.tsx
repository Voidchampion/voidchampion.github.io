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
 * mcpvp-style page transition. Subscribes to the router so EVERY navigation
 * (link click, programmatic navigate, back/forward) gets covered by the
 * overlay before the new screen is revealed.
 */
export function RouteTransition() {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("idle");
  const phaseRef = useRef<Phase>("idle");
  const coverStart = useRef<number>(0);
  const uncoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const minCoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  useEffect(() => {
    const img = new Image();
    img.src = grassBlock;
  }, []);

  useEffect(() => {
    const startCover = () => {
      if (phaseRef.current !== "idle") return;
      coverStart.current = performance.now();
      phaseRef.current = "cover";
      setPhase("cover");
    };

    const startUncover = () => {
      const elapsed = performance.now() - coverStart.current;
      const wait = Math.max(0, COVER_MS - elapsed);
      if (minCoverTimer.current) clearTimeout(minCoverTimer.current);
      minCoverTimer.current = setTimeout(() => {
        window.scrollTo(0, 0);
        phaseRef.current = "uncover";
        setPhase("uncover");
        if (uncoverTimer.current) clearTimeout(uncoverTimer.current);
        uncoverTimer.current = setTimeout(() => {
          phaseRef.current = "idle";
          setPhase("idle");
        }, UNCOVER_MS);
      }, wait);
    };

    // Router events fire for every navigation, including back/forward and
    // programmatic <Link>/navigate() calls.
    const unsubBefore = router.subscribe("onBeforeNavigate", (e) => {
      const from = e.fromLocation?.pathname ?? "";
      const to = e.toLocation?.pathname ?? "";
      if (from === to) return;
      startCover();
    });
    const unsubResolved = router.subscribe("onResolved", () => {
      if (phaseRef.current !== "cover") return;
      startUncover();
    });

    // Custom event still supported for explicit triggers that want to
    // navigate via the same animation.
    const onCustom = (e: Event) => {
      const detail = (e as CustomEvent<{ href: string }>).detail;
      if (!detail?.href) return;
      try {
        const url = new URL(detail.href, window.location.href);
        const target = url.pathname + url.search + url.hash;
        const current = window.location.pathname + window.location.search + window.location.hash;
        if (target === current) return;
        // Navigate — the router subscription above will drive the animation.
        router.navigate({ to: target });
      } catch {
        /* ignore */
      }
    };

    window.addEventListener(TRANSITION_EVENT, onCustom as EventListener);

    return () => {
      unsubBefore();
      unsubResolved();
      window.removeEventListener(TRANSITION_EVENT, onCustom as EventListener);
      if (uncoverTimer.current) clearTimeout(uncoverTimer.current);
      if (minCoverTimer.current) clearTimeout(minCoverTimer.current);
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
