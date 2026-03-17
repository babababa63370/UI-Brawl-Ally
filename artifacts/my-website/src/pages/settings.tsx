import { useAuth } from "@/contexts/auth";
import Navbar from "@/components/Navbar";

function DiscordIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}

export default function Settings() {
  const { auth, logout, loginUrl } = useAuth();

  if (auth.status === "loading") {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="w-6 h-6 rounded-full border-2 border-muted border-t-foreground animate-spin" />
        </div>
      </div>
    );
  }

  if (auth.status === "unauthenticated") {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center min-h-screen px-4">
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
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="px-4 pt-24 pb-16">
        <div className="mx-auto max-w-lg">
          <h1 className="text-2xl font-semibold text-foreground mb-8">Paramètres</h1>

          <div className="rounded-xl border border-border/60 bg-card/80 backdrop-blur-sm p-6 shadow-md">
            <h2 className="text-xs font-medium uppercase tracking-widest text-muted-foreground mb-4">
              Profil Discord
            </h2>
            <div className="flex items-center gap-4">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.displayName}
                  className="w-14 h-14 rounded-full border border-border/60"
                />
              ) : (
                <div className="w-14 h-14 rounded-full bg-[#5865F2]/20 flex items-center justify-center text-[#5865F2]">
                  <DiscordIcon />
                </div>
              )}
              <div>
                <p className="font-medium text-foreground">{user.displayName}</p>
                <p className="text-sm text-muted-foreground">@{user.username}</p>
                {user.email && (
                  <p className="text-xs text-muted-foreground mt-0.5">{user.email}</p>
                )}
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-border/60 bg-card/80 backdrop-blur-sm p-6 shadow-md">
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
