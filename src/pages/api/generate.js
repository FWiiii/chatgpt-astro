import { createParser } from "eventsource-parser";
// import { fetch, ProxyAgent } from "undici";

// import HttpsProxyAgent from "https-proxy-agent/dist/agent";
// import axios from "axios";
// const httpsAgent = new HttpsProxyAgent({ host: "http://127.0.0.1", port: "7890" })
// const instance = axios.create(httpsAgent)
// const decoder = new TextDecoder();
// const encoder = new TextEncoder();


export const get = async () => {
  // const params = context.url.searchParams;
  // const text = params.get("input");

  const completion = await fetch("https://api.openai.com/v1/completions", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.OPENAI_API_KEY ?? ""}`,
    },
    method: "POST",
    body: JSON.stringify({
      "model": "text-davinci-003",
      "prompt": "Say this is not a test",
      "max_tokens": 10,
      "temperature": 0
    }),
    // dispatcher: new ProxyAgent('http://127.0.0.1:7890')
  });

  // const res = await instance({
  //   url: "https://api.openai.com/v1/completions",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: `Bearer ${import.meta.env.OPENAI_API_KEY ?? ""}`,
  //   },
  //   method: 'POST',
  //   data: JSON.stringify({
  //     "model": "text-davinci-003",
  //     "prompt": "Say this is not a test",
  //     "max_tokens": 10,
  //     "temperature": 0
  //   }),
  // })
  // console.log(JSON.stringify(completion));
  return new Response(JSON.stringify(completion.data))

  // const stream = new ReadableStream({
  //   async start(controller) {
  //     const streamParser = (event) => {
  //       if (event.type === "event") {
  //         const data = event.data;
  //         if (data === "[DONE]") {
  //           controller.close();
  //           return;
  //         }
  //         try {
  //           const json = JSON.parse(data);
  //           const text = json.choices[0].text;
  //           const queue = encoder.encode(text);
  //           controller.enqueue(queue);
  //         } catch (e) {
  //           console.log(e);
  //         }
  //       }
  //     };
  //     const parser = createParser(streamParser);
  //     for await (const chunk of completion.body) {
  //       parser.feed(decoder.decode(chunk));
  //     }
  //   },
  // });

  // return new Response(stream);
};
