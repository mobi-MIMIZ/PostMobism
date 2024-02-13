import { PositionCenter, ViewPortSize } from "@/styles/common.style"
import styled from "styled-components"

const OnePost = () => {
    return <S.Wrapper>
        <S.Container></S.Container>
    </S.Wrapper>
}
export default OnePost

const Wrapper = styled.div`
  position: fixed;
  ${ViewPortSize};
  background-color: rgba(253, 249, 242, 0.5);
  z-index: 1000;
`

const Container = styled.div`
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
  Container,
  Line,
}
