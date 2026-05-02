import eaglercraftImg from "@/assets/game-eaglercraft.jpg";
import motox3mImg from "@/assets/game-motox3m.jpg";
import paperioImg from "@/assets/game-paperio.jpg";

export type Game = {
  slug: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  image: string;
  accent: "pink" | "cyan" | "yellow" | "green";
  players: string;
  rating: string;
  embedUrl?: string;
};

export const games: Game[] = [
  {
    slug: "eaglercraft-1-5",
    title: "Eaglercraft 1.5",
    category: "Sandbox",
    tagline: "Classic block-building survival",
    description: "The OG voxel sandbox. Mine, craft, and build to your heart's content — straight in the browser.",
    image: eaglercraftImg,
    accent: "green",
    players: "8.2K",
    rating: "9.7",
  },
  {
    slug: "eaglercraft-1-8",
    title: "Eaglercraft 1.8",
    category: "Sandbox",
    tagline: "PvP-ready combat update",
    description: "The favorite for PvP arenas and minigame servers. Improved combat and bigger worlds.",
    image: eaglercraftImg,
    accent: "cyan",
    players: "12.4K",
    rating: "9.8",
  },
  {
    slug: "eaglercraft-1-12",
    title: "Eaglercraft 1.12",
    category: "Sandbox",
    tagline: "Modern blocks & mobs",
    description: "Newer blocks, smarter mobs, and refined survival. The freshest Eagler version on the playground.",
    image: eaglercraftImg,
    accent: "pink",
    players: "6.1K",
    rating: "9.6",
  },
  {
    slug: "motox3m",
    title: "Moto X3M",
    category: "Racing",
    tagline: "Stunt bike madness",
    description: "Crash, flip, and rocket through brutal obstacle courses on your dirt bike. One-wheeled chaos.",
    image: motox3mImg,
    accent: "yellow",
    players: "4.8K",
    rating: "9.4",
  },
  {
    slug: "paper-io-2",
    title: "Paper.io 2",
    category: "IO Arena",
    tagline: "Conquer the territory",
    description: "Capture as much area as possible without getting your tail clipped. Pure addictive grid warfare.",
    image: paperioImg,
    accent: "pink",
    players: "15.7K",
    rating: "9.5",
  },
  {
    slug: "paper-io-3",
    title: "Paper.io 3",
    category: "IO Arena",
    tagline: "3D grid domination",
    description: "The sequel goes 3D. Same loop, more depth — claim cubes and crush rivals in voxel space.",
    image: paperioImg,
    accent: "cyan",
    players: "9.3K",
    rating: "9.3",
  },
];

export const getGame = (slug: string) => games.find((g) => g.slug === slug);
