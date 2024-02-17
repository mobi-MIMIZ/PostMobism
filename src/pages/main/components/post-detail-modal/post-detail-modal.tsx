import { FC, useEffect, useState } from "react"
import { PositionCenter, ViewPortSize } from "@/styles/common.style"
import styled from "styled-components"
import PostDetailHeader from "./components/post-detail-header"
import PostDetailContent from "./components/post-detail-content"
import Comments from "./components/comment/comments"
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux-toolkit"
import { getComments } from "@/features/comment/comment.slice"
import { useInfiniteQuery } from "react-query"
import { commentApi } from "@/hooks/use-get-comment-list-query"
import { QUERY_KEY } from "@/consts/query-key"
import { useInfiniteCommentsQuery } from "@/hooks/use-infinite-comments-query"

type Props = {
  onClose: () => void
}

export type CommentListType = {
  createdAt: string
  data: {
    content: string
    nickName: string
    parentId: string
    profileUrl: string | undefined
    userId: string
  }
  dataImage: any[]
  dataUser: any
  id: string
}

const PostDetailModal: FC<Props> = ({ onClose }) => {
  const dispatch = useAppDispatch()
  const postDetail = useAppSelector(state => state.post.postDetail)

  const [page, setPage] = useState<number>(1)

  const { data: commentList, fetchNextPage, hasNextPage, isFetching } = useInfiniteCommentsQuery(postDetail?.data.id)

  console.log("data", commentList)

  useEffect(() => {
    if (!postDetail?.data.id || isFetching) return
    dispatch(getComments({ page, postId: postDetail.data.id }))
  }, [page, postDetail?.data.id, isFetching])

  const handleScroll = () => {
    //페이지의 맨 아래에 도달하면 다음 페이지 호출
    if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
      if (hasNextPage) {
        fetchNextPage()
      }
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    //컴포넌트가 언마운트 시 제거
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  if (!postDetail) return null

  return (
    <S.Wrapper>
      <S.OnePost>
        <>
          <PostDetailHeader title={postDetail.data.data.title} onClose={onClose} />
          <S.Line />
          <PostDetailContent
            postId={postDetail.data.id}
            content={postDetail.data.data.content}
            nickName={postDetail.data.dataUser.data.nickName}
            profileImage={postDetail.data.dataUser.profile_url}
            weekday={postDetail.data.createdAt}
          />
          <S.Line />
          <Comments />
        </>
      </S.OnePost>
    </S.Wrapper>
  )
}
export default PostDetailModal

const Wrapper = styled.div`
  position: fixed;
  ${ViewPortSize};
  background-color: rgba(253, 249, 242, 0.5);
  z-index: 1000;
`

const OnePost = styled.div`
  ${PositionCenter}
  width: 720px;
  height: 950px;
  background-color: ${({ theme }) => theme.COLORS.white};
  box-shadow: 0px 10px 10px 10px rgba(236, 185, 150, 0.2);
  border-radius: 16px;
  padding-top: 4px;
`

const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.COLORS.beige[500]};
`

const S = {
  Wrapper,
  OnePost,
  Line,
}
