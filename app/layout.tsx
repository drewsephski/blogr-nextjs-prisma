import type { Metadata } from "next";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { ThemeToggle } from "@/components/theme-toggle";
import "./globals.css";

export const metadata: Metadata = {
  title: "Blogr",
  description:
    "A fullstack blog built with Next.js, Prisma, Sign in with Vercel, and Prisma Postgres.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <header className="header">
          <Link href="/" className="logo">
            Blogr
          </Link>
          <nav className="nav" aria-label="Main navigation">
            {user ? <Link href="/drafts">Drafts</Link> : null}
          </nav>
          <div className="header-actions">
            <ThemeToggle />
            {user ? (
              <>
                <Link className="button secondary" href="/create">
                  New post
                </Link>
                <form action="/api/auth/signout" method="post">
                  <button type="submit" className="secondary">
                    Log out
                  </button>
                </form>
              </>
            ) : (
              <Link className="button" href="/api/auth/authorize">
                Sign in
              </Link>
            )}
          </div>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}