import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { template, details } = await req.json();

        const baseUrl = process.env.OLLAMA_BASE_URL || 'http://localhost:11434';

        const systemPrompt = `You are a specialized legal credit repair assistant named "Titan". 
    Your goal is to write aggressive, legally-sound dispute letters that force creditors to validate debts or delete them.
    Think "Outside the Box": Use obscure laws, demand specific logs (like "Date of First Delinquency"), and sound professional but firm.
    Do not use placeholders like "[Your Name]" if possible, ask the user to fill them, but for this generation create the template ready to sign.`;

        let userPrompt = '';
        if (template === 'goodwill') {
            userPrompt = `Write a "Goodwill Saturation" letter to Self Lender. Context: ${details}. Ask for a courtesy styling adjustment. Be humble but persuasive.`;
        } else if (template === 'dispute_capone') {
            userPrompt = `Write a "Factual Dispute" letter to Capital One. Account is paid but shows "Charge Off" monthly. Context: ${details}. Demand deletion due to inaccurate "Date of Last Activity" reporting.`;
        } else {
            userPrompt = `Write a credit dispute letter. Context: ${details}`;
        }

        const response = await fetch(`${baseUrl}/api/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'openclaw',
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: userPrompt }
                ],
                stream: false
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Ollama API Error:', errorText);
            return NextResponse.json(
                { error: `Ollama Error: ${response.statusText}. Ensure Ollama is running and "openclaw" model is installed.` },
                { status: response.status }
            );
        }

        const data = await response.json();
        const letterText = data.message.content;

        return NextResponse.json({ text: letterText });

    } catch (error: any) {
        console.error('Generate error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to connect to local AI service. Ensure Ollama is running.' },
            { status: 500 }
        );
    }
}
