import { drizzle } from "drizzle-orm/singlestore";
import { usersTable } from "./schema";
import "dotenv/config";

const connection = drizzle(process.env.DATABASE_URL!, {
  schema: { usersTable },
});

export { connection as db, usersTable };
