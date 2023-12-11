import { emojis } from "@/lib/emojis.js";
import { NextResponse } from "next/server.js";

export function GET() {
  return NextResponse.json({ success: true, emojis });
}

export async function POST(request, response) {
  

  try {
    const data = await request.json();
    const { character, name } = data;
    if (!character || !name) {
      return NextResponse.json({
        success: false,
        error: "You must provide a character and name to create a emoji.",
      });
    }
    const emoji = { id: emojis.length + 1, character, name };

    emojis.push(emoji);
    return NextResponse.json({ success: true, emojis });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}




export async function PUT(request, response) {
  try {
    const data = await request.json();
    const { id, character, name } = data;

    if (!id || !character || !name) {
      return NextResponse.json({
        success: false,
        error: "You must provide an id, character, and name to update an emoji.",
      });
    }

    const index = emojis.findIndex(emoji => emoji.id === id);

    if (index === -1) {
      return NextResponse.json({
        success: false,
        error: "Emoji not found.",
      });
    }

    emojis[index] = { id, character, name };
    return NextResponse.json({ success: true, emojis });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
