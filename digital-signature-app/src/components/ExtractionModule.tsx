import React, { useState, useRef } from 'react';
import { Upload, Scan, Scissors, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface ExtractionModuleProps {
    onExtracted: (dataUrl: string) => void;
}

export const ExtractionModule: React.FC<ExtractionModuleProps> = ({ onExtracted }) => {
    const [image, setImage] = useState<string | null>(null);
    const [processing, setProcessing] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => setImage(e.target?.result as string);
            reader.readAsDataURL(file);
        }
    };

    const extractSignature = () => {
        if (!image || !canvasRef.current) return;
        setProcessing(true);

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const img = new Image();

        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            if (!ctx) return;

            ctx.drawImage(img, 0, 0);
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;

            // Extract high-contrast elements (ink) and make paper (light) transparent
            for (let i = 0; i < data.length; i += 4) {
                const r = data[i];
                const g = data[i + 1];
                const b = data[i + 2];

                // Simple thresholding: if it's light (paper), make it transparent
                // If it's dark (ink), keep it and force it to be pure black for clarity
                const brightness = (r + g + b) / 3;
                if (brightness > 180) {
                    data[i + 3] = 0; // Transparent
                } else {
                    // Force ink to Brand Acid green or Pure Black? 
                    // Let's go with Acid Green for the "Cyber" look
                    data[i] = 204;   // R
                    data[i + 1] = 255; // G
                    data[i + 2] = 0;   // B
                    data[i + 3] = 255; // Opaque
                }
            }

            ctx.putImageData(imageData, 0, 0);
            onExtracted(canvas.toDataURL('image/png'));
            setProcessing(false);
        };
        img.src = image;
    };

    return (
        <div className="w-full h-full flex flex-col gap-6">
            {!image ? (
                <label className="flex-1 brutalist-border border-dashed border-brand-acid/40 bg-brand-acid/5 flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-brand-acid/10 transition-all duration-300 group">
                    <Upload size={48} className="text-brand-acid/40 group-hover:text-brand-acid group-hover:scale-110 transition-all duration-500" />
                    <div className="text-center">
                        <p className="text-sm font-black tracking-widest">UPLOAD_SPECIMEN_FILE</p>
                        <p className="text-[10px] opacity-40 uppercase tracking-tighter">PNG, JPG // HIGH_CONTRAST_RECOMMENDED</p>
                    </div>
                    <input type="file" className="hidden" onChange={handleUpload} accept="image/*" />
                </label>
            ) : (
                <div className="flex-1 relative brutalist-border bg-black/40 overflow-hidden">
                    <img src={image} alt="Specimen" className="w-full h-full object-contain opacity-40 grayscale" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                            animate={{ y: [-20, 20] }}
                            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                            className="w-full h-[1px] bg-brand-acid shadow-[0_0_15px_#CCFF00]"
                        />
                    </div>
                    <div className="absolute top-4 right-4">
                        <button
                            onClick={() => setImage(null)}
                            className="p-2 bg-brand-black brutalist-border text-brand-acid hover:bg-brand-acid hover:text-brand-black transition-all"
                        >
                            <Scissors size={18} />
                        </button>
                    </div>
                </div>
            )}

            <canvas ref={canvasRef} className="hidden" />

            <div className="flex justify-end gap-4">
                <button
                    onClick={extractSignature}
                    disabled={!image || processing}
                    className={`px-8 py-2 bg-brand-acid text-brand-black transition-all duration-300 flex items-center gap-2 text-xs font-black tracking-widest ${(!image || processing) ? 'opacity-20 grayscale cursor-not-allowed' : 'hover:brutalist-glow'}`}
                >
                    {processing ? <Scan className="animate-spin" size={14} /> : <Scissors size={14} />}
                    {processing ? 'ISOLATING_VECTORS...' : 'START_EXTRACTION'}
                </button>
            </div>
        </div>
    );
};
