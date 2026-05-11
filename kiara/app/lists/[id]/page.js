const tasks = [
    'Dar comida ao gato',
    'Organizar a casa',
    'Lavar o carro',
    'Tomar banho',
    'Jogar videogame',
]

export default function ListDetailsPage() {
    return (
        <main className="min-h-screen bg-zinc-950 text-white p-6 md:p-10">
            <div className="max-w-5xl mx-auto space-y-8">

                <div>
                    <h1 className="text-5xl font-bold">
                        Daily Routine
                    </h1>

                    <p className="text-zinc-400 mt-2">
                        AI-organized tasks.
                    </p>
                </div>

                <section className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-5">

                    <div>
                        <h2 className="text-2xl font-semibold">
                            Brain Dump
                        </h2> <p className="text-zinc-400 mt-1">
                            Write naturally and let Kiara organize it.
                        </p>
                    </div>

                    <textarea
                        defaultValue="lavar o carro, tomar banho, jogar video game, organizar a casa e comida ao gato"
                        className="w-full h-40 rounded-2xl bg-zinc-800 border border-zinc-700 p-4 resize-none outline-none"
                    />

                    <button className="bg-white text-black px-6 py-4 rounded-2xl font-semibold">
                        Organize with AI
                    </button>
                </section>

                <section className="space-y-4">
                    {tasks.map((task, index) => (
                        <div
                            key={task}
                            className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 flex items-center justify-between"
                        >
                            <div className="flex items-center gap-4">

                                <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center font-bold">
                                    {index + 1}
                                </div>

                                <div>
                                    <h3 className="text-lg font-medium">
                                        {task}
                                    </h3>

                                    <p className="text-zinc-400 text-sm mt-1">
                                        Estimated time: {10 + index * 5} minutes
                                    </p>
                                </div>
                            </div>

                            <input type="checkbox" className="w-5 h-5" />
                        </div>
                    ))}
                </section>
            </div>
        </main>
    )
}