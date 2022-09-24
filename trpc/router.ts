import { initTRPC } from "@trpc/server";
import { z } from "zod";
import { Context } from "./context.ts";
import { createUser, fetchUsers, flushUsers, User } from "../database/mod.ts";

const users: Record<string, User> = {};
export const t = initTRPC.context<Context>().create();
export const appRouter = t.router({
  getUserById: t.procedure.input(z.string()).query(({ input }) => {
    return users[input]; // input type is string
  }),
  getUsers: t.procedure.query(async () =>
    Object.fromEntries(await fetchUsers())
  ),
  createUser: t.procedure
    // validate input with Zod
    .input(
      z.object({
        name: z.string().min(3),
        bio: z.string().max(142).optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const id = Date.now().toString();
      const user: User = { id, ...input };
      return await createUser(user);
    }),
  flushUsers: t.procedure.mutation(async () => await flushUsers()),
});

export const caller = appRouter.createCaller({});

// export type definition of API
export type AppRouter = typeof appRouter;
