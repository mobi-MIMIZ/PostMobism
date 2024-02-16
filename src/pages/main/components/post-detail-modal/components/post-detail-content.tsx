import MMZdialog from "@/components/mmz-dialog"
import { usePostActions } from "@/hooks/use-post-actions"
import { flexAlignCenter, flexCenter } from "@/styles/common.style"
import { MoreHorizontal } from "lucide-react"
import { FC, useState } from "react"
import styled from "styled-components"

type Props = {
  postId: string
  profileImage: string
  nickName: string
  content: string
  weekday: string
}

const PostDetailContent: FC<Props> = ({ postId, profileImage, nickName, content, weekday }) => {
  const [onShowOptions, setOnShowOptions] = useState(false)

  const { handleDeletePost, handleEditPost } = usePostActions()

  const onEditPost = () => {
    // 게시글 수정 로직
    const editedPost = {
      id: postId,
      title: "",
      content: "",
    }
    handleEditPost(editedPost)
  }

  return (
    <S.ContentContainer>
      <S.UserBox>
        <S.ProfileImg src={profileImage} />
        <S.NickName>{nickName}</S.NickName>
      </S.UserBox>
      <S.OptionBtn onClick={() => setOnShowOptions(prev => !prev)}>
        <MoreHorizontal color="#ECB996" size={22} strokeWidth={4} />
      </S.OptionBtn>
      {onShowOptions && (
        <S.Dialog>
          <MMZdialog
            label1="edit post"
            label2="delete post"
            onClick1={() => onEditPost}
            onClick2={() => handleDeletePost(postId)}
          />
        </S.Dialog>
      )}
      <S.Content>{content}</S.Content>
      <S.WeekDay>{weekday}</S.WeekDay>
    </S.ContentContainer>
  )
}
export default PostDetailContent

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

const NickName = styled.div`
  font-size: 20px;
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.regular};
  padding-top: 18px;
`

const WeekDay = styled.div`
  position: absolute;
  right: 30px;
  font-size: ${({ theme }) => theme.FONT_SIZE.small};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.regular};
  color: ${({ theme }) => theme.COLORS.beige[500]};
`

const OptionBtn = styled.button`
  cursor: pointer;
  position: absolute;
  top: 120px;
  right: 22px;
  background: none;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  ${flexCenter}
  &:active,
  &:hover {
    background-color: ${({ theme }) => theme.COLORS.beige[100]};
    border: 1px solid ${({ theme }) => theme.COLORS.beige[500]};
  }
`
const Content = styled.div`
  padding: 10px 30px;
  height: 140px;
  ${flexCenter}
  font-size: ${({ theme }) => theme.FONT_SIZE.large};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.regular};
`
const Dialog = styled.div`
  position: fixed;
  right: 20px;
  top: 160px;
`
const S = {
  ContentContainer,
  UserBox,
  ProfileImg,
  NickName,
  OptionBtn,
  Dialog,
  Content,
  WeekDay,
}
