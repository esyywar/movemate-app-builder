import { FreestyleSandboxes } from "freestyle-sandboxes";

export const runtime = "nodejs";

const freestyle = new FreestyleSandboxes({
  apiKey: process.env.FREESTYLE_API_KEY!,
});

export async function POST() {
  try {
    const { repoId } = await freestyle.createGitRepository({
      name: "AI App Builder App",
      public: true,
      source: {
        url: "https://github.com/freestyle-sh/freestyle-next",
        type: "git",
      },
    });

    // Prime a dev server so the preview is ready quickly
    await freestyle.requestDevServer({ repoId });

    return new Response(JSON.stringify({ repoId }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  } catch (error) {
    console.error("Failed to create chat:", error);
    return new Response(
      JSON.stringify({ error: "Failed to create chat" }),
      { status: 500, headers: { "content-type": "application/json" } }
    );
  }
}


