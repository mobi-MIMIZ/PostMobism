import { MockPostsData } from "@/__mock__/faker-data/faker-data"
import { OutletSize, PositionXCenter } from "@/styles/common.style"
import { useState } from "react"
import styled from "styled-components"
import DetailPage from "../detail/detail.index"
import { Post } from "@/type/type"

const MainPage = () => {
  const [postList, setPostList] = useState(MockPostsData(50))
  const [isOpenDetailModal, setIsOpenDetailModal] = useState(false)
  const [selectedPost, setSelectedPost] = useState<Post | undefined>(undefined)
  console.log(postList)

  const onOpenDetailModal = (post: Post) => {
    setIsOpenDetailModal(prev => !prev)
    setSelectedPost(post)
  }

  return (
    <>
      {isOpenDetailModal && (
        <DetailPage
          postList={postList}
          setIsOpenDetailModal={setIsOpenDetailModal}
          setSelectedPost={setSelectedPost}
          selectedPost={selectedPost}
        />
      )}
      {/* 타이틀 클릭시 디테일 이동. 임시적으로 세팅해 두었습니다. */}
      <S.Wrapper>
        {postList?.map(post => (
          <div key={post.id} onClick={() => onOpenDetailModal(post)}>
            {post.title}
          </div>
        ))}
      </S.Wrapper>
    </>
  )
}
export default MainPage

const Wrapper = styled.div`
  ${OutletSize}
  ${PositionXCenter}
  top: 60px;
  background-color: ${({ theme }) => theme.COLORS.white};
`

export const S = {
  Wrapper,
}
