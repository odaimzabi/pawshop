import { createTRPCRouter } from "./trpc";
import { animalRouter } from "./routers/animals";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  animal: animalRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
