import Navbar from "@/components/Navbar";
import BlobBackground from "@/components/BlobBackground";
import {
  Trophy,
  Shield,
  Zap,
  Star,
  Users,
  TrendingUp,
  Swords,
  Clock,
  ChevronUp,
  ChevronDown,
  Minus,
} from "lucide-react";

const PLAYER = {
  name: "SpaceMeonix",
  nameColor: "FFD700",
  tag: "MEONIXME",
  icon: "https://cdn.brawlify.com/profile-icons/regular/28000000.png",
  trophies: 58432,
  highestTrophies: 62100,
  expLevel: 147,
  expPoints: 284920,
  club: { name: "Space Station" },
  victories3v3: 4218,
  soloVictories: 312,
  duoVictories: 891,
  brawlers: 77,
};

const BATTLE_LOG = [
  {
    id: 1,
    mode: "Gem Grab",
    map: "Hard Rock Mine",
    result: "victory",
    trophyChange: +8,
    timeAgo: "il y a 4 min",
    brawler: "Shelly",
    brawlerIcon: "https://cdn.brawlify.com/brawler-bs/regular/16000000.png",
  },
  {
    id: 2,
    mode: "Brawl Ball",
    map: "Pinhole Punt",
    result: "defeat",
    trophyChange: -4,
    timeAgo: "il y a 18 min",
    brawler: "Colt",
    brawlerIcon: "https://cdn.brawlify.com/brawler-bs/regular/16000001.png",
  },
  {
    id: 3,
    mode: "Showdown",
    map: "Skull Creek",
    result: "victory",
    trophyChange: +10,
    timeAgo: "il y a 32 min",
    brawler: "El Primo",
    brawlerIcon: "https://cdn.brawlify.com/brawler-bs/regular/16000006.png",
  },
  {
    id: 4,
    mode: "Heist",
    map: "Safe Zone",
    result: "draw",
    trophyChange: 0,
    timeAgo: "il y a 47 min",
    brawler: "Jessie",
    brawlerIcon: "https://cdn.brawlify.com/brawler-bs/regular/16000004.png",
  },
  {
    id: 5,
    mode: "Hot Zone",
    map: "Open Business",
    result: "victory",
    trophyChange: +6,
    timeAgo: "il y a 1h",
    brawler: "Rosa",
    brawlerIcon: "https://cdn.brawlify.com/brawler-bs/regular/16000058.png",
  },
  {
    id: 6,
    mode: "Bounty",
    map: "Excel",
    result: "defeat",
    trophyChange: -4,
    timeAgo: "il y a 1h 20 min",
    brawler: "Brock",
    brawlerIcon: "https://cdn.brawlify.com/brawler-bs/regular/16000003.png",
  },
  {
    id: 7,
    mode: "Gem Grab",
    map: "Crystal Arcade",
    result: "victory",
    trophyChange: +8,
    timeAgo: "il y a 2h",
    brawler: "Nita",
    brawlerIcon: "https://cdn.brawlify.com/brawler-bs/regular/16000002.png",
  },
];

function fmt(n: number) {
  return n.toLocaleString("fr-FR");
}

const RESULT_CONFIG = {
  victory: {
    label: "Victoire",
    color: "text-green-400",
    bg: "bg-green-400/10 border-green-400/20",
    bar: "bg-green-400",
    icon: <ChevronUp size={12} className="text-green-400" />,
  },
  defeat: {
    label: "Défaite",
    color: "text-red-400",
    bg: "bg-red-400/10 border-red-400/20",
    bar: "bg-red-400",
    icon: <ChevronDown size={12} className="text-red-400" />,
  },
  draw: {
    label: "Égalité",
    color: "text-muted-foreground",
    bg: "bg-accent/20 border-border/30",
    bar: "bg-muted-foreground",
    icon: <Minus size={12} className="text-muted-foreground" />,
  },
};

