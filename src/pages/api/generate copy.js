import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

export const get = async (context) => {
  const params = context.url.searchParams;
  const text = params.get("input");
  console.log(text);
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `写出下一句诗。上句：${text}。下句：`,
    temperature: 0.6,
    stream: true,
  });
  const respones = completion.data;
  return new Response(JSON.stringify(respones));
};
