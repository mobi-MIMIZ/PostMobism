import { FC, useEffect, useState } from "react"
import { PositionCenter, ViewPortSize } from "@/styles/common.style"
import styled from "styled-components"
import PostDetailHeader from "./components/post-detail-header"
import PostDetailContent from "./components/post-detail-content"
import Comments from "./components/comment/comments"
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux-toolkit"
import { getComments } from "@/features/comment/comment.slice"

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

  useEffect(() => {
    if (!postDetail?.data.id) return

    const handleScroll = () => {
      const isAtEndOfPage =
        window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight
      if (isAtEndOfPage) {
        setPage(prev => prev + 1)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [postDetail])

  useEffect(() => {
    if (!postDetail?.data.id) return
    console.log("page", page)
    dispatch(
      getComments({
        page,
        postId: postDetail?.data.id,
      }),
    )
  }, [page])

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
