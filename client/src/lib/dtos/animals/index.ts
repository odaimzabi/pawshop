import { z } from "zod";

export const createAnimalShape = z.object({
  name: z.string(),
  age: z.string().min(1).max(3),
  color: z.string(),
  vaccinated: z.union([z.string().min(1), z.boolean()]),
  weight: z.string().min(1),
  gender: z
    .string()
    .min(1)
    .superRefine((val, ctx) => {
      if (!(val == "male" || val == "female")) {
        ctx.addIssue({
          code: "custom",
          path: ["gender"],
          message: "Invalid value!",
        });
      }
    }),
});

export type CreateAnimalDto = z.infer<typeof createAnimalShape>;
export type CreateAnimalResponse = CreateAnimalDto & { id: number };
export type Animal = {
  id: number;
  name: string;
  age: string;
  color: string;
  vaccinated: boolean;
  weight: string;
  gender: string;
};
