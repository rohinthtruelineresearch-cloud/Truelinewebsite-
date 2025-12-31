import { useEffect, useMemo, useRef, useState } from "react";
import "./ChatbotWidget.css";

const INITIAL_MESSAGES = [
  {
    id: "bot-greeting-1",
    sender: "bot",
    text: "Hi there! I’m Trueline Assist. How can I help you today?",
  },
  {
    id: "bot-greeting-2",
    sender: "bot",
    text: "Ask me about our services, products, or how to contact the team.",
  },
];

const cannedResponses = [
  {
    keywords: ["service", "solution", "consult"],
    response:
      "We offer end-to-end research, analytics, and consulting support. Visit the Services page for a detailed overview.",
  },
  {
    keywords: ["product", "platform", "tool"],
    response:
      "Our product suite covers publishing support, patent analytics, and more. You can explore them on the Products page.",
  },
  {
    keywords: ["publish", "journal"],
    response:
      "Our Journals & Publishing experts can guide you through submissions, peer review, and editorial services.",
  },
  {
    keywords: ["patent", "ipr"],
    response:
      "Need help with IP or patents? The IPR & Patents team can support landscaping, filings, and legal research.",
  },
  {
    keywords: ["contact", "reach", "call", "email"],
    response:
      "You can reach us quickly via the Contact page or by emailing support@truelineresearch.com.",
  },
  {
    keywords: ["event", "webinar", "meet"],
    response:
      "Visit the Events page to see what we’re hosting next and secure your spot.",
  },
  {
    keywords: ["hello", "hi", "hey"],
    response: "Hello! Great to see you here. How can I make your visit easier?",
  },
];

function getBotReply(message) {
  const normalized = message.toLowerCase();
  const match = cannedResponses.find((entry) =>
    entry.keywords.some((keyword) => normalized.includes(keyword)),
  );

  if (match) {
    return match.response;
  }

  return "Thanks for your question! A teammate will follow up shortly, or feel free to drop us a note via the Contact page.";
}

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef(null);

  const chatLogId = useMemo(
    () => `chatbot-log-${Math.random().toString(36).slice(2, 8)}`,
    [],
  );

  useEffect(() => {
    if (!isOpen) return;

    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [isOpen]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmed = inputValue.trim();
    if (!trimmed) return;

    const userMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: trimmed,
    };

    const botMessage = {
      id: `bot-${Date.now()}`,
      sender: "bot",
      text: getBotReply(trimmed),
    };

    setMessages((previous) => [...previous, userMessage, botMessage]);
    setInputValue("");
  };

  return (
    <div className={`chatbot ${isOpen ? "is-open" : ""}`}>
      <button
        type="button"
        className="chatbot__toggle"
        aria-expanded={isOpen}
        aria-controls={chatLogId}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className="chatbot__toggle-label">
          {isOpen ? "Close chat" : "Chat with us"}
        </span>
      </button>

      <div
        id={chatLogId}
        className="chatbot__panel"
        role="dialog"
        aria-live="polite"
        aria-label="Chatbot conversation"
        hidden={!isOpen}
      >
        <header className="chatbot__header">
          <div>
            <p className="chatbot__title">Trueline Assist</p>
            <p className="chatbot__subtitle">Ask a quick question anytime.</p>
          </div>
          <button
            type="button"
            className="chatbot__close"
            aria-label="Close chat"
            onClick={() => setIsOpen(false)}
          >
            ×
          </button>
        </header>

        <div className="chatbot__messages" role="log">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`chatbot__message chatbot__message--${message.sender}`}
            >
              <p>{message.text}</p>
            </div>
          ))}
          <span aria-hidden ref={messagesEndRef} />
        </div>

        <form className="chatbot__form" onSubmit={handleSubmit}>
          <label className="sr-only" htmlFor="chatbot-input">
            Type your message
          </label>
          <input
            id="chatbot-input"
            className="chatbot__input"
            type="text"
            placeholder="How can we help?"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
          />
          <button
            type="submit"
            className="chatbot__send"
            disabled={!inputValue.trim()}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

