# Persona AI Documentation

This document explains how the Persona AI application defines, prepares, prompts, and manages its two current personas: Hitesh Choudhary and Piyush Garg. The documentation is based on the persona configuration in `frontend/src/data/personas.js` and the backend system prompts in `backend/src/personas/`.

## 1. Persona Data Collection and Preparation

The application uses two persona layers:

- Frontend persona metadata in `frontend/src/data/personas.js`
- Backend behavioral prompts in `backend/src/personas/hitesh.js` and `backend/src/personas/piyush.js`

### Frontend Persona Data

The frontend stores display and interaction data for each persona in the `PERSONAS` array. Each persona object includes:

- `id`: Unique identifier used by the app and API, such as `hitesh` or `piyush`
- `name`: Full persona display name
- `title`: Short professional description
- `initials`: Fallback avatar initials
- `color`: Brand/accent color for UI elements
- `photo`: Imported local image asset
- `traits`: Short labels shown in the interface
- `greeting`: First message shown when a chat starts
- `prompts`: Suggested starter questions for users

Current personas:

| Persona | Title | Traits | Greeting Style |
| --- | --- | --- | --- |
| Hitesh Choudhary | Mentor & Tech Educator | Calm Mentor, Industry Veteran, Lifelong Learner | Warm Hinglish, chai-and-code style |
| Piyush Garg | Principal Engineer & Tech Educator | Principal Engineer, Tech Educator, Docker Advocate | Energetic Hinglish, practical build-focused style |

### Backend Persona Data

The backend stores detailed system prompts for each persona. These prompts define:

- Persona identity and background
- Tone and communication style
- Signature phrases
- Teaching philosophy
- Formatting preferences
- Response structure
- Language rules
- Expected handling of vague, technical, or beginner-level questions

The persona prompts are prepared as JavaScript string exports. They are mapped in `backend/src/personas/index.js`, allowing the backend to select the correct system prompt from the persona ID sent by the frontend.

### Preparation Workflow

The data was organized into app-ready structures:

1. Public-facing persona information was placed in `frontend/src/data/personas.js`.
2. Deeper behavioral instructions were placed in backend prompt files.
3. Persona IDs were kept consistent between frontend and backend.
4. Shared Hinglish language requirements were centralized in `backend/src/personas/language-policy.js`.
5. Suggested prompts were added to help users start realistic conversations with each persona.

No automated scraping or dataset pipeline is present in the repository. The available code shows a manually curated persona dataset prepared as structured JavaScript configuration and system prompts.

## 2. Prompt Engineering Strategy

The prompt engineering strategy is built around persona-specific system prompts plus a shared language policy.

### Persona-Specific Prompting

Each persona has a dedicated backend prompt:

- `hitesh.js` defines Hitesh Choudhary as a calm, direct, humble mentor with a chai-and-code teaching style.
- `piyush.js` defines Piyush Garg as a warm, energetic full-stack engineer and educator who explains concepts through practical examples.

These prompts include more than a short role description. They define:

- Speaking tone
- Teaching style
- Humor style
- Preferred explanation structure
- Signature phrases
- Markdown formatting rules
- Expected behavior for code examples
- How much detail to provide by default

### Shared Hinglish Policy

The app uses `HINGLISH_POLICY` as a shared instruction block. It is added before and after the persona prompt:

```js
const systemPrompt = `${HINGLISH_POLICY}\n\n${personaPrompt}\n\nREMINDER: ${HINGLISH_POLICY}`;
```

This sandwiching technique reinforces the most important language constraint: every answer should be in natural Hinglish, not pure English.

The policy also gives examples of acceptable and unacceptable language patterns. This helps reduce drift when the model answers technical questions that might otherwise become fully English.

### Prompt Structure

The backend builds a two-message prompt:

```js
[
  {
    role: "system",
    content: systemPrompt,
  },
  {
    role: "user",
    content: userMessage,
  },
]
```

The system message controls persona behavior. The user message contains the latest user input.

### Design Goals

The prompt strategy is designed to:

- Keep each persona recognizable and distinct
- Preserve Hinglish consistently across both personas
- Encourage practical, beginner-friendly explanations
- Avoid long, dense answers unless requested
- Format replies cleanly in Markdown
- Keep responses relevant to the user's actual question

## 3. Context Management Approach

The current app uses separate frontend and backend context handling.

### Frontend Context

In `frontend/src/components/ChatPage.jsx`, messages are stored by persona ID:

```js
const [messages, setMessages] = useState(initialMessages);
```

Each persona has its own message list. When the user switches personas, the app displays the chat history for that selected persona. This keeps Hitesh and Piyush conversations visually separate in the UI.

The first message for each persona comes from the `greeting` field in `personas.js`.

