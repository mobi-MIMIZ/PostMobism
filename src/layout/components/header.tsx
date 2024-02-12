import { PositionXCenter, flexAlignCenter } from "@/styles/common.style"
import { FC, useState } from "react"
import styled from "styled-components"
import LOGO from "../../assets/Logo.svg"
import { UseNavigation } from "@/hooks/use-navigate"
import MMZdialog from "@/components/mmz-dialog"

const Header: FC = () => {
  const [reveal, setReveal] = useState<boolean>(false)

  const { toMain } = UseNavigation()

  return (
    <S.Wrapper>
      <S.Logo src={LOGO} onClick={() => toMain()} />
      <S.User onClick={() => setReveal(prev => !prev)} />
      {reveal && <MMZdialog label1={'create post'} label2={'logout'} />}
    </S.Wrapper>
  )
}

export default Header

const Wrapper = styled.div`
  width: 100vw;
  height: 60px;
  ${PositionXCenter}
  ${flexAlignCenter}
  justify-content: space-between;
  padding: 0 30px;
  top: 0;
  background-color: ${({ theme }) => theme.COLORS.white};
  border-bottom: 1px solid ${({ theme }) => theme.COLORS.primary["peach"]};
`
const Logo = styled.img`
  padding-bottom: 6px;
`
const User = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.COLORS.primary["peach"]};
`

export const S = {
  Wrapper,
  Logo,
  User,
}
