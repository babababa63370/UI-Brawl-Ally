import { useState } from "react";
import Navbar from "@/components/Navbar";
import BlobBackground from "@/components/BlobBackground";
import { Trophy, Star, Shield, Zap, Crown, Check } from "lucide-react";

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

function TemplateClassic() {
  return (
    <div className="w-full rounded-2xl overflow-hidden border border-border/60 bg-card/90 backdrop-blur-sm shadow-lg">
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

function TemplateNeon() {
  return (
    <div
      className="w-full rounded-2xl overflow-hidden shadow-2xl relative"
      style={{
        background: "linear-gradient(135deg, #0a0a1a 0%, #0d1433 50%, #0a0a1a 100%)",
        border: "1px solid rgba(99,102,241,0.4)",
        boxShadow: "0 0 30px rgba(99,102,241,0.15), inset 0 0 40px rgba(99,102,241,0.05)",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at top right, rgba(99,102,241,0.18) 0%, transparent 60%), radial-gradient(ellipse at bottom left, rgba(168,85,247,0.12) 0%, transparent 60%)",
        }}
      />
      <div className="relative z-10 p-5">
        <div className="flex items-center justify-between mb-4">
          <div
            className="text-[10px] font-mono px-2 py-0.5 rounded-full"
            style={{
              background: "rgba(99,102,241,0.15)",
              border: "1px solid rgba(99,102,241,0.3)",
              color: "#818cf8",
            }}
          >
            PLAYER PROFILE
          </div>
          <div className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_8px_#4ade80]" />
        </div>

        <div className="flex items-center gap-3 mb-5">
          <div
            className="relative rounded-xl p-0.5"
            style={{ background: "linear-gradient(135deg, #6366f1, #a855f7)" }}
          >
            <PlayerIcon className="w-12 h-12 rounded-[10px] object-contain bg-[#0a0a1a] p-0.5" />
          </div>
          <div>
            <p
              className="font-bold text-base"
              style={{
                color: `#${DUMMY.nameColor}`,
                textShadow: "0 0 12px rgba(255,215,0,0.5)",
              }}
            >
              {DUMMY.name}
            </p>
            <p className="text-xs font-mono" style={{ color: "#6366f1" }}>
              #{DUMMY.tag}
            </p>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          {[
            { label: "TROPHÉES", value: fmt(DUMMY.trophies), color: "#facc15", pct: (DUMMY.trophies / DUMMY.highestTrophies) * 100 },
            { label: "VICTOIRES 3v3", value: fmt(DUMMY.victories3v3), color: "#34d399", pct: 72 },
            { label: "BRAWLERS", value: String(DUMMY.brawlers), color: "#818cf8", pct: (DUMMY.brawlers / 80) * 100 },
          ].map(({ label, value, color, pct }) => (
            <div key={label}>
              <div className="flex justify-between text-[10px] mb-1" style={{ color: "rgba(255,255,255,0.5)" }}>
                <span>{label}</span>
                <span style={{ color }}>{value}</span>
              </div>
              <div className="h-1 rounded-full" style={{ background: "rgba(255,255,255,0.08)" }}>
                <div
                  className="h-1 rounded-full"
                  style={{
                    width: `${pct}%`,
                    background: `linear-gradient(90deg, ${color}88, ${color})`,
                    boxShadow: `0 0 6px ${color}66`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <div
          className="flex justify-between text-[10px]"
          style={{ color: "rgba(255,255,255,0.3)" }}
        >
          <span>BrawlAlly</span>
          <span>Lvl {DUMMY.expLevel} · {DUMMY.club}</span>
        </div>
      </div>
    </div>
  );
}

function TemplateChampion() {
  return (
    <div
      className="w-full rounded-2xl overflow-hidden shadow-xl relative"
      style={{
        background: "linear-gradient(160deg, #1a1200 0%, #2a1e00 40%, #1a1200 100%)",
        border: "1px solid rgba(234,179,8,0.35)",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at top, rgba(234,179,8,0.15) 0%, transparent 65%)",
        }}
      />
      <div
        className="relative z-10 px-5 pt-5 pb-4"
      >
        <div className="flex items-center justify-center mb-4">
          <div className="flex items-center gap-2">
            <div className="h-px flex-1 w-12" style={{ background: "linear-gradient(90deg, transparent, rgba(234,179,8,0.4))" }} />
            <Crown size={14} className="text-yellow-400" />
            <span className="text-[10px] font-bold tracking-[0.2em] text-yellow-400/80">CHAMPION</span>
            <Crown size={14} className="text-yellow-400" />
            <div className="h-px flex-1 w-12" style={{ background: "linear-gradient(90deg, rgba(234,179,8,0.4), transparent)" }} />
          </div>
        </div>

        <div className="flex flex-col items-center mb-5">
          <div
            className="rounded-2xl p-0.5 mb-2"
            style={{ background: "linear-gradient(135deg, #eab308, #f59e0b, #d97706)" }}
          >
            <PlayerIcon className="w-16 h-16 rounded-xl object-contain bg-[#1a1200] p-1" />
          </div>
          <p
            className="font-bold text-xl tracking-wide"
            style={{
              color: "#FFD700",
              textShadow: "0 0 20px rgba(234,179,8,0.6), 0 2px 4px rgba(0,0,0,0.8)",
            }}
          >
            {DUMMY.name}
          </p>
          <p className="text-xs font-mono text-yellow-600 mt-0.5">#{DUMMY.tag}</p>
          <p className="text-xs text-yellow-700 mt-1">{DUMMY.club}</p>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-4">
          {[
            { value: fmt(DUMMY.trophies), label: "Trophées" },
            { value: String(DUMMY.expLevel), label: "Niveau" },
            { value: String(DUMMY.brawlers), label: "Brawlers" },
          ].map(({ value, label }) => (
            <div
              key={label}
              className="flex flex-col items-center rounded-xl py-2.5 px-1"
              style={{
                background: "rgba(234,179,8,0.08)",
                border: "1px solid rgba(234,179,8,0.15)",
              }}
            >
              <p className="text-base font-bold text-yellow-300">{value}</p>
              <p className="text-[9px] text-yellow-700 mt-0.5 text-center">{label}</p>
            </div>
          ))}
        </div>

        <div className="flex justify-between text-[10px] text-yellow-900">
          <span>BrawlAlly</span>
          <span>Best: {fmt(DUMMY.highestTrophies)}</span>
        </div>
      </div>
    </div>
  );
}

function TemplateMinimal() {
  return (
    <div className="w-full rounded-2xl overflow-hidden border border-border/40 bg-background shadow-md">
      <div className="p-5">
        <div className="flex items-start justify-between mb-6">
          <div>
            <p
              className="font-bold text-2xl leading-none"
              style={{ color: `#${DUMMY.nameColor}` }}
            >
              {DUMMY.name}
            </p>
            <p className="text-xs text-muted-foreground font-mono mt-1">#{DUMMY.tag}</p>
          </div>
          <PlayerIcon className="w-10 h-10 rounded-lg object-contain opacity-80" />
        </div>

        <div className="space-y-3">
          {[
            { label: "Trophées actuels", value: DUMMY.trophies.toLocaleString("fr-FR") },
            { label: "Record personnel", value: DUMMY.highestTrophies.toLocaleString("fr-FR") },
            { label: "Niveau", value: String(DUMMY.expLevel) },
            { label: "Club", value: DUMMY.club },
            { label: "Victoires 3v3", value: DUMMY.victories3v3.toLocaleString("fr-FR") },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{label}</span>
              <span className="text-sm font-medium text-foreground">{value}</span>
            </div>
          ))}
        </div>

        <div className="mt-5 pt-3 border-t border-border/40 flex justify-between items-center">
          <span className="text-[10px] text-muted-foreground/50">BrawlAlly</span>
          <span className="text-[10px] text-muted-foreground/50">{DUMMY.brawlers} brawlers</span>
        </div>
      </div>
    </div>
  );
}

function TemplateBattlefield() {
  return (
    <div
      className="w-full rounded-2xl overflow-hidden shadow-xl relative"
      style={{
        background: "linear-gradient(135deg, #0f1a0f 0%, #0a1f0a 50%, #0d1a0d 100%)",
        border: "1px solid rgba(34,197,94,0.3)",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at bottom left, rgba(34,197,94,0.12) 0%, transparent 60%)",
        }}
      />
      <div className="relative z-10 p-5">
        <div className="flex items-center gap-3 mb-4">
          <PlayerIcon
            className="w-12 h-12 rounded-xl object-contain p-0.5"
            style={{ border: "1.5px solid rgba(34,197,94,0.4)", background: "rgba(34,197,94,0.05)" } as React.CSSProperties}
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <p
                className="font-bold text-base leading-none"
                style={{ color: `#${DUMMY.nameColor}` }}
              >
                {DUMMY.name}
              </p>
              <span
                className="text-[9px] px-1.5 py-0.5 rounded font-bold"
                style={{ background: "rgba(34,197,94,0.15)", color: "#4ade80" }}
              >
                PRO
              </span>
            </div>
            <p className="text-xs font-mono mt-0.5" style={{ color: "rgba(34,197,94,0.6)" }}>
              #{DUMMY.tag}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>Lvl</p>
            <p className="text-2xl font-black" style={{ color: "#4ade80" }}>{DUMMY.expLevel}</p>
          </div>
        </div>

        <div
          className="rounded-xl p-3 mb-3"
          style={{ background: "rgba(34,197,94,0.06)", border: "1px solid rgba(34,197,94,0.12)" }}
        >
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px]" style={{ color: "rgba(255,255,255,0.4)" }}>TROPHÉES</span>
            <span className="text-[10px]" style={{ color: "rgba(34,197,94,0.6)" }}>
              Best {fmt(DUMMY.highestTrophies)}
            </span>
          </div>
          <p className="text-3xl font-black" style={{ color: "#4ade80" }}>
            {DUMMY.trophies.toLocaleString("fr-FR")}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "3v3", value: fmt(DUMMY.victories3v3), icon: "⚔️" },
            { label: "Solo", value: fmt(DUMMY.soloVictories), icon: "🏆" },
            { label: "Duo", value: fmt(DUMMY.duoVictories), icon: "🤝" },
          ].map(({ label, value, icon }) => (
            <div
              key={label}
              className="rounded-lg py-2 text-center"
              style={{ background: "rgba(34,197,94,0.06)", border: "1px solid rgba(34,197,94,0.1)" }}
            >
              <div className="text-sm mb-0.5">{icon}</div>
              <p className="text-sm font-bold" style={{ color: "#4ade80" }}>{value}</p>
              <p className="text-[9px]" style={{ color: "rgba(255,255,255,0.3)" }}>{label}</p>
            </div>
          ))}
        </div>

        <div
          className="mt-3 flex justify-between text-[10px]"
          style={{ color: "rgba(255,255,255,0.2)" }}
        >
          <span>BrawlAlly</span>
          <span>{DUMMY.club} · {DUMMY.brawlers} brawlers</span>
        </div>
      </div>
    </div>
  );
}

