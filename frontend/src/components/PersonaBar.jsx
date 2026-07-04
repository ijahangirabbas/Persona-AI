import React from "react";
import { Plus } from "lucide-react";
import Avatar from "./Avatar.jsx";

export default function PersonaBar({ persona, onNewChat }) {
  return (
    <div className="pa-personabar">
      <div className="pa-personabar-info">
        <Avatar
          initials={persona.initials}
          color={persona.color}
          online={persona.online}
          photo={persona.photo}
        />
        <div className="pa-personabar-text">
          <span className="pa-personabar-name">{persona.name}</span>
          <span className="pa-personabar-title">{persona.title}</span>
        </div>
      </div>
      <button className="pa-newchat" onClick={onNewChat}>
        <Plus size={16} strokeWidth={2.5} />
        New Chat
      </button>
    </div>
  );
}
