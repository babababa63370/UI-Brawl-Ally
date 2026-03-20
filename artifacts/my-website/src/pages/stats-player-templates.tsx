import Navbar from "@/components/Navbar";
import BlobBackground from "@/components/BlobBackground";
import { Trophy, Users, Swords, Clock, ChevronUp, ChevronDown, Minus, Star } from "lucide-react";

interface BrawlerAssets { image: string | null; }
interface Brawler { id: number; name: string; power: number; trophies: number; assets: BrawlerAssets; }
interface BattlePlayer { tag: string; name: string; brawler: Brawler; }
interface PlayerPerspective {
  me: BattlePlayer | null;
  result: "victory" | "defeat" | "draw" | null;
  rank: number | null;
  trophyChange: number | null;
  isStarPlayer: boolean;
  teamIndex: number | null;
}
interface BattleEvent { id: number | null; mode: string | null; map: string | null; mapImage: string | null; }
interface BattleEntry {
  battleTime: string;
  event: BattleEvent;
  playerPerspective: PlayerPerspective;
  battle: { mode: string | null; type: string | null; duration: number | null; };
}

/* ── Player — #QUYCVC2 ── */
const PLAYER = {
  name: "RLM|sans",
  nameColor: "ffffff",
  tag: "QUYCVC2",
  icon: "http://cdn.meonix.me/cdn/profile-icons/regular/28000044.png",
  trophies: 114411,
  highestTrophies: 114411,
  expLevel: 500,
  club: { name: "sansbs" },
};

/* ── Battle log — 25 entrées réelles ── */
const mkB = (p: Omit<BattleEntry, never>): BattleEntry => p;
const me = (bId: number, bName: string, bImg: string): BattlePlayer => ({
  tag: "#QUYCVC2", name: "RLM|sans",
  brawler: { id: bId, name: bName, power: -1, trophies: -1, assets: { image: bImg } },
});
const ev = (id: number, mode: string, map: string, mapImg: string): BattleEvent =>
  ({ id, mode, map, mapImage: mapImg });
const pp = (me_: BattlePlayer, result: "victory"|"defeat"|"draw", isStarPlayer: boolean, teamIndex: number|null, rank: number|null = null, trophyChange: number|null = null): PlayerPerspective =>
  ({ me: me_, result, rank, trophyChange, isStarPlayer, teamIndex });

const KENJI  = (ti: number|null, r: "victory"|"defeat"|"draw", star=false) => pp(me(16000085,"KENJI","http://cdn.meonix.me/cdn/brawlers/border/16000085.png"), r, star, ti);
const KAZE   = (ti: number|null, r: "victory"|"defeat"|"draw", star=false) => pp(me(16000094,"KAZE","http://cdn.meonix.me/cdn/brawlers/border/16000094.png"), r, star, ti);
const PEARL  = (ti: number|null, r: "victory"|"defeat"|"draw", star=false) => pp(me(16000072,"PEARL","http://cdn.meonix.me/cdn/brawlers/border/16000072.png"), r, star, ti);
const MEEPLE = (ti: number|null, r: "victory"|"defeat"|"draw", star=false) => pp(me(16000089,"MEEPLE","http://cdn.meonix.me/cdn/brawlers/border/16000089.png"), r, star, ti);
const BROCK  = (ti: number|null, r: "victory"|"defeat"|"draw", star=false) => pp(me(16000003,"BROCK","http://cdn.meonix.me/cdn/brawlers/border/16000003.png"), r, star, ti);
const LILY   = (ti: number|null, r: "victory"|"defeat"|"draw", star=false) => pp(me(16000081,"LILY","http://cdn.meonix.me/cdn/brawlers/border/16000081.png"), r, star, ti);

const EV_BOUNTY_LC  = ev(15000082, "bounty",    "Layer Cake",      "http://cdn.meonix.me/cdn/maps/regular/15000082.png");
const EV_HOTZONE_OB = ev(15000292, "hotZone",   "Open Business",   "http://cdn.meonix.me/cdn/maps/regular/15000292.png");
const EV_KO_OO      = ev(15000548, "knockout",  "Out in the Open", "http://cdn.meonix.me/cdn/maps/regular/15000548.png");
const EV_KO_GG      = ev(15000367, "knockout",  "Goldarm Gulch",   "http://cdn.meonix.me/cdn/maps/regular/15000367.png");
const EV_BB_PP      = ev(15000026, "brawlBall", "Pinhole Punt",    "http://cdn.meonix.me/cdn/maps/regular/15000026.png");
const EV_GG_DS      = ev(15000115, "gemGrab",   "Double Swoosh",   "http://cdn.meonix.me/cdn/maps/regular/15000115.png");

