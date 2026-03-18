# BrawlAlly

Site web companion pour Brawl Stars, permettant aux joueurs de lier leur compte Discord à leur tag Brawl Stars et de consulter leurs statistiques.

## Stack technique

| Couche | Technologie |
|---|---|
| Monorepo | pnpm workspaces |
| Runtime | Node.js 24 |
| Frontend | React 19 + Vite + Tailwind CSS 4 |
| Backend | Express 5 (TypeScript) |
| Base de données | PostgreSQL + Drizzle ORM |
| Auth | Discord OAuth2 |
| API externe | Meonix API (données Brawl Stars) |

## Structure du projet

```
/
├── artifacts/
│   ├── my-website/       # Frontend principal (React + Vite)
│   ├── api-server/       # Backend Express 5
│   └── mockup-sandbox/   # Sandbox de prototypage UI
├── lib/
│   ├── db/               # Schéma Drizzle ORM + connexion PostgreSQL
│   ├── api-spec/         # Spec OpenAPI + config Orval
│   ├── api-client-react/ # Hooks React Query générés
│   └── api-zod/          # Schémas Zod générés
└── scripts/              # Scripts utilitaires TypeScript
```

## Variables d'environnement

Créer les secrets suivants dans Replit Secrets (ou un fichier `.env` en local) :

| Variable | Description |
|---|---|
| `DISCORD_CLIENT_ID` | ID de l'application Discord OAuth2 |
| `DISCORD_CLIENT_SECRET` | Secret de l'application Discord OAuth2 |
| `DISCORD_API_KEY` | Clé API Meonix pour accéder aux données Brawl Stars |
| `SESSION_SECRET` | Secret pour les sessions Express (optionnel en dev) |
| `DATABASE_URL` | URL PostgreSQL (fournie automatiquement par Replit) |

## Lancer le projet

### Installation des dépendances

```bash
pnpm install
```

### Développement

Lancer le frontend :

```bash
PORT=21177 BASE_PATH=/ pnpm --filter @workspace/my-website run dev
```

Lancer le backend :

```bash
PORT=8080 pnpm --filter @workspace/api-server run dev
```

### Vérification TypeScript

```bash
pnpm run typecheck
```

### Build de production

```bash
pnpm run build
```

## Routes API

### Auth (`/api/auth`)

| Méthode | Route | Description |
|---|---|---|
| GET | `/api/auth/discord` | Redirige vers Discord OAuth2 |
| GET | `/api/auth/discord/callback` | Callback OAuth2, crée la session |
| GET | `/api/auth/me` | Retourne l'utilisateur connecté |
| POST | `/api/auth/logout` | Détruit la session |

### Brawl Stars (`/api/brawl`)

| Méthode | Route | Description |
|---|---|---|
| GET | `/api/brawl/me` | Récupère la liaison Discord ↔ Brawl Stars de l'utilisateur |
| GET | `/api/brawl/player/:tag` | Récupère les infos d'un joueur par tag |
| POST | `/api/brawl/link` | Lie un tag Brawl Stars au compte Discord |
| DELETE | `/api/brawl/unlink` | Supprime la liaison Brawl Stars |

## Fonctionnalités

- **Connexion Discord** — Authentification OAuth2, session persistante en base de données
- **Liaison Brawl Stars** — Associer son tag Brawl Stars à son compte Discord
- **Profil joueur** — Affichage du nom, icône, trophées et club
- **Page Paramètres** — Gestion du compte, liaison et déliaison du tag

## Configuration Discord OAuth2

Dans le [portail développeur Discord](https://discord.com/developers/applications) :

1. Créer une application
2. Aller dans **OAuth2 → Redirects**
3. Ajouter l'URL de callback : `https://<votre-domaine>/api/auth/discord/callback`
4. Copier le **Client ID** et le **Client Secret** dans les secrets Replit
