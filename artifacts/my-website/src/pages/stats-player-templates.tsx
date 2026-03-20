import Navbar from "@/components/Navbar";
import BlobBackground from "@/components/BlobBackground";
import { Trophy, Shield, Zap, Star, Users, TrendingUp } from "lucide-react";

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

function fmt(n: number) {
  return n.toLocaleString("fr-FR");
}

export default function StatsPlayer() {
  const trophyPct = Math.round((PLAYER.trophies / PLAYER.highestTrophies) * 100);

  return (
    <div className="min-h-screen w-full bg-background overflow-hidden">
      <BlobBackground />
      <Navbar />

      <main className="relative z-10 max-w-4xl mx-auto px-4 pt-24 pb-20">

        {/* Header — Player identity */}
        <div className="rounded-2xl border border-border/50 bg-card/70 backdrop-blur-sm overflow-hidden mb-4">
          <div className="h-1 w-full bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500" />
          <div className="p-6 flex items-center gap-5">
            <div className="relative shrink-0">
              <img
                src={PLAYER.icon}
                alt="avatar"
                className="w-20 h-20 rounded-2xl border-2 border-border/60 object-contain bg-background/40 p-1"
                onError={(e) => { (e.target as HTMLImageElement).style.opacity = "0.3"; }}
              />
              <span className="absolute -bottom-1.5 -right-1.5 bg-yellow-500 text-black text-[10px] font-black px-1.5 py-0.5 rounded-md leading-none">
                {PLAYER.expLevel}
              </span>
            </div>

            <div className="flex-1 min-w-0">
              <h1
                className="text-2xl sm:text-3xl font-bold leading-none truncate"
                style={{ color: `#${PLAYER.nameColor}` }}
              >
                {PLAYER.name}
              </h1>
              <p className="text-sm font-mono text-muted-foreground mt-1">#{PLAYER.tag}</p>
              {PLAYER.club && (
                <p className="text-sm text-muted-foreground mt-1.5 flex items-center gap-1.5">
                  <Users size={13} className="shrink-0" />
                  {PLAYER.club.name}
                </p>
              )}
            </div>

            <div className="hidden sm:flex flex-col items-end shrink-0">
              <div className="flex items-center gap-1.5 text-yellow-400 mb-1">
                <Trophy size={18} />
                <span className="text-2xl font-black text-foreground">{fmt(PLAYER.trophies)}</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Record : {fmt(PLAYER.highestTrophies)}
              </p>
              <div className="mt-2 w-32 h-1.5 rounded-full bg-accent/60 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-yellow-500 to-amber-400"
                  style={{ width: `${trophyPct}%` }}
                />
              </div>
              <p className="text-[10px] text-muted-foreground mt-0.5">{trophyPct}% du record</p>
            </div>
          </div>

          {/* Mobile trophies */}
          <div className="sm:hidden px-6 pb-4">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-1.5 text-yellow-400">
                <Trophy size={14} />
                <span className="font-black text-foreground text-lg">{fmt(PLAYER.trophies)}</span>
              </div>
              <span className="text-xs text-muted-foreground">Record : {fmt(PLAYER.highestTrophies)}</span>
            </div>
            <div className="h-1.5 rounded-full bg-accent/60 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-yellow-500 to-amber-400"
                style={{ width: `${trophyPct}%` }}
              />
            </div>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
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
                <span className="text-[11px] text-muted-foreground uppercase tracking-wide">{label}</span>
              </div>
              <p className="text-2xl font-black text-foreground">{value}</p>
              {sub && <p className="text-[11px] text-muted-foreground mt-0.5">{sub}</p>}
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
          </div>
          <div className="flex items-end justify-between mb-2">
            <p className="text-3xl font-black text-foreground">Niv. {PLAYER.expLevel}</p>
            <p className="text-sm text-muted-foreground">{fmt(PLAYER.expPoints)} XP</p>
          </div>
          <div className="h-2 rounded-full bg-accent/50 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500"
              style={{ width: "62%" }}
            />
          </div>
        </div>

      </main>
    </div>
  );
}
