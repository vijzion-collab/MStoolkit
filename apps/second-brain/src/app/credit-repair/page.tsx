import { ArrowUpRight, Shield, ScrollText, Target } from 'lucide-react';
import Blueprint from '@/components/credit/Blueprint';
import LetterGenerator from '@/components/credit/LetterGenerator';

export default function CreditCommandCenter() {
    return (
        <div className="min-h-screen bg-slate-900 text-white p-8 font-sans">
            {/* HUD Header */}
            <header className="mb-8 border-b border-slate-700 pb-6 flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                        OPERATION: 700
                    </h1>
                    <p className="text-slate-400 mt-2">Target Date: 60 Days</p>
                </div>

                <div className="flex gap-8 text-center">
                    <div className="bg-slate-800 p-4 rounded-xl border border-red-500/30">
                        <p className="text-xs text-slate-400 uppercase tracking-widest">Current</p>
                        <p className="text-3xl font-mono font-bold text-red-500">564</p>
                    </div>
                    <div className="flex items-center text-slate-600">
                        <ArrowUpRight size={24} />
                    </div>
                    <div className="bg-slate-800 p-4 rounded-xl border border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                        <p className="text-xs text-slate-400 uppercase tracking-widest">Target</p>
                        <p className="text-3xl font-mono font-bold text-emerald-400">700+</p>
                    </div>
                </div>
            </header>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* Left Col: Strategy Blueprint */}
                <div className="lg:col-span-7 space-y-8">
                    <section className="bg-slate-800/50 rounded-2xl border border-slate-700 p-6 backdrop-blur-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <Target className="text-cyan-400" />
                            <h2 className="text-2xl font-bold">Strategic Blueprint</h2>
                        </div>
                        <Blueprint />
                    </section>
                </div>

                {/* Right Col: Tools & Letters */}
                <div className="lg:col-span-5 space-y-8">
                    {/* Dispute Center */}
                    <section className="bg-slate-800/50 rounded-2xl border border-slate-700 p-6 backdrop-blur-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <Shield className="text-purple-400" />
                            <h2 className="text-2xl font-bold">Dispute Generator</h2>
                        </div>
                        <p className="text-sm text-slate-400 mb-4">
                            Generate "Outside the Box" letters instantly.
                            <span className="block mt-1 text-xs text-slate-500">Powered by Minimax/Anthropic Protocol</span>
                        </p>
                        <LetterGenerator />
                    </section>

                    {/* Quick Stats */}
                    <section className="bg-slate-800/50 rounded-2xl border border-slate-700 p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <ScrollText className="text-yellow-400" />
                            <h3 className="font-bold">Active Disputes</h3>
                        </div>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center p-3 bg-slate-900 rounded border-l-4 border-yellow-500">
                                <span>Capital One</span>
                                <span className="text-xs bg-yellow-500/20 text-yellow-500 px-2 py-1 rounded">Pending Pay-to-Zero</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-slate-900 rounded border-l-4 border-blue-500">
                                <span>Self Lender</span>
                                <span className="text-xs bg-blue-500/20 text-blue-500 px-2 py-1 rounded">Goodwill Prep</span>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
