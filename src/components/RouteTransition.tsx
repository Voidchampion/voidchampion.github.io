import { useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

/**
 * mcpvp-style page transition: a panel sweeps across the screen with a
 * spinning isometric grass block in the middle.
 */
export function RouteTransition() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [playing, setPlaying] = useState(false);
  const firstRender = useRef(true);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    setPlaying(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setPlaying(false), 1100);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [pathname]);

  return (
    <div
      aria-hidden
      className={`route-transition ${playing ? "is-playing" : ""}`}
    >
      <div className="route-transition__panel route-transition__panel--top" />
      <div className="route-transition__panel route-transition__panel--bottom" />
      <div className="route-transition__block">
        <GrassBlock />
      </div>
    </div>
  );
}

function GrassBlock() {
  // Isometric pixel-styled grass block built from three CSS faces.
  return (
    <div className="grass-block">
      <div className="grass-block__face grass-block__face--top" />
      <div className="grass-block__face grass-block__face--left" />
      <div className="grass-block__face grass-block__face--right" />
    </div>
  );
}
