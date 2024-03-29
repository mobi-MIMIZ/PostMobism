export type Post = {
  id: string
  data: { title: string; content: string }
  dataUser: { data: { nickName: string }; profile_url: string; userId: string }
  dataImage?: { url: string }[]
  createdAt: string
}

export type Comment = {
  id: string
  data: { content: string }
  dataUser: { data: { nickName: string }; profile_url: string; userId: string }
  createdAt: string
}

export type Pagination = {
  start: number
  end: number
  total: number
  set: number
  current: number
}

export type TPostsResponse = {
  data: Post[] | []
  pageNation?: Pagination
}

export type TCommentsResponse = {
  data: Comment[]
  pageNation?: Pagination
}

export type User = {
  id: string
  nickName: string
  profileImg: string
}
