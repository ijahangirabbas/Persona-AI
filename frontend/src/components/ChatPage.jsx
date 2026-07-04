import React, { useState, useRef, useEffect } from "react";
import { PERSONAS } from "../data/personas.js";
import TopBar from "./TopBar.jsx";
import PersonaBar from "./PersonaBar.jsx";
import SuggestionChips from "./SuggestionChips.jsx";
import MessageList from "./MessageList.jsx";
import Composer from "./Composer.jsx";
import "./ChatPage.css";

function timeNow() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function initialMessages() {
  return PERSONAS.reduce((acc, p) => {
    acc[p.id] = [{ role: "persona", text: p.greeting, time: "Just now" }];
    return acc;
  }, {});
}

export default function ChatPage({ initialPersonaId, onBack }) {
  const [activePersonaId, setActivePersonaId] = useState(initialPersonaId || PERSONAS[0].id);
  const [messages, setMessages] = useState(initialMessages);
  const [draft, setDraft] = useState("");
  const scrollRef = useRef(null);

  const activePersona = PERSONAS.find((p) => p.id === activePersonaId);
  const activeMessages = messages[activePersonaId] || [];

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [activeMessages.length, activePersonaId]);

  function pushMessage(personaId, msg) {
    setMessages((prev) => ({
      ...prev,
      [personaId]: [...(prev[personaId] || []), msg],
    }));
  }

  function handleSend(text) {
    const value = (text ?? draft).trim();
    if (!value) return;

    pushMessage(activePersonaId, { role: "user", text: value, time: timeNow() });
    setDraft("");

    // Replace this block with your real AI call (e.g. fetch to your backend
    // or the Anthropic API), keyed on `activePersonaId` to pick the right
    // system prompt / persona voice.
    window.setTimeout(() => {
      pushMessage(activePersonaId, {
        role: "persona",
        text: `${activePersona.name.split(" ")[0]} is thinking about: "${value}"`,
        time: timeNow(),
      });
    }, 700);
  }

  function handleNewChat() {
    setMessages((prev) => ({
      ...prev,
      [activePersonaId]: [{ role: "persona", text: activePersona.greeting, time: "Just now" }],
    }));
    setDraft("");
  }

  return (
    <div className="pa-app">
      <TopBar
        personas={PERSONAS}
        activePersonaId={activePersonaId}
        onSelectPersona={setActivePersonaId}
        onBack={onBack}
      />

      <PersonaBar persona={activePersona} onNewChat={handleNewChat} />

      <main className="pa-chatarea" ref={scrollRef}>
        {activeMessages.length <= 1 && (
          <SuggestionChips prompts={activePersona.prompts} onSelect={handleSend} />
        )}
        <MessageList messages={activeMessages} persona={activePersona} />
      </main>

      <Composer draft={draft} onDraftChange={setDraft} onSend={handleSend} />
    </div>
  );
}
