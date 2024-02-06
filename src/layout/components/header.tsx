import { PositionXCenter } from "@/styles/common.style"
import { FC } from "react"
import styled from "styled-components"

const Header: FC = () => {
  return <S.Wrapper>header</S.Wrapper>
}

export default Header

const Wrapper = styled.div`
  width: 100vw;
  height: 50px;
  ${PositionXCenter}
  top: 0;
  background-color: ${({ theme }) => theme.COLORS.white};
  border-bottom: 1px solid ${({ theme }) => theme.COLORS.primary["peach"]};
`

export const S = {
  Wrapper,
}
