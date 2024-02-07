import { flexAlignCenter } from "@/styles/common.style"
import { Comment, Post } from "@/type/type"
import { FC } from "react"
import styled from "styled-components"
import CommentForm from "./comment-form"

type Props = {
  // 객체의 타입을 추론해서 쓴다 ["comments"]
  // (typeof MockOnePostData)["Comments"]
  comments: Post["Comments"]
  // Posts[number] 배열 하나의 요소의 타입만 가져올수있다
}

const Comments: FC<Props> = ({ comments }) => {
  return (
    <S.CommentsContainer>
      {comments?.map((comment: Comment) => (
        <S.CommentBox key={comment.id}>
          <S.ProfileImg src={comment.User.profileImg} />
          <S.NickName>{comment.User.nickName}</S.NickName>
          <S.Content>{comment.content}</S.Content>
        </S.CommentBox>
      ))}
      <CommentForm />
    </S.CommentsContainer>
  )
}

export default Comments

const CommentsContainer = styled.div`
  height: 426px;
  width: 100%;
  overflow-y: auto;
`

const CommentBox = styled.div`
  ${flexAlignCenter}
  margin: 8px 30px;
`
const ProfileImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  float: left;
  margin: 18px 12px 0px 0px;
`

const NickName = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.medium};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.regular};
  padding-top: 22px;
  width: 80px;
`

const Content = styled.div`
  width: fit-content;
  height: 32px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.COLORS.beige[100]};
  font-size: ${({ theme }) => theme.FONT_SIZE.medium};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.regular};
  ${flexAlignCenter};
  padding: 20px 10px;
  margin-top: 22px;
  word-wrap: break-word;
`

const S = {
  CommentsContainer,
  ProfileImg,
  NickName,
  Content,
  CommentBox,
}
