import { FreestyleSandboxes } from "freestyle-sandboxes";

const freestyle = new FreestyleSandboxes({
  apiKey: process.env.NEXT_PUBLIC_FREESTYLE_API_KEY!,
});

export async function createChat() {
  console.log(process.env.NEXT_PUBLIC_FREESTYLE_API_KEY!)
  const { repoId } = await freestyle.createGitRepository({
    name: "movemate-freestyle",
    public: false,
    source: {
      url: "https://github.com/virtonen/MoveMate",
      branch: "main",
      type: "git",
    },
  });
  const { ephemeralUrl, mcpEphemeralUrl } = await freestyle.requestDevServer({
    repoId: repoId,
  });
  console.log(repoId)
  return {
    repoId,
    ephemeralUrl,
  };
}
