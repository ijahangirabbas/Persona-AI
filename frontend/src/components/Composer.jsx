import React from "react";
import { ArrowUp } from "lucide-react";

export default function Composer({ draft, onDraftChange, onSend }) {
  function handleKeyDown(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  }

  return (
    <footer className="pa-composer">
      <div className="pa-inputbar">
        <input
          type="text"
          value={draft}
          onChange={(e) => onDraftChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask anything..."
          aria-label="Message"
        />
        <button
          className="pa-sendbtn"
          onClick={() => onSend()}
          disabled={!draft.trim()}
          aria-label="Send message"
        >
          <ArrowUp size={18} strokeWidth={2.5} />
        </button>
      </div>
      <div className="pa-composer-meta">
        <span>AI can make mistakes</span>
      </div>
      <div className="pa-composer-footer">
        <a href="mailto:hello@jahangirabbas.com">Give Feedback: hello@jahangirabbas.com</a>
        <span>
          Sponsored by <strong>AA</strong>
        </span>
      </div>
    </footer>
  );
}
