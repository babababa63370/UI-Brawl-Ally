import app from "./app";
import { pool } from "@workspace/db";

const rawPort = process.env["PORT"];

if (!rawPort) {
  throw new Error(
    "PORT environment variable is required but was not provided.",
  );
}

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

pool.on("error", (err: Error) => {
  console.error("[db] Erreur inattendue sur le pool PostgreSQL :", err.message);
});

pool
  .connect()
  .then((client) => {
    console.log("[db] Connexion PostgreSQL OK");
    client.release();
  })
  .catch((err: Error) => {
    console.error("[db] Impossible de se connecter à PostgreSQL :", err.message);
    const safeUrl = process.env.DATABASE_URL?.replace(/:\/\/[^@]+@/, "://<credentials>@") ?? "non définie";
    console.error("[db] DATABASE_URL =", safeUrl);
    process.exit(1);
  });

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
