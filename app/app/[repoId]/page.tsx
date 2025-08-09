"use client";

import { use, useState } from 'react';
import { Chat, UIMessage, useChat } from "@ai-sdk/react";
import { requestDevServer } from "@/lib/server-actions";
import { FreestyleDevServer } from "freestyle-sandboxes/react/dev-server";
import { channel } from 'diagnostics_channel';

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return <ChatClient repoId={id} />;
}

interface MoveMateMessage extends UIMessage {

}

interface ChatClientProps {
  repoId: string
}

function ChatClient({ repoId }: ChatClientProps) {
  const [input, setInput] = useState('');

  const {
    messages,
    sendMessage,
    status,
    error,
    setMessages,
    regenerate,
    stop,
    clearError
  } = useChat({
    // optional config
    experimental_throttle: 300, // ms
    resume: true,               // resume ongoing stream if reconnecting
  });

  const handleSend = async () => {
    if (!input.trim()) return;
    await sendMessage({
      text: input,
    }); // sends the text to the backend
    setInput('');
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col w-full h-full max-w-md py-24 mx-auto stretch">
        {messages.map((message) => (
          <div key={message.id} className="whitespace-pre-wrap">
            {message.role === "user" ? "User: " : "AI: "}
            {message.parts.map((part, i) => {
              switch (part.type) {
                case "text":
                  return <div key={`${message.id}-${i}`}>{part.text}</div>;
                default:
                  return (
                    <div key={`${message.id}-${i}`}>{JSON.stringify(part)}</div>
                  );
              }
            })}
          </div>
        ))}
        <div>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Say something..."
          />
          <button onClick={handleSend} disabled={status === 'streaming'}>
            Send
          </button>
          <button onClick={() => regenerate()}>Regenerate last</button>
          <button onClick={() => stop()}>Stop</button>
        </div>
      <div className="col-span-3">
        <FreestyleDevServer actions={{ requestDevServer }} repoId={repoId} />;
      </div>
    </div>
    </div>
  );
}
