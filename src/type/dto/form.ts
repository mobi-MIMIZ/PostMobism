export type SignUpUser = {
  userId: string
  password: string
  nickname: string
}

export type SignInUser = {
  userId: string
  password: string
  nickName: string
  profileUrl: string
  token?: string
}
