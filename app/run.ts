import { streamText } from "@ai-sdk/react";
streamText({
  model: ANTHROPIC_MODEL, // the model from the previous step
  maxSteps: 100,
  tools: tools, // the tools from the previous step
  toolCallStreaming: true,
  messages: [
    {
      role: "system",
      content: `
      You are an AI App Builder. The existing app is in the /template directory. Please edit the app how the user wants and commit the changes incrementally.
      `,
    },
    {
      role: "user",
      content: `Make me Tic Tac Toe`, // Put your prompt here
    },
  ],
});
