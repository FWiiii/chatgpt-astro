import { createParser } from "eventsource-parser";
const decoder = new TextDecoder();
const encoder = new TextEncoder();

export const get = async (context) => {
  const params = context.url.searchParams;
  const text = params.get("input");

  // const completion = await openai.createCompletion({
  //   model: "text-davinci-003",
  //   prompt: `写出下一句诗。上句：${text}。下句：`,
  //   temperature: 0.6,
  //   stream: true,
  // });

  const completion = await fetch("https://api.openai.com/v1/completions", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.OPENAI_API_KEY ?? ""}`,
    },
    method: "POST",
    body: JSON.stringify({
      model: "text-davinci-003",
      prompt: `写出下一句诗。上句：${text}。下句：`,
      temperature: 0.6,
      stream: true,
    }),
  });

  console.log(completion);

  const stream = new ReadableStream({
    async start(controller) {
      const streamParser = (event) => {
        if (event.type === "event") {
          const data = event.data;
          if (data === "[DONE]") {
            controller.close();
            return;
          }
          try {
            const json = JSON.parse(data);
            const text = json.choices[0].text;
            const queue = encoder.encode(text);
            controller.enqueue(queue);
          } catch (e) {
            console.log(e);
          }
        }
      };
      const parser = createParser(streamParser);
      for await (const chunk of completion.body) {
        parser.feed(decoder.decode(chunk));
      }
    },
  });

  return new Response(stream);
};
