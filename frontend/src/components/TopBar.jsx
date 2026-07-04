import React from "react";
import { Sparkles, ArrowLeft } from "lucide-react";
import Avatar from "./Avatar.jsx";

export default function TopBar({
  personas,
  activePersonaId,
  onSelectPersona,
  onBack,
}) {
  return (
    <header className="pa-topbar">
      <div className="pa-brand">
        {onBack && (
          <button
            className="pa-backbtn"
            onClick={onBack}
            aria-label="Back to home"
          >
            <ArrowLeft size={18} strokeWidth={2.25} />
          </button>
        )}
        <span className="pa-brand-icon">
          <Sparkles size={18} strokeWidth={2.25} />
        </span>
        <div className="pa-brand-text">
          <span className="pa-brand-name">Persona AI</span>
          <span className="pa-brand-tag">Curated by Experts, Guided by AI</span>
        </div>
      </div>

      <div className="pa-personaswitch">
        {personas.map((p) => (
          <button
            key={p.id}
            className={`pa-persona-pill ${p.id === activePersonaId ? "is-active" : ""}`}
            onClick={() => onSelectPersona(p.id)}
            aria-pressed={p.id === activePersonaId}
          >
            <Avatar
              initials={p.initials}
              color={p.color}
              size="sm"
              photo={p.photo}
            />
            <span className="pa-persona-pill-name">{p.name}</span>
          </button>
        ))}
      </div>
    </header>
  );
}
