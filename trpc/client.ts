import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from './router.ts';

export const client = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: Deno.env.get("TRPC_URL") || 'http://localhost:8000/trpc',
    }),
  ],
});