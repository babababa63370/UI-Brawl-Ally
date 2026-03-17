import { Router, type IRouter } from "express";

const router: IRouter = Router();

const MEONIX_API = "https://api.meonix.me";
const API_KEY = process.env.DISCORD_API_KEY ?? "";

function meonixHeaders() {
  return {
    "X-API-Key": API_KEY,
    "Content-Type": "application/json",
  };
}

router.get("/me", async (req, res) => {
  const session = (req as any).session;
  if (!session?.user) {
    return res.status(401).json({ error: "Non connecté" });
  }

  const discordId = session.user.id;

  try {
    const r = await fetch(`${MEONIX_API}/api/discord/${discordId}`, {
      headers: meonixHeaders(),
    });

    if (r.status === 404) {
      return res.json({ link: null });
    }

    if (!r.ok) {
      return res.status(r.status).json({ error: "Erreur API externe" });
    }

    const data = await r.json() as { link: { discord_id: string; brawl_tag: string; linked_at: string } };
    return res.json({ link: data.link });
  } catch (err) {
    console.error("Erreur brawl/me:", err);
    return res.status(500).json({ error: "Erreur serveur" });
  }
});

router.get("/player/:tag", async (req, res) => {
  const session = (req as any).session;
  if (!session?.user) {
    return res.status(401).json({ error: "Non connecté" });
  }

  const tag = req.params.tag.replace(/^#/, "").toUpperCase();

  try {
    const r = await fetch(`${MEONIX_API}/api/player/${tag}`, {
      headers: meonixHeaders(),
    });

    const data = await r.json();

    if (!r.ok) {
      return res.status(r.status).json({ error: data.error ?? "Joueur introuvable" });
    }

    return res.json(data);
  } catch (err) {
    console.error("Erreur brawl/player:", err);
    return res.status(503).json({ error: "Impossible de contacter l'API Brawl Stars" });
  }
});

router.post("/link", async (req, res) => {
  const session = (req as any).session;
  if (!session?.user) {
    return res.status(401).json({ error: "Non connecté" });
  }

  const { brawl_tag } = req.body as { brawl_tag?: string };
  if (!brawl_tag) {
    return res.status(400).json({ error: "brawl_tag requis" });
  }

  try {
    const r = await fetch(`${MEONIX_API}/api/discord/link`, {
      method: "POST",
      headers: meonixHeaders(),
      body: JSON.stringify({
        discord_id: session.user.id,
        brawl_tag,
      }),
    });

    const data = await r.json();
    return res.status(r.status).json(data);
  } catch (err) {
    console.error("Erreur brawl/link:", err);
    return res.status(500).json({ error: "Erreur serveur" });
  }
});

router.delete("/unlink", async (req, res) => {
  const session = (req as any).session;
  if (!session?.user) {
    return res.status(401).json({ error: "Non connecté" });
  }

  try {
    const r = await fetch(`${MEONIX_API}/api/discord/unlink`, {
      method: "DELETE",
      headers: meonixHeaders(),
      body: JSON.stringify({ discord_id: session.user.id }),
    });

    const data = await r.json();
    return res.status(r.status).json(data);
  } catch (err) {
    console.error("Erreur brawl/unlink:", err);
    return res.status(500).json({ error: "Erreur serveur" });
  }
});

export default router;
