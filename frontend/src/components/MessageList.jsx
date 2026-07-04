import React from "react";
import Message from "./Message.jsx";
import Avatar from "./Avatar.jsx";

function TypingIndicator({ persona }) {
  return (
    <div className="pa-message pa-message--persona pa-typing">
      <Avatar
        initials={persona.initials}
        color={persona.color}
        online={persona.online}
        photo={persona.photo}
        size="sm"
      />
      <div className="pa-message-body">
        <div className="pa-message-bubble pa-typing-bubble">
          <span className="pa-typing-dot" />
          <span className="pa-typing-dot" />
          <span className="pa-typing-dot" />
        </div>
      </div>
    </div>
  );
}

export default function MessageList({ messages, persona, isLoading = false }) {
  return (
    <div className="pa-messages">
      {messages.map((m, i) => (
        <Message
          key={i}
          role={m.role}
          text={m.text}
          time={m.time}
          persona={persona}
          isError={m.isError}
        />
      ))}
      {isLoading && <TypingIndicator persona={persona} />}
    </div>
  );
}
