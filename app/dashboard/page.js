"use client"

import { useEffect, useState } from "react"

import Link from "next/link"

import { api } from "../../services/api"

export default function DashboardPage() {

  const [lists, setLists] = useState([])

  const [title, setTitle] = useState("")

  const [editingId, setEditingId] = useState(null)

  const [editingTitle, setEditingTitle] =
    useState("")

  async function loadLists() {

    const data = await api("/lists")

    setLists(data)
  }

  async function createList() {

    if (!title) return

    await api("/lists", {
      method: "POST",

      body: JSON.stringify({
        title,
      }),
    })

    setTitle("")

    loadLists()
  }

  async function deleteList(id) {

    await api(`/lists/${id}`, {
      method: "DELETE",
    })

    loadLists()
  }

  async function updateList(id) {

    await api(`/lists/${id}`, {
      method: "PUT",

      body: JSON.stringify({
        title: editingTitle,
      }),
    })

    setEditingId(null)

    loadLists()
  }

  useEffect(() => {
    loadLists()
  }, [])

  return (
    <main className="min-h-screen bg-zinc-950 text-white p-6">

      <div className="max-w-5xl mx-auto space-y-8">

        <div>

          <h1 className="text-5xl font-bold">
            Kiara
          </h1>

        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-4">

          <input
            type="text"
            placeholder="Dê um nome a sua lista aqui"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-4 outline-none"
          />

          <button
            onClick={createList}
            className="bg-white text-black px-6 py-4 rounded-2xl font-semibold"
          >
            Criar lista
          </button>

        </div>

        <div className="space-y-4">

          {lists.map((list) => (

            <div
              key={list.id}
              className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6"
            >

              {editingId === list.id ? (

                <div className="space-y-4">

                  <input
                    type="text"
                    value={editingTitle}
                    onChange={(e) =>
                      setEditingTitle(e.target.value)
                    }
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl px-5 py-4 outline-none"
                  />

                  <button
                    onClick={() =>
                      updateList(list.id)
                    }
                    className="bg-white text-black px-5 py-3 rounded-2xl"
                  >
                    Salvar
                  </button>

                </div>

              ) : (

                <div className="flex items-center justify-between">

                  <Link href={`/lists/${list.id}`}>

                    <h2 className="text-2xl font-semibold hover:text-zinc-400 transition cursor-pointer">

                      {list.title}

                    </h2>

                  </Link>

                  <div className="flex gap-4">

                    <button
                      onClick={() => {
                        setEditingId(list.id)
                        setEditingTitle(list.title)
                      }}
                      className="bg-zinc-800 px-5 py-3 rounded-2xl"
                    >
                      Editar
                    </button>

                    <button
                      onClick={() =>
                        deleteList(list.id)
                      }
                      className="bg-red-500 px-5 py-3 rounded-2xl"
                    >
                      Excluir
                    </button>

                  </div>

                </div>

              )}

            </div>

          ))}

        </div>

      </div>

    </main>
  )
}