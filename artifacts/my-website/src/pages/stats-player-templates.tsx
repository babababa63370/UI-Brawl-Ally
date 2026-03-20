import Navbar from "@/components/Navbar";
import BlobBackground from "@/components/BlobBackground";
import { Trophy, Shield, Zap, Star } from "lucide-react";

const DUMMY = {
  name: "SpaceMeonix",
  nameColor: "FFD700",
  tag: "MEONIXME",
  icon: "https://cdn.brawlify.com/profile-icons/regular/28000000.png",
  trophies: 58432,
  highestTrophies: 62100,
  expLevel: 147,
  club: "Space Station",
  victories3v3: 4218,
  soloVictories: 312,
  duoVictories: 891,
  brawlers: 77,
};

function fmt(n: number) {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

function PlayerIcon({ className }: { className?: string }) {
  return (
    <img
      src={DUMMY.icon}
      alt="icon"
      className={className}
      onError={(e) => {
        (e.target as HTMLImageElement).src =
          "https://cdn.brawlify.com/profile-icons/regular/28000000.png";
      }}
    />
  );
}

function PlayerCard() {
  return (
    <div className="w-full max-w-sm rounded-2xl overflow-hidden border border-border/60 bg-card/90 backdrop-blur-sm shadow-lg">
      <div className="h-1.5 w-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-400" />
      <div className="p-5">
        <div className="flex items-center gap-4 mb-5">
          <div className="relative">
            <PlayerIcon className="w-14 h-14 rounded-xl border-2 border-yellow-500/40 object-contain bg-background/40 p-0.5" />
            <span className="absolute -bottom-1 -right-1 text-[10px] bg-yellow-500 text-black font-bold px-1 rounded">
              {DUMMY.expLevel}
            </span>
          </div>
          <div className="min-w-0">
            <p className="font-bold text-lg leading-none" style={{ color: `#${DUMMY.nameColor}` }}>
              {DUMMY.name}
            </p>
            <p className="text-xs text-muted-foreground font-mono mt-0.5">#{DUMMY.tag}</p>
            <p className="text-xs text-muted-foreground mt-1 truncate">🏠 {DUMMY.club}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-lg bg-accent/40 p-3">
            <div className="flex items-center gap-1.5 mb-1">
              <Trophy size={12} className="text-yellow-400" />
              <span className="text-[10px] uppercase tracking-wide text-muted-foreground">Trophées</span>
            </div>
            <p className="text-xl font-bold text-foreground">{fmt(DUMMY.trophies)}</p>
            <p className="text-[10px] text-muted-foreground">Best: {fmt(DUMMY.highestTrophies)}</p>
          </div>
          <div className="rounded-lg bg-accent/40 p-3">
            <div className="flex items-center gap-1.5 mb-1">
              <Shield size={12} className="text-blue-400" />
              <span className="text-[10px] uppercase tracking-wide text-muted-foreground">Brawlers</span>
            </div>
            <p className="text-xl font-bold text-foreground">{DUMMY.brawlers}</p>
            <p className="text-[10px] text-muted-foreground">Lvl {DUMMY.expLevel}</p>
          </div>
          <div className="rounded-lg bg-accent/40 p-3">
            <div className="flex items-center gap-1.5 mb-1">
              <Zap size={12} className="text-green-400" />
              <span className="text-[10px] uppercase tracking-wide text-muted-foreground">3v3 Wins</span>
            </div>
            <p className="text-xl font-bold text-foreground">{fmt(DUMMY.victories3v3)}</p>
          </div>
          <div className="rounded-lg bg-accent/40 p-3">
            <div className="flex items-center gap-1.5 mb-1">
              <Star size={12} className="text-purple-400" />
              <span className="text-[10px] uppercase tracking-wide text-muted-foreground">Solo Wins</span>
            </div>
            <p className="text-xl font-bold text-foreground">{fmt(DUMMY.soloVictories)}</p>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between text-[10px] text-muted-foreground/60">
          <span>BrawlAlly</span>
          <span>brawlally.gg</span>
        </div>
      </div>
    </div>
  );
}

export default function StatsPlayerTemplates() {
  return (
    <div className="min-h-screen w-full bg-background overflow-hidden">
      <BlobBackground />
      <Navbar />

      <main className="relative z-10 flex flex-col items-center justify-center px-4 pt-28 pb-20">
        <div className="mb-10 text-center">
          <p className="text-xs font-mono text-muted-foreground/60 mb-2 tracking-widest uppercase">
            Statistiques / Joueurs
          </p>
          <h1
            className="text-3xl sm:text-4xl font-bold text-foreground mb-3"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            Templates
          </h1>
        </div>

        <PlayerCard />
      </main>
    </div>
  );
}
