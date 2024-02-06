import { ButtonHTMLAttributes } from "react"
import { css, styled } from "styled-components"

type ButtonProps = {
  usage: "SignForm" | "PostForm"
  type: "button" | "submit"
  label: string
  disabled?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>

const MMZbutton = ({ usage, type, label, ...props }: ButtonProps) => {
  return (
    <Button usage={usage} type={type} {...props}>
      {label}
    </Button>
  )
}
export default MMZbutton

const usageCSS = {
  SignForm: css`
    color: ${({ theme }) => theme.COLORS.primary["pink"]};
    background-color: ${({ theme }) => theme.COLORS.white};
    border: 1px solid ${({ theme }) => theme.COLORS.primary["pink"]};
    width: 546px;
    height: 42px;
    font-size: 18px; // 18px 혹은 medium
    border-radius: 4px;
  `,
  PostForm: css`
    color: ${({ theme }) => theme.COLORS.beige[500]};
    background-color: ${({ theme }) => theme.COLORS.beige[100]};
    width: 670px;
    height: 69px;
    font-size: ${({ theme }) => theme.FONT_SIZE.XXLarge};
    border-radius: 8px;
  `,
}

const Button = styled.button<{ usage?: "SignForm" | "PostForm" }>`
  ${({ usage }) => (usage ? usageCSS[usage] : "")}
  transition: all 0.6s ease-in-out;
  cursor: pointer;

  &:hover,
  &:focus {
    color: ${({ theme }) => theme.COLORS.white};
    background-color: ${({ theme }) => theme.COLORS.primary["pink"]};
  }
`
