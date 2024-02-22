import { PositionCenter, ViewPortSize } from "@/styles/common.style"
import styled from "styled-components"
import PostHeader from "./components/post-header"
import { FC } from "react"
import PostContent from "./components/post-content"
import { useAppDispatch } from "@/hooks/use-redux-toolkit"
import { setIsOpenPost } from "@/features/post/modal.slice"

const OnePost: FC = () => {
  const dispatch = useAppDispatch()

  return (
    <S.Wrapper>
      <S.Container>
        <PostHeader onClose={() => dispatch(setIsOpenPost(false))} />
        <PostContent />
      </S.Container>
    </S.Wrapper>
  )
}
export default OnePost

const Wrapper = styled.div`
  position: absolute;
  ${ViewPortSize}
  top: 0;
  left: 0;
  background-color: rgba(253, 249, 242, 0.5);
  z-index: 1000;
`

const Container = styled.div`
  ${PositionCenter}
  width: 600px;
  height: 800px;
  margin-top: -50px;
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
  Container,
  Line,
}
