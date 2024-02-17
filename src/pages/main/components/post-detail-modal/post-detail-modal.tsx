import { FC } from "react"
import { PositionCenter, ViewPortSize } from "@/styles/common.style"
import styled from "styled-components"
import PostDetailHeader from "./components/post-detail-header"
import PostDetailContent from "./components/post-detail-content"
import Comments from "./components/comment/comments"
import { useAppSelector } from "@/hooks/use-redux-toolkit"

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
  const postDetail = useAppSelector(state => state.post.postDetail)

  if (!postDetail) return
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
