import { LiHTMLAttributes, MouseEvent } from "react"
import styled from "styled-components"

type OptionProps = {
  label1: string
  label2: string
  onClick?: (e: MouseEvent<HTMLLIElement>) => void
} & LiHTMLAttributes<HTMLLIElement>

const MMZdialog = ({ label1, label2, onClick, ...props }: OptionProps) => {
  return (
    <Wrapper>
      <Options onClick={onClick} {...props}>
        {label1}
      </Options>
      <Line />
      <Options onClick={onClick} {...props}>
        {label2}
      </Options>
    </Wrapper>
  )
}

export default MMZdialog

const Wrapper = styled.ul`
  width: 190px;
  height: 80px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.COLORS.white};
  box-shadow: 0px 0px 15px 0 rgba(236, 185, 150, 0.2);
`
const Options = styled.li`
  width: 182px;
  height: 30px;
  border-radius: 6px;
  color: ${({ theme }) => theme.COLORS.beige[300]};
  transition: all 0.6s ease-in-out;
  cursor: pointer;

  &:hover {
    border-radius: 6px;
    background-color: rgba(251, 205, 179, 0.3);
    color: ${({ theme }) => theme.COLORS.primary["pink"]};
  }
`
const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.COLORS.beige[300]};
`
