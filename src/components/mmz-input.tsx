import { InputHTMLAttributes } from "react"
import styled, { css } from "styled-components"

type InputProps = {
  label: string
  type: "input" | "file"
  error?: string
  usage?: "signForm" | "postForm"
} & InputHTMLAttributes<HTMLInputElement>

const MMZinput = ({ label, error, type, usage, ...props }: InputProps) => {
  return (
    <Wrapper>
      <label>{label}</label>
      <Input type={type} usage={usage} {...props} />
      {error ? <Message>error message</Message> : <Message>access message</Message>}
    </Wrapper>
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
  border: 1px solid ${({ theme }) => theme.COLORS.beige[200]};
  border-radius: 4px;
  color: ${({ theme }) => theme.COLORS.beige[800]};
`

const Input = styled.input<{ usage?: "signForm" | "postForm" }>`
  ${({ usage }) => (usage ? usageCSS[usage] : "")}
`

const Message = styled.p`
  font-size: ${({ theme }) => theme.FONT_SIZE.XSmall};
`
