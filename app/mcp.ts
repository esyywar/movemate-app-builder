import { anthropic } from "@ai-sdk/anthropic";
import { experimental_createMCPClient as createMCPClient } from "ai";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";
export const ANTHROPIC_MODEL = anthropic("claude-3-7-sonnet-20250219");
const devServerMcp = await createMCPClient({
  transport: new StreamableHTTPClientTransport(new URL(mcpUrl)), // mcpUrl is the url of the dev server
});
const tools = await devServerMcp.getTools();

