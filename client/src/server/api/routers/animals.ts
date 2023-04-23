import { createTRPCRouter, publicProcedure } from "../trpc";
import { createAnimalShape } from "../../../lib/dtos/animals";
import { apiClient } from "../../../lib/axios";
import { AxiosError } from "axios";

export const animalRouter = createTRPCRouter({
  createAnimal: publicProcedure
    .input(createAnimalShape)
    .mutation(async ({ input, ctx }) => {
      const cookies = ctx.req.headers.cookie; // get the cookies from the incoming request headers
      const cookieHeader = cookies ? cookies.replace(/;/g, "; ") : ""; //
      try {
        const response = await apiClient.post("/api/animal", input, {
          headers: {
            Cookie: `${ctx.req.headers.cookie as string};`,
          },
        });
      } catch (err: AxiosError | unknown) {
        if (err instanceof AxiosError) {
          console.log(err);
        } else {
          console.log(err);
        }
      }
    }),
});
