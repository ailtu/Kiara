"use client";

import { useState } from "react"
import { useRouter } from "next/navigation"

import { api } from "../../services/api"

export default function LoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  async function handleLogin() {
    const data = await api("/login", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
    })

    if (data.token) {
      localStorage.setItem("token", data.token)

      router.push("/dashboard")
    } else {
      alert(data.error)
    }
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white flex items-center justify-center p-6">
      <section className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl p-8">

        <div className="mb-8">

          <p className="text-zinc-400 mt-2">
            Primeiro faça login em nosso Workspace
          </p>
        </div>

        <div className="space-y-4">

          <input
            type="email"
            placeholder="Seu Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-2xl bg-zinc-800 border border-zinc-700 px-5 py-4 outline-none"
          />

          <input
            type="password"
            placeholder="Sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-2xl bg-zinc-800 border border-zinc-700 px-5 py-4 outline-none"
          />

          <button
            onClick={handleLogin}
            className="w-full rounded-2xl bg-white text-black py-4 font-semibold"
          >
            Fazer Login
          </button>

          <button
            onClick={() => router.push("/register")}
            className="w-full text-zinc-400"
          >
            Criar Conta
          </button>

        </div>
      </section>
    </main>
  )
}