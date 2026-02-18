import React, { useState } from 'react';
import { Upload, PenTool, Eraser, Download, Maximize2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SignaturePad } from './components/SignaturePad';
import { ExtractionModule } from './components/ExtractionModule';

function App() {
  const [activeTab, setActiveTab] = useState<'draw' | 'extract' | 'view'>('draw');
  const [signature, setSignature] = useState<string | null>(null);

  const handleSignatureCapture = (dataUrl: string) => {
    setSignature(dataUrl);
    // Automatically switch to view tab after capture if signature exists
    setActiveTab('view');
  };

  return (
    <div className="flex h-screen bg-brand-black text-white font-mono overflow-hidden">
      {/* 90% Workspace */}
      <main className="flex-1 relative p-8 flex flex-col items-center justify-center border-r border-brand-acid/20">
        <header className="absolute top-8 left-8 flex flex-col gap-1">
          <h1 className="text-4xl font-black italic tracking-tighter text-brand-acid">
            SIGNATURE_OS v1.0
          </h1>
          <div className="flex items-center gap-2 text-xs text-brand-acid/60">
            <span className="w-2 h-2 bg-brand-acid animate-pulse" />
            SYSTEM_ACTIVE // {signature ? 'DATA_LOADED' : 'AWAITING_INPUT'}
          </div>
        </header>

        {/* Dynamic Content Area */}
        <div className="w-full max-w-4xl aspect-[4/3] brutalist-border bg-brand-acid/5 flex items-center justify-center relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="w-full h-full p-12"
            >
              {activeTab === 'draw' && (
                <SignaturePad onSave={handleSignatureCapture} />
              )}
              {activeTab === 'extract' && (
                <ExtractionModule onExtracted={handleSignatureCapture} />
              )}
              {activeTab === 'view' && (
                <div className="w-full h-full flex flex-col items-center justify-center gap-6 relative">
                  {!signature ? (
                    <div className="flex flex-col items-center gap-4 text-brand-acid/40">
                      <Maximize2 size={48} />
                      <p className="text-sm font-black tracking-widest uppercase">AWAITING_SIGNATURE_DATA</p>
                    </div>
                  ) : (
                    <div className="w-full h-full flex flex-col gap-6">
                      <div className="flex-1 brutalist-border bg-brand-acid/5 relative overflow-hidden flex items-center justify-center">
                        <p className="text-[10px] text-brand-acid/40 absolute top-4 left-4 uppercase tracking-widest">PLACEMENT_ENGINE_V1</p>
                        <img
                          src={signature}
                          alt="Signature"
                          className="max-h-[200px] object-contain drop-shadow-[0_0_8px_rgba(204,255,0,0.3)] transition-transform hover:scale-105 cursor-move"
                        />
                      </div>
                      <div className="flex justify-between items-center bg-brand-acid/10 p-4 brutalist-border border-brand-acid/20">
                        <div className="text-[10px] text-brand-acid font-black">
                          STATUS: VECTOR_READY // SRC: {activeTab.toUpperCase()}
                        </div>
                        <button className="px-6 py-2 bg-brand-acid text-brand-black text-[10px] font-black uppercase tracking-widest hover:brutalist-glow transition-all">
                          LOAD_DOCUMENT
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <footer className="absolute bottom-8 right-12 text-[10px] text-brand-acid/40 tracking-[0.2em]">
          INTEGRITY_VERIFIED // 2026_INFINITE_TAKEOVER
        </footer>
      </main>

      {/* 10% Control Strip */}
      <aside className="w-20 bg-brand-acid/5 flex flex-col items-center py-8 gap-12">
        <div className="flex flex-col gap-8">
          <ControlButton
            icon={<PenTool size={20} />}
            active={activeTab === 'draw'}
            onClick={() => setActiveTab('draw')}
            label="DRAW"
          />
          <ControlButton
            icon={<Upload size={20} />}
            active={activeTab === 'extract'}
            onClick={() => setActiveTab('extract')}
            label="XTRCT"
          />
          <ControlButton
            icon={<Maximize2 size={20} />}
            active={activeTab === 'view'}
            onClick={() => setActiveTab('view')}
            label="VIEW"
          />
        </div>

        <div className="mt-auto flex flex-col gap-8">
          <ControlButton icon={<Download size={20} />} label="SAVE" />
          <ControlButton icon={<X size={20} />} label="QUIT" />
        </div>
      </aside>
    </div>
  );
}

interface ControlButtonProps {
  icon: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  label: string;
}

function ControlButton({ icon, active, onClick, label }: ControlButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`group relative flex flex-col items-center gap-1 transition-all duration-300 ${active ? 'text-brand-acid' : 'text-white/40 hover:text-white'}`}
    >
      <div className={`p-3 brutalist-border transition-all duration-300 ${active ? 'bg-brand-acid/20 brutalist-glow' : 'bg-transparent group-hover:bg-white/10'}`}>
        {icon}
      </div>
      <span className="text-[8px] font-black tracking-widest">{label}</span>
      {active && (
        <motion.div
          layoutId="activeGlow"
          className="absolute inset-0 brutalist-glow -z-10"
        />
      )}
    </button>
  );
}

export default App;
