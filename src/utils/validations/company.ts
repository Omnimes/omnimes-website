import * as z from "zod"

export const companySchema = z.object({
    name: z.string()
      .min(3, {
      message: "Nazwa firmy musi mieć co najmniej 3 znaki",
    }).max(32, {
      message: "Nazwa firmy nie może przekraczać 32 znaków",
    }),
    nip: z.string().refine(value => /^\d+$/.test(value), {
      message: "NIP musi składać się tylko z cyfr",
    }),
    streetAddress: z.string().min(1).max(255),
    postalCode: z.string().min(1).max(255),
    city: z.string().min(1).max(255),
    country: z.string().min(1).max(255),
    industry: z.string().min(1).max(255),
    phoneNumber: z.string().min(1).max(255),
    email: z.string().min(1).max(255).email(),
    website: z.string().min(1).max(255).optional(),
  });