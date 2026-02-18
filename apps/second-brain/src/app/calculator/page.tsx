'use client';

import { useState, useEffect, useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { calculateFullState, updateByMonetary, updateByPercentage, RoyaltyState } from '@/lib/royalty-calc';

export default function CalculatorPage() {
    const reportRef = useRef<HTMLDivElement>(null);
    const [state, setState] = useState<RoyaltyState>(() => calculateFullState({}));

    const handlePctChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setState(prev => updateByPercentage(prev, name as keyof RoyaltyState, parseFloat(value) || 0));
    };

    const handleDollarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setState(prev => updateByMonetary(prev, name as keyof RoyaltyState, parseFloat(value) || 0));
    };

    const handleRateStreamsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const numValue = parseFloat(value) || 0;
        const next = { ...state, [name]: numValue };
        if (name === 'rate' || name === 'streams') {
            next.totalRevenue = next.rate * next.streams;
        }
        setState(calculateFullState(next));
    };

    const exportPDF = async () => {
        if (!reportRef.current) return;
        const canvas = await html2canvas(reportRef.current, { backgroundColor: '#030712', scale: 2 });
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('Infinite-Takeover-Royalty-Report.pdf');
    };

    const formatCurrency = (val: number) =>
        new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);

    return (
        <div className="min-h-screen p-8 text-cyan-50">
            <div className="max-w-6xl mx-auto space-y-8">
                <header className="border-b border-cyan-500/30 pb-4 flex justify-between items-end">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-500 animate-pulse-glow">
                            INTERCHANGEABLE ROYALTY ENGINE
                        </h1>
                        <p className="text-cyan-300/60 font-mono text-sm uppercase tracking-widest mt-2">
                            Status: Bi-Directional Logic Active // Multi-Anchor Enabled
                        </p>
                    </div>
                    <div className="flex gap-4 mb-2">
                        <button onClick={exportPDF} className="px-6 py-2 bg-pink-600/20 border border-pink-400/50 hover:bg-pink-500/30 text-pink-400 font-mono text-xs uppercase tracking-widest rounded transition-all">
                            Export Report
                        </button>
                        <a href="/calculator-portable.html" download className="px-6 py-2 bg-cyan-600/20 border border-cyan-400/50 hover:bg-cyan-500/30 text-cyan-400 font-mono text-xs uppercase tracking-widest rounded transition-all">
                            Offline File
                        </a>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8" ref={reportRef}>
                    {/* Main Controls */}
                    <section className="lg:col-span-1 space-y-6 bg-black/40 backdrop-blur-md border border-cyan-500/20 p-6 rounded-lg shadow-[0_0_20px_rgba(6,182,212,0.1)]">
                        <h2 className="text-sm font-mono text-cyan-400 uppercase tracking-widest border-b border-cyan-500/10 pb-2 mb-4">Master Parameters</h2>
                        <DualInput label="Rate Per Stream" name="rate" value={state.rate} step={0.0001} onChange={handleRateStreamsChange} prefix="$" />
                        <DualInput label="Total Streams" name="streams" value={state.streams} step={1000} onChange={handleRateStreamsChange} />
                        <DualInput label="Gross Revenue" name="totalRevenue" value={state.totalRevenue} onChange={handleDollarChange} prefix="$" highlight />
                    </section>

                    {/* Master Splits */}
                    <section className="lg:col-span-1 space-y-6 bg-black/40 backdrop-blur-md border border-cyan-500/20 p-6 rounded-lg">
                        <h2 className="text-sm font-mono text-cyan-400 uppercase tracking-widest border-b border-cyan-500/10 pb-2 mb-4">Master Revenue Splits</h2>
                        <InterchangeableRow
                            label="Artist Masters"
                            pctName="artistMasterPct" pctValue={state.artistMasterPct} onPctChange={handlePctChange}
                            valName="artistMasterTotal" valValue={state.artistMasterTotal} onValChange={handleDollarChange}
                        />
                        <InterchangeableRow
                            label="Producer Masters"
                            pctName="producerMasterPct" pctValue={state.producerMasterPct} onPctChange={handlePctChange}
                            valName="producerMasterTotal" valValue={state.producerMasterTotal} onValChange={handleDollarChange}
                        />
                        <div className="flex justify-between items-center p-3 bg-cyan-950/20 border border-cyan-500/10 rounded">
                            <span className="text-xs font-mono text-cyan-400/60 uppercase">Label Split (Auto)</span>
                            <div className="text-right">
                                <div className="text-cyan-100 font-mono">{Math.round(state.labelMasterPct)}%</div>
                                <div className="text-cyan-400/80 font-mono text-sm">{formatCurrency(state.labelMasterTotal)}</div>
                            </div>
                        </div>
                    </section>

                    {/* Publishing Splits */}
                    <section className="lg:col-span-1 space-y-6 bg-black/40 backdrop-blur-md border border-pink-500/20 p-6 rounded-lg shadow-[0_0_20px_rgba(236,72,153,0.1)]">
                        <h2 className="text-sm font-mono text-pink-400 uppercase tracking-widest border-b border-pink-500/10 pb-2 mb-4">Publishing Splits</h2>
                        <InterchangeableRow
                            label="Total Publishing" color="pink"
                            pctName="publishingPct" pctValue={state.publishingPct} onPctChange={handlePctChange}
                            valName="publishingTotal" valValue={state.publishingTotal} onValChange={handleDollarChange}
                        />
                        <InterchangeableRow
                            label="Admin Fees" color="pink"
                            pctName="adminPubPct" pctValue={state.adminPubPct} onPctChange={handlePctChange}
                            valName="adminPubTotal" valValue={state.adminPubTotal} onValChange={handleDollarChange}
                        />
                        <InterchangeableRow
                            label="Artist share of Pub" color="pink"
                            pctName="artistPubSharePct" pctValue={state.artistPubSharePct} onPctChange={handlePctChange}
                            valName="artistPubTotal" valValue={state.artistPubTotal} onValChange={handleDollarChange}
                        />
                        <div className="pt-4 border-t border-pink-500/10 flex justify-between items-center">
                            <span className="text-xs font-mono text-pink-400/60 uppercase">Other Writers</span>
                            <span className="text-pink-100 font-mono">{formatCurrency(state.otherPubTotal)}</span>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

function DualInput({ label, name, value, onChange, prefix = "", step = 1, highlight = false }: any) {
    return (
        <div className="space-y-1">
            <label className="text-[10px] font-mono text-cyan-400/60 uppercase tracking-tighter">{label}</label>
            <div className="relative">
                {prefix && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-400/40 font-mono text-sm">{prefix}</span>}
                <input
                    type="number" name={name} value={value} step={step} onChange={onChange}
                    className={`w-full bg-black/40 border ${highlight ? 'border-pink-500/40 text-pink-200' : 'border-cyan-500/20 text-cyan-100'} ${prefix ? 'pl-8' : 'px-3'} py-2 rounded font-mono text-sm focus:outline-none focus:border-cyan-400 transition-all`}
                />
            </div>
        </div>
    )
}

function InterchangeableRow({ label, pctName, pctValue, onPctChange, valName, valValue, onValChange, color = "cyan" }: any) {
    const theme = color === 'cyan' ? 'border-cyan-500/20 text-cyan-400' : 'border-pink-500/20 text-pink-400';
    const inputTheme = color === 'cyan' ? 'border-cyan-500/20 focus:border-cyan-400' : 'border-pink-500/20 focus:border-pink-400';

    return (
        <div className="space-y-2 group">
            <div className={`text-[10px] font-mono uppercase tracking-widest ${theme} opacity-60`}>{label}</div>
            <div className="grid grid-cols-5 gap-2">
                <div className="col-span-2 relative">
                    <input
                        type="number" name={pctName} value={Math.round(pctValue)} step={1} onChange={onPctChange}
                        className={`w-full bg-black/40 border ${inputTheme} px-2 py-1.5 rounded font-mono text-xs text-white focus:outline-none transition-all pr-6`}
                    />
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] opacity-40">%</span>
                </div>
                <div className="col-span-3 relative">
                    <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[10px] opacity-40">$</span>
                    <input
                        type="number" name={valName} value={valValue.toFixed(2)} step={0.01} onChange={onValChange}
                        className={`w-full bg-black/40 border ${inputTheme} pl-5 pr-2 py-1.5 rounded font-mono text-xs text-white focus:outline-none transition-all`}
                    />
                </div>
            </div>
        </div>
    )
}
