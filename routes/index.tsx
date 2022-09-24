import { Handler } from "$fresh/server.ts";
import TrpcList from "../islands/TrpcList.tsx";
import { caller } from "../trpc/router.ts";

export const handler: Handler = async (req, ctx) => {
  const users = await caller.getUsers()
  return ctx.render({ users })
}

export default function Home({ data }: { data: Record<string, unknown>}) {
  return (
    <div>
      <img
        src="/logo.svg"
        width="128"
        height="128"
        alt="the fresh logo: a sliced lemon dripping with juice"
      />
      <p>
        A fresh demo with trpc. Underneath there are two lists of users. First one is empty and can be fetched by clicking the button using the island component, and the second one is non-interactive and rendered server side. There are buttons to create, fetch and flush users. Everything is stored in a global upstash redis instance with a limit of 50 users and deployed to deno deploy. Please mind that upstash has 2000 operation limit so the demo may fail at some point. Try it locally with your own instance then :)
      </p>
      <TrpcList />
      <h5>Server rendered list</h5>
      <pre>{JSON.stringify(data.users, null, 2)} </pre>
    </div>
  );
}
