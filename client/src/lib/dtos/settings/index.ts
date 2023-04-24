import { z } from "zod";
import type { User } from "../../auth/useAuth";

export const updateInfoShape = z.object({
  email: z.string().email({ message: "Invalid email" }),
  name: z.string().min(1, { message: "Name is required" }),
  username: z.string().optional(),
  image: z.string().optional(),
});

export const updatePasswordShape = z.object({
  old_password: z
    .string()
    .min(6, { message: "Please put in your old password" }),
  new_password: z.string().min(6, { message: "New Password is required" }),
  confirm_password: z
    .string()
    .min(6, { message: "Please confirm your password" }),
});

export type UpdatePasswordDto = z.infer<typeof updatePasswordShape>;

export type UpdateInfoDto = z.infer<typeof updateInfoShape>;

export type UpdateInfoResponse = {
  success: boolean;
  message?: string | undefined;
  user?: User | undefined;
};

export type UpdatePasswordResponse = {
  success: boolean;
  message: string;
};
