import { Router, type IRouter } from "express";

const router: IRouter = Router();

const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID ?? "";
const DISCORD_CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET ?? "";

function getRedirectUri(req: { headers: { host?: string }; protocol: string }): string {
  // BASE_URL explicite (ex: https://mondomaine.com) — priorité absolue
  if (process.env.BASE_URL) {
    return `${process.env.BASE_URL.replace(/\/$/, "")}/api/auth/discord/callback`;
  }
  // Environnement Replit
  const domains = process.env.REPLIT_DOMAINS;
  if (domains) {
    return `https://${domains.split(",")[0].trim()}/api/auth/discord/callback`;
  }
  // Sinon : protocole détecté via X-Forwarded-Proto (grâce à trust proxy)
  const proto = req.protocol;
  const host = req.headers.host ?? "localhost";
  return `${proto}://${host}/api/auth/discord/callback`;
}

router.get("/discord", (req, res) => {
  if (!DISCORD_CLIENT_ID) {
    res.status(500).json({ error: "DISCORD_CLIENT_ID not configured" });
    return;
  }
  const redirectUri = getRedirectUri(req);
  console.log(`[auth] redirect_uri envoyée à Discord : ${redirectUri}`);
  const url = `https://discord.com/api/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=identify%20email`;
  res.redirect(url);
});

router.get("/discord/callback", async (req, res) => {
  const code = req.query["code"] as string | undefined;

  if (!code) {
    res.redirect("/?auth=error");
    return;
  }

  try {
    const redirectUri = getRedirectUri(req);

    const tokenRes = await fetch("https://discord.com/api/oauth2/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: DISCORD_CLIENT_ID,
        client_secret: DISCORD_CLIENT_SECRET,
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri,
      }),
    });

    if (!tokenRes.ok) {
      console.error("Discord token exchange failed:", await tokenRes.text());
      res.redirect("/?auth=error");
      return;
    }

    const tokenData = (await tokenRes.json()) as { access_token: string };

    const userRes = await fetch("https://discord.com/api/users/@me", {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });

    if (!userRes.ok) {
      res.redirect("/?auth=error");
      return;
    }

    const user = (await userRes.json()) as {
      id: string;
      username: string;
      global_name?: string;
      avatar?: string;
      email?: string;
    };

    const session = (req as any).session;
    session.user = {
      id: user.id,
      username: user.username,
      displayName: user.global_name ?? user.username,
      avatar: user.avatar
        ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`
        : null,
      email: user.email ?? null,
    };

    res.redirect("/settings");
  } catch (err) {
    console.error("Discord OAuth error:", err);
    res.redirect("/?auth=error");
  }
});

router.get("/me", (req, res) => {
  const session = (req as any).session;
  if (session?.user) {
    res.json({ user: session.user });
    return;
  }
  res.status(401).json({ user: null });
});

router.post("/logout", (req, res) => {
  const session = (req as any).session;
  session.destroy(() => {
    res.json({ success: true });
  });
});

export default router;
