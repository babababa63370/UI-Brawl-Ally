import express, { type Express } from "express";
import cors from "cors";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import path from "path";
import fs from "fs";
import { pool } from "@workspace/db";
import router from "./routes";

const app: Express = express();

// Nécessaire derrière un reverse proxy (Nginx, Caddy, Traefik…)
// → Express lit X-Forwarded-Proto pour req.protocol et req.secure
app.set("trust proxy", 1);

const SESSION_SECRET = process.env.SESSION_SECRET ?? "dev-secret-change-me";
const PgSession = connectPgSimple(session);

// COOKIE_SECURE=true  → cookie Secure (HTTPS obligatoire)
// COOKIE_SECURE=false → cookie non-Secure (HTTP ok, local sans HTTPS)
// non défini          → auto : Secure si NODE_ENV=production
const cookieSecure =
  process.env.COOKIE_SECURE === "true"
    ? true
    : process.env.COOKIE_SECURE === "false"
      ? false
      : process.env.NODE_ENV === "production";

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    store: new PgSession({
      pool,
      tableName: "user_sessions",
      createTableIfMissing: true,
    }),
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: cookieSecure,
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    },
  })
);

app.use("/api", router);

const staticDir = process.env.STATIC_DIR;
if (staticDir && fs.existsSync(staticDir)) {
  app.use(express.static(staticDir));
  app.get(/(.*)/, (_req, res) => {
    res.sendFile(path.join(staticDir, "index.html"));
  });
}

export default app;
