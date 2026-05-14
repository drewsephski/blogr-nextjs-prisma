"use client";

import { signUp } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignupPage() {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  async function handleSignUp(formData: FormData) {
    setError("");
    setLoading(true);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const name = formData.get("name") as string;

    const { data, error } = await signUp.email({
      email,
      password,
      name,
    });

    setLoading(false);

    if (error) {
      setError(error.message || "Sign up failed");
      return;
    }

    router.push("/");
    router.refresh();
  }

  return (
    <div className="panel">
      <form action={handleSignUp} className="form">
        <h1>Sign Up</h1>
        {error && <div className="error">{error}</div>}
        <label className="field">
          <span>Name</span>
          <input
            type="text"
            name="name"
            placeholder="Your name"
            required
            disabled={loading}
          />
        </label>
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
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </div>
        <p className="text-center text-sm">
          Already have an account?{" "}
          <a href="/login" className="link">
            Sign in
          </a>
        </p>
      </form>
    </div>
  );
}
