import { DetailPageProps, Comment } from "@/type/type"
import { FC } from "react"
import styled from "styled-components"

const Comments: FC<DetailPageProps> = ({ selectedPost }) => {
  const comments = selectedPost?.Comments
  console.log("comments", comments)
  return (
    <>
      {comments?.map((comment: Comment) => (
        <S.UserBox key={comment.id}>
          <S.ProfileImg src={comment.User.profileImg} />
          <S.NickName>{comment.User.nickName}</S.NickName>
        </S.UserBox>
      ))}
    </>
  )
}

export default Comments

const S = {
  UserBox: styled.div`
    // 스타일 정의
  `,
  ProfileImg: styled.img`
    // 스타일 정의
  `,
  NickName: styled.div`
    // 스타일 정의
  `,
}
