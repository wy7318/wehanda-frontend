import React from 'react';

interface RichTextContentProps {
    content: string;
}

export const RichTextContent: React.FC<RichTextContentProps> = ({ content }) => {
    if (!content) return null;

    return (
        <div
            className="rich-text-content prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: content }}
        />
    );
};