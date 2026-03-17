import { useState, useRef, useEffect, useCallback } from "react";
import { Menu, X, ChevronDown, LogOut, Settings, LogIn } from "lucide-react";
import { useAuth } from "@/contexts/auth";

type NavItem = {
  label: string;
  href?: string;
  children?: { label: string; href?: string; disabled?: boolean }[];
};

const navItems: NavItem[] = [
  { label: "Accueil", href: "/" },
  {
    label: "Statistiques",
    children: [
      { label: "Joueurs", href: "#" },
      { label: "Classement", href: "#" },
      { label: "Meta", href: "#" },
      { label: "D'autres en préparation", disabled: true },
    ],
  },
  {
    label: "Club Tracking",
    children: [
      { label: "Découvrir", href: "#" },
      { label: "Configurer", href: "#" },
    ],
  },
  { label: "Abonnements", href: "#" },
];

const dropdownAnimation = `
  @keyframes dropdownIn {
    from { opacity: 0; transform: translateY(-6px) scaleY(0.95); }
    to   { opacity: 1; transform: translateY(0)    scaleY(1); }
  }
  @keyframes dropdownOut {
    from { opacity: 1; transform: translateY(0)    scaleY(1); }
    to   { opacity: 0; transform: translateY(-6px) scaleY(0.95); }
  }
  .dropdown-enter { animation: dropdownIn  180ms ease forwards; transform-origin: top; }
  .dropdown-leave { animation: dropdownOut 400ms ease forwards; transform-origin: top; }
`;

function DropdownMenu({
  items,
  closing,
}: {
  items: { label: string; href?: string; disabled?: boolean }[];
  closing: boolean;
}) {
  return (
    <div
      className={`absolute top-full left-0 mt-1 min-w-[180px] rounded-lg border border-border/60 bg-card/95 backdrop-blur-md shadow-lg py-1 z-50 ${
        closing ? "dropdown-leave" : "dropdown-enter"
      }`}
    >
      {items.map((item) =>
        item.disabled ? (
          <span
            key={item.label}
            className="block px-4 py-2 text-sm text-muted-foreground/50 cursor-default italic"
          >
            {item.label}
          </span>
        ) : (
          <a
            key={item.label}
            href={item.href ?? "#"}
            className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          >
            {item.label}
          </a>
        )
      )}
    </div>
  );
}

function useDropdown() {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openMenu = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setClosing(false);
    setOpen(true);
  }, []);

  const closeMenu = useCallback(() => {
    setClosing(true);
    closeTimer.current = setTimeout(() => {
      setOpen(false);
      setClosing(false);
    }, 400);
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    hoverTimer.current = setTimeout(() => openMenu(), 1200);
  }, [openMenu]);

  const handleMouseLeave = useCallback(() => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    closeMenu();
  }, [closeMenu]);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) closeMenu();
    }
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
      if (hoverTimer.current) clearTimeout(hoverTimer.current);
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, [closeMenu]);

  return { open, closing, ref, openMenu, closeMenu, handleMouseEnter, handleMouseLeave };
}

