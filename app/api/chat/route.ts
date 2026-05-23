import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { message, topic } = await req.json();

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
       "Authorization": "Bearer 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",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: `You are a helpful AI tutor for Internee.pk. Topic: ${topic || "General"}. Give clear simple answers.`
          },
          {
            role: "user",
            content: message
          }
        ],
        max_tokens: 1024,
      }),
    });

    const data = await response.json();
    console.log("Groq Response:", JSON.stringify(data));
    
    if (data.choices && data.choices[0]) {
      const reply = data.choices[0].message.content;
      return NextResponse.json({ reply });
    } else {
      return NextResponse.json({ reply: "Error: " + JSON.stringify(data) });
    }
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}