import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Navbar from "@/components/Navbar";
import Settings from "@/pages/settings";
import BlobBackground from "@/components/BlobBackground";
import { AuthProvider } from "@/contexts/auth";
import { BarChart2, Trophy, Swords, Users, Search, Settings2, Crown } from "lucide-react";

const queryClient = new QueryClient();

const features = [
  {
    icon: BarChart2,
    title: "Statistiques",
    subtitle: "Joueurs · Classement · Meta",
    description: "Description à venir.",
    gold: false,
  },
  {
    icon: Search,
    title: "Club Tracking",
    subtitle: "Découvrir · Configurer",
    description: "Description à venir.",
    gold: false,
  },
  {
    icon: Crown,
    title: "Abonnements",
    subtitle: "Plans & avantages",
    description: "Description à venir.",
    gold: true,
  },
  {
    icon: Users,
    title: "Profil",
    subtitle: "Paramètres & compte",
    description: "Description à venir.",
    gold: false,
  },
];

function Home() {
  return (
    <div className="min-h-screen w-full bg-background overflow-hidden">
      <BlobBackground />
      <Navbar />

      <main className="relative z-10">
        {/* Hero */}
        <section className="flex flex-col items-center justify-center pt-32 pb-16 px-4 text-center">
          <img
            src="https://cdn.meonix.me/cdn/logo/ba.png"
            alt="BrawlAlly"
            className="h-24 w-24 rounded-2xl object-cover shadow-lg mb-6"
          />
          <h1
            style={{ fontFamily: "'Orbitron', sans-serif" }}
            className="text-4xl sm:text-5xl font-bold text-foreground tracking-wide"
          >
            BrawlAlly
          </h1>
          <p className="mt-4 text-muted-foreground text-base max-w-md">
            Description à venir.
          </p>
        </section>

        {/* Features */}
        <section className="px-4 pb-24 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map(({ icon: Icon, title, subtitle, description, gold }) => (
              <div
                key={title}
                className={`group rounded-xl border border-border/50 bg-card/60 backdrop-blur-sm p-6 transition-all duration-200 cursor-pointer ${
                  gold ? "gold-card" : "hover:border-border hover:bg-card/80"
                }`}
              >
                <div className={`mb-4 w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                  gold ? "gold-icon" : "bg-accent text-muted-foreground group-hover:text-foreground"
                }`}>
                  <Icon size={20} />
                </div>
                <h3 className={`text-sm ${gold ? "gold-title" : "font-semibold text-foreground"}`}>{title}</h3>
                <p className="text-xs text-muted-foreground mt-0.5 mb-3">{subtitle}</p>
                <p className="text-xs text-muted-foreground/70 italic">{description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/settings" component={Settings} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
