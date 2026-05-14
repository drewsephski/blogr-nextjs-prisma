"use client";

import { signIn } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  async function handleSignIn(formData: FormData) {
    setError("");
    setLoading(true);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { data, error } = await signIn.email({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError(error.message || "Sign in failed");
      return;
    }

    router.push("/");
    router.refresh();
  }

  return (
    <div className="panel">
      <form action={handleSignIn} className="form">
        <h1>Sign In</h1>
        {error && <div className="error">{error}</div>}
        <label className="field">
          <span>Email</span>
          <input
            type="email"
            name="email"
            placeholder="your@email.com"
            required
            disabled={loading}
          />
        </label>
        <label className="field">
          <span>Password</span>
          <input
            type="password"
            name="password"
            placeholder="••••••••"
            required
            disabled={loading}
          />
        </label>
        <div className="actions">
          <button type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </div>
        <p className="text-center text-sm">
          Don't have an account?{" "}
          <a href="/signup" className="link">
            Sign up
          </a>
        </p>
      </form>
    </div>
  );
}