const BATTLE_LOG: BattleEntry[] = [
  mkB({ battleTime:"20260320T015731.000Z", event:EV_BOUNTY_LC,  playerPerspective:KENJI(1,"defeat"),         battle:{mode:"bounty",   type:"friendly",duration:98}  }),
  mkB({ battleTime:"20260320T015533.000Z", event:EV_BOUNTY_LC,  playerPerspective:KENJI(1,"defeat"),         battle:{mode:"bounty",   type:"friendly",duration:120} }),
  mkB({ battleTime:"20260320T015002.000Z", event:EV_BOUNTY_LC,  playerPerspective:KAZE(0,"defeat"),          battle:{mode:"bounty",   type:"friendly",duration:116} }),
  mkB({ battleTime:"20260320T014715.000Z", event:EV_BOUNTY_LC,  playerPerspective:PEARL(0,"victory",true),   battle:{mode:"bounty",   type:"friendly",duration:36}  }),
  mkB({ battleTime:"20260320T014548.000Z", event:EV_BOUNTY_LC,  playerPerspective:KAZE(1,"victory",true),    battle:{mode:"bounty",   type:"friendly",duration:120} }),
  mkB({ battleTime:"20260320T014329.000Z", event:EV_BOUNTY_LC,  playerPerspective:KAZE(1,"victory"),         battle:{mode:"bounty",   type:"friendly",duration:118} }),
  mkB({ battleTime:"20260320T013747.000Z", event:EV_HOTZONE_OB, playerPerspective:KENJI(1,"defeat"),         battle:{mode:"hotZone",  type:"friendly",duration:84}  }),
  mkB({ battleTime:"20260320T013602.000Z", event:EV_HOTZONE_OB, playerPerspective:KENJI(1,"victory"),        battle:{mode:"hotZone",  type:"friendly",duration:117} }),
  mkB({ battleTime:"20260320T013345.000Z", event:EV_HOTZONE_OB, playerPerspective:KENJI(1,"defeat"),         battle:{mode:"hotZone",  type:"friendly",duration:99}  }),
  mkB({ battleTime:"20260320T012826.000Z", event:EV_HOTZONE_OB, playerPerspective:KENJI(1,"victory"),        battle:{mode:"hotZone",  type:"friendly",duration:115} }),
  mkB({ battleTime:"20260320T012610.000Z", event:EV_HOTZONE_OB, playerPerspective:KENJI(1,"victory"),        battle:{mode:"hotZone",  type:"friendly",duration:118} }),
  mkB({ battleTime:"20260320T011919.000Z", event:EV_KO_OO,      playerPerspective:PEARL(0,"defeat"),         battle:{mode:"knockout", type:"friendly",duration:159} }),
  mkB({ battleTime:"20260320T011608.000Z", event:EV_KO_GG,      playerPerspective:PEARL(0,"victory"),        battle:{mode:"knockout", type:"friendly",duration:110} }),
  mkB({ battleTime:"20260320T011259.000Z", event:EV_KO_OO,      playerPerspective:BROCK(1,"defeat"),         battle:{mode:"knockout", type:"friendly",duration:79}  }),
  mkB({ battleTime:"20260320T011120.000Z", event:EV_KO_OO,      playerPerspective:BROCK(1,"defeat"),         battle:{mode:"knockout", type:"friendly",duration:109} }),
  mkB({ battleTime:"20260320T010558.000Z", event:EV_KO_OO,      playerPerspective:MEEPLE(0,"victory",true),  battle:{mode:"knockout", type:"friendly",duration:63}  }),
  mkB({ battleTime:"20260320T010427.000Z", event:EV_KO_OO,      playerPerspective:MEEPLE(0,"victory",true),  battle:{mode:"knockout", type:"friendly",duration:93}  }),
  mkB({ battleTime:"20260320T010146.000Z", event:EV_KO_OO,      playerPerspective:MEEPLE(1,"victory"),       battle:{mode:"knockout", type:"friendly",duration:31}  }),
  mkB({ battleTime:"20260320T010056.000Z", event:EV_KO_OO,      playerPerspective:MEEPLE(1,"victory"),       battle:{mode:"knockout", type:"friendly",duration:41}  }),
  mkB({ battleTime:"20260320T005617.000Z", event:EV_BB_PP,      playerPerspective:KENJI(1,"defeat"),         battle:{mode:"brawlBall",type:"friendly",duration:72}  }),
  mkB({ battleTime:"20260320T005446.000Z", event:EV_BB_PP,      playerPerspective:KENJI(1,"defeat"),         battle:{mode:"brawlBall",type:"friendly",duration:135} }),
  mkB({ battleTime:"20260320T004845.000Z", event:EV_BB_PP,      playerPerspective:KENJI(1,"victory"),        battle:{mode:"brawlBall",type:"friendly",duration:150} }),
  mkB({ battleTime:"20260320T004556.000Z", event:EV_BB_PP,      playerPerspective:KENJI(1,"victory"),        battle:{mode:"brawlBall",type:"friendly",duration:127} }),
  mkB({ battleTime:"20260320T003411.000Z", event:EV_GG_DS,      playerPerspective:LILY(1,"defeat"),          battle:{mode:"gemGrab",  type:"friendly",duration:135} }),
  mkB({ battleTime:"20260320T003135.000Z", event:EV_GG_DS,      playerPerspective:LILY(1,"defeat"),          battle:{mode:"gemGrab",  type:"friendly",duration:114} }),
];

