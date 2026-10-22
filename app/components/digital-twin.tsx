"use client";

import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const suggestedQuestions = [
  "Tell me about your Trino lakehouse work",
  "How do you use HyperLogLog at scale?",
  "What kind of data teams do you lead?",
];

function ChatIcon({ close = false }: { close?: boolean }) {
  return close ? (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ) : (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <path d="M20 11.4a7.7 7.7 0 0 1-8 7.4 8.5 8.5 0 0 1-3.2-.6L4 20l1.3-3.8A7.2 7.2 0 0 1 4 12.4 7.7 7.7 0 0 1 12 5a7.7 7.7 0 0 1 8 6.4Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M8 12h.01M12 12h.01M16 12h.01" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

export default function DigitalTwin() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");
  const conversationRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    conversationRef.current?.scrollTo({
      top: conversationRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isSending, isOpen]);

  async function sendMessage(text: string) {
    const question = text.trim();
    if (!question || isSending) return;

    const updatedMessages = [...messages, { role: "user" as const, content: question }];
    setMessages(updatedMessages);
    setDraft("");
    setError("");
    setIsSending(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedMessages.slice(-11) }),
      });
      const result: unknown = await response.json();
      const answer =
        typeof result === "object" &&
        result !== null &&
        "answer" in result &&
        typeof result.answer === "string"
          ? result.answer
          : "";

      if (!response.ok || !answer) {
        const errorMessage =
          typeof result === "object" &&
          result !== null &&
          "error" in result &&
          typeof result.error === "string"
            ? result.error
            : "The Digital Twin couldn't respond. Please try again.";
        throw new Error(errorMessage);
      }

      setMessages((current) => [...current, { role: "assistant", content: answer }]);
    } catch (sendError) {
      setError(
        sendError instanceof Error
          ? sendError.message
          : "The Digital Twin couldn't respond. Please try again.",
      );
      setDraft(question);
    } finally {
      setIsSending(false);
      inputRef.current?.focus();
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendMessage(draft);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void sendMessage(draft);
    }
  }

  return (
    <div className="digital-twin">
      {isOpen && (
        <section className="digital-twin__panel" aria-label="Chat with Hemant's Digital Twin">
          <div className="digital-twin__header">
            <div className="digital-twin__identity">
              <span className="digital-twin__avatar" aria-hidden="true">HM</span>
              <span>
                <strong>Hemant’s Digital Twin</strong>
                <span><i className="digital-twin__status" /> HERE TO TALK CAREER</span>
              </span>
            </div>
            <button
              type="button"
              className="digital-twin__close"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              <ChatIcon close />
            </button>
          </div>

          <div className="digital-twin__messages" ref={conversationRef} aria-live="polite">
            {messages.length === 0 ? (
              <div className="digital-twin__welcome">
                <span className="digital-twin__welcome-kicker">A LITTLE ABOUT MY WORK</span>
                <h2>Curious about my career?</h2>
                <p>
                  Ask me about Trino, lakehouse architecture, data engineering,
                  or how I got here.
                </p>
                <div className="digital-twin__suggestions">
                  {suggestedQuestions.map((question) => (
                    <button
                      type="button"
                      key={question}
                      onClick={() => void sendMessage(question)}
                      disabled={isSending}
                    >
                      {question}<span aria-hidden="true">↗</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="digital-twin__thread">
                <div className="digital-twin__greeting">
                  <span className="digital-twin__welcome-kicker">HEMANT’S DIGITAL TWIN</span>
                  <p>
                    Hi! I can answer questions about Hemant’s professional
                    background and career.
                  </p>
                </div>
                {messages.map((message, index) => (
                  <div
                    className={`digital-twin__message digital-twin__message--${message.role}`}
                    key={`${message.role}-${index}`}
                  >
                    {message.content}
                  </div>
                ))}
                {isSending && (
                  <div className="digital-twin__message digital-twin__message--assistant digital-twin__typing" aria-label="Hemant's Digital Twin is thinking">
                    <span /><span /><span />
                  </div>
                )}
                {error && (
                  <div className="digital-twin__error" role="alert">
                    <p>{error}</p>
                    <button type="button" onClick={() => void sendMessage(draft)}>
                      Try again
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          <form className="digital-twin__form" onSubmit={handleSubmit}>
            <textarea
              ref={inputRef}
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about my experience…"
              aria-label="Ask Hemant's Digital Twin a question"
              maxLength={2_000}
              rows={2}
              disabled={isSending}
            />
            <div className="digital-twin__form-bottom">
              <span>SHIFT + ENTER FOR A NEW LINE</span>
              <button
                type="submit"
                className="digital-twin__send"
                disabled={isSending || !draft.trim()}
                aria-label="Send message"
              >
                <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
                  <path d="M3 10h13m-5-5 5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </form>
          <p className="digital-twin__disclaimer">AI DIGITAL TWIN · CAREER QUESTIONS ONLY</p>
        </section>
      )}

      <button
        type="button"
        className={`digital-twin__launcher${isOpen ? " digital-twin__launcher--open" : ""}`}
        onClick={() => setIsOpen((open) => !open)}
        aria-label={isOpen ? "Close Digital Twin chat" : "Chat with Hemant's Digital Twin"}
        aria-expanded={isOpen}
      >
        <ChatIcon close={isOpen} />
        {!isOpen && <span>Ask my Digital Twin</span>}
      </button>
    </div>
  );
}
