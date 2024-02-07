import { MockPostsData } from "@/__mock__/faker-data/faker-data"
import { OutletSize, PositionXCenter } from "@/styles/common.style"
import { useState } from "react"
import styled from "styled-components"
import PostDetailModal from "./component/PostDetailModal/PostDetailModal"
import { Post } from "@/type/type"

const MainPage = () => {
  const [postList] = useState(MockPostsData(50));
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const onOpenDetailModal = (post: Post) => {
    setSelectedPost(post);
  };

  return (
    <>
      {selectedPost && (
        <PostDetailModal selectedPost={selectedPost} onClose={() => setSelectedPost(null)} />
      )}
      <S.Wrapper>
        {postList.map((post) => (
          <div key={post.id} onClick={() => onOpenDetailModal(post)}>
            {post.title}
          </div>
        ))}
      </S.Wrapper>
    </>
  );
};
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
