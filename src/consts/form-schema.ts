import { z } from "zod"
import { REGEXP } from "./regexp"

export const SignInSchema = z.object({
  userId: z.string().email({ message: "invalid email address" }),
  password: z.string().regex(REGEXP.password, { message: "special characters should be included" }),
})

export type _SignInType = z.infer<typeof SignInSchema>

export type SignInType = _SignInType & {
  token?: string
}
