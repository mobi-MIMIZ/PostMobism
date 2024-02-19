import { flexAlignCenter, flexCenter } from "@/styles/common.style"
import { X } from "lucide-react"
import { FC, MouseEventHandler } from "react"
import styled from "styled-components"

type Props = {
  onClose: MouseEventHandler<HTMLButtonElement>
}

const PostHeader: FC<Props> = ({ onClose }) => {
  return (
    <S.Container>
      <S.Title>Share your Code</S.Title>
      <S.CloseBtn onClick={onClose}>
        <X color="#ECB996" size={24} strokeWidth={4} />
      </S.CloseBtn>
    </S.Container>
  )
}

export default PostHeader

const Container = styled.div`
  padding: 16px;
  width: 100%;
  ${flexAlignCenter}
  border-bottom: 1px solid ${({ theme }) => theme.COLORS.beige[500]};
`

const Title = styled.p`
  font-size: 26px;
  text-align: center;
  margin-left: 10px;
  padding: 0 20px;
  word-break: keep-all;
  flex-grow: 1;
  color: ${({ theme }) => theme.COLORS.beige[500]};
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
  Container,
}
