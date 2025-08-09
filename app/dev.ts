import { FreestyleSandboxes } from "freestyle-sandboxes";
export const freestyle = new FreestyleSandboxes({
  apiKey: process.env.FREESTYLE_API_KEY!,
});
const {
  ephemeralUrl, // The URL of the preview of the dev server
  mcpEphemeralUrl, // The URL of the mcp service for the dev server
} = await freestyle.requestDevServer({
  repoId: repoId, // the repoId from the previous step
});

