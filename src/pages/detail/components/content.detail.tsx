import { flexAlignCenter, flexCenter } from "@/styles/common.style"
import { DetailPageProps } from "@/type/type"
import { MoreHorizontal } from "lucide-react"
import { FC } from "react"
import styled from "styled-components"

const DetailContent: FC<DetailPageProps> = ({ postList, selectedPost }) => {
  console.log("onePost", selectedPost)
  return (
    <S.ContentContainer>
      <S.UserBox>
        <S.ProfileImg src={selectedPost?.User.profileImg} />
        <S.NickName>{selectedPost?.User.nickName}</S.NickName>
        <S.MoreBtn>
          <MoreHorizontal color="#ECB996" size={22} />
        </S.MoreBtn>
      </S.UserBox>
      <S.Content>{selectedPost?.content}</S.Content>
    </S.ContentContainer>
  )
}

export default DetailContent

const ContentContainer = styled.div`
  height: 290px;
`
const UserBox = styled.div`
  ${flexAlignCenter}
`

const ProfileImg = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  float: left;
  margin: 30px 20px 0px 30px;
`
const NickName = styled.span`
  font-size: 20px;
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.regular};
  padding-top: 22px;
`
const MoreBtn = styled.button`
  cursor: pointer;
  position: absolute;
  right: 22px;
  background: none;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  ${flexCenter}

  &:hover {
    background-color: ${({ theme }) => theme.COLORS.beige[100]};
  }
`
const Content = styled.div`
  margin: 0px 30px;
  height: 180px;
  ${flexCenter}
  ${({ theme }) => theme.FONT_SIZE.small}
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.regular};
`

const S = {
  ContentContainer,
  UserBox,
  ProfileImg,
  NickName,
  MoreBtn,
  Content,
}
