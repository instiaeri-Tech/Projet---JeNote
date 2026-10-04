import { createHash, randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { SignJWT, jwtVerify } from "jose";
import type { Request, Response } from "express";
import type { User } from "../../drizzle/schema";
import { getUserByOpenId, upsertUser, getUserByEmail } from "../db";

const COOKIE = "jenote-session";
const secret = new TextEncoder().encode(process.env.JENOTE_AUTH_SECRET || "jenote-local-dev-secret-change-me");
const secureCookie = process.env.NODE_ENV !== "development" || process.env.FORCE_SECURE_COOKIES === "true";

function hashPassword(password: string, salt = randomBytes(16).toString("hex")) {
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}
function verifyPassword(password: string, encoded: string) {
  const [salt, expected] = encoded.split(":");
  if (!salt || !expected) return false;
  const actual = scryptSync(password, salt, 64);
  return timingSafeEqual(actual, Buffer.from(expected, "hex"));
}

export async function createLocalAccount(input: { name: string; email: string; password: string }) {
  const email = input.email.trim().toLowerCase();
  if (input.password.length < 8) throw new Error("Le mot de passe doit contenir au moins 8 caractères.");
  if (await getUserByEmail(email)) throw new Error("Cette adresse est déjà utilisée.");
  const openId = `local:${createHash("sha256").update(email).digest("hex").slice(0, 48)}`;
  await upsertUser({ openId, name: input.name.trim().slice(0, 120), email, loginMethod: "email", passwordHash: hashPassword(input.password) });
  return getUserByOpenId(openId);
}

export async function authenticateLocalAccount(emailInput: string, password: string) {
  const user = await getUserByEmail(emailInput.trim().toLowerCase());
  if (!user?.passwordHash || !verifyPassword(password, user.passwordHash)) return null;
  return user;
}

export async function setLocalSession(res: Response, user: User) {
  const token = await new SignJWT({ uid: user.id, openId: user.openId, kind: "local" }).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime("30d").sign(secret);
  res.cookie(COOKIE, token, { httpOnly: true, sameSite: secureCookie ? "none" : "lax", secure: secureCookie, path: "/", maxAge: 30 * 24 * 60 * 60 * 1000 });
}

export function clearLocalSession(res: Response) { res.clearCookie(COOKIE, { httpOnly: true, sameSite: secureCookie ? "none" : "lax", secure: secureCookie, path: "/" }); }

export async function getLocalUser(req: Request) {
  const token = req.headers.cookie?.split(";").map(part => part.trim()).find(part => part.startsWith(`${COOKIE}=`))?.slice(COOKIE.length + 1);
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret);
    if (typeof payload.openId !== "string") return null;
    return (await getUserByOpenId(payload.openId)) ?? null;
  } catch { return null; }
}
