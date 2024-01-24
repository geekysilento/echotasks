import openai from "@/openai";
import { NextResponse } from "next/server";

export async function POST(request: Request){
    const { todos } = await request.json();
    const chatCompletion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        n: 1,
        messages: [{"role": "system",
         "content": "Hello! ChatGPT, when you respond to user, and limit the response to 400characters"},
        {
            "role": "user",
            "content": `hey, i want you to summarize the following todos, and advise the user on which tasks to accomplish first, give them a brief roadmap and tell them why this is the most optimized approach, then motivate the user to finish their tasks, here is the data: ${JSON.stringify(todos)}`
        }],
      });
      const { data } = chatCompletion;


      return NextResponse.json(data.choices[0].message);
}
