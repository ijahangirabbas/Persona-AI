import React from "react";
import Message from "./Message.jsx";

export default function MessageList({ messages, persona }) {
  return (
    <div className="pa-messages">
      {messages.map((m, i) => (
        <Message key={i} role={m.role} text={m.text} time={m.time} persona={persona} />
      ))}
    </div>
  );
}
