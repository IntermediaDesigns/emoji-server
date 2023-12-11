import { emojis } from '@/lib/emojis.js';
import { NextResponse } from 'next/server.js';

export function GET(request, response) {
  const { emojiId } = response.params;
  const emoji = emojis.filter((emoji) => emoji.id === +emojiId)[0];
  if (!emoji) {
    return NextResponse.json({
      success: false,
      message: 'No emoji with that ID found.',
    });
  }
  return NextResponse.json({ success: true, emoji });
}

export async function DELETE(request, response) {
  try {
    const { emojiId } = response.params;
    const index = emojis.findIndex((emoji) => emoji.id === +emojiId);

    if (index === -1) {
      return NextResponse.json({
        success: false,
        error: 'Emoji not found.',
      });
    }

    emojis.splice(index, 1);
    return NextResponse.json({ success: true, emojis });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}

export async function PUT(request, response) {
  try {
    const { emojiId } = response.params;

    const index = emojis.findIndex((emoji) => emoji.id === +emojiId);

    if (index === -1) {
      return NextResponse.json({
        success: false,
        error: 'Emoji not found.',
      });
    }

    const { character, name } = await request.json();

    if (!character || !name) {
      return NextResponse.json({
        success: false,
        error: 'You must provide a character and name to update an emoji.',
      });
    }

    emojis[index].character = character;
    emojis[index].name = name;
    return NextResponse.json({ success: true, emojis });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
