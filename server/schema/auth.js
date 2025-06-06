import { z } from "zod";

export const SignUpSchema = z.object({
  name: z.string().max(20).refine((value) => /^\p{L}+(?:[- ]\p{L}+)*$/u.test(value ?? ""), 'only alphabets'),
  nick: z.string().max(20).refine((value) => /^\p{L}+(?:[- ]\p{L}+)*$/u.test(value ?? ""), 'only alphabets'),
  email: z.string().email().max(40),
  password: z.string().min(4).max(40),
});

export const LoginSchema = z.object({
  email: z.string().email().max(40),
  password: z.string().min(4).max(40),
});
