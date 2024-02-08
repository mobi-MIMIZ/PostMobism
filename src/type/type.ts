export type Post = {
  id: string
  title: string
  content: string
  User: User
  Post_img: string[]
  Comments: Comment[]
  createdAt: string
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
/**
 * 해당 컴포넌트만이 아닌 여러 컴포넌트에서 import되는 type들을 분리하였습니다.
 */
