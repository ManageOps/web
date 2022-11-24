import { z } from "zod";

export const rfpSchema = z.object({
  name: z.string().min(1, { message: "Required" }),
  email: z.string().email(),
  pronouns: z.string().nullable(),
  talk_type: z.string().nullable(),
  talk_topic: z.string().nullable(),
  consent: z.string().transform((val, ctx) => {
    const parsed = val ? true : false;
    if (!parsed) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "You must give consent to continue",
      });
      return z.NEVER;
    }
    return parsed;
  }),
});
