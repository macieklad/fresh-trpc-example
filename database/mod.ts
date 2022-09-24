import { Redis } from "@upstash/redis";

export type User = {
  id: string;
  name: string;
  bio?: string;
};

console.log(Deno.env.get("UPSTASH_URL"), Deno.env.get("UPSTASH_TOKEN"))

const redis = new Redis({
  url: Deno.env.get("UPSTASH_URL") || "",
  token: Deno.env.get("UPSTASH_TOKEN") || ""
})

export async function createUser(user: User) {
  const currentUsers = await fetchUsers()
  if (currentUsers.size >= 50) {
    const [firstKey] = currentUsers.keys()
    currentUsers.delete(firstKey)
  }

  currentUsers.set(user.id, user)
  await redis.set("users", Object.fromEntries(currentUsers))
} 

export async function fetchUsers(): Promise<Map<string, User>> {
  const currentUsers = await redis.get<Record<string, User>>("users") || {}
  return new Map(Object.entries(currentUsers))
} 

export async function flushUsers() {
  await redis.del("users")
} 