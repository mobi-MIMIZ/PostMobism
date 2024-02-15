import { FC, useEffect } from "react"
import { PositionCenter, ViewPortSize } from "@/styles/common.style"
import styled from "styled-components"
import PostDetailHeader from "./components/post-detail-header"
import PostDetailContent from "./components/post-detail-content"
import Comments from "./components/comment/comments"
import { Post } from "@/type/type"
import { useGetCommentQuery } from "@/hooks/use-comment-query"
import { useParams } from "react-router-dom"

type Props = {
  selectedPost: Post
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

const PostDetailModal: FC<Props> = ({ selectedPost, onClose }) => {
  const { id: postId = "" } = useParams<{ id: string }>()

  const { commentList, fetchNextPage, isSuccess } = useGetCommentQuery(postId)

  console.log("commentList", commentList)
  console.log("postId", postId)

  //댓글 데이터를 가져와서 가공후 한번에 댓글 배열(commentListArr)에 합침
  const commentListArr: CommentListType[] = []
  commentList?.pages.map(page => {
    // console.log("page", page)
    const pageResult = Object.values(page).slice(0, -1) as CommentListType[]
    commentListArr.push(...pageResult)
  })

  // console.log("commentListArr", commentListArr)

  // 스크롤 최하단 시 fetchNextPage실행
  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight
    const scrollTop = document.documentElement.scrollTop
    const clientHeight = document.documentElement.clientHeight
    if (scrollTop + clientHeight >= scrollHeight) return fetchNextPage()
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  })

  return (
    <S.Wrapper>
      <S.OnePost>
        {selectedPost && (
          <>
            <PostDetailHeader title={selectedPost.title} onClose={onClose} />
            <S.Line />
            <PostDetailContent
              postId={selectedPost.id}
              content={selectedPost.content}
              nickName={selectedPost.User.nickName}
              profileImage={selectedPost.User.profileImg}
              weekday={selectedPost.createdAt}
            />
            <S.Line />
            {commentListArr && isSuccess && (
              <Comments comments={selectedPost.Comments} commentListArr={commentListArr} postId={postId} />
            )}
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
