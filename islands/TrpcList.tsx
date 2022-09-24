import { computed, signal } from "@preact/signals";
import { createClient } from "../trpc/client.ts";

export default function TrpcList({ url }: { url: string}) {
  const users = signal({});
  const renderedUsers = computed(() => JSON.stringify(users.value, null, 2));
  const client = signal(createClient(url))

  const creator = async () => {
    await client.value.createUser.mutate({
      name: crypto.randomUUID(),
      bio: "An example bio",
    });
    users.value = await client.value.getUsers.query();
  };

  const fetcher = async () => {
    users.value = await client.value.getUsers.query();
  };

  const flusher = async () => {
    await client.value.flushUsers.mutate();
    users.value = {};
  };

  return (
    <>
      <h4>You can create a new user by clicking this button</h4>
      <button onClick={creator}>Create user</button>
      <h4>You can fetch users through trpc by clicking this button</h4>
      <button onClick={fetcher}>Fetch users</button>
      <h4>To flush users, click this button.</h4>
      <button onClick={flusher}>Flush users</button>
      <h5>Client side fetched list</h5>
      <pre>{renderedUsers}</pre>
    </>
  );
}
