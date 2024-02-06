import { OutletSize, PositionXCenter } from "@/styles/common.style"
import styled from "styled-components"

const MainPage = () => {
  return <S.Wrapper>main page</S.Wrapper>
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
