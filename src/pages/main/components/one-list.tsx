import { UseNavigation } from "@/hooks/use-navigate"
import { flexAlignCenter } from "@/styles/common.style"
import { skipTitleView } from "@/utils/overflow-text-helper"
import styled from "styled-components"

type ListProps = {
  number: number
  title: string
  nickname: string
  image: string
}

const OneList = ({ number, title, nickname, image }: ListProps) => {
  const { toDetail } = UseNavigation()
  return (
    <S.Wrapper onClick={() => toDetail()}>
      <S.Number>{number}</S.Number>
      <S.Title>{skipTitleView(title)}</S.Title>
      <S.Writer>{nickname}</S.Writer>
      <S.Image src={image} />
    </S.Wrapper>
  )
}
export default OneList

const Wrapper = styled.div`
  width: 1200px;
  height: 72px;
  color: ${({ theme }) => theme.COLORS.beige[800]};
  background-color: ${({ theme }) => theme.COLORS.white};
  border: 1px solid ${({ theme }) => theme.COLORS.beige[500]};
  ${flexAlignCenter}
  justify-content: space-between;
  padding: 0 20px;
  margin: 12px 0;
`
const Number = styled.p``
const Title = styled.p`
  width: 60%;
  text-align: left;
`
const Writer = styled.p`
  margin-left: 10%;
  text-align: right;
`
const Image = styled.img`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.COLORS.beige[500]};
`

export const S = {
  Wrapper,
  Number,
  Title,
  Writer,
  Image,
}