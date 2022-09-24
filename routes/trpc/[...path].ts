import {
  fetchRequestHandler,
} from "@trpc/server/adapters/fetch";
import { Handler } from "https://deno.land/x/fresh@1.1.1/server.ts";
import { appRouter as router } from "../../trpc/router.ts";
import { createContext } from '../../trpc/context.ts'

export const handler: Handler = (req) => {
  return fetchRequestHandler({
    endpoint: "/trpc",
    req,
    router,
    createContext
  });
};
