import { OutletSize, PositionXCenter, flexCenter } from "@/styles/common.style"
import styled from "styled-components"
import Pagination from "./components/pagination"
import OneList from "./components/one-list"
import { useEffect, useState } from "react"
import PostDetailModal from "./components/post-detail-modal/post-detail-modal"
import { Post } from "@/type/type"
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux-toolkit"
import { getPosts } from "@/features/post/post.slice"

const MainPage = () => {
  // const [postList] = useState(MockPostsData(70))
  const dispatch = useAppDispatch()
  const post = useAppSelector(state => state.post.data) as Post[]
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const listLength = post.length

  const perPage = 6
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    // Dispatch the getPosts action when the component mounts
    dispatch(getPosts())
  }, [dispatch])

  const onOpenDetailModal = (post: Post) => {
    setSelectedPost(post)
  }

  const onPageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  const renderPostsForPage = () => {
    console.log(post)
    const startIndex = (currentPage - 1) * perPage
    const endIndex = startIndex + perPage

    return post
      .slice(startIndex, endIndex)
      .map((post, idx) => (
        <OneList
          number={idx + 1}
          title={post.data.title}
          nickname={post.dataUser.nickName}
          image={post.dataUser.profileImg}
          key={post.id}
          onOpenDetailModal={() => onOpenDetailModal(post)}
        />
      ))
  }

  useEffect(() => {
    // Dispatch the getPosts action when the component mounts
    dispatch(getPosts())
  }, [dispatch])

  return (
    <S.Wrapper>
      {selectedPost && <PostDetailModal selectedPost={selectedPost} onClose={() => setSelectedPost(null)} />}
      <S.Title>Post Your Code</S.Title>
      {renderPostsForPage()}
      <Pagination listLength={listLength} currentPage={currentPage} perPage={perPage} onPageChange={onPageChange} />
    </S.Wrapper>
  )
}
export default MainPage

const Wrapper = styled.div`
  ${OutletSize}
  ${PositionXCenter}
  ${flexCenter}
  flex-direction: column;
  top: 60px;
  background-color: ${({ theme }) => theme.COLORS.white};
  color: ${({ theme }) => theme.COLORS.beige[800]};
  z-index: -1;
`
const Title = styled.p`
  font-size: ${({ theme }) => theme.FONT_SIZE["XLarge"]};
  margin-bottom: 28px;
  position: relative;
  left: -26%;
`

export const S = {
  Wrapper,
  Title,
}
