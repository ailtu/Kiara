"use client"

import { useEffect, useState } from "react"
import { api } from "../../../services/api"

const PRIORITY_LABEL = { 1: "Alta", 2: "Média", 3: "Baixa" }
const PRIORITY_COLOR = {
  1: "bg-red-500/20 text-red-400 border border-red-500/30",
  2: "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30",
  3: "bg-zinc-700 text-zinc-400 border border-zinc-600",
}
const CATEGORY_COLOR = {
  estudo: "bg-blue-500/20 text-blue-400",
  trabalho: "bg-purple-500/20 text-purple-400",
  pessoal: "bg-pink-500/20 text-pink-400",
  saude: "bg-green-500/20 text-green-400",
  financeiro: "bg-orange-500/20 text-orange-400",
  outro: "bg-zinc-700 text-zinc-400",
}

export default function ListPage({ params }) {

  const listId = params.id

  const [tasks, setTasks] = useState([])
  const [taskText, setTaskText] = useState("")
  const [editingId, setEditingId] = useState(null)
  const [editingText, setEditingText] = useState("")

  const [aiText, setAiText] = useState("")
  const [aiLoading, setAiLoading] = useState(false)
  const [aiPreview, setAiPreview] = useState(null)
  const [aiMode, setAiMode] = useState(false)

  async function loadTasks() {
    const data = await api(`/tasks/${listId}`)
    setTasks(data)
  }

  async function createTask() {
    if (!taskText) return
    await api("/tasks", {
      method: "POST",
      body: JSON.stringify({ originalText: taskText, listId }),
    })
    setTaskText("")
    loadTasks()
  }

  async function toggleTask(id) {
    await api(`/tasks/${id}/toggle`, { method: "PATCH" })
    loadTasks()
  }

  async function deleteTask(id) {
    await api(`/tasks/${id}`, { method: "DELETE" })
    loadTasks()
  }

  async function updateTask(id) {
    await api(`/tasks/${id}`, {
      method: "PUT",
      body: JSON.stringify({ originalText: editingText }),
    })
    setEditingId(null)
    loadTasks()
  }

  async function handleAiOrganize() {
    if (!aiText.trim()) return
    setAiLoading(true)
    setAiPreview(null)
    try {
      const data = await api("/ai", {
        method: "POST",
        body: JSON.stringify({ text: aiText }),
      })
      if (data.tasks) {
        const sorted = [...data.tasks].sort((a, b) => (a.order ?? 99) - (b.order ?? 99))
        setAiPreview(sorted)
      } else {
        alert("A IA não conseguiu processar o texto. Tente novamente.")
      }
    } catch {
      alert("Erro ao contatar a IA.")
    } finally {
      setAiLoading(false)
    }
  }

  async function handleConfirmAiTasks() {
    if (!aiPreview) return
    for (const task of aiPreview) {
      await api("/tasks", {
        method: "POST",
        body: JSON.stringify({
          originalText: task.originalText,
          normalizedText: task.normalizedText,
          listId,
          priority: task.priority,
          estimatedMinutes: task.estimatedMinutes,
        }),
      })
    }
    setAiPreview(null)
    setAiText("")
    setAiMode(false)
    loadTasks()
  }

  useEffect(() => { loadTasks() }, [])

  return (
    <main className="min-h-screen bg-zinc-950 text-white p-6 md:p-10">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-5xl font-bold">Tarefas</h1>
          <button
            onClick={() => { setAiMode(!aiMode); setAiPreview(null) }}
            className={`px-5 py-3 rounded-2xl font-semibold transition ${aiMode ? "bg-violet-600 text-white" : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
              }`}
          >
            ✦ Organizar com IA
          </button>
        </div>

        {/* Modo IA */}
        {aiMode && (
          <div className="bg-zinc-900 border border-violet-500/40 rounded-3xl p-6 space-y-4">
            <div>
              <p className="text-violet-400 font-semibold mb-1">✦ Modo IA</p>
              <p className="text-zinc-400 text-sm">
                Escreva suas tarefas em texto livre. A IA organiza com prioridade, categoria, tempo estimado e ordem de execução.
              </p>
            </div>

            <textarea
              placeholder="Ex: estudar para a prova de cálculo, reunião com equipe às 15h, comprar leite..."
              value={aiText}
              onChange={(e) => setAiText(e.target.value)}
              rows={4}
              className="w-full rounded-2xl bg-zinc-800 border border-zinc-700 px-5 py-4 outline-none resize-none text-white placeholder-zinc-500"
            />

            <button
              onClick={handleAiOrganize}
              disabled={aiLoading}
              className="bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white px-6 py-4 rounded-2xl font-semibold transition"
            >
              {aiLoading ? "Organizando..." : "✦ Organizar tarefas"}
            </button>

            {/* Preview */}
            {aiPreview && (
              <div className="space-y-4 pt-2">
                <p className="text-zinc-400 text-sm">
                  A IA sugeriu <span className="text-white font-semibold">{aiPreview.length} tarefas</span>. Confirme para adicionar:
                </p>

                {aiPreview.map((task, i) => (
                  <div key={i} className="bg-zinc-800 border border-zinc-700 rounded-2xl p-4 space-y-2">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-semibold text-white">{task.normalizedText}</p>
                        {task.normalizedText !== task.originalText && (
                          <p className="text-zinc-500 text-sm">Original: "{task.originalText}"</p>
                        )}
                      </div>
                      <span className="text-zinc-500 text-sm shrink-0">#{task.order}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className={`text-xs px-3 py-1 rounded-full font-medium ${PRIORITY_COLOR[task.priority]}`}>
                        Prioridade {PRIORITY_LABEL[task.priority] ?? task.priority}
                      </span>
                      <span className={`text-xs px-3 py-1 rounded-full font-medium capitalize ${CATEGORY_COLOR[task.category] ?? "bg-zinc-700 text-zinc-400"}`}>
                        {task.category}
                      </span>
                      <span className="text-xs px-3 py-1 rounded-full bg-zinc-700 text-zinc-400">
                        ⏱ ~{task.estimatedMinutes} min
                      </span>
                    </div>
                  </div>
                ))}

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={handleConfirmAiTasks}
                    className="bg-violet-600 hover:bg-violet-500 text-white px-6 py-3 rounded-2xl font-semibold transition"
                  >
                    Confirmar e adicionar
                  </button>
                  <button
                    onClick={() => setAiPreview(null)}
                    className="bg-zinc-800 text-zinc-400 px-6 py-3 rounded-2xl transition hover:bg-zinc-700"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Adicionar tarefa manual */}
        {!aiMode && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-4">
            <input
              type="text"
              placeholder="Nova Tarefa"
              value={taskText}
              onChange={(e) => setTaskText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && createTask()}
              className="w-full rounded-2xl bg-zinc-800 border border-zinc-700 px-5 py-4 outline-none"
            />
            <button
              onClick={createTask}
              className="bg-white text-black px-6 py-4 rounded-2xl font-semibold"
            >
              Add Tarefa
            </button>
          </div>
        )}

        {/* Lista de tarefas */}
        <div className="space-y-4">
          {tasks.map((task) => (
            <div key={task.id} className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6">

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
                    <h2 className={`text-2xl font-semibold ${task.completed ? "line-through text-zinc-500" : ""}`}>
                      {task.normalizedText || task.originalText}
                    </h2>
                    <button
                      onClick={() => toggleTask(task.id)}
                      className={`px-5 py-3 rounded-2xl ${task.completed ? "bg-green-500" : "bg-zinc-800"}`}
                    >
                      {task.completed ? "Completed" : "Pending"}
                    </button>
                  </div>

                  {(task.priority || task.estimatedMinutes) && (
                    <div className="flex flex-wrap gap-2">
                      {task.priority && (
                        <span className={`text-xs px-3 py-1 rounded-full font-medium ${PRIORITY_COLOR[task.priority] ?? "bg-zinc-700 text-zinc-400"}`}>
                          Prioridade {PRIORITY_LABEL[task.priority] ?? task.priority}
                        </span>
                      )}
                      {task.estimatedMinutes && (
                        <span className="text-xs px-3 py-1 rounded-full bg-zinc-700 text-zinc-400">
                          ⏱ ~{task.estimatedMinutes} min
                        </span>
                      )}
                    </div>
                  )}

                  <div className="flex gap-4">
                    <button
                      onClick={() => { setEditingId(task.id); setEditingText(task.originalText) }}
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
