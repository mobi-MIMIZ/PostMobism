import { FC } from "react"
import { PositionCenter, ViewPortSize } from "@/styles/common.style"
import styled from "styled-components"
import PostDetailHeader from "./components/post-detail-header"
import PostDetailContent from "./components/post-detail-content"
import Comments from "./components/comment/comments"
import { Post } from "@/type/type"

type Props = {
  selectedPost: Post
  onClose: () => void
}

const PostDetailModal: FC<Props> = ({ selectedPost, onClose }) => {
  //react-query

  return (
    <S.Wrapper>
      <S.OnePost>
        {selectedPost && (
          <>
            <PostDetailHeader title={selectedPost.title} onClose={onClose} />
            <S.Line />
            <PostDetailContent
              content={selectedPost.content}
              nickName={selectedPost.User.nickName}
              profileImage={selectedPost.User.profileImg}
              weekday={selectedPost.createdAt}
            />
            <S.Line />
            <Comments comments={selectedPost.Comments} />
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
  width: 720px;
  height: 950px;
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