/* ── Helpers ── */
function fmt(n: number) { return n.toLocaleString("fr-FR"); }

const MODE_LABELS: Record<string, string> = {
  gemGrab:"Gem Grab", brawlBall:"Brawl Ball", soloShowdown:"Showdown Solo",
  duoShowdown:"Showdown Duo", heist:"Heist", bounty:"Bounty", hotZone:"Hot Zone",
  siege:"Siege", knockout:"Knockout", basketBrawl:"Basket Brawl",
};
function formatMode(mode: string | null) { return mode ? (MODE_LABELS[mode] ?? mode) : "—"; }

function timeAgo(battleTime: string) {
  try {
    const d = new Date(battleTime.replace(/^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})/, "$1-$2-$3T$4:$5:$6"));
    const s = (Date.now() - d.getTime()) / 1000;
    if (s < 60) return "à l'instant";
    if (s < 3600) return `il y a ${Math.floor(s/60)} min`;
    if (s < 86400) return `il y a ${Math.floor(s/3600)}h`;
    return `il y a ${Math.floor(s/86400)}j`;
  } catch { return ""; }
}

const RC = {
  victory: { label:"Victoire", color:"text-green-400", bar:"bg-green-400", icon:<ChevronUp size={11} className="text-green-400"/> },
  defeat:  { label:"Défaite",  color:"text-red-400",   bar:"bg-red-400",   icon:<ChevronDown size={11} className="text-red-400"/>  },
  draw:    { label:"Égalité",  color:"text-muted-foreground", bar:"bg-muted-foreground/40", icon:<Minus size={11} className="text-muted-foreground"/> },
};

