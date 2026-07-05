import React from "react";
import Avatar from "./Avatar.jsx";
import MarkdownContent from "./MarkdownContent.jsx";

export default function Message({ role, text, time, persona, isError = false }) {
  const showMarkdown = role === "persona" && !isError;

  return (
    <div className={`pa-message pa-message--${role}${isError ? " pa-message--error" : ""}`}>
      {role === "persona" && (
        <Avatar
          initials={persona.initials}
          color={persona.color}
          size="sm"
          photo={persona.photo}
        />
      )}
      <div className="pa-message-body">
        <div className="pa-message-bubble">
          {showMarkdown ? <MarkdownContent content={text} /> : text}
        </div>
        <span className="pa-message-time">{time}</span>
      </div>
    </div>
  );
}
