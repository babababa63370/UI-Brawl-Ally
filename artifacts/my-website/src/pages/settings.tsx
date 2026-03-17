import { useAuth } from "@/contexts/auth";
import Navbar from "@/components/Navbar";
import BlobBackground from "@/components/BlobBackground";
import { useState, useEffect, useCallback } from "react";

function DiscordIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}

type BrawlLink = { discord_id: string; brawl_tag: string; linked_at: string } | null;

type PlayerInfo = {
  tag: string;
  name: string;
  nameColor?: string;
  icon: { id: number; url: string };
  trophies: number;
  highestTrophies: number;
  expLevel: number;
  club?: { name?: string };
};

export default function Settings() {
  const { auth, logout, loginUrl } = useAuth();
  const [brawlLink, setBrawlLink] = useState<BrawlLink>(null);
  const [brawlLoading, setBrawlLoading] = useState(false);
  const [player, setPlayer] = useState<PlayerInfo | null>(null);
  const [playerError, setPlayerError] = useState<string | null>(null);
  const [playerLoading, setPlayerLoading] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [unlinking, setUnlinking] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  const fetchPlayer = useCallback(async (tag: string) => {
    setPlayerLoading(true);
    setPlayerError(null);
    setPlayer(null);
    try {
      const r = await fetch(`/api/brawl/player/${encodeURIComponent(tag)}`, { credentials: "include" });
      const data = await r.json();
      if (r.ok && data.player) {
        setPlayer(data.player);
      } else {
        setPlayerError(data.error ?? "Joueur introuvable");
      }
    } catch {
      setPlayerError("Impossible de contacter l'API Brawl Stars");
    } finally {
      setPlayerLoading(false);
    }
  }, []);

  useEffect(() => {
    if (auth.status !== "authenticated") return;
    setBrawlLoading(true);
    fetch("/api/brawl/me", { credentials: "include" })
      .then((r) => r.json())
      .then((data) => {
        const link = data.link ?? null;
        setBrawlLink(link);
        if (link) {
          setTagInput(link.brawl_tag);
          fetchPlayer(link.brawl_tag);
        }
      })
      .catch(() => setBrawlLink(null))
      .finally(() => setBrawlLoading(false));
  }, [auth.status, fetchPlayer]);

  const handleLink = async () => {
    const tag = tagInput.trim().replace(/^#/, "").toUpperCase();
    if (!tag) return;
    setSaving(true);
    setFeedback(null);
    try {
      const r = await fetch("/api/brawl/link", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ brawl_tag: tag }),
      });
      const data = await r.json();
      if (r.ok) {
        setBrawlLink(data.link);
        setTagInput(data.link.brawl_tag);
        setFeedback({ type: "success", message: "Tag Brawl Stars lié avec succès !" });
        setEditing(false);
        fetchPlayer(data.link.brawl_tag);
      } else {
        setFeedback({ type: "error", message: data.error ?? "Erreur lors de la liaison." });
      }
    } catch {
      setFeedback({ type: "error", message: "Erreur réseau." });
    } finally {
      setSaving(false);
    }
  };

  const handleUnlink = async () => {
    setUnlinking(true);
    setFeedback(null);
    try {
      const r = await fetch("/api/brawl/unlink", {
        method: "DELETE",
        credentials: "include",
      });
      if (r.ok) {
        setBrawlLink(null);
        setTagInput("");
        setPlayer(null);
        setPlayerError(null);
        setFeedback({ type: "success", message: "Tag dissocié avec succès." });
      } else {
        const data = await r.json();
        setFeedback({ type: "error", message: data.error ?? "Erreur lors de la dissociation." });
      }
    } catch {
      setFeedback({ type: "error", message: "Erreur réseau." });
    } finally {
      setUnlinking(false);
    }
  };

  if (auth.status === "loading") {
    return (
      <div className="min-h-screen bg-background overflow-hidden">
        <BlobBackground />
        <Navbar />
        <div className="flex items-center justify-center min-h-screen relative z-10">
          <div className="w-6 h-6 rounded-full border-2 border-muted border-t-foreground animate-spin" />
        </div>
      </div>
    );
  }

  if (auth.status === "unauthenticated") {
    return (
      <div className="min-h-screen bg-background overflow-hidden">
        <BlobBackground />
        <Navbar />
        <div className="flex items-center justify-center min-h-screen px-4 relative z-10">
          <div className="w-full max-w-sm rounded-xl border border-border/60 bg-card/80 backdrop-blur-sm p-8 text-center shadow-lg">
            <div className="mb-6">
              <div className="mx-auto mb-4 w-14 h-14 rounded-full bg-[#5865F2]/10 flex items-center justify-center text-[#5865F2]">
                <DiscordIcon />
              </div>
              <h1 className="text-xl font-semibold text-foreground">Connexion requise</h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Connecte-toi avec Discord pour accéder à tes paramètres.
              </p>
            </div>
            <a
              href={loginUrl}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#5865F2] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#4752C4] transition-colors"
            >
              <DiscordIcon />
              Se connecter avec Discord
            </a>
          </div>
        </div>
      </div>
    );
  }

  const user = auth.user;

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <BlobBackground />
      <Navbar />
      <div className="px-4 pt-24 pb-16 relative z-10">
        <div className="mx-auto max-w-lg">
          <h1 className="text-2xl font-semibold text-foreground mb-8">Paramètres</h1>

          {/* Discord Profile */}
          <div className="rounded-xl border border-border/60 bg-card/80 backdrop-blur-sm p-6 shadow-md">
            <h2 className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-4">
              Profil Discord
            </h2>
            <div className="flex items-center gap-4">
              {user.avatar ? (
                <img src={user.avatar} alt={user.displayName} className="w-14 h-14 rounded-full border border-border/60" />
              ) : (
                <div className="w-14 h-14 rounded-full bg-[#5865F2]/20 flex items-center justify-center text-[#5865F2]">
                  <DiscordIcon />
                </div>
              )}
              <div>
                <p className="font-medium text-foreground">{user.displayName}</p>
                <p className="text-sm text-muted-foreground">@{user.username}</p>
                {user.email && <p className="text-xs text-muted-foreground mt-0.5">{user.email}</p>}
              </div>
            </div>
          </div>

          {/* Brawl Stars Link */}
          <div className="mt-4 rounded-xl border border-border/60 bg-card/80 backdrop-blur-sm p-6 shadow-md">
            <h2 className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-4">
              Liaison Brawl Stars
            </h2>

            {brawlLoading ? (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-4 h-4 rounded-full border-2 border-muted border-t-foreground animate-spin" />
                Chargement…
              </div>
            ) : brawlLink ? (
              <div className="space-y-4">
                {/* Player card + Modifier button */}
                <div className="flex items-center justify-between gap-3 rounded-lg border border-border/40 bg-accent/30 px-4 py-3">
                  <div className="flex items-center gap-3 min-w-0">
                    {playerLoading ? (
                      <div className="w-4 h-4 rounded-full border-2 border-muted border-t-foreground animate-spin shrink-0" />
                    ) : player ? (
                      <img
                        src={player.icon.url}
                        alt="Icône joueur"
                        className="w-10 h-10 rounded-lg object-contain bg-background/40 p-0.5 shrink-0"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                      />
                    ) : null}
                    <div className="min-w-0">
                      {player && (
                        <p
                          className="font-semibold truncate"
                          style={player.nameColor ? { color: `#${player.nameColor.replace(/^0x/, "")}` } : undefined}
                        >
                          {player.name}
                        </p>
                      )}
                      {playerError && <p className="text-xs text-destructive">{playerError}</p>}
                      <p className="font-mono text-xs text-muted-foreground">#{brawlLink.brawl_tag}</p>
                    </div>
                  </div>
                  {!editing && (
                    <button
                      onClick={() => { setEditing(true); setFeedback(null); }}
                      className="shrink-0 inline-flex items-center gap-1.5 rounded-lg border border-border/60 px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                    >
                      Modifier
                    </button>
                  )}
                </div>

                {/* Edit form (shown only in editing mode) */}
                {editing && (
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-mono text-sm">#</span>
                        <input
                          type="text"
                          value={tagInput}
                          onChange={(e) => setTagInput(e.target.value.replace(/^#/, ""))}
                          placeholder="NOUVEAU_TAG"
                          className="w-full pl-7 pr-3 py-2 rounded-lg border border-border/60 bg-background text-sm font-mono focus:outline-none focus:ring-2 focus:ring-ring text-foreground placeholder:text-muted-foreground/50"
                        />
                      </div>
                      <button
                        onClick={handleLink}
                        disabled={saving || !tagInput.trim()}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {saving && <div className="w-3.5 h-3.5 rounded-full border-2 border-primary-foreground/40 border-t-primary-foreground animate-spin" />}
                        Mettre à jour
                      </button>
                    </div>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={handleUnlink}
                        disabled={unlinking}
                        className="inline-flex items-center gap-1.5 text-sm text-destructive hover:text-destructive/80 transition-colors disabled:opacity-50"
                      >
                        {unlinking && <div className="w-3.5 h-3.5 rounded-full border-2 border-destructive/30 border-t-destructive animate-spin" />}
                        Dissocier
                      </button>
                      <button
                        onClick={() => { setEditing(false); setFeedback(null); setTagInput(brawlLink.brawl_tag); }}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        Annuler
                      </button>
                    </div>
                  </div>
                )}

                {feedback && (
                  <p className={`text-sm ${feedback.type === "success" ? "text-green-500" : "text-destructive"}`}>
                    {feedback.message}
                  </p>
                )}
              </div>
            ) : (
              /* Not linked — show input directly */
              <div className="space-y-4">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-mono text-sm">#</span>
                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value.replace(/^#/, ""))}
                      placeholder="TON_TAG"
                      className="w-full pl-7 pr-3 py-2 rounded-lg border border-border/60 bg-background text-sm font-mono focus:outline-none focus:ring-2 focus:ring-ring text-foreground placeholder:text-muted-foreground/50"
                    />
                  </div>
                  <button
                    onClick={handleLink}
                    disabled={saving || !tagInput.trim()}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {saving && <div className="w-3.5 h-3.5 rounded-full border-2 border-primary-foreground/40 border-t-primary-foreground animate-spin" />}
                    Lier
                  </button>
                </div>
                {feedback && (
                  <p className={`text-sm ${feedback.type === "success" ? "text-green-500" : "text-destructive"}`}>
                    {feedback.message}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Account */}
          <div className="mt-4 rounded-xl border border-border/60 bg-card/80 backdrop-blur-sm p-6 shadow-md">
            <h2 className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-4">
              Compte
            </h2>
            <button
              onClick={logout}
              className="inline-flex items-center gap-2 rounded-lg border border-border/60 px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
            >
              Se déconnecter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
