import { InputHTMLAttributes, forwardRef } from "react"
import { FieldValues, Path } from "react-hook-form"
import styled, { css } from "styled-components"

type InputProps<T extends FieldValues> = {
  id: Path<T>
  label: string
  type: string
  error: string | undefined
  usage: "signForm" | "postForm"
} & InputHTMLAttributes<HTMLInputElement>

const MMZinput = forwardRef<HTMLInputElement, InputProps<FieldValues>>(
  ({ id, label, error, type, usage, ...props }, ref) => {
    return (
      <S.Wrapper>
        <label>{label}</label>
        {/* ref를 input 요소에 연결 */}
        <S.Input id={id} type={type} usage={usage} {...props} ref={ref} />
        {error && <S.Message>{error}</S.Message>}
      </S.Wrapper>
    )
  },
)
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
    color: ${({ theme }) => theme.COLORS.beige[500]};
    padding-bottom: 8px;
  }
`
const Input = styled.input<{ usage?: "signForm" | "postForm" }>`
  ${({ usage }) => (usage ? usageCSS[usage] : "")}
  color: ${({ theme }) => theme.COLORS.beige[800]};
  border: 1px solid ${({ theme }) => theme.COLORS.beige[500]};
  border-radius: 4px;
  padding-left: 16px;
  margin-bottom: 14px;
  &::placeholder {
    color: ${({ theme }) => theme.COLORS.beige[500]};
  }
`

const Message = styled.p`
  font-size: ${({ theme }) => theme.FONT_SIZE.XSmall};
  color: ${({ theme }) => theme.COLORS.error};
`

export const S = {
  Wrapper,
  Input,
  Message,
}
