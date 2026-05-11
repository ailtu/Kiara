export default function LoginPage() {
    return (
        <main className="min-h-screen bg-zinc-950 text-white flex items-center justify-center p-6">
            <section className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl p-8">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold">Kiara</h1>
                    <p className="text-zinc-400 mt-2">
                        Login no seu organizador inteligente.
                    </p>
                </div>

                <div className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full rounded-2xl bg-zinc-800 border border-zinc-700 px-5 py-4 outline-none"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full rounded-2xl bg-zinc-800 border border-zinc-700 px-5 py-4 outline-none"
                    />

                    <button className="w-full rounded-2xl bg-white text-black py-4 font-semibold">
                       Login
                    </button>

                    <button className="w-full rounded-2xl border border-zinc-700 py-4">
                        Crie sua conta!
                    </button>
                </div>
            </section>
        </main>
    )
}