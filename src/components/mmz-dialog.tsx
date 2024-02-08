import { LiHTMLAttributes, MouseEvent } from "react"
import styled from "styled-components"

type OptionProps = {
  label1: string
  label2: string
  onClick?: (e: MouseEvent<HTMLLIElement>) => void
} & LiHTMLAttributes<HTMLLIElement>

const MMZdialog = ({ label1, label2, onClick, ...props }: OptionProps) => {
  return (
    <S.Wrapper>
      <S.Options onClick={onClick} {...props}>
        {label1}
      </S.Options>
      <S.Line />
      <S.Options onClick={onClick} {...props}>
        {label2}
      </S.Options>
    </S.Wrapper>
  )
}

export default MMZdialog

const Wrapper = styled.ul`
  width: 198px;
  height: 86px;
  border-radius: 8px;
  padding: 8px;
  background-color: ${({ theme }) => theme.COLORS.white};
  box-shadow: 0px 0px 15px 0 rgba(236, 185, 150, 0.2);
`
const Options = styled.li`
  width: 182px;
  height: 30px;
  border-radius: 6px;
  padding: 8px;
  color: ${({ theme }) => theme.COLORS.beige[500]};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.regular};
  transition: all 0.6s ease-in-out;
  cursor: pointer;

  &:active,
  &:hover {
    border-radius: 6px;
    background-color: rgba(251, 205, 179, 0.3);
    color: ${({ theme }) => theme.COLORS.primary["pink"]};
  }
`
const Line = styled.div`
  width: 100%;
  height: 1px;
  margin: 4px 0px;
  background-color: ${({ theme }) => theme.COLORS.beige[200]};
`

const S = {
  Wrapper,
  Options,
  Line,
}