When the user clicks "New Chat", only the active persona's conversation is reset to its greeting.

### Backend Context

The backend currently uses a stateless request model:

1. The frontend sends `persona` and `message` to `/api/chat`.
2. The backend validates the persona ID.
3. The backend trims the message and rejects messages over 4000 characters.
4. The backend builds a prompt from the selected persona system prompt and latest user message.
5. The backend sends that prompt to the AI service.

Important limitation: previous conversation turns are stored in the frontend UI, but they are not currently included in the backend prompt. That means the model responds based on:

- The selected persona
- The shared Hinglish language policy
- The current user message only

### Practical Impact

This approach is simple and predictable. It reduces token usage and keeps persona behavior consistent, but it limits multi-turn memory. Follow-up questions like "explain that again" may not work as well unless the user includes enough context in the new message.

A future improvement would be to send a limited recent message history for the active persona, such as the last 6 to 10 turns, while still enforcing the current persona prompt and message length limits.

## 4. Sample Conversations

The examples below demonstrate the intended behavior for both personas.

### Persona 1: Hitesh Choudhary

User:

> How do I start learning JavaScript?

Hitesh-style response:

> Hanji, JavaScript start karna hai toh pehle yeh samjho ki language se zyada important hai consistency.
>
> **Simple roadmap yeh rakho:**
>
> - Pehle basics: variables, functions, arrays, objects
> - Fir DOM samjho, kyunki browser mein JS ka asli maza wahi se aata hai
> - Uske baad async/await, promises, fetch API
> - Fir ek chhota project banao, jaise todo app ya weather app
>
> Chai aap le aao, code hum karwa denge. Bas daily 1-2 ghante honestly do. Samjha? JavaScript ratne ki cheez nahi hai, use karne ki cheez hai.

User:

> Explain async/await in simple terms.

Hitesh-style response:

> Hanji, async/await ko simple language mein samjhte hain.
>
> Maan lo aap chai order karte ho. Chai banne mein time lagega, but aap tab tak table pe baith ke baaki kaam kar sakte ho. JavaScript bhi wahi karti hai.
>
> - `async` bolta hai: yeh function asynchronous kaam karega
> - `await` bolta hai: yahan result ka wait karo, but poori app ko freeze mat karo
>
> **Tiny example:**
>
> ```js
> async function getUser() {
>   const response = await fetch("/api/user");
>   const data = await response.json();
>   return data;
> }
> ```
>
> Baaki yaad rakho: async/await promises ke upar hi built hai. Magic nahi hai, bas readable syntax hai.

### Persona 2: Piyush Garg

User:

> How do I design a scalable backend?

Piyush-style response:

> Toh chalo isko simple language mein samajhte hain. Scalable backend ka matlab sirf "zyada servers" nahi hota, bhai. Matlab system aise design karna ki traffic badhe toh app panic na kare.
>
> **Problem:**
>
> Ek server sab kuch handle kar raha hai: API, database calls, file uploads, background jobs. Traffic aaya aur code fat gaya.
>
> **Solution approach:**
>
> - APIs ko stateless rakho
> - Database indexes properly lagao
> - Heavy kaam queues mein bhejo
> - Caching use karo for repeated reads
> - Logs aur monitoring day one se rakho
>
> **Next step:** Pehle ek simple Node.js API banao, fir usme Redis cache aur background worker add karo. Trust me, scalable systems practice se samajh aate hain.

User:

> Docker vs Kubernetes, explain simply.

Piyush-style response:

> Aap sabhi ne Docker aur Kubernetes ka naam suna hi hoga, but confusion yahi hota hai ki dono same kaam karte hain kya? Short answer: nahi.
>
> **Docker** ka kaam hai app ko container mein pack karna.
>
> Matlab aapki app, dependencies, runtime sab ek box mein aa gaye. Ab woh box kisi bhi machine pe same tarah chalega.
>
> **Kubernetes** ka kaam hai containers ko manage karna.
>
> Agar 50 containers chal rahe hain, koi crash ho gaya, scaling karni hai, traffic route karna hai, tab Kubernetes kaam aata hai.
>
> Simple analogy:
>
> - Docker = lunch box
> - Kubernetes = canteen manager jo 500 lunch boxes organize karta hai
>
> Start Docker se karo. Kubernetes tab seekho jab deployment aur scaling ka actual need samajh aane lage.

## 5. Summary

The Persona AI app uses a clean split between frontend persona metadata and backend persona prompts. The frontend controls the chat experience, greetings, persona switching, and suggested prompts. The backend controls the actual AI behavior through persona-specific system prompts and a repeated Hinglish policy.

The current design is lightweight and easy to maintain. Its main tradeoff is that backend AI responses do not receive previous chat history yet, so long multi-turn memory is limited.
