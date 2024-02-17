import { OutletSize, PositionXCenter, flexCenter } from "@/styles/common.style"
import styled from "styled-components"
import Pagination from "./components/pagination"
import OneList from "./components/one-list"
import { useEffect, useState } from "react"
import PostDetailModal from "./components/post-detail-modal/post-detail-modal"
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux-toolkit"
import { getOnePost, getPosts } from "@/features/post/post.slice"
import { useSearchParams } from "react-router-dom"

const MainPage = () => {
  // const [postList] = useState(MockPostsData(70))
  const [isOpenDetailPost, setIsOpenDetailPost] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const postList = useAppSelector(state => state.post.postList) // perPage
  const [searchParams] = useSearchParams()

  const page = parseInt(searchParams.get("page") || "1")
  const [currentPage, setCurrentPage] = useState(page)

  const onOpenDetailModal = async (postId: string) => {
    await dispatch(getOnePost(postId))
    setIsOpenDetailPost(true)
  }

  const onPageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  useEffect(() => {
    dispatch(getPosts(currentPage))
  }, [currentPage, dispatch])

  console.log(postList?.pageNation)

  return (
    <S.Wrapper>
      {isOpenDetailPost && <PostDetailModal onClose={() => setIsOpenDetailPost(false)} />}
      <S.Title>Post Your Code</S.Title>
      {postList?.data.map((post, idx) => (
        <OneList
          number={idx + 1}
          title={post.data.title}
          nickname={post.dataUser.data.nickName}
          image={post.dataUser.profile_url}
          key={post.id}
          onOpenDetailModal={() => onOpenDetailModal(post.id)}
        />
      ))}
      <Pagination
        startPage={postList.pageNation?.start}
        endPage={postList.pageNation?.end}
        currentPage={postList.pageNation?.current}
        totalPage={postList.pageNation?.total}
        onPageChange={onPageChange}
      />
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