export default function StatsPlayer() {
  const trophyPct = Math.round((PLAYER.trophies / PLAYER.highestTrophies) * 100);

  return (
    <div className="min-h-screen w-full bg-background overflow-hidden">
      <BlobBackground />
      <Navbar />

      <main className="relative z-10 max-w-5xl mx-auto px-4 pt-24 pb-20 space-y-4">

        {/* ── Top section: identity (left) + battle log (right) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">

          {/* ── LEFT: Player identity card ── */}
          <div className="lg:col-span-2 rounded-2xl border border-border/50 bg-card/70 backdrop-blur-sm overflow-hidden">
            <div className="h-1 w-full bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500" />

            <div className="p-5">
              {/* Icon + Name + Tag */}
              <div className="flex items-center gap-4 mb-4">
                <div className="relative shrink-0">
                  <img
                    src={PLAYER.icon}
                    alt="avatar"
                    className="w-16 h-16 rounded-xl border-2 border-border/60 object-contain bg-background/40 p-1"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.opacity = "0.3";
                    }}
                  />
                  <span className="absolute -bottom-1.5 -right-1.5 bg-yellow-500 text-black text-[10px] font-black px-1.5 py-0.5 rounded-md leading-none">
                    {PLAYER.expLevel}
                  </span>
                </div>

                <div className="min-w-0">
                  <h1
                    className="text-xl font-bold leading-tight truncate"
                    style={{ color: `#${PLAYER.nameColor}` }}
                  >
                    {PLAYER.name}
                  </h1>
                  <p className="text-xs font-mono text-muted-foreground mt-0.5">
                    #{PLAYER.tag}
                  </p>
                </div>
              </div>

              {/* Club — first line */}
              {PLAYER.club && (
                <div className="flex items-center gap-2 mb-5 py-2.5 px-3 rounded-lg bg-accent/30 border border-border/30">
                  <Users size={13} className="text-muted-foreground shrink-0" />
                  <span className="text-sm text-foreground font-medium truncate">
                    {PLAYER.club.name}
                  </span>
                </div>
              )}

              {/* Trophies */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Trophy size={14} className="text-yellow-400" />
                    <span className="text-xs text-muted-foreground uppercase tracking-wide">
                      Trophées
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    Record : {fmt(PLAYER.highestTrophies)}
                  </span>
                </div>
                <p className="text-2xl font-black text-foreground">
                  {fmt(PLAYER.trophies)}
                </p>
                <div className="h-1.5 rounded-full bg-accent/60 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-yellow-500 to-amber-400 transition-all"
                    style={{ width: `${trophyPct}%` }}
                  />
                </div>
                <p className="text-[10px] text-muted-foreground">
                  {trophyPct}% du record personnel
                </p>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Battle Log ── */}
          <div className="lg:col-span-3 rounded-2xl border border-border/50 bg-card/70 backdrop-blur-sm overflow-hidden flex flex-col">
            <div className="px-5 pt-5 pb-3 flex items-center gap-2 border-b border-border/30">
              <Swords size={14} className="text-muted-foreground" />
              <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Battle Log
              </span>
              <span className="ml-auto text-[10px] text-muted-foreground/60 flex items-center gap-1">
                <Clock size={10} />
                Dernières parties
              </span>
            </div>

            <div className="flex-1 overflow-y-auto divide-y divide-border/20 max-h-[340px]">
              {BATTLE_LOG.map((battle) => {
                const cfg = RESULT_CONFIG[battle.result as keyof typeof RESULT_CONFIG];
                return (
                  <div
                    key={battle.id}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-accent/20 transition-colors"
                  >
                    {/* Result bar */}
                    <div className={`w-0.5 h-8 rounded-full shrink-0 ${cfg.bar}`} />

                    {/* Brawler icon */}
                    <img
                      src={battle.brawlerIcon}
                      alt={battle.brawler}
                      className="w-9 h-9 rounded-lg object-contain bg-background/40 border border-border/30 p-0.5 shrink-0"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.opacity = "0.3";
                      }}
                    />

                    {/* Mode + Map */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground leading-tight truncate">
                        {battle.mode}
                      </p>
                      <p className="text-[11px] text-muted-foreground truncate">
                        {battle.map}
                      </p>
                    </div>

                    {/* Result + trophy change */}
                    <div className="flex flex-col items-end shrink-0 gap-0.5">
                      <span className={`text-xs font-bold ${cfg.color}`}>
                        {cfg.label}
                      </span>
                      <div className={`flex items-center gap-0.5 text-[11px] font-semibold ${cfg.color}`}>
                        {cfg.icon}
                        {battle.trophyChange !== 0
                          ? `${battle.trophyChange > 0 ? "+" : ""}${battle.trophyChange}`
                          : "±0"}
                      </div>
                      <span className="text-[9px] text-muted-foreground/60">
                        {battle.timeAgo}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Bottom: Player Stats ── */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 px-1">
            <TrendingUp size={13} className="text-muted-foreground" />
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Statistiques
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              {
                icon: <Zap size={15} className="text-green-400" />,
                label: "Victoires 3v3",
                value: fmt(PLAYER.victories3v3),
                sub: null,
              },
              {
                icon: <Star size={15} className="text-purple-400" />,
                label: "Victoires Solo",
                value: fmt(PLAYER.soloVictories),
                sub: null,
              },
              {
                icon: <Users size={15} className="text-blue-400" />,
                label: "Victoires Duo",
                value: fmt(PLAYER.duoVictories),
                sub: null,
              },
              {
                icon: <Shield size={15} className="text-orange-400" />,
                label: "Brawlers",
                value: String(PLAYER.brawlers),
                sub: "débloqués",
              },
            ].map(({ icon, label, value, sub }) => (
              <div
                key={label}
                className="rounded-xl border border-border/50 bg-card/60 backdrop-blur-sm p-4"
              >
                <div className="flex items-center gap-1.5 mb-2">
                  {icon}
                  <span className="text-[11px] text-muted-foreground uppercase tracking-wide">
                    {label}
                  </span>
                </div>
                <p className="text-2xl font-black text-foreground">{value}</p>
                {sub && (
                  <p className="text-[11px] text-muted-foreground mt-0.5">{sub}</p>
                )}
              </div>
            ))}
          </div>

          {/* XP */}
          <div className="rounded-2xl border border-border/50 bg-card/60 backdrop-blur-sm p-5">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp size={15} className="text-muted-foreground" />
              <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Expérience
              </span>
              <span className="ml-auto text-sm text-muted-foreground">
                {fmt(PLAYER.expPoints)} XP
              </span>
            </div>
            <div className="flex items-end justify-between mb-2">
              <p className="text-3xl font-black text-foreground">
                Niv. {PLAYER.expLevel}
              </p>
            </div>
            <div className="h-2 rounded-full bg-accent/50 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500"
                style={{ width: "62%" }}
              />
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
