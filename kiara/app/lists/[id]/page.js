"use client"

import { useEffect, useState } from "react"

import { api } from "../../../services/api"

export default function ListPage({ params }) {

    const listId = params.id

    const [tasks, setTasks] = useState([])

    const [taskText, setTaskText] = useState("")

    const [editingId, setEditingId] = useState(null)

    const [editingText, setEditingText] = useState("")

    async function loadTasks() {

        const data = await api(`/tasks/${listId}`)

        setTasks(data)
    }

    async function createTask() {

        if (!taskText) return

        await api("/tasks", {
            method: "POST",
            body: JSON.stringify({
                originalText: taskText,
                listId,
            }),
        })

        setTaskText("")

        loadTasks()
    }

    async function toggleTask(id) {

        await api(`/tasks/${id}/toggle`, {
            method: "PATCH",
        })

        loadTasks()
    }

    async function deleteTask(id) {

        await api(`/tasks/${id}`, {
            method: "DELETE",
        })

        loadTasks()
    }

    async function updateTask(id) {

        await api(`/tasks/${id}`, {
            method: "PUT",
            body: JSON.stringify({
                originalText: editingText,
            }),
        })

        setEditingId(null)

        loadTasks()
    }

    useEffect(() => {
        loadTasks()
    }, [])

    return (
        <main className="min-h-screen bg-zinc-950 text-white p-6 md:p-10">

            <div className="max-w-5xl mx-auto space-y-8">

                <div>
                    <h1 className="text-5xl font-bold">
                        Tarefas
                    </h1>
                </div>

                <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-4">

                    <input
                        type="text"
                        placeholder="Nova Tarefa"
                        value={taskText}
                        onChange={(e) => setTaskText(e.target.value)}
                        className="w-full rounded-2xl bg-zinc-800 border border-zinc-700 px-5 py-4 outline-none"
                    />

                    <button
                        onClick={createTask}
                        className="bg-white text-black px-6 py-4 rounded-2xl font-semibold"
                    >
                        Add Tarefa
                    </button>

                </div>

                <div className="space-y-4">

                    {tasks.map((task) => (

                        <div
                            key={task.id}
                            className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6"
                        >

                            {editingId === task.id ? (

                                <div className="space-y-4">

                                    <input
                                        type="text"
                                        value={editingText}
                                        onChange={(e) => setEditingText(e.target.value)}
                                        className="w-full rounded-2xl bg-zinc-800 border border-zinc-700 px-5 py-4 outline-none"
                                    />

                                    <button
                                        onClick={() => updateTask(task.id)}
                                        className="bg-white text-black px-5 py-3 rounded-2xl"
                                    >
                                        Salvar
                                    </button>

                                </div>

                            ) : (

                                <div className="space-y-4">

                                    <div className="flex items-center justify-between">

                                        <h2
                                            className={`text-2xl font-semibold ${task.completed
                                                ? "line-through text-zinc-500"
                                                : ""
                                                }`}
                                        >
                                            {task.originalText}
                                        </h2>

                                        <button
                                            onClick={() => toggleTask(task.id)}
                                            className={`px-5 py-3 rounded-2xl ${task.completed
                                                ? "bg-green-500"
                                                : "bg-zinc-800"
                                                }`}
                                        >
                                            {task.completed
                                                ? "Completed"
                                                : "Pending"}
                                        </button>

                                    </div>

                                    <div className="flex gap-4">

                                        <button
                                            onClick={() => {
                                                setEditingId(task.id)
                                                setEditingText(task.originalText)
                                            }}
                                            className="bg-zinc-800 px-5 py-3 rounded-2xl"
                                        >
                                            Editar
                                        </button>

                                        <button
                                            onClick={() => deleteTask(task.id)}
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