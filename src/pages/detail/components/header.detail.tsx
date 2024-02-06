import { flexAlignCenter, flexCenter } from "@/styles/common.style"
import { DetailPageProps } from "@/type/type"
import { X } from "lucide-react"
import { FC } from "react"
import styled from "styled-components"

const DetailHeader: FC<DetailPageProps> = ({ setIsOpenDetailModal }) => {
  const onCloseModal = () => {
    setIsOpenDetailModal?.(false)
  }
  return (
    <S.HeaderContainer>
      <S.Title>Hello, mobi</S.Title>
      <S.CloseBtn onClick={onCloseModal}>
        <X color="#ECB996" size={24} />
      </S.CloseBtn>
    </S.HeaderContainer>
  )
}

export default DetailHeader

const HeaderContainer = styled.div`
  padding: 16px;
  width: 720px;
  ${flexAlignCenter}
`

const Title = styled.div`
  font-size: 26px;
  text-align: center;
  flex-grow: 1; /* 남은 공간을 가득 채우도록 */
`

const CloseBtn = styled.button`
  cursor: pointer;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.COLORS.beige[100]};
  ${flexCenter}
`

const S = {
  Title,
  CloseBtn,
  HeaderContainer,
}
