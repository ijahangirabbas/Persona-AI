import React, { useState } from "react";
import LandingPage from "./components/LandingPage.jsx";
import ChatPage from "./components/ChatPage.jsx";
import { PERSONAS } from "./data/personas.js";

export default function App() {
  const [view, setView] = useState("landing"); // "landing" | "chat"
  const [selectedPersonaId, setSelectedPersonaId] = useState(PERSONAS[0].id);

  function handleChatOpen(personaId) {
    setSelectedPersonaId(personaId);
    setView("chat");
  }

  function handleBackToLanding() {
    setView("landing");
  }

  return (
    <div style={{ height: "100vh" }}>
      {view === "landing" ? (
        <LandingPage onChatOpen={handleChatOpen} />
      ) : (
        <ChatPage initialPersonaId={selectedPersonaId} onBack={handleBackToLanding} />
      )}
    </div>
  );
}
