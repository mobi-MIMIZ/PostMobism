import { InputHTMLAttributes } from "react"
import { FieldValues, Path, UseFormRegister } from "react-hook-form"
import styled, { css } from "styled-components"

type InputProps<T extends FieldValues> = {
  id: Path<T>
  label: string
  type: string
  error: string | undefined
  usage: "signForm" | "postForm"
  register: UseFormRegister<T>
} & InputHTMLAttributes<HTMLInputElement>

const MMZinput = <T extends FieldValues>({ id, label, error, type, usage, register, ...props }: InputProps<T>) => {
  return (
    <S.Wrapper>
      <label>{label}</label>
      <S.Input id={id} type={type} usage={usage} {...props} {...register(id, { required: true })} />
      {error && <S.Message>{error}</S.Message>}
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
