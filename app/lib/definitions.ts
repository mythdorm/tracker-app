import * as z from 'zod';

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Task = {
  user_id: string;
  title: string;
  status: "pending" | "completed";
  date: string;
}

export const SignUpFormSchema = z.object({
  name: z.string().min(2, { error: "Name must be at least 2 characters in length" }).trim(),
  email: z.email({ error: "Please enter a valid email address" }).trim(),
  password: z.string().min(8, { error: "Password must be at least 8 characters long" })
  .regex(/[a-zA-Z]/, { error: "Contain at least one letter" })
  .regex(/[0-9]/, { error : "Contain at least one number" })
  .regex(/[^a-zA-Z0-9]/, { error: "Contain at least one special character" }).trim(),
})

export const LogInFormSchema = z.object({
  email: z.email({ error: "Please enter a valid email address" }).trim(),
  password: z.string(),
})

export type FormState = | { errors?: { name?: string[], email?: string[], password?: string[] }, message?: string } | undefined;

export const SessionPayloadSchema = z.object({
  userId: z.string(),
  expireAt: z.date(),
})
export type SessionPayload = z.infer<typeof SessionPayloadSchema>;