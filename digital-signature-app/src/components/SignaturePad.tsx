import React, { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { Eraser, Trash2, CheckCircle2 } from 'lucide-react';

interface SignaturePadProps {
    onSave: (dataUrl: string) => void;
}

export const SignaturePad: React.FC<SignaturePadProps> = ({ onSave }) => {
    const sigCanvas = useRef<SignatureCanvas>(null);
    const [isEmpty, setIsEmpty] = useState(true);

    const clear = () => {
        sigCanvas.current?.clear();
        setIsEmpty(true);
    };

    const save = () => {
        if (sigCanvas.current && !sigCanvas.current.isEmpty()) {
            onSave(sigCanvas.current.getTrimmedCanvas().toDataURL('image/png'));
        }
    };

    return (
        <div className="w-full h-full flex flex-col gap-6">
            <div className="flex-1 brutalist-border bg-black/40 relative group">
                <SignatureCanvas
                    ref={sigCanvas}
                    penColor="#CCFF00"
                    canvasProps={{
                        className: "w-full h-full cursor-crosshair",
                    }}
                    onBegin={() => setIsEmpty(false)}
                />

                {/* Floating Tooltips */}
                <div className="absolute top-4 left-4 flex gap-2">
                    <div className="px-2 py-1 bg-brand-acid text-brand-black text-[10px] font-black uppercase">
                        VECTOR_INPUT
                    </div>
                    <div className="px-2 py-1 border border-brand-acid/40 text-brand-acid text-[10px] font-black uppercase">
                        PRESSURE_SENSITIVE
                    </div>
                </div>

                <AnimatePresence>
                    {isEmpty && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20"
                        >
                            <p className="text-2xl font-black italic tracking-widest text-brand-acid">DRAW_SPECIMEN_HERE</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="flex justify-end gap-4">
                <button
                    onClick={clear}
                    className="px-6 py-2 border border-brand-acid/20 text-white/60 hover:text-brand-acid hover:border-brand-acid transition-all duration-300 flex items-center gap-2 text-xs font-black tracking-widest"
                >
                    <Trash2 size={14} /> WIPE_MEMORY
                </button>
                <button
                    onClick={save}
                    disabled={isEmpty}
                    className={`px-8 py-2 bg-brand-acid text-brand-black transition-all duration-300 flex items-center gap-2 text-xs font-black tracking-widest ${isEmpty ? 'opacity-20 grayscale cursor-not-allowed' : 'hover:brutalist-glow'}`}
                >
                    <CheckCircle2 size={14} /> COMMIT_VECTOR
                </button>
            </div>
        </div>
    );
};

import { motion, AnimatePresence } from 'framer-motion';
