import { clerkClient } from "@clerk/clerk-sdk-node";
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) throw new Error("No User ID provided");

  const user = await clerkClient.users.getUser(id);

  return Response.json({ user });
}
