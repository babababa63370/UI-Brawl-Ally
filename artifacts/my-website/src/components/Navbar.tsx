import { useState, useRef, useEffect, useCallback } from "react";
import { useLocation } from "wouter";
import { Menu, X, ChevronDown, UserCircle } from "lucide-react";
import { useAuth } from "@/contexts/auth";

type NavItem = {
  label: string;
  href?: string;
  gold?: boolean;
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
  { label: "Abonnements", href: "#", gold: true },
  { label: "Profil", href: "/settings" },
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
  .dropdown-leave { animation: dropdownOut 140ms ease forwards; transform-origin: top; }

  @keyframes mobileMenuIn {
    from { opacity: 0; transform: translateY(-8px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .mobile-menu-enter { animation: mobileMenuIn 200ms ease forwards; }

  @keyframes mobileSubIn {
    from { opacity: 0; transform: translateY(-4px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .mobile-sub-enter { animation: mobileSubIn 180ms ease forwards; }

  @keyframes mobileSubContainerIn {
    from { max-height: 0; opacity: 0; }
    to   { max-height: 400px; opacity: 1; }
  }
  .mobile-sub-open {
    animation: mobileSubContainerIn 220ms ease forwards;
    overflow: hidden;
  }

  @keyframes mobileSubOut {
    from { opacity: 1; transform: translateY(0); max-height: 300px; }
    to   { opacity: 0; transform: translateY(-4px); max-height: 0; }
  }
  .mobile-sub-leave { animation: mobileSubOut 150ms ease forwards; overflow: hidden; }

`;

function useNavLink(href?: string) {
  const [location, navigate] = useLocation();
  const isActive =
    href && href !== "#" && href === location;

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (!href || href === "#") return;
      e.preventDefault();
      if (href === location) return;
      navigate(href);
    },
    [href, location, navigate],
  );

  return { isActive, handleClick };
}

function DropdownMenu({
  items,
  closing,
  onNavigate,
}: {
  items: { label: string; href?: string; disabled?: boolean }[];
  closing: boolean;
  onNavigate?: () => void;
}) {
  const [location, navigate] = useLocation();

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
            onClick={(e) => {
              if (!item.href || item.href === "#") return;
              e.preventDefault();
              if (item.href === location) { onNavigate?.(); return; }
              navigate(item.href);
              onNavigate?.();
            }}
            className={`block px-4 py-2 text-sm transition-colors ${
              item.href && item.href !== "#" && item.href === location
                ? "text-foreground bg-accent/60 font-medium"
                : "text-muted-foreground hover:text-foreground hover:bg-accent"
            }`}
          >
            {item.label}
          </a>
        )
      )}
    </div>
  );
}

function NavItemDesktop({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const ref = useRef<HTMLLIElement>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { isActive, handleClick } = useNavLink(item.href);

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
    hoverTimer.current = setTimeout(() => {
      openMenu();
    }, 1200);
  }, [openMenu]);

  const handleMouseLeave = useCallback(() => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    closeMenu();
  }, [closeMenu]);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        closeMenu();
      }
    }
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
      if (hoverTimer.current) clearTimeout(hoverTimer.current);
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, [closeMenu]);

  if (!item.children) {
    return (
      <li className={item.gold ? "mx-1.5" : undefined}>
        <a
          href={item.href}
          onClick={item.gold ? undefined : handleClick}
          aria-current={isActive ? "page" : undefined}
          className={`px-4 py-2 text-sm flex items-center transition-colors duration-150 ${
            item.gold
              ? "gold-btn-wrap"
              : isActive
              ? "rounded-md text-foreground bg-accent font-medium"
              : "rounded-md text-muted-foreground hover:text-foreground hover:bg-accent"
          }`}
        >
          {item.gold ? <span className="gold-btn">{item.label}</span> : item.label}
        </a>
      </li>
    );
  }

  return (
    <li
      ref={ref}
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
      {open && (
        <DropdownMenu
          items={item.children}
          closing={closing}
          onNavigate={closeMenu}
        />
      )}
    </li>
  );
}

function DesktopProfilLink() {
  const { auth } = useAuth();
  const [location, navigate] = useLocation();
  const isActive = location === "/settings";

  const user = auth.status === "authenticated" ? auth.user : null;

  return (
    <>
      <a
        href="/settings"
        onClick={(e) => { e.preventDefault(); if (!isActive) navigate("/settings"); }}
        aria-current={isActive ? "page" : undefined}
        className={`px-3 py-1.5 text-sm rounded-md transition-colors duration-150 ${
          isActive
            ? "text-foreground bg-accent font-medium"
            : "text-muted-foreground hover:text-foreground hover:bg-accent"
        }`}
      >
        Profil
      </a>
      {user?.avatar ? (
        <img
          src={user.avatar}
          alt={user.displayName}
          className="w-7 h-7 rounded-full border border-border/60 shrink-0 pointer-events-none select-none"
        />
      ) : (
        <UserCircle size={20} className="shrink-0 text-muted-foreground pointer-events-none" />
      )}
    </>
  );
}

const CLOSE_DURATION = 160;

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [mobileClosing, setMobileClosing] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [location, navigate] = useLocation();
  const { auth } = useAuth();
  const mobileUser = auth.status === "authenticated" ? auth.user : null;
  const [brawlTag, setBrawlTag] = useState<string | null>(null);

  useEffect(() => {
    if (auth.status !== "authenticated") { setBrawlTag(null); return; }
    fetch("/api/brawl/me", { credentials: "include" })
      .then((r) => r.json())
      .then((data) => setBrawlTag(data.link?.brawl_tag ?? null))
      .catch(() => setBrawlTag(null));
  }, [auth.status]);

  const handleMobileExpand = useCallback((label: string) => {
    if (mobileExpanded === label) {
      setMobileClosing(label);
      setMobileExpanded(null);
      if (closeTimer.current) clearTimeout(closeTimer.current);
      closeTimer.current = setTimeout(() => {
        setMobileClosing(null);
      }, CLOSE_DURATION);
      return;
    }

    if (mobileExpanded) {
      setMobileClosing(mobileExpanded);
      setMobileExpanded(label);
      if (closeTimer.current) clearTimeout(closeTimer.current);
      closeTimer.current = setTimeout(() => {
        setMobileClosing(null);
      }, CLOSE_DURATION);
      return;
    }

    setMobileExpanded(label);
  }, [mobileExpanded]);

  const handleMobileNav = useCallback(
    (href: string | undefined) => {
      if (!href || href === "#") return;
      if (href !== location) navigate(href);
      setMobileOpen(false);
    },
    [location, navigate],
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
      <style>{dropdownAnimation}</style>
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex h-16 items-center justify-between">
          <a
            href="/"
            onClick={(e) => { e.preventDefault(); if (location !== "/") navigate("/"); }}
            className="flex items-center gap-2.5"
          >
            <img src="http://cdn.meonix.me/cdn/logo/bt.png" alt="BrawlAlly" className="h-8 w-8 rounded-lg object-cover" />
            <span style={{ fontFamily: "'Orbitron', sans-serif" }} className="text-base font-bold tracking-wide text-foreground">
              BrawlAlly
            </span>
          </a>

          <ul className="hidden md:flex items-center gap-2">
            {navItems.filter((item) => item.label !== "Profil").map((item) => (
              <NavItemDesktop key={item.label} item={item} />
            ))}
            <li className="flex items-center gap-1.5">
              <DesktopProfilLink />
            </li>
          </ul>

          <button
            className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-md px-6 py-4 mobile-menu-enter">
          <ul className="flex flex-col gap-1">
            {navItems.map((item, i) => {
              const isActive = item.href && item.href !== "#" && item.href === location;
              return (
                <li
                  key={item.label}
                  style={{ animationDelay: `${i * 40}ms`, opacity: 0, animation: `mobileMenuIn 200ms ease ${i * 40}ms forwards` }}
                >
                  {!item.children ? (
                    <a
                      href={item.href}
                      onClick={(e) => { e.preventDefault(); handleMobileNav(item.href); }}
                      aria-current={isActive ? "page" : undefined}
                      className={`block px-4 py-2 text-sm transition-colors ${
                        item.gold
                          ? "gold-btn-wrap"
                          : isActive
                          ? "rounded-md text-foreground bg-accent font-medium"
                          : "rounded-md text-muted-foreground hover:text-foreground hover:bg-accent"
                      }`}
                    >
                      {item.gold ? <span className="gold-btn">{item.label}</span> : item.label}
                    </a>
                  ) : (
                    <>
                      <button
                        className="w-full text-left px-4 py-2 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors flex items-center justify-between"
                        onClick={() => handleMobileExpand(item.label)}
                      >
                        {item.label}
                        <ChevronDown
                          size={14}
                          className={`transition-transform duration-300 ${
                            mobileExpanded === item.label ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {(mobileExpanded === item.label || mobileClosing === item.label) && (
                        <ul className={`ml-4 mt-1 flex flex-col gap-1 ${mobileClosing === item.label ? "mobile-sub-leave" : "mobile-sub-open"}`}>
                          {item.children.map((child, j) =>
                            child.disabled ? (
                              <li
                                key={child.label}
                                style={mobileClosing !== item.label ? { opacity: 0, animation: `mobileSubIn 160ms ease ${j * 50}ms forwards` } : {}}
                              >
                                <span className="block px-4 py-2 text-sm text-muted-foreground/50 italic cursor-default">
                                  {child.label}
                                </span>
                              </li>
                            ) : (
                              <li
                                key={child.label}
                                style={mobileClosing !== item.label ? { opacity: 0, animation: `mobileSubIn 160ms ease ${j * 50}ms forwards` } : {}}
                              >
                                <a
                                  href={child.href}
                                  onClick={(e) => { e.preventDefault(); handleMobileNav(child.href); }}
                                  className={`block px-4 py-2 rounded-md text-sm transition-colors ${
                                    child.href && child.href !== "#" && child.href === location
                                      ? "text-foreground bg-accent/60 font-medium"
                                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                                  }`}
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
              );
            })}
          </ul>

          {mobileUser && (
            <div className="mt-4 pt-4 border-t border-border/50">
              <a
                href="/settings"
                onClick={(e) => { e.preventDefault(); handleMobileNav("/settings"); }}
                className="flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-accent transition-colors"
              >
                {mobileUser.avatar ? (
                  <img
                    src={mobileUser.avatar}
                    alt={mobileUser.displayName}
                    className="w-9 h-9 rounded-full border border-border/60 shrink-0"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-[#5865F2]/20 flex items-center justify-center shrink-0">
                    <UserCircle size={20} className="text-[#5865F2]" />
                  </div>
                )}
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{mobileUser.displayName}</p>
                  {brawlTag && (
                    <p className="text-xs text-muted-foreground truncate font-mono">#{brawlTag}</p>
                  )}
                </div>
              </a>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
