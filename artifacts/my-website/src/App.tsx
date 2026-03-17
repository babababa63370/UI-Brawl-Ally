import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Navbar from "@/components/Navbar";
import Settings from "@/pages/settings";
import { AuthProvider } from "@/contexts/auth";

const queryClient = new QueryClient();

function Home() {
  return (
    <div className="min-h-screen w-full bg-background overflow-hidden">
      <div className="fixed inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="blob blob-yellow"
          style={{
            position: "absolute",
            width: 600,
            height: 600,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(234,179,8,0.28) 0%, transparent 70%)",
            filter: "blur(80px)",
            animation: "blobMove1 12s ease-in-out infinite alternate",
            top: "-10%",
            left: "-5%",
          }}
        />
        <div
          className="blob blob-green"
          style={{
            position: "absolute",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(34,197,94,0.22) 0%, transparent 70%)",
            filter: "blur(90px)",
            animation: "blobMove2 15s ease-in-out infinite alternate",
            bottom: "-10%",
            right: "-5%",
          }}
        />
        <div
          className="blob blob-yellow2"
          style={{
            position: "absolute",
            width: 350,
            height: 350,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(234,179,8,0.16) 0%, transparent 70%)",
            filter: "blur(70px)",
            animation: "blobMove3 18s ease-in-out infinite alternate",
            top: "40%",
            right: "15%",
          }}
        />
      </div>

      <style>{`
        @keyframes blobMove1 {
          0%   { transform: translate(0px, 0px) scale(1); }
          33%  { transform: translate(60px, 40px) scale(1.08); }
          66%  { transform: translate(30px, 80px) scale(0.95); }
          100% { transform: translate(80px, 20px) scale(1.05); }
        }
        @keyframes blobMove2 {
          0%   { transform: translate(0px, 0px) scale(1); }
          33%  { transform: translate(-50px, -60px) scale(1.1); }
          66%  { transform: translate(-80px, -20px) scale(0.92); }
          100% { transform: translate(-30px, -70px) scale(1.06); }
        }
        @keyframes blobMove3 {
          0%   { transform: translate(0px, 0px) scale(1); }
          50%  { transform: translate(-40px, 50px) scale(1.12); }
          100% { transform: translate(50px, -30px) scale(0.9); }
        }
      `}</style>

      <Navbar />
      <main className="pt-16 flex items-center justify-center min-h-screen relative z-10">
        <p className="text-muted-foreground text-sm">Contenu à venir…</p>
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
