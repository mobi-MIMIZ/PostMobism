export type Post = {
  id: string
  data: {
    title: string
    content: string
  }
  dataUser: User
  dataImage?: string[]
  Comments?: Comment[]
  createdAt: string
}

export type listInfo = {
  id: string
  data: {
    title: string
  }
}

export type Comment = {
  id: string
  content: string
  User: User
  createdAt: string
}

export type User = {
  id: string
  nickName: string
  profileImg: string
}
