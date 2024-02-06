import { InputHTMLAttributes } from "react"
import styled, { css } from "styled-components"

type InputProps = {
  label: string
  type: string
  error?: string
  usage?: "signForm" | "postForm"
} & InputHTMLAttributes<HTMLInputElement>

const MMZinput = ({ id, label, error, type, usage, ...props }: InputProps) => {
  return (
    <S.Wrapper>
      <label>{label}</label>
      <S.Input type={type} usage={usage} {...props} />
      {error ? <S.Message>error message</S.Message> : <S.Message>access message</S.Message>}
    </S.Wrapper>
  )
}
export default MMZinput

const usageCSS = {
  signForm: css`
    width: 546px;
    height: 42px;
  `,
  postForm: css`
    width: 670px;
    height: 95px;
  `,
}

const Wrapper = styled.div`
  padding-bottom: 16px;
  & > label {
    font-size: ${({ theme }) => theme.FONT_SIZE.small};
    display: block;
    color: ${({ theme }) => theme.COLORS.beige[200]};
    padding-bottom: 8px;
  }
`

const Input = styled.input<{ usage?: "signForm" | "postForm" }>`
  ${({ usage }) => (usage ? usageCSS[usage] : "")}
  border-radius: 4px;
  color: ${({ theme }) => theme.COLORS.beige[800]};
  border: 1px solid ${({ theme }) => theme.COLORS.beige[200]};
`

const Message = styled.p`
  font-size: ${({ theme }) => theme.FONT_SIZE.XSmall};
`

const S = {
  Wrapper,
  Input,
  Message,
}
