import { anthropic } from "@ai-sdk/anthropic";
import { streamText, experimental_createMCPClient as createMCPClient } from "ai";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";
import { FreestyleSandboxes } from "freestyle-sandboxes";

export const runtime = "nodejs";

const freestyle = new FreestyleSandboxes({
  apiKey: process.env.FREESTYLE_API_KEY!,
});

const ANTHROPIC_MODEL = anthropic("claude-3-7-sonnet-20250219");

export async function POST(req: Request) {
  const repoId = req.headers.get("Repo-Id");
  if (!repoId) {
    return new Response(JSON.stringify({ error: "Missing Repo-Id header" }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }

  const { messages } = await req.json();

  const { mcpEphemeralUrl } = await freestyle.requestDevServer({
    repoId,
  });

  const devServerMcp = await createMCPClient({
    transport: new StreamableHTTPClientTransport(new URL(mcpEphemeralUrl)),
  });
  const tools = await devServerMcp.getTools();

  const result = await streamText({
    model: ANTHROPIC_MODEL,
    maxSteps: 100,
    tools,
    toolCallStreaming: true,
    messages: [
      {
        role: "system",
        content:
          "You are an AI App Builder. The existing app is in the /template directory. Please edit the app how the user wants and commit the changes incrementally.",
      },
      ...messages,
    ],
  });

  result.consumeStream();
  return result.toDataStreamResponse();
}
