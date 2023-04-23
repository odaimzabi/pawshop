import { z } from "zod";

export const createAnnounceShape = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(10, { message: "Description is required" }),
  animalId: z.string().min(1, { message: "Please a select your animal" }),
  location: z.string().min(1, { message: "Location is required" }),
});

export type CreateAnnounceDto = z.infer<typeof createAnnounceShape>;

export type CreateAnnounceResponse = {
  id: number;
};
