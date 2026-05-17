"use client";

import { useEffect, useState } from "react"

import { api } from "../../services/api"

export default function DashboardPage() {
  const [lists, setLists] = useState([])
  const [title, setTitle] = useState("")

  async function loadLists() {
    const data = await api("/lists")

    setLists(data)
  }

  async function createList() {
    await api("/lists", {
      method: "POST",
      body: JSON.stringify({
        title,
      }),
    })

    setTitle("")

    loadLists()
  }

  useEffect(() => {
    loadLists()
  }, [])

  return (
    <main className="min-h-screen bg-zinc-950 text-white p-6 md:p-10">

      <div className="max-w-6xl mx-auto space-y-8">

        <div className="flex items-center justify-between">

          <div>
            <h1 className="text-5xl font-bold">
              Dashboard
            </h1>

            <p className="text-zinc-400 mt-2">
              Your lists stored in PostgreSQL.
            </p>
          </div>

        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-4">

          <input
            type="text"
            placeholder="New list title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-2xl bg-zinc-800 border border-zinc-700 px-5 py-4 outline-none"
          />

          <button
            onClick={createList}
            className="bg-white text-black px-6 py-4 rounded-2xl font-semibold"
          >
            Create List
          </button>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {lists.map((list) => (
            <div
              key={list.id}
              className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6"
            >
              <h2 className="text-2xl font-semibold">
                {list.title}
              </h2>

              <p className="text-zinc-400 mt-2">
                ID: {list.id}
              </p>
            </div>
          ))}

        </div>
      </div>
    </main>
  )
}