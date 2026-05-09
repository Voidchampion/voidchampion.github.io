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
    slug: "eaglercraft-1-5-2",
    title: "Eaglercraft",
    version: "1.5.2",
    category: "Classic",
    tagline: "The OG nostalgia build",
    description: "The original Eaglercraft. Lightweight, fast, and packed with old-school charm. Best for low-end devices.",
    badge: "Classic",
  },
  {
    slug: "eaglercraft-1-8-8",
    title: "EaglercraftX",
    version: "1.8.8",
    category: "PvP",
    tagline: "The PvP favorite",
    description: "The most popular version. Refined combat, bigger worlds, and the home of competitive servers.",
    badge: "Most Popular",
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
    slug: "resent-1-8-8",
    title: "Resent Client",
    version: "1.8.8",
    category: "PvP",
    tagline: "PvP client with QoL mods",
    description: "Hypixel-ready PvP client with FPS mods, keystrokes, CPS counter and more.",
  },
  {
    slug: "shadow-1-8-8",
    title: "Shadow Client",
    version: "1.8.8",
    category: "PvP",
    tagline: "Performance-tuned PvP",
    description: "Optimized rendering and animations for smooth competitive play.",
  },
  {
    slug: "eaglercraft-beta-1-3",
    title: "Eaglercraft",
    version: "Beta 1.3",
    category: "Classic",
    tagline: "Pure beta nostalgia",
    description: "The classic beta experience — original terrain generation and vibes.",
  },
];

export const getClient = (slug: string) => clients.find((c) => c.slug === slug);

// legacy aliases (kept so older imports don't break the build)
export type Game = Client;
export const games = clients;
export const getGame = getClient;
