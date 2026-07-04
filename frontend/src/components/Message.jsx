import React from "react";
import Avatar from "./Avatar.jsx";

export default function Message({ role, text, time, persona }) {
  return (
    <div className={`pa-message pa-message--${role}`}>
      {role === "persona" && (
        <Avatar
          initials={persona.initials}
          color={persona.color}
          size="sm"
          photo={persona.photo}
        />
      )}
      <div className="pa-message-body">
        <div className="pa-message-bubble">{text}</div>
        <span className="pa-message-time">{time}</span>
      </div>
    </div>
  );
}
