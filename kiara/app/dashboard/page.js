const lists = [
    'Daily Routine',
    'University Tasks',
    'Work Projects',
    'Weekend Goals',
]

export default function DashboardPage() {
    return (
        <main className="min-h-screen bg-zinc-950 text-white p-6 md:p-10">
            <div className="max-w-6xl mx-auto">

                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h1 className="text-5xl font-bold">Dashboard</h1>
                        <p className="text-zinc-400 mt-2">
                            Manage all your intelligent lists.
                        </p>
                    </div>

                    <button className="bg-white text-black px-6 py-3 rounded-2xl font-semibold">
                        + New List
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {lists.map((list) => (
                        <div
                            key={list}
                            className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 cursor-pointer hover:border-white transition"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-2xl font-semibold">
                                        {list}
                                    </h2>

                                    <p className="text-zinc-400 mt-2">
                                        12 tasks available
                                    </p>
                                </div>

                                <span className="text-3xl text-zinc-500">
                                    →
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    )
}