export type Client = {
  slug: string;
  title: string;
  version: string;
  category: "Vanilla" | "PvP" | "Classic" | "Modded";
  tagline: string;
  description: string;
  badge?: string;
  embedUrl?: string;
};

export const clients: Client[] = [
  {
    slug: "eaglercraft-1-8-8",
    title: "Eaglercraft",
    version: "1.8.8",
    category: "PvP",
    tagline: "The PvP favorite",
    description: "The most popular version. Refined combat, bigger worlds, and the home of competitive servers.",
    badge: "Most Popular",
    embedUrl: "/games/eaglercraft-1-8-8.html",
  },
  {
    slug: "eaglercraft-1-12-2",
    title: "Eaglercraft",
    version: "1.12.2",
    category: "Vanilla",
    tagline: "Modern blocks & mobs",
    description: "Newer blocks, smarter mobs, and refined survival mechanics. The freshest stable build.",
    badge: "Stable",
    embedUrl: "/games/eaglercraft-1-12-2.html",
  },
  {
    slug: "eaglercraft-1-5-2",
    title: "Eaglercraft",
    version: "1.5.2",
    category: "Classic",
    tagline: "The OG nostalgia build",
    description: "The original Eaglercraft. Lightweight, fast, and packed with old-school charm. Best for low-end devices.",
    badge: "Classic",
    embedUrl: "/games/eaglercraft-1-5-2.html",
  },
  {
    slug: "eaglercraft-1-2-5",
    title: "Eaglercraft",
    version: "1.2.5",
    category: "Vanilla",
    tagline: "Pre-1.5 vibes",
    description: "A classic release era build with the original block and mob roster.",
    embedUrl: "/games/eaglercraft-1-2-5.html",
  },
  {
    slug: "resent-1-8-8",
    title: "Resent Client",
    version: "5.0",
    category: "PvP",
    tagline: "PvP client with QoL mods",
    description: "Hypixel-ready PvP client with FPS mods, keystrokes, CPS counter and more.",
    embedUrl: "/games/resent-1-8-8.html",
  },
  {
    slug: "tuff-client",
    title: "Tuff Client",
    version: "Latest",
    category: "PvP",
    tagline: "Feature-packed PvP client",
    description: "Modern PvP client with cosmetics, custom HUDs, and tons of QoL tweaks.",
    embedUrl: "/games/tuff-client.html",
  },
  {
    slug: "pixel-1-8-8",
    title: "PixelClient",
    version: "1.8.8",
    category: "PvP",
    tagline: "Lightweight competitive client",
    description: "Smooth performance with PvP-focused mods baked in.",
    embedUrl: "/games/pixel-1-8-8.html",
  },
  {
    slug: "astra-1-6-0",
    title: "Astra Client",
    version: "1.6.0",
    category: "Modded",
    tagline: "Stylish modded experience",
    description: "Polished UI, custom modules, and built-in optimizations.",
    embedUrl: "/games/astra-1-6-0.html",
  },
  {
    slug: "eaglercraft-beta-1-7-3",
    title: "Eaglercraft",
    version: "Beta 1.7.3",
    category: "Classic",
    tagline: "Peak beta era",
    description: "The legendary Beta 1.7.3 — biomes, redstone, and pure nostalgia.",
    embedUrl: "/games/eaglercraft-beta-1-7-3.html",
  },
  {
    slug: "eaglercraft-beta-1-3",
    title: "Eaglercraft",
    version: "Beta 1.3",
    category: "Classic",
    tagline: "Pure beta nostalgia",
    description: "The classic beta experience — original terrain generation and vibes.",
    embedUrl: "/games/eaglercraft-beta-1-3.html",
  },
  {
    slug: "classic-0-30",
    title: "Eaglercraft",
    version: "Classic 0.30",
    category: "Classic",
    tagline: "Where it all started",
    description: "The original 2009 Classic build. Place blocks, break blocks, that's it.",
    embedUrl: "/games/classic-0-30.html",
  },
];

export const getClient = (slug: string) => clients.find((c) => c.slug === slug);

// legacy aliases (kept so older imports don't break the build)
export type Game = Client;
export const games = clients;
export const getGame = getClient;
