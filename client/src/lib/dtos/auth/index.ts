import { z } from "zod";

export const loginShape = z.object({
  email: z
    .string()
    .email({ message: "Invalid email" })
    .min(1, { message: "Invalid email" }),
  password: z
    .string()
    .min(8, { message: "Password must contain 8 characters" }),
});

export const registerShape = z.object({
  fullName: z.string().min(1),
  email: z.string().email({ message: "Invalid email" }),
  password: z.string().min(1),
});

export type LoginDto = z.infer<typeof loginShape>;
export type RegisterDto = z.infer<typeof registerShape>;