const TEMPLATES = [
  {
    id: "classic",
    name: "Classic",
    description: "Carte propre et lisible, idéale pour tous les profils.",
    component: <TemplateClassic />,
    badge: null,
  },
  {
    id: "neon",
    name: "Neon Pro",
    description: "Style sombre avec effets lumineux et barres de progression.",
    component: <TemplateNeon />,
    badge: "Populaire",
  },
  {
    id: "champion",
    name: "Champion",
    description: "Design doré premium pour les meilleurs joueurs.",
    component: <TemplateChampion />,
    badge: "Premium",
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Ultra-sobre, toutes les stats en un coup d'œil.",
    component: <TemplateMinimal />,
    badge: null,
  },
  {
    id: "battlefield",
    name: "Battlefield",
    description: "Thème combat vert, centré sur les victoires.",
    component: <TemplateBattlefield />,
    badge: "Nouveau",
  },
];

export default function StatsPlayerTemplates() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="min-h-screen w-full bg-background overflow-hidden">
      <BlobBackground />
      <Navbar />

      <main className="relative z-10 px-4 pt-28 pb-20 max-w-6xl mx-auto">
        <div className="mb-10">
          <p className="text-xs font-mono text-muted-foreground/60 mb-2 tracking-widest uppercase">
            Statistiques / Joueurs
          </p>
          <h1
            className="text-3xl sm:text-4xl font-bold text-foreground mb-3"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            Templates
          </h1>
          <p className="text-muted-foreground text-sm max-w-lg">
            Choisis un design pour ta carte de stats Brawl Stars. Chaque template utilise tes données de joueur et peut être partagé.
          </p>
        </div>

        {selected && (
          <div className="mb-6 flex items-center gap-2 rounded-lg border border-green-500/30 bg-green-500/5 px-4 py-2.5 w-fit">
            <Check size={14} className="text-green-500" />
            <span className="text-sm text-green-400">
              Template <strong>{TEMPLATES.find((t) => t.id === selected)?.name}</strong> sélectionné
            </span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TEMPLATES.map((tpl) => {
            const isSelected = selected === tpl.id;
            return (
              <div
                key={tpl.id}
                className="group flex flex-col gap-3 cursor-pointer"
                onClick={() => setSelected(tpl.id)}
              >
                <div
                  className={`relative rounded-2xl transition-all duration-200 ${
                    isSelected
                      ? "ring-2 ring-yellow-400/70 ring-offset-2 ring-offset-background"
                      : "hover:scale-[1.01]"
                  }`}
                >
                  {tpl.badge && (
                    <div
                      className={`absolute -top-2 -right-2 z-20 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        tpl.badge === "Premium"
                          ? "bg-yellow-400 text-black"
                          : tpl.badge === "Populaire"
                          ? "bg-blue-500 text-white"
                          : "bg-green-500 text-white"
                      }`}
                    >
                      {tpl.badge}
                    </div>
                  )}
                  {isSelected && (
                    <div className="absolute -top-2 -left-2 z-20 w-5 h-5 rounded-full bg-yellow-400 flex items-center justify-center">
                      <Check size={11} className="text-black" strokeWidth={3} />
                    </div>
                  )}
                  {tpl.component}
                </div>

                <div className="px-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-foreground">{tpl.name}</p>
                    <button
                      className={`text-xs px-3 py-1 rounded-lg border transition-colors ${
                        isSelected
                          ? "border-yellow-400/50 bg-yellow-400/10 text-yellow-400"
                          : "border-border/50 text-muted-foreground hover:text-foreground hover:border-border"
                      }`}
                    >
                      {isSelected ? "Sélectionné" : "Choisir"}
                    </button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{tpl.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
