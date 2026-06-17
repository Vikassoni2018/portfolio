"use client";

import { useState } from "react";
import { Lock } from "lucide-react";

export function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    if (response.ok) {
      window.location.href = "/admin";
      return;
    }

    const data = (await response.json().catch(() => ({}))) as { error?: string };
    setMessage(data.error || "Login failed.");
    setLoading(false);
  }

  return (
    <form onSubmit={submit} className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-6 shadow-soft">
      <div className="mb-6 flex items-center gap-3">
        <span className="rounded-lg bg-accent p-3 text-white">
          <Lock size={22} />
        </span>
        <div>
          <h1 className="text-2xl font-bold text-ink">Admin Login</h1>
          <p className="text-sm text-slate-500">Use your environment-configured credentials.</p>
        </div>
      </div>

      <label className="mb-4 block text-sm font-semibold text-slate-700">
        Username
        <input className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-3 outline-none focus:border-accent" value={username} onChange={(event) => setUsername(event.target.value)} type="email" required />
      </label>

      <label className="mb-4 block text-sm font-semibold text-slate-700">
        Password
        <input className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-3 outline-none focus:border-accent" value={password} onChange={(event) => setPassword(event.target.value)} type="password" required />
      </label>

      {message ? <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{message}</p> : null}

      <button disabled={loading} className="w-full rounded-lg bg-ink px-4 py-3 font-semibold text-white hover:bg-accent disabled:cursor-not-allowed disabled:opacity-60">
        {loading ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
