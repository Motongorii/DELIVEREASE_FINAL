import React, { useState } from "react";

const mockResponses = [
  {
    keywords: ["where is my parcel", "track my parcel", "track my delivery", "where is my delivery"],
    response: "To track your parcel, enter your tracking number in the Tracking section. If you have already done so, your parcel's status will be displayed."
  },
  {
    keywords: ["how do i track", "how to track"],
    response: "Go to the Tracking page and enter your tracking number in the search bar."
  },
  {
    keywords: ["hello", "hi"],
    response: "Hello! How can I assist you with your deliveries today?"
  },
  {
    keywords: ["thank you", "thanks"],
    response: "You're welcome! If you have more questions, just ask."
  }
];

function getBotResponse(message) {
  const lower = message.toLowerCase();
  for (const entry of mockResponses) {
    if (entry.keywords.some(k => lower.includes(k))) {
      return entry.response;
    }
  }
  return "Sorry, I can only help with simple tracking questions right now.";
}

const Chat = () => {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! I am your delivery assistant. Ask me anything about tracking your parcel." }
  ]);
  const [input, setInput] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = { from: "user", text: input };
    const botMsg = { from: "bot", text: getBotResponse(input) };
    setMessages(msgs => [...msgs, userMsg, botMsg]);
    setInput("");
  };

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto', background: '#fff', borderRadius: 10, boxShadow: '0 2px 8px #0001', padding: '1.5rem', minHeight: 400 }}>
      <h3 style={{ textAlign: 'center', marginBottom: '1rem' }}>Chatbot Assistant</h3>
      <div style={{ maxHeight: 250, overflowY: 'auto', marginBottom: '1rem', background: '#f7f8fa', borderRadius: 6, padding: '1rem' }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ textAlign: msg.from === 'user' ? 'right' : 'left', margin: '0.5rem 0' }}>
            <span style={{
              display: 'inline-block',
              background: msg.from === 'user' ? '#2d3edb' : '#eee',
              color: msg.from === 'user' ? '#fff' : '#222',
              borderRadius: 16,
              padding: '0.5rem 1rem',
              maxWidth: '80%',
              wordBreak: 'break-word'
            }}>{msg.text}</span>
          </div>
        ))}
      </div>
      <form onSubmit={handleSend} style={{ display: 'flex', gap: '0.5rem' }}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type your question..."
          style={{ flex: 1, padding: '0.5rem', borderRadius: 6, border: '1px solid #ddd' }}
        />
        <button type="submit" style={{ background: '#2d3edb', color: '#fff', border: 'none', borderRadius: 6, padding: '0.5rem 1rem', cursor: 'pointer' }}>Send</button>
      </form>
    </div>
  );
};

export default Chat; 