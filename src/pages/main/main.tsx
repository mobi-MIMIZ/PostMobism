import { OutletSize, PositionXCenter, flexCenter } from "@/styles/common.style"
import styled from "styled-components"
import Pagination from "./components/pagination"
import OneList from "./components/one-list"
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux-toolkit"
import { getPosts } from "@/api/post-slice"
import PostDetailModal from "./components/PostDetailModal/PostDetailModal"
import { Post } from "@/type/type"
import { MockPostsData } from "@/__mock__/faker-data/faker-data"

const MainPage = () => {
  const [postList] = useState(MockPostsData(6))
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)

  const onOpenDetailModal = (post: Post) => {
    setSelectedPost(post)
  }


  // test redux
  const dispatch = useAppDispatch()
  const post = useAppSelector(state => state.post.data)

  useEffect(() => {
    dispatch(getPosts())
  }, [])

  console.log(post)

  return (
    <S.Wrapper>
      {selectedPost && <PostDetailModal selectedPost={selectedPost} onClose={() => setSelectedPost(null)} />}
      <S.Title>Post Your Code</S.Title>
      {postList.map((list, idx) => (
        <OneList
          number={idx + 1}
          title={list.title}
          nickname={list.User.nickName}
          image={list.User.profileImg}
          key={list.id}
          onClick={() => onOpenDetailModal(list)}
        />
      ))}
      <Pagination />
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