function NavItemDesktop({ item }: { item: NavItem }) {
  const { open, closing, ref, openMenu, closeMenu, handleMouseEnter, handleMouseLeave } =
    useDropdown();

  if (!item.children) {
    return (
      <li>
        <a
          href={item.href}
          className="px-4 py-2 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors duration-150 flex items-center"
        >
          {item.label}
        </a>
      </li>
    );
  }

  return (
    <li
      ref={ref as React.RefObject<HTMLLIElement>}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        onClick={() => (open && !closing ? closeMenu() : openMenu())}
        className="px-4 py-2 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors duration-150 flex items-center gap-1"
      >
        {item.label}
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 ${open && !closing ? "rotate-180" : ""}`}
        />
      </button>
      {open && <DropdownMenu items={item.children} closing={closing} />}
    </li>
  );
}

function ProfileButton() {
  const { auth, logout, loginUrl } = useAuth();
  const { open, closing, ref, openMenu, closeMenu, handleMouseEnter, handleMouseLeave } =
    useDropdown();

  if (auth.status === "loading") {
    return (
      <div className="w-8 h-8 rounded-full bg-accent animate-pulse" />
    );
  }

  if (auth.status === "unauthenticated") {
    return (
      <a
        href={loginUrl}
        className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors border border-border/50"
      >
        <LogIn size={14} />
        Se connecter
      </a>
    );
  }

  const user = auth.user;

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        onClick={() => (open && !closing ? closeMenu() : openMenu())}
        className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full hover:bg-accent transition-colors"
      >
        {user.avatar ? (
          <img src={user.avatar} alt={user.displayName} className="w-7 h-7 rounded-full" />
        ) : (
          <div className="w-7 h-7 rounded-full bg-[#5865F2]/30 flex items-center justify-center text-[10px] font-bold text-[#5865F2]">
            {user.displayName[0].toUpperCase()}
          </div>
        )}
        <span className="text-sm text-foreground max-w-[100px] truncate">{user.displayName}</span>
        <ChevronDown
          size={13}
          className={`text-muted-foreground transition-transform duration-200 ${open && !closing ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div
          className={`absolute top-full right-0 mt-2 min-w-[180px] rounded-lg border border-border/60 bg-card/95 backdrop-blur-md shadow-lg py-1 z-50 ${
            closing ? "dropdown-leave" : "dropdown-enter"
          }`}
        >
          <div className="px-4 py-2 border-b border-border/50 mb-1">
            <p className="text-xs font-medium text-foreground truncate">{user.displayName}</p>
            <p className="text-xs text-muted-foreground truncate">@{user.username}</p>
          </div>
          <a
            href="/settings"
            className="flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          >
            <Settings size={14} />
            Paramètres
          </a>
          <button
            onClick={() => { closeMenu(); logout(); }}
            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
          >
            <LogOut size={14} />
            Se déconnecter
          </button>
        </div>
      )}
    </div>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const { auth, logout, loginUrl } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
      <style>{dropdownAnimation}</style>
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2.5">
            <img
              src="http://cdn.meonix.me/cdn/logo/bt.png"
              alt="BrawlAlly"
              className="h-8 w-8 rounded-lg object-cover"
            />
            <span
              style={{ fontFamily: "'Orbitron', sans-serif" }}
              className="text-base font-bold tracking-wide text-foreground"
            >
              BrawlAlly
            </span>
          </a>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <NavItemDesktop key={item.label} item={item} />
            ))}
          </ul>

          {/* Profile / login */}
          <div className="hidden md:flex items-center">
            <ProfileButton />
          </div>

          {/* Mobile burger */}
          <button
            className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-md px-6 py-4">
          <ul className="flex flex-col gap-1">
            {navItems.map((item) => (
              <li key={item.label}>
                {!item.children ? (
                  <a
                    href={item.href}
                    className="block px-4 py-2 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </a>
                ) : (
                  <>
                    <button
                      className="w-full text-left px-4 py-2 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors flex items-center justify-between"
                      onClick={() =>
                        setMobileExpanded((v) => (v === item.label ? null : item.label))
                      }
                    >
                      {item.label}
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-200 ${
                          mobileExpanded === item.label ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {mobileExpanded === item.label && (
                      <ul className="ml-4 mt-1 flex flex-col gap-1">
                        {item.children.map((child) =>
                          child.disabled ? (
                            <li key={child.label}>
                              <span className="block px-4 py-2 text-sm text-muted-foreground/50 italic cursor-default">
                                {child.label}
                              </span>
                            </li>
                          ) : (
                            <li key={child.label}>
                              <a
                                href={child.href}
                                className="block px-4 py-2 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                                onClick={() => setMobileOpen(false)}
                              >
                                {child.label}
                              </a>
                            </li>
                          )
                        )}
                      </ul>
                    )}
                  </>
                )}
              </li>
            ))}

            {/* Mobile profile section */}
            <li className="mt-2 pt-2 border-t border-border/50">
              {auth.status === "authenticated" ? (
                <div className="space-y-1">
                  <div className="flex items-center gap-2 px-4 py-2">
                    {auth.user.avatar ? (
                      <img src={auth.user.avatar} className="w-7 h-7 rounded-full" alt="" />
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-[#5865F2]/30 flex items-center justify-center text-xs font-bold text-[#5865F2]">
                        {auth.user.displayName[0].toUpperCase()}
                      </div>
                    )}
                    <span className="text-sm text-foreground">{auth.user.displayName}</span>
                  </div>
                  <a
                    href="/settings"
                    className="flex items-center gap-2 px-4 py-2 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    <Settings size={14} /> Paramètres
                  </a>
                  <button
                    onClick={() => { setMobileOpen(false); logout(); }}
                    className="w-full flex items-center gap-2 px-4 py-2 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                  >
                    <LogOut size={14} /> Se déconnecter
                  </button>
                </div>
              ) : (
                <a
                  href={loginUrl}
                  className="flex items-center gap-2 px-4 py-2 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  <LogIn size={14} /> Se connecter avec Discord
                </a>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
