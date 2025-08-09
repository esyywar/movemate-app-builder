"use server";

import { FreestyleSandboxes } from "freestyle-sandboxes";

const freestyle = new FreestyleSandboxes({
  apiKey: process.env.NEXT_PUBLIC_FREESTYLE_API_KEY!,
});

export async function requestDevServer({ repoId }: { repoId: string }) {
  return await freestyle.requestDevServer({ repoId });
}