import { headers } from "next/headers";
import { auth } from "./auth";

/**
 * Retrieves the current session server-side
 * Use in Server Components, Server Actions, API Routes
 */
export async function getSession() {
  const headersList = await headers();
  const session = await auth.api.getSession({
    headers: headersList,
  });
  return session;
}

/**
 * Retrieves current session with user data
 */
export async function getCurrentUser() {
  const session = await getSession();
  return session?.user ?? null;
}

/**
 * Verify session and throw if unauthorized
 */
export async function verifySession() {
  const session = await getSession();
  if (!session) {
    throw new Error("Unauthorized: No active session");
  }
  return session;
}