// db/schema.ts
import {
  singlestoreTable,
  varchar,
  int,
  timestamp,
} from "drizzle-orm/singlestore-core";

export const usersTable = singlestoreTable("users", {
  id: int().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
  age: int(),
  created_at: timestamp().defaultNow(),
});
