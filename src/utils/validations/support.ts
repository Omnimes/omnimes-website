import * as z from "zod"

export const FormSchemaSupport = z
  .object({
    problem: z
      .string({
        required_error: "SelectProblem",
      })
      .min(1, { message: "SelectProblem" }),

    other: z.string(),
    message: z
      .string({
        required_error: "RequiredTextArea",
      })
      .min(10, { message: "TextareaMessage" }),
  })
  .superRefine(({ problem, other }, refinementContext) => {
    if (problem === "other" && other.length < 3) {
      return refinementContext.addIssue({
        code: z.ZodIssueCode.custom,
        message: "InputText",
        path: ["other"],
      })
    }
  })
