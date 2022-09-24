import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "./router.ts";

export function createClient(url: string) {
  return createTRPCProxyClient<AppRouter>({
    links: [
      httpBatchLink({
        url
      }),
    ],
  })
}

export function getTrpcUrl() {
    return Deno.env.get("TRPC_URL") || "http://localhost:8000/trpc";
}
