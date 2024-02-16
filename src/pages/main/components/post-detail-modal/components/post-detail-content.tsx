import MMZbutton from "@/components/mmz-button"
import MMZdialog from "@/components/mmz-dialog"
import { usePostActions } from "@/hooks/use-post-actions"
import { flexAlignCenter, flexCenter } from "@/styles/common.style"
import { MoreHorizontal } from "lucide-react"
import { Dispatch, FC, SetStateAction, useState } from "react"
import styled from "styled-components"

type Props = {
  postId: string
  profileImage: string
  nickName: string
  title: string
  content: string
  weekday: string
  isEditMode: boolean
  setIsEditMode: Dispatch<SetStateAction<boolean>>
}

const PostDetailContent: FC<Props> = ({
  postId,
  profileImage,
  nickName,
  title,
  content,
  weekday,
  isEditMode,
  setIsEditMode,
}) => {
  const [onShowOptions, setOnShowOptions] = useState<boolean>(false)
  const isMyPost: boolean = nickName === localStorage.getItem("userName")
  const [editedTitle, setEditedTitle] = useState<string>(title)
  const [editedContent, setEditedContent] = useState<string>(content)

  const { handleDeletePost, handleEditPost } = usePostActions()

  const onEditPost = () => {
    setIsEditMode(true)
    setOnShowOptions(false)
  }

  const onSaveEditedValues = () => {
    try {
      const editedPost = {
        id: postId,
        title: editedTitle,
        content: editedContent,
      }
      handleEditPost(editedPost)
      setIsEditMode(false)
    } catch (error) {
      alert("변경된 내용을 저장하지 못했습니다!")
    }
  }

  const onDeletePost = (postId: string) => {
    if (isMyPost) {
      handleDeletePost(postId)
      setOnShowOptions(false)
    } else alert("회원 님의 게시글이 아닙니다!")
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
            onClick1={() => onEditPost()}
            onClick2={() => onDeletePost(postId)}
          />
        </S.Dialog>
      )}
      <S.EditContainer className={isEditMode ? "expand" : ""}>
        {isEditMode ? (
          <>
            <S.TitleInput type="text" value={editedTitle} onChange={e => setEditedTitle(e.target.value)} />
            <S.ContentTextarea value={editedContent} onChange={e => setEditedContent(e.target.value)} />
            <MMZbutton usage={"PostForm"} type={"submit"} label={"Save Changes"} onClick={onSaveEditedValues} />
          </>
        ) : (
          <>
            <S.Title>{title}</S.Title>
            <S.Content>{content}</S.Content>
            <S.WeekDay>{weekday}</S.WeekDay>
          </>
        )}
      </S.EditContainer>
    </S.ContentContainer>
  )
}
export default PostDetailContent

const ContentContainer = styled.div`
  height: 290px;
`
const UserBox = styled.div`
  ${flexAlignCenter}
  margin-top: 30px;
`
const ProfileImg = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  float: left;
  margin: 0 30px;
  background-color: ${({ theme }) => theme.COLORS.primary["peach"]};
`
const NickName = styled.div`
  font-size: 20px;
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.regular};
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
const Dialog = styled.div`
  position: fixed;
  right: 20px;
  top: 160px;
`
const Title = styled.div`
  margin: 20px 30px 10px;
  font-size: ${({ theme }) => theme.FONT_SIZE.large};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
  color: ${({ theme }) => theme.COLORS.beige[800]};
`
const Content = styled.div`
  padding: 10px 30px;
  height: 140px;
  font-size: ${({ theme }) => theme.FONT_SIZE.medium};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.regular};
  color: ${({ theme }) => theme.COLORS.beige[800]};
`
const WeekDay = styled.div`
  position: absolute;
  right: 30px;
  font-size: ${({ theme }) => theme.FONT_SIZE.small};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.regular};
  color: ${({ theme }) => theme.COLORS.beige[500]};
`
/* edit-mode */
const EditContainer = styled.div`
  &.expand {
    height: 700px;
    ${flexAlignCenter}
    justify-content: space-around;
    flex-direction: column;
    margin-top: 40px;
  }
`
const TitleInput = styled.input`
  width: 80%;
  height: 50px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.COLORS.beige[500]};
  font-size: ${({ theme }) => theme.FONT_SIZE.large};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
  color: ${({ theme }) => theme.COLORS.beige[800]};
`
const ContentTextarea = styled.textarea`
  width: 80%;
  height: 440px;
  font-size: ${({ theme }) => theme.FONT_SIZE.medium};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.regular};
  color: ${({ theme }) => theme.COLORS.beige[800]};
  border: 1px solid ${({ theme }) => theme.COLORS.beige[500]};
  border-radius: 4px;
  resize: none;
`

const S = {
  ContentContainer,
  UserBox,
  ProfileImg,
  NickName,
  OptionBtn,
  Dialog,
  Title,
  Content,
  WeekDay,
  TitleInput,
  ContentTextarea,
  EditContainer,
}
