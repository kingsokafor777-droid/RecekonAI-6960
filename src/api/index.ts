import { Hono } from 'hono';
import { cors } from "hono/cors";
import { drizzle } from "drizzle-orm/d1";
import { waitlist } from "./database/schema";

type Bindings = {
  DB: D1Database;
};

const app = new Hono<{ Bindings: Bindings }>()
  .basePath('api');

app.use(cors({ origin: "*" }));

app.get('/ping', (c) => c.json({ message: `Pong! ${Date.now()}` }));

// Waitlist signup
app.post('/waitlist', async (c) => {
  try {
    const body = await c.req.json() as { email?: string };
    const email = body?.email?.trim().toLowerCase();

    if (!email || !email.includes("@")) {
      return c.json({ error: "Valid email required." }, 400);
    }

    const db = drizzle(c.env.DB);

    await db.insert(waitlist).values({ email }).onConflictDoNothing();

    return c.json({ success: true, message: "You're on the list." });
  } catch (err) {
    console.error(err);
    return c.json({ error: "Server error. Please try again." }, 500);
  }
});

// Get waitlist count (admin)
app.get('/waitlist/count', async (c) => {
  try {
    const db = drizzle(c.env.DB);
    const result = await db.select().from(waitlist);
    return c.json({ count: result.length });
  } catch {
    return c.json({ count: 0 });
  }
});

export default app;
