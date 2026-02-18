import React from 'react';

interface CodeBlockProps {
    children?: React.ReactNode;
    code?: string;
    className?: string;
}

export function CodeBlock({ children, code, className }: CodeBlockProps) {
    const content = code || children;
    return (
        <pre className={`p-4 bg-gray-100 rounded-md overflow-x-auto ${className || ''}`}>
            <code>{content}</code>
        </pre>
    );
}
