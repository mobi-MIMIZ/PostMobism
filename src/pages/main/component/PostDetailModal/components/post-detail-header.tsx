import { flexAlignCenter, flexCenter } from "@/styles/common.style"
import { X } from "lucide-react"
import { FC } from "react"
import styled from "styled-components"

type Props = {
  title: string
  onClose: () => void
}

const PostDetailHeader: FC<Props> = ({ title, onClose }) => {
  return (
    <S.HeaderContainer>
      <S.Title>{title}</S.Title>
      <S.CloseBtn onClick={onClose}>
        <X color="#ECB996" size={24} strokeWidth={4} />
      </S.CloseBtn>
    </S.HeaderContainer>
  )
}

export default PostDetailHeader

const HeaderContainer = styled.div`
  padding: 16px;
  width: 720px;
  ${flexAlignCenter}
`

const Title = styled.div`
  font-size: 26px;
  text-align: center;
  margin-left: 10px;
  flex-grow: 1; /* 남은 공간을 가득 채우도록 */
`

const CloseBtn = styled.button`
  cursor: pointer;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  ${flexCenter}
  background: none;
  margin-right: 6px;

  &:hover {
    background-color: ${({ theme }) => theme.COLORS.beige[100]};
  }
`

const S = {
  Title,
  CloseBtn,
  HeaderContainer,
}
