import { FC, useEffect, useState } from "react"
import { PositionCenter, ViewPortSize } from "@/styles/common.style"
import styled from "styled-components"
import PostDetailHeader from "./components/post-detail-header"
import PostDetailContent from "./components/post-detail-content"
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux-toolkit"
import { getComments } from "@/features/comment/comment.slice"
import Comments from "./components/comment/comments"

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
  dataImage: string[]
  dataUser: string
  id: string
}

const PostDetailModal: FC<Props> = ({ onClose }) => {
  const dispatch = useAppDispatch()
  const postDetail = useAppSelector(state => state.post.postDetail)

  const [page, setPage] = useState<number>(1)
  const [isEditMode, setIsEditMode] = useState<boolean>(false)

  useEffect(() => {
    if (!postDetail?.data.id) return
    dispatch(
      getComments({
        page,
        postId: postDetail?.data.id,
      }),
    )
  }, [page])

  // 스크롤 최하단 시 fetchNextPage실행
  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight
    const scrollTop = document.documentElement.scrollTop
    const clientHeight = document.documentElement.clientHeight
    if (scrollTop + clientHeight >= scrollHeight) return setPage(prev => prev + 1)
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  })

  if (!postDetail) return
  return (
    <S.Wrapper>
      <S.OnePost>
        <PostDetailHeader nickName={postDetail.data.dataUser.data.nickName} onClose={onClose} />
        <S.Line />
        <PostDetailContent
          postId={postDetail.data.id}
          title={postDetail.data.data.title}
          content={postDetail.data.data.content}
          postImages={postDetail.data.dataImage}
          nickName={postDetail.data.dataUser.data.nickName}
          profileImage={postDetail.data.dataUser.profile_url}
          weekday={postDetail.data.createdAt}
          isEditMode={isEditMode}
          setIsEditMode={setIsEditMode}
        />
        {isEditMode ? (
          ""
        ) : (
          <>
            <S.Line />
            <Comments comments={undefined} />
          </>
        )}
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
  width: 600px;
  height: 800px;
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
