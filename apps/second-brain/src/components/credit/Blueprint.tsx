'use client';

import { useState } from 'react';
import { CheckCircle2, Circle, ChevronDown, ChevronUp, Lock } from 'lucide-react';

const StrategyStep = ({ title, points, status, children }: { title: string, points: string, status: 'done' | 'active' | 'locked', children: React.ReactNode }) => {
    const [isOpen, setIsOpen] = useState(status === 'active');

    return (
        <div className={`border rounded-xl transition-all duration-300 ${status === 'active' ? 'border-emerald-500/50 bg-slate-800/80 shadow-lg' :
                status === 'done' ? 'border-emerald-900 bg-emerald-950/20 opacity-70' :
                    'border-slate-800 bg-slate-900/50'
            }`}>
            <div
                className="p-4 flex items-center justify-between cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex items-center gap-4">
                    {status === 'done' && <CheckCircle2 className="text-emerald-500" />}
                    {status === 'active' && <Circle className="text-emerald-400 animate-pulse" />}
                    {status === 'locked' && <Lock className="text-slate-600" />}

                    <div>
                        <h3 className={`font-bold ${status === 'active' ? 'text-white' : 'text-slate-400'}`}>{title}</h3>
                        <p className="text-xs text-emerald-400 font-mono">{points} Possible Points</p>
                    </div>
                </div>
                {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </div>

            {(isOpen && status !== 'locked') && (
                <div className="px-4 pb-4 pl-12 border-t border-slate-700/50 pt-4 text-slate-300 text-sm space-y-2">
                    {children}
                </div>
            )}
        </div>
    );
};

export default function Blueprint() {
    return (
        <div className="space-y-4">
            <StrategyStep title="Phase 1: Artificial Inflation" points="+50-80" status="active">
                <p className="mb-2">We need to add positive data immediately to counter the negative weight.</p>
                <ul className="list-disc list-inside space-y-1 text-slate-400">
                    <li><strong>Authorized User (AU):</strong> Ask family for a card with 5+ yr history. (+40 pts)</li>
                    <li><strong>Rent Reporting:</strong> Use <em>Boom</em> or <em>Rental Kharma</em> to backdate 2 years. (+30 pts)</li>
                    <li><strong>Experian Boost:</strong> Connect Netflix/Utilities today. (+10 pts)</li>
                </ul>
            </StrategyStep>

            <StrategyStep title="Phase 2: The Capital One Strike" points="+15-45" status="active">
                <p className="mb-2">Stop the bleeding from the monthly "Charge Off" status update.</p>
                <ol className="list-decimal list-inside space-y-1 text-slate-400">
                    <li>Call CapOne Recovery: <strong>(800) 955-7070</strong></li>
                    <li>Pay full <strong>$143</strong>. Do NOT settle.</li>
                    <li>Wait 72 hours for "Paid" status.</li>
                    <li><span className="text-yellow-400 font-bold">Use Dispute Generator</span> to challenge the "Open Date" conflict.</li>
                </ol>
            </StrategyStep>

            <StrategyStep title="Phase 3: The Goodwill Saturation" points="+40-60" status="locked">
                <p>Unlock this phase after Phase 1 is complete.</p>
            </StrategyStep>
        </div>
    );
}
