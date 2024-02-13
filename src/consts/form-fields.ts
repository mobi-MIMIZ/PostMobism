export const SignUpArr = [
  {
    id: "userId",
    label: "ID",
    type: "text",
    placeholder: "e-mail",
  },
  {
    id: "nickName",
    label: "nickname",
    type: "text",
    placeholder: "what’s your nick name in MOBI",
  },
  {
    id: "password",
    label: "password",
    type: "password",
    placeholder: "must be over 8 letters and should include special characters",
  },
  {
    id: "passwordConfirm",
    label: "password Confirm",
    type: "password",
    placeholder: "plz write above password again for confirm",
  },
] as const

export const SignInArr = [
  {
    id: "userId",
    label: "ID",
    type: "text",
    placeholder: "e-mail",
  },
  {
    id: "password",
    label: "password",
    type: "password",
    placeholder: "must be over 8 letters and should include special characters",
  },
]as const
