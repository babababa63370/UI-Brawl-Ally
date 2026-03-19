# BrawlAlly

<p align="center">
  <img src="https://cdn.meonix.me/cdn/logo/ba.png" alt="BrawlAlly" width="96" />
</p>

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

## Docker (déploiement autonome)

Le projet inclut un `Dockerfile` multi-stage et un `docker-compose.yml` qui gèrent le frontend, le backend et PostgreSQL.

### Démarrage rapide

```bash
# 1. Copier le fichier d'environnement et le remplir
cp .env.example .env

# 2. Lancer tout (build + base de données + app)
docker compose up --build -d
```

L'application sera disponible sur `http://localhost:8080`.

### Variables dans `.env`

| Variable | Description |
|---|---|
| `POSTGRES_DB` | Nom de la base de données (défaut : `brawlally`) |
| `POSTGRES_USER` | Utilisateur PostgreSQL (défaut : `brawlally`) |
| `POSTGRES_PASSWORD` | **Requis** — mot de passe PostgreSQL |
| `DISCORD_CLIENT_ID` | ID de l'app Discord OAuth2 |
| `DISCORD_CLIENT_SECRET` | Secret de l'app Discord OAuth2 |
| `DISCORD_API_KEY` | Clé API Meonix |
| `SESSION_SECRET` | Secret de session Express (chaîne aléatoire longue) |
| `PORT` | Port exposé sur l'hôte (défaut : `8080`) |

### Architecture Docker

```
docker compose
├── db      → PostgreSQL 16 (volume persistant)
└── app     → Node.js 24 (API + frontend statique servi ensemble)
```

Le `Dockerfile` utilise un build multi-stage :
- **Stage builder** — installe les dépendances, compile le frontend Vite et bundle le backend avec esbuild
- **Stage production** — image minimale avec uniquement le bundle CJS et les fichiers statiques

### Commandes utiles

```bash
# Voir les logs
docker compose logs -f app

# Arrêter
docker compose down

# Supprimer les données PostgreSQL
docker compose down -v
```

---

## Lancer le projet (développement)

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
