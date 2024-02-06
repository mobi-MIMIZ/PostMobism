export type DetailPageProps = {
  setIsOpenDetailModal?: React.Dispatch<React.SetStateAction<boolean>>
  postList?: Post[]
  selectedPost?: Post | undefined
  setSelectedPost?: React.Dispatch<React.SetStateAction<Post | undefined>>
}

export type Post = {
  id: string
  title: string
  content: string
  User: User
  Post_img: string[]
  createdAt: Date
  Comments: Comment[]
}

export type Comment = {
  id: string
  content: string
  User: User
  createdAt: Date
}

export type User = {
  id: string
  nickName: string
  profileImg: string
}
/**
 * 해당 컴포넌트만이 아닌 여러 컴포넌트에서 import되는 type들을 분리하였습니다.
 */

/**
 * setIsOpenDetailModal이 선택적으로 정의되어 있기 때문에 TypeScript는 해당 변수가 존재하지 않을 수 있다는 가능성을 인식한다.
 * 그렇기 때문에 해당 변수를 사용하기 전, 존재 여부를 확인! -> (?. 사용)
 */
