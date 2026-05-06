import { Router, type IRouter, type Request, type Response, type NextFunction } from "express";
import { db } from "@workspace/db";
import { guildCacheTable } from "@workspace/db";

const router: IRouter = Router();

function requireApiKey(req: Request, res: Response, next: NextFunction): void {
  const key = req.headers["x-api-key"] || req.query.apiKey;
  if (!process.env.DASHBOARD_API_KEY || key !== process.env.DASHBOARD_API_KEY) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  next();
}

router.use(requireApiKey);

// GET all guilds the bot is in (from guild_cache)
router.get("/guilds", async (req, res) => {
  try {
    const guilds = await db.select().from(guildCacheTable).orderBy(guildCacheTable.guildName);
    res.json(
      guilds.map((g) => ({
        guildId: g.guildId,
        guildName: g.guildName,
        guildIcon: g.guildIcon,
        channelCount: (g.channels as unknown[]).length,
        roleCount: (g.roles as unknown[]).length,
      }))
    );
  } catch (err) {
    req.log.error({ err }, "Failed to get dashboard guilds");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
