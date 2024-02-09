import { z } from "zod"
import { REGEXP } from "./regexp"

export const SignUpSchema = z
  .object({
    userId: z.string().regex(REGEXP.userId, "it's not in the form of an e-mail"),
    nickName: z.string().min(2, "Sorry, should be at least 2 words").max(10, "Sorry, can't exceed over 10 words"),
    password: z.string().regex(REGEXP.password, "Sorry, special characters must be included"),
    passwordConfirm: z.string(),
  })
  .refine(data => data.password === data.passwordConfirm, {
    path: ["passwordConfirm"],
    message: "Sorry, it doesn't match with password above",
  })
