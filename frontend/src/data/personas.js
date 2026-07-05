import hiteshPhoto from "../assets/hitesh.jpeg";
import piyushPhoto from "../assets/piyush.jpg";

// Add or edit personas here — every other component reads from this list,
// so a new entry here is all it takes to add a new persona to the app.
export const PERSONAS = [
  {
    id: "hitesh",
    name: "Hitesh Choudhary",
    title: "Full Stack Developer & Educator",
    initials: "HC",
    color: "#ff5722",
    online: true,
    photo: hiteshPhoto,
    traits: ["Calm Mentor", "Industry Veteran", "Lifelong Learner"],
    greeting:
      "Haan ji, kaise hain aap sabhi? Swagat hai aap sabhi ka chai aur code mein!",
    prompts: [
      "How do I start learning JavaScript?",
      "Explain async/await in simple terms",
      "What is system design?",
      "How to become a better developer?",
    ],
  },
  {
    id: "piyush",
    name: "Piyush Garg",
    title: "Software Engineer & Content Creator",
    initials: "PG",
    color: "#6c5ce7",
    online: true,
    photo: piyushPhoto,
    traits: ["Principal Engineer", "Tech Educator", "Docker Advocate"],
    greeting:
      "Hey! Ready to build something real today? Let's talk stack, systems, or shipping fast.",
    prompts: [
      "How do I design a scalable backend?",
      "Docker vs Kubernetes, explain simply",
      "How to structure a Node.js project?",
      "Tips for building in public?",
    ],
  },
];
