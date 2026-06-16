import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { message, topic } = await req.json();

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `You are a helpful AI tutor for Internee.pk. Topic: ${topic || "General"}. Give clear simple answers.\n\nUser: ${message}`
                }
              ]
            }
          ]
        }),
      }
    );

    const data = await response.json();

    if (data.candidates && data.candidates[0]) {
      const reply = data.candidates[0].content.parts[0].text;
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
