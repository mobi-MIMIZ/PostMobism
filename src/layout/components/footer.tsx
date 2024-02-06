import { PositionXCenter } from "@/styles/common.style"
import styled from "styled-components"

const Footer = () => {
  return <S.Wrapper>footer</S.Wrapper>
}
export default Footer

const Wrapper = styled.div`
  width: 100vw;
  height: 100px;
  ${PositionXCenter}
  bottom: 0;
  background-color: ${({ theme }) => theme.COLORS.white};
  border-top: 1px solid ${({ theme }) => theme.COLORS.primary["peach"]};
`

export const S = {
  Wrapper,
}
