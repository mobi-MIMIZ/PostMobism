import { z } from "zod"
import { REGEXP } from "./regexp"

export const SignInSchema = z.object({
  userId: z.string().email({ message: "invalid email address" }),
  password: z.string().regex(REGEXP.password, { message: "special characters should be included" }),
})

export type SignInType = z.infer<typeof SignInSchema>
