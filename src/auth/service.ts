import { db, usersTable } from "../db/connection";
import { eq } from "drizzle-orm";
import * as bcrypt from "bcryptjs";
import { sql } from "drizzle-orm";
import { SignupPayload, LoginPayload, User } from "./types";

const SALT_ROUNDS = 10;

export class AuthService {
/*
  static async signup(payload: SignupPayload): Promise<User> {
    const hashedPassword = await bcrypt.hash(payload.password, SALT_ROUNDS);

    await db.insert(usersTable).values({
      ...payload,
      password: hashedPassword,
    });

    const [user] = await db.execute(
      sql`SELECT * FROM users WHERE id = LAST_INSERT_ID()`,
    );

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      age: user.age,
      created_at: user.created_at,
    };
  }

  static async login(payload: LoginPayload): Promise<User | null> {
    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, payload.email));

    if (!user) return null;

    const passwordMatch = await bcrypt.compare(payload.password, user.password);
    if (!passwordMatch) return null;

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      age: user.age,
      created_at: user.created_at,
    };
  }

  static async getUserById(id: number): Promise<User | null> {
    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, id));

    if (!user) return null;

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      age: user.age,
      created_at: user.created_at,
    };
  }
*/
}