export default function StatsPlayer() {
  const trophyPct = Math.min(100, Math.round((PLAYER.trophies / PLAYER.highestTrophies) * 100));

  return (
    <div className="min-h-screen w-full bg-background overflow-hidden">
      <BlobBackground />
      <Navbar />

      <main className="relative z-10 max-w-5xl mx-auto px-4 pt-24 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 items-start">

          {/* ── LEFT: Player card ── */}
          <div className="lg:col-span-2 rounded-2xl border border-border/50 bg-card/70 backdrop-blur-sm overflow-hidden">
            <div className="h-1 w-full bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500" />
            <div className="p-5">

              {/* Icon + Name + Tag */}
              <div className="flex items-center gap-4 mb-4">
                <div className="relative shrink-0">
                  <img src={PLAYER.icon} alt="avatar"
                    className="w-16 h-16 rounded-xl border-2 border-border/60 object-contain bg-background/40 p-1"
                    onError={e => { (e.target as HTMLImageElement).style.opacity="0.3"; }} />
                  <span className="absolute -bottom-1.5 -right-1.5 bg-yellow-500 text-black text-[10px] font-black px-1.5 py-0.5 rounded-md leading-none">
                    {PLAYER.expLevel}
                  </span>
                </div>
                <div className="min-w-0">
                  <h1 className="text-xl font-bold leading-tight truncate" style={{ color:`#${PLAYER.nameColor}` }}>
                    {PLAYER.name}
                  </h1>
                  <p className="text-xs font-mono text-muted-foreground mt-0.5">#{PLAYER.tag}</p>
                </div>
              </div>

              {/* Club */}
              {PLAYER.club && (
                <div className="flex items-center gap-2 mb-5 py-2.5 px-3 rounded-lg bg-accent/30 border border-border/30">
                  <Users size={13} className="text-muted-foreground shrink-0" />
                  <span className="text-sm text-foreground font-medium truncate">{PLAYER.club.name}</span>
                </div>
              )}

              {/* Trophies */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Trophy size={14} className="text-yellow-400" />
                    <span className="text-xs text-muted-foreground uppercase tracking-wide">Trophées</span>
                  </div>
                  <span className="text-xs text-muted-foreground">Record : {fmt(PLAYER.highestTrophies)}</span>
                </div>
                <p className="text-2xl font-black text-foreground">{fmt(PLAYER.trophies)}</p>
                <div className="h-1.5 rounded-full bg-accent/60 overflow-hidden">
                  <div className="h-full rounded-full bg-gradient-to-r from-yellow-500 to-amber-400"
                    style={{ width:`${trophyPct}%` }} />
                </div>
                <p className="text-[10px] text-muted-foreground">{trophyPct}% du record personnel</p>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Battle Log ── */}
          <div className="lg:col-span-3 rounded-2xl border border-border/50 bg-card/70 backdrop-blur-sm overflow-hidden">
            <div className="px-5 pt-5 pb-3 flex items-center gap-2 border-b border-border/30">
              <Swords size={14} className="text-muted-foreground" />
              <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Battle Log
              </span>
              <span className="ml-auto text-[10px] text-muted-foreground/60 flex items-center gap-1">
                <Clock size={10} /> {BATTLE_LOG.length} parties
              </span>
            </div>

            <div className="divide-y divide-border/20 overflow-y-auto max-h-[420px]">
              {BATTLE_LOG.map((entry, i) => {
                const pp = entry.playerPerspective;
                const result = pp.result ?? "draw";
                const cfg = RC[result] ?? RC.draw;
                const brawler = pp.me?.brawler;

                return (
                  <div key={i} className="flex items-center gap-2.5 px-3 py-2.5 hover:bg-accent/20 transition-colors">
                    {/* Result bar */}
                    <div className={`w-0.5 h-10 rounded-full shrink-0 ${cfg.bar}`} />

                    {/* Map image */}
                    {entry.event.mapImage && (
                      <img src={entry.event.mapImage} alt={entry.event.map ?? ""}
                        className="w-12 h-10 rounded-md object-cover shrink-0 border border-border/30"
                        onError={e => { (e.target as HTMLImageElement).style.display="none"; }} />
                    )}

                    {/* Brawler icon */}
                    <img src={brawler?.assets.image ?? ""} alt={brawler?.name ?? ""}
                      className="w-9 h-9 rounded-lg object-contain bg-background/40 border border-border/30 p-0.5 shrink-0"
                      onError={e => { (e.target as HTMLImageElement).style.opacity="0.3"; }} />

                    {/* Mode + Map */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1">
                        <p className="text-sm font-semibold text-foreground leading-tight truncate">
                          {formatMode(entry.event.mode)}
                        </p>
                        {pp.isStarPlayer && (
                          <Star size={11} className="text-yellow-400 shrink-0 fill-yellow-400" />
                        )}
                      </div>
                      <p className="text-[10px] text-muted-foreground truncate">
                        {entry.event.map ?? "—"}
                        {brawler && <span className="ml-1 opacity-60">· {brawler.name.charAt(0) + brawler.name.slice(1).toLowerCase()}</span>}
                      </p>
                    </div>

                    {/* Result + time */}
                    <div className="flex flex-col items-end shrink-0 gap-0.5">
                      <span className={`text-xs font-bold ${cfg.color}`}>{cfg.label}</span>
                      {pp.trophyChange != null && (
                        <div className={`flex items-center gap-0.5 text-[11px] font-semibold ${cfg.color}`}>
                          {cfg.icon}
                          {pp.trophyChange > 0 ? `+${pp.trophyChange}` : pp.trophyChange === 0 ? "±0" : pp.trophyChange}
                        </div>
                      )}
                      <span className="text-[9px] text-muted-foreground/50">{timeAgo(entry.battleTime)}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
