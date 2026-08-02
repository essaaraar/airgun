export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 p-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header */}
        <header className="border-b border-neutral-800 pb-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">AIrGun OS</h1>
            <p className="text-sm text-neutral-400 mt-1">Personal Founder's Operating System & Content Intelligence Platform</p>
          </div>
          <span className="px-3 py-1 text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full">
            ● System Active
          </span>
        </header>

        {/* Crew Status Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 shadow-sm">
            <h3 className="text-sm font-medium text-neutral-400">Active Protocol</h3>
            <p className="text-2xl font-semibold text-white mt-2">Seven-Phase Crew</p>
            <p className="text-xs text-neutral-500 mt-1">Autonomous human-AI collaboration</p>
          </div>

          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 shadow-sm">
            <h3 className="text-sm font-medium text-neutral-400">Mission Focus</h3>
            <p className="text-2xl font-semibold text-white mt-2">Content Intelligence</p>
            <p className="text-xs text-neutral-500 mt-1">Streamlining ideation to shipping</p>
          </div>

          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 shadow-sm">
            <h3 className="text-sm font-medium text-neutral-400">Architecture</h3>
            <p className="text-2xl font-semibold text-white mt-2">Modular AI Crew</p>
            <p className="text-xs text-neutral-500 mt-1">Architects, Engineers & Researchers</p>
          </div>
        </section>

        {/* Console / Mission Log */}
        <section className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Command Center Log</h2>
          <div className="bg-neutral-950 rounded-lg p-4 font-mono text-xs text-neutral-300 space-y-2 border border-neutral-800/80">
            <p className="text-emerald-400">[System]: AIrGun framework initialized successfully.</p>
            <p>[Constitution]: Human decision-making and transparency protocols engaged.</p>
            <p className="text-neutral-500">[Ready]: Awaiting next deployment sequence...</p>
          </div>
        </section>

      </div>
    </main>
  );
}