import { useRouterState } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import grassBlock from "@/assets/grass-block.png";

/**
 * mcpvp-style page transition: a panel sweeps across the screen with a
 * spinning grass block in the middle.
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
        <img src={grassBlock} alt="" className="route-transition__img" />
      </div>
    </div>
  );
}
