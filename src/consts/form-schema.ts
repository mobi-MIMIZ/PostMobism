import { z } from "zod"
import { REGEXP } from "./regexp"

export const SignUpSchema = z
  .object({
    userId: z.string().email({ message: "it's not in the form of an e-mail" }),
    nickName: z.string().min(2, "Sorry, should be at least 2 words").max(10, "Sorry, can't exceed over 10 words"),
    password: z.string().regex(REGEXP.password, "Sorry, special characters must be included"),
    passwordConfirm: z.string(),
  })
  .refine(data => data.password === data.passwordConfirm, {
    path: ["passwordConfirm"],
    message: "Sorry, it doesn't match with password above",
  })

export const SignInSchema = z.object({
  userId: z.string().email({ message: "invalid email address" }),
  password: z.string().regex(REGEXP.password, { message: "special characters should be included" }),
})

export type _SignInType = z.infer<typeof SignInSchema>

export type SignInType = _SignInType & {
  token?: string
}
