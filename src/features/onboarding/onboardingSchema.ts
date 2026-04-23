import { z } from "zod";

export const GenderSchema = z.enum(["female", "male", "non_binary", "prefer_not_say"]);

export const OnboardingAnswersSchema = z.object({
  gender: GenderSchema.optional(),
  birthYear: z
    .number()
    .int()
    .min(1900)
    .max(new Date().getFullYear())
    .optional(),
  heightCm: z.number().int().min(100).max(230).optional(),
  weightKg: z.number().min(30).max(250).optional(),
  careFactorIds: z.array(z.string()).max(3).optional(),
});

export type Gender = z.infer<typeof GenderSchema>;
export type OnboardingAnswers = z.infer<typeof OnboardingAnswersSchema>;

