import { useState } from "react";
import "./LandingPage.css";

import hitesh from "../assets/hitesh.jpeg";
import piyush from "../assets/piyush.jpg";

const personas = [
  {
    id: "hitesh",
    image: hitesh,
    name: "Hitesh Choudhary",
    skills: ["Calm Mentor", "Industry Veteran", "Lifelong Learner"],
    active: false,
  },
  {
    id: "piyush",
    image: piyush,
    name: "Piyush Garg",
    skills: ["Principal Engineer", "Tech Educator", "Docker Advocate"],
    active: true,
  },
];

// A single card, kept as a small local component inside this file so the
// image-fallback state (useState below) stays scoped to each card.
function PersonaCard({ image, name, skills, active, onChat }) {
  const [imgFailed, setImgFailed] = useState(false);
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("");

  return (
    <div className="persona-card">
      <div className="persona-photo-wrap">
        {!imgFailed ? (
          <img
            className="persona-photo"
            src={image}
            alt={name}
            onError={() => setImgFailed(true)}
          />
        ) : (
          <div className="persona-photo persona-photo--fallback">
            {initials}
          </div>
        )}
        {active && <span className="persona-dot" title="Online" />}
      </div>

      <h2 className="persona-name">{name}</h2>

      <ul className="persona-skills">
        {skills.map((skill) => (
          <li key={skill}>{skill}</li>
        ))}
      </ul>

      <button className="persona-chatbtn" onClick={onChat}>
        Chat
      </button>
    </div>
  );
}

// onChatOpen(personaId) is called when a card's Chat button is clicked —
// wire it up in the parent to switch to your chat screen with that persona.
function LandingPage({ onChatOpen }) {
  return (
    <div className="background">
      <div className="radial-glow" />

      <div className="container">
        <div className="hero">
          <h1>Persona AI</h1>
          <p>Curated by Experts, Guided by AI</p>
        </div>

        <div className="cards">
          {personas.map((item) => (
            <PersonaCard
              key={item.id}
              {...item}
              onChat={() => onChatOpen?.(item.id)}
            />
          ))}
        </div>

        <footer>
          <p>
            Give Feedback:{" "}
            <a href="mailto:hello@jahangirabbas.com">hello@jahangirabbas.com</a>
          </p>
        </footer>
      </div>
    </div>
  );
}

export default LandingPage;
