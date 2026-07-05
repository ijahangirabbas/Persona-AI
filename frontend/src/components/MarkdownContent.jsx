import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";

export default function MarkdownContent({ content }) {
  return (
    <div className="pa-markdown">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkBreaks]}
        components={{
        a: ({ href, children }) => (
          <a href={href} target="_blank" rel="noopener noreferrer">
            {children}
          </a>
        ),
        code: ({ inline, className, children, ...props }) => {
          if (inline) {
            return (
              <code className="pa-md-inline-code" {...props}>
                {children}
              </code>
            );
          }

          return (
            <pre className="pa-md-pre">
              <code className={className} {...props}>
                {children}
              </code>
            </pre>
          );
        },
      }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
