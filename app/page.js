"use client";

import Link from "next/link"
import Image from "next/image"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white flex items-center justify-center p-6">
      <div className="max-w-3xl text-center space-y-8">

        <div className="space-y-6 flex flex-col items-center">

          <Image
            src="/kiara_semfundo.png"
            alt="Kiara Logo"
            width={220}
            height={220}
            priority
          />

          <p className="text-zinc-400 text-xl">
            Seu organizador de tarefas inteligente!
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4">

          <Link href="/login">

            <button className="bg-white text-black px-8 py-4 rounded-2xl font-semibold hover:scale-105 transition">
              Iniciar
            </button>

          </Link>

        </div>
      </div>
    </main>
  )
}