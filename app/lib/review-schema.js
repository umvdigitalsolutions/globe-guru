import { z } from "zod";

export const reviewSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.email().max(254),
  destination: z.string().trim().min(2).max(200),
  rating: z.number().int().min(1).max(5),
  message: z.string().trim().min(10).max(2000),
  website: z.string().max(200).default(""),
});
