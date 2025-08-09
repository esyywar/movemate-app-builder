"use client";

import { use } from 'react';
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
  const { id, setMessages, error } = useChat<MoveMateMessage>();

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
        <form onSubmit={handleSubmit}>
          <input
            className="fixed dark:bg-zinc-900 bottom-0 w-full max-w-md p-2 mb-8 border border-zinc-300 dark:border-zinc-800 rounded shadow-xl"
            value={input}
            placeholder="Build"
            onChange={handleInputChange}
          />
        </form>
      </div>
      <div className="col-span-3">
        <FreestyleDevServer actions={{ requestDevServer }} repoId={repoId} />;
      </div>
    </div>
  );
}


