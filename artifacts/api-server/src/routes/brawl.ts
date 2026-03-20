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
    res.status(401).json({ error: "Non connecté" });
    return;
  }

  const discordId = session.user.id;

  try {
    const r = await fetch(`${MEONIX_API}/api/discord/${discordId}`, {
      headers: meonixHeaders(),
    });

    if (r.status === 404) {
      res.json({ link: null });
      return;
    }

    if (!r.ok) {
      res.status(r.status).json({ error: "Erreur API externe" });
      return;
    }

    const data = (await r.json()) as { link: { discord_id: string; brawl_tag: string; linked_at: string } };
    res.json({ link: data.link });
  } catch (err) {
    console.error("Erreur brawl/me:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

router.get("/player/:tag", async (req, res) => {
  const session = (req as any).session;
  if (!session?.user) {
    res.status(401).json({ error: "Non connecté" });
    return;
  }

  const tag = req.params.tag.replace(/^#/, "").toUpperCase();

  try {
    const r = await fetch(`${MEONIX_API}/api/player/${tag}`, {
      headers: meonixHeaders(),
    });

    const data = (await r.json()) as { error?: string };

    if (!r.ok) {
      res.status(r.status).json({ error: data.error ?? "Joueur introuvable" });
      return;
    }

    res.json(data);
  } catch (err) {
    console.error("Erreur brawl/player:", err);
    res.status(503).json({ error: "Impossible de contacter l'API Brawl Stars" });
  }
});

router.post("/link", async (req, res) => {
  const session = (req as any).session;
  if (!session?.user) {
    res.status(401).json({ error: "Non connecté" });
    return;
  }

  const { brawl_tag } = req.body as { brawl_tag?: string };
  if (!brawl_tag) {
    res.status(400).json({ error: "brawl_tag requis" });
    return;
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
    res.status(r.status).json(data);
  } catch (err) {
    console.error("Erreur brawl/link:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

router.get("/player/:tag/battlelog", async (req, res) => {
  const session = (req as any).session;
  if (!session?.user) {
    res.status(401).json({ error: "Non connecté" });
    return;
  }

  const tag = req.params.tag.replace(/^#/, "").toUpperCase();

  try {
    const r = await fetch(`${MEONIX_API}/api/player/${tag}/battlelog`, {
      headers: meonixHeaders(),
    });

    if (!r.ok) {
      res.status(r.status).json({ error: "Battle log introuvable" });
      return;
    }

    const data = await r.json();
    res.json(data);
  } catch (err) {
    console.error("Erreur brawl/battlelog:", err);
    res.status(503).json({ error: "Impossible de contacter l'API" });
  }
});

router.delete("/unlink", async (req, res) => {
  const session = (req as any).session;
  if (!session?.user) {
    res.status(401).json({ error: "Non connecté" });
    return;
  }

  try {
    const r = await fetch(`${MEONIX_API}/api/discord/unlink`, {
      method: "DELETE",
      headers: meonixHeaders(),
      body: JSON.stringify({ discord_id: session.user.id }),
    });

    const data = await r.json();
    res.status(r.status).json(data);
  } catch (err) {
    console.error("Erreur brawl/unlink:", err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

export default router;
