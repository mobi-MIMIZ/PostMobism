import { flexAlignCenter } from "@/styles/common.style"
import styled from "styled-components"

const Pagination = () => {
  const NumberButtons: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  return (
    <S.Wrapper>
      <JumpFirst>&lt;&lt;</JumpFirst>
      <Prev>&lt;</Prev>
      {NumberButtons.map((pageNum, idx) => (
        <S.Number key={idx + 1}>{pageNum}</S.Number>
      ))}
      <Prev>&gt;</Prev>
      <JumpFirst>&gt;&gt;</JumpFirst>
    </S.Wrapper>
  )
}
export default Pagination

const Wrapper = styled.div`
  width: 600px;
  height: 36px;
  ${flexAlignCenter}
  justify-content: space-evenly;
  margin-top: 38px;
  & > button {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    text-align: center;
    &:hover {
      border: 1px solid ${({ theme }) => theme.COLORS.primary["pink"]};
    }
    &.active {
      background-color: ${({ theme }) => theme.COLORS.primary["pink"]};
      color: ${({ theme }) => theme.COLORS.white};
    }
  }
`
const JumpFirst = styled.button``
const Prev = styled.button``
const Number = styled.button``
const Next = styled.button``
const JumpLast = styled.button``

export const S = {
  Wrapper,
  Number,
  JumpFirst,
  JumpLast,
  Prev,
  Next,
}
