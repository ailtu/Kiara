"use client";

import { useState } from "react"
import { useRouter } from "next/navigation"

import { api } from "../../services/api"

export default function RegisterPage() {

    const router = useRouter()

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    async function handleRegister() {

        const data = await api("/register", {
            method: "POST",
            body: JSON.stringify({
                name,
                email,
                password,
            }),
        })

        if (data.id) {
            router.push("/login")
        } else {
            alert(data.error)
        }
    }

    return (
        <main className="min-h-screen bg-zinc-950 text-white flex items-center justify-center p-6">

            <section className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl p-8 space-y-4">

                <div>
                    <h1 className="text-4xl font-semibold">
                        Para criar sua conta,
                    </h1>

                    <p className="text-zinc-400 mt-2">
                        Precisamos de uns dados...
                    </p>
                </div>

                <input
                    type="text"
                    placeholder="Seu Nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-4 outline-none"
                />

                <input
                    type="email"
                    placeholder="Seu Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-4 outline-none"
                />

                <input
                    type="password"
                    placeholder="Crie uma senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-4 outline-none"
                />

                <button
                    onClick={handleRegister}
                    className="w-full bg-white text-black rounded-2xl py-4 font-semibold"
                >
                    Criar conta!
                </button>

            </section>
        </main>
    )
}