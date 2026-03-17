import { useState, useRef, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

type NavItem = {
  label: string;
  href?: string;
  children?: { label: string; href?: string; disabled?: boolean }[];
};

const navItems: NavItem[] = [
  { label: "Accueil", href: "#" },
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
  {
    label: "Profil",
    children: [{ label: "Paramètres", href: "#" }],
  },
];

function DropdownMenu({
  items,
}: {
  items: { label: string; href?: string; disabled?: boolean }[];
}) {
  return (
    <div className="absolute top-full left-0 mt-1 min-w-[180px] rounded-lg border border-border/60 bg-card/95 backdrop-blur-md shadow-lg py-1 z-50">
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

function NavItemDesktop({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLLIElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

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
    <li ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="px-4 py-2 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-accent transition-colors duration-150 flex items-center gap-1"
      >
        {item.label}
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && <DropdownMenu items={item.children} />}
    </li>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex h-16 items-center justify-between">
          <a href="#" className="text-lg font-semibold tracking-tight text-foreground">
            BrawlAlly
          </a>

          <ul className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <NavItemDesktop key={item.label} item={item} />
            ))}
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
          </ul>
        </div>
      )}
    </nav>
  );
}
