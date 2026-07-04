import React from "react";

export default function SuggestionChips({ prompts, onSelect }) {
  return (
    <div className="pa-suggestions">
      <span className="pa-suggestions-label">TRY ASKING</span>
      <div className="pa-chipgrid">
        {prompts.map((prompt) => (
          <button key={prompt} className="pa-chip" onClick={() => onSelect(prompt)}>
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
}
