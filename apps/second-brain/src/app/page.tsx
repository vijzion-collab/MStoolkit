import Image from "next/image";

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-4">
      {/* HUD Header */}
      <header className="fixed top-0 left-0 w-full p-6 flex justify-between items-start pointer-events-none z-40">
        <div className="hud-panel p-4 animate-pulse-glow">
          <h2 className="text-cyan-accent font-mono text-sm tracking-widest">SYSTEM_VERSION: 2.0.26</h2>
          <p className="text-white/60 font-mono text-[10px]">AUTH_MODE: INFINITE_TAKEOVER</p>
        </div>
        <div className="hud-panel p-4 flex flex-col items-end">
          <div className="flex gap-2 items-center">
            <span className="w-2 h-2 rounded-full bg-cyan-accent animate-pulse" />
            <span className="text-cyan-accent font-mono text-xs uppercase">Restructuring In Progress</span>
          </div>
          <p className="text-white/40 font-mono text-[10px] mt-1">LATENCY: 12ms | SIGNAL: 99.9%</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl w-full z-10 flex flex-col items-center gap-12 text-center">
        <section className="space-y-6">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20 uppercase leading-none">
            Infinite <br />
            <span className="text-cyan-accent drop-shadow-[0_0_15px_rgba(0,242,255,0.5)]">Takeover</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/70 font-light leading-relaxed">
            The era of digital limitations is over. We are restructuring the future of interaction,
            bridging the gap between biological intent and silicon execution.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          <div className="hud-panel p-8 group hover:border-cyan-accent/60 transition-colors">
            <h3 className="text-cyan-accent font-bold mb-2 uppercase tracking-tight">Phase 01</h3>
            <p className="text-sm text-white/60">Global Core Integration & Infrastructure Scalability Test.</p>
            <div className="mt-4 h-1 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-cyan-accent w-full animate-pulse" />
            </div>
          </div>
          <div className="hud-panel p-8 group hover:border-cyan-accent/60 transition-colors">
            <h3 className="text-cyan-accent font-bold mb-2 uppercase tracking-tight">Phase 02</h3>
            <p className="text-sm text-white/60">Digital Consciousness Mapping & Advanced Agentic Autonomy.</p>
            <div className="mt-4 h-1 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-cyan-accent w-3/4" />
            </div>
          </div>
          <div className="hud-panel p-8 group hover:border-cyan-accent/60 transition-colors">
            <h3 className="text-cyan-accent font-bold mb-2 uppercase tracking-tight">Phase 03</h3>
            <p className="text-sm text-white/60">Infinite Takeover: Total Synchronicity Achievement.</p>
            <div className="mt-4 h-1 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-cyan-accent w-1/4" />
            </div>
          </div>
        </section>

        <section className="flex flex-col sm:flex-row gap-4 mt-8">
          <div className="flex gap-4">
            <button className="px-8 py-3 bg-cyan-600/20 border border-cyan-400/50 hover:bg-cyan-500/30 text-cyan-400 font-mono uppercase tracking-widest transition-all rounded flex items-center gap-2">
              Join the Takeover
            </button>
            <a href="/calculator" className="px-8 py-3 bg-pink-600/20 border border-pink-400/50 hover:bg-pink-500/30 text-pink-400 font-mono uppercase tracking-widest transition-all rounded flex items-center gap-2">
              Royalty Calculator
            </a>
          </div>
        </section>
      </main>

      {/* HUD Footer */}
      <footer className="fixed bottom-0 left-0 w-full p-6 flex justify-between items-end pointer-events-none z-40">
        <div className="hud-panel p-4">
          <p className="text-white/40 font-mono text-[10px]">© 2026 INFINITE_TAKEOVER_LABS</p>
        </div>
        <div className="hud-panel p-4 flex gap-8">
          <div className="flex flex-col">
            <span className="text-cyan-accent/40 font-mono text-[8px] uppercase">Processing</span>
            <span className="text-white/80 font-mono text-[10px]">STDN: ACTIVE</span>
          </div>
          <div className="flex flex-col">
            <span className="text-cyan-accent/40 font-mono text-[8px] uppercase">Memory</span>
            <span className="text-white/80 font-mono text-[10px]">128TB USED</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
