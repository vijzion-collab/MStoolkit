'use client';
import { useState } from 'react';
import { Copy, RefreshCw } from 'lucide-react';

export default function LetterGenerator() {
    const [template, setTemplate] = useState('goodwill');
    const [details, setDetails] = useState('');
    const [generatedText, setGeneratedText] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const generateLetter = async () => {
        setIsLoading(true);
        setGeneratedText('Connecting to Titan AI (Minimax)...');

        try {
            const res = await fetch('/api/generate-letter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ template, details })
            });

            const data = await res.json();
            if (data.error) {
                setGeneratedText(`Error: ${data.error}`);
            } else {
                setGeneratedText(data.text);
            }
        } catch (e) {
            setGeneratedText('Error connecting to server.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex flex-col gap-2">
                <select
                    value={template}
                    onChange={(e) => setTemplate(e.target.value)}
                    className="flex-1 bg-slate-900 border border-slate-600 rounded p-2 text-sm focus:border-cyan-400 outline-none"
                >
                    <option value="goodwill">Goodwill Saturation (Self)</option>
                    <option value="dispute_capone">CapOne "Zombie" Dispute</option>
                    <option value="general">General Dispute</option>
                </select>

                <input
                    type="text"
                    placeholder="Enter details (e.g., 'Missed payment due to hospital stay in June')"
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    className="bg-slate-900 border border-slate-600 rounded p-2 text-sm focus:border-cyan-400 outline-none"
                />
            </div>

            <textarea
                className="w-full h-64 bg-slate-900/50 border border-slate-700 rounded p-4 font-mono text-xs text-slate-300 focus:border-purple-500 outline-none resize-none"
                value={generatedText}
                readOnly
                placeholder="Select a template, enter details, and click Generate..."
            />

            <div className="flex gap-2">
                <button
                    onClick={generateLetter}
                    disabled={isLoading}
                    className="flex-1 flex items-center justify-center gap-2 bg-cyan-600 hover:bg-cyan-500 py-3 rounded font-bold transition-all disabled:opacity-50"
                >
                    <RefreshCw size={18} className={isLoading ? 'animate-spin' : ''} />
                    {isLoading ? 'Drafting...' : 'Generate with AI'}
                </button>
                <button
                    onClick={() => navigator.clipboard.writeText(generatedText)}
                    className="flex-1 flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-500 py-3 rounded font-bold transition-all"
                >
                    <Copy size={18} /> Copy
                </button>
            </div>
        </div>
    );
}
