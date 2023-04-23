import { z } from "zod";

export const createAnimalShape = z.object({
  name: z.string().min(1),
  age: z.string().min(1).max(3),
  image: z.string().min(1),
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

export const editAnimalShape = z.object({
  name: z.string().min(1),
  age: z.string().min(1).max(3),
  image: z.string().min(1).optional(),
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
export type EditAnimalDto = z.infer<typeof editAnimalShape>;
export type Animal = {
  id: number;
  name: string;
  age: string;
  color: string;
  vaccinated: boolean;
  weight: string;
  gender: string;
  image: string;
};
