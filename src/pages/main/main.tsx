import { OutletSize, PositionXCenter, flexCenter } from "@/styles/common.style"
import styled from "styled-components"
import Pagination from "./components/pagination"
import OneList from "./components/one-list"
import {  useState } from "react"
import PostDetailModal from "./components/post-detail-modal/post-detail-modal"
import { Post } from "@/type/type"
import { MockPostsData } from "@/__mock__/faker-data/faker-data"

const MainPage = () => {
  const [postList] = useState(MockPostsData(6))
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)

  const onOpenDetailModal = (post: Post) => {
    setSelectedPost(post)
  }


  // const dispatch = useAppDispatch()
  // const post = useAppSelector(state => state.post.data)

  // useEffect(() => {
  //   dispatch(getPosts())
  // }, [])

  // console.log(post)

  return (
    <S.Wrapper>
      {selectedPost && <PostDetailModal selectedPost={selectedPost} onClose={() => setSelectedPost(null)} />}
      <S.Title>Post Your Code</S.Title>
      {postList.map((post, idx) => (
        <OneList
          number={idx + 1}
          title={post.title}
          nickname={post.User.nickName}
          image={post.User.profileImg}
          key={post.id}
          onOpenDetailModal={() => onOpenDetailModal(post)}
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
