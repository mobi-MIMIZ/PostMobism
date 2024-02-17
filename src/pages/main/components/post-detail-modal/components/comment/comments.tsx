import { flexAlignCenter } from "@/styles/common.style"
import styled from "styled-components"
import CommentForm from "./comment-form"
import { useGetCommentListQuery } from "@/hooks/use-get-comment-list-query"
import { useAppSelector } from "@/hooks/use-redux-toolkit"
import { useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"

const Comments = () => {
  const [page, setPage] = useState<number>(1)
  const postDetail = useAppSelector(state => state.post.postDetail)

  const { ref, inView } = useInView()

  useEffect(() => {
    if (inView) {
      setPage(page + 1)
    }
  }, [inView])

  const { data: commentList } = useGetCommentListQuery({
    postId: postDetail?.data.id!,
    pageParam: page,
  })

  return (
    <S.CommentsContainer>
      {commentList?.data?.map(comment => (
        <S.CommentBox key={comment.id}>
          <S.ProfileImg src={comment.dataUser.profile_url} />
          <S.NickName>{comment.dataUser.data.nickName}</S.NickName>
          <S.Content>{comment.data.content}</S.Content>
          <S.CreatedAt>{comment.createdAt.toString()}</S.CreatedAt>
        </S.CommentBox>
      ))}
      <div ref={ref} />
      <CommentForm page={page} />
    </S.CommentsContainer>
  )
}

export default Comments

const CommentsContainer = styled.div`
  height: 444px;
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
  padding: 26px 10px;
  margin-top: 22px;
  word-wrap: break-word;
`
const CreatedAt = styled.div`
  padding: 20px 0px 0px 10px;
  font-size: ${({ theme }) => theme.FONT_SIZE.XSmall};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.regular};
  color: ${({ theme }) => theme.COLORS.beige[500]};
`

const S = {
  CommentsContainer,
  ProfileImg,
  NickName,
  Content,
  CommentBox,
  CreatedAt,
}
