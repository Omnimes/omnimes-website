import * as z from "zod"

export const becomeDeveloperSchema = z.object({
  company: z
    .string()
    .min(3, {
        message: "nameMsg",
    })
    .max(32, {
      message: "nameMsg2",
    }),
  nip: z.string()
})