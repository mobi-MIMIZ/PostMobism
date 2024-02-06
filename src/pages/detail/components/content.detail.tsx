import { DetailPageProps } from "@/type/type"
import { FC } from "react"
import styled from "styled-components"

const DetailContent: FC<DetailPageProps> = ({ postList, selectedPost }) => {
  console.log("onePost", selectedPost)
  return (
    <S.ContentContainer>
      <S.ProfileImg src={selectedPost?.User.profileImg} />
    </S.ContentContainer>
  )
}

export default DetailContent

const ContentContainer = styled.div``

const ProfileImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  float: left;
  margin: 0px 40px 10px 20px;
`

const S = {
  ContentContainer,
  ProfileImg,
}
