import { PositionXCenter, flexCenter } from "@/styles/common.style"
import styled from "styled-components"

const Footer = () => {
  return (
    <S.Wrapper>
      <p>POSTMOBISM</p>
      <p>all rights reserved @ MIMIZ, 2nd-mobi</p>
    </S.Wrapper>
  )
}
export default Footer

const Wrapper = styled.div`
  width: 100vw;
  height: 100px;
  ${PositionXCenter}
  ${flexCenter}
  flex-direction: column;
  bottom: 0;
  color: ${({ theme }) => theme.COLORS.beige[500]};
  background-color: ${({ theme }) => theme.COLORS.white};
  border-top: 1px solid ${({ theme }) => theme.COLORS.primary["peach"]};

  & > p {
    &:first-of-type {
      font-size: 20px;
      font-weight: ${({ theme }) => theme.FONT_WEIGHT["thin"]};
      margin-bottom: 10px;
    }
    &:last-of-type {
      font-size: ${({ theme }) => theme.FONT_SIZE["small"]};
    }
  }
`

export const S = {
  Wrapper,
}
