"use server";

import { StreamChat } from "stream-chat";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY!;
const apiSecret = process.env.STREAM_SECRET!; // server-only, never expose to client

const serverClient = StreamChat.getInstance(apiKey, apiSecret)
export const getTokenFromUserId = async (id: string | undefined) => {
  if (!id) {
    // create a random guest user id
    const guestId = `guest_${Math.random().toString(36).substring(2, 10)}`;
    const token = serverClient.createToken(guestId);
    return token;
     // no token needed for guest
  }

  // 🔥 Generate a JWT token for this user
  const token = serverClient.createToken(id);

  return token;
}