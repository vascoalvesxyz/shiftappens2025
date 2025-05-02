import "dotenv/config";
import { drizzle } from "drizzle-orm/singlestore";

const db = drizzle({ connection: { uri: process.env.DATABASE_URL } });
