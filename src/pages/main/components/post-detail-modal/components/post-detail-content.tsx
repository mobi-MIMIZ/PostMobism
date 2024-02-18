import MMZbutton from "@/components/mmz-button"
import MMZdialog from "@/components/mmz-dialog"
import { usePostActions } from "@/hooks/use-post-actions"
import { flexAlignCenter, flexCenter } from "@/styles/common.style"
import { MoreHorizontal } from "lucide-react"
import { ChangeEvent, Dispatch, FC, SetStateAction, useState } from "react"
import { useSearchParams } from "react-router-dom"
import styled from "styled-components"

type Props = {
  postId: string
  profileImage: string
  nickName: string
  title: string
  content: string
  postImages?: { url: string }[]
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
  postImages,
  weekday,
  isEditMode,
  setIsEditMode,
}) => {
  const [onShowOptions, setOnShowOptions] = useState<boolean>(false)
  const isMyPost: boolean = nickName === localStorage.getItem("userName")
  const [editedTitle, setEditedTitle] = useState<string>(title)
  const [editedContent, setEditedContent] = useState<string>(content)
  const [searchParams] = useSearchParams()
  const page = searchParams.get("page") ?? "1"

  const { handleDeletePost, handleEditPost } = usePostActions({ pageParams: parseInt(page) })

  const onEditPost = () => {
    setIsEditMode(true)
    setOnShowOptions(false)
  }

  const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(e.target.value)
  }
  const onContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setEditedContent(e.target.value)
  }

  const onSaveEditedValues = async (postId: string) => {
    if (isMyPost) {
      try {
        const editedPost = {
          id: postId,
          title: editedTitle,
          content: editedContent,
        }
        await handleEditPost(editedPost)
        setIsEditMode(false)
      } catch (error) {
        alert("변경된 내용을 저장하지 못했습니다!")
      }
    } else alert("다른 사람의 게시글은 수정할 수 없어요!")
  }

  const onDeletePost = (postId: string) => {
    if (isMyPost) {
      try {
        handleDeletePost(postId)
        setOnShowOptions(false)
      } catch (error) {
        alert("게시글을 삭제하지 못했습니다!")
      }
    } else alert("회원 님의 게시글이 아니에요!")
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
            <S.TitleInput type="text" value={editedTitle} onChange={onTitleChange} />
            <S.ContentTextarea value={editedContent} onChange={onContentChange} />
            <MMZbutton
              usage={"PostForm"}
              type={"submit"}
              label={"Save Changes"}
              onClick={() => {
                console.log("Save Changes Button Clicked")
                onSaveEditedValues(postId)
              }}
            />
          </>
        ) : (
          <>
            <S.Title>{title}</S.Title>
            <S.Content>{content}</S.Content>
            {postImages && (
              <S.PostImages>
                {postImages.map((image, idx) => (
                  <OneImage key={idx + 1} src={image.url} />
                ))}
              </S.PostImages>
            )}
            <S.WeekDay>{weekday}</S.WeekDay>
          </>
        )}
      </S.EditContainer>
    </S.ContentContainer>
  )
}
export default PostDetailContent

const ContentContainer = styled.div`
  min-height: 290px;
  height: fit-content;
`
const UserBox = styled.div`
  ${flexAlignCenter}
  margin-top: 20px;
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
  top: 90px;
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
  margin: 30px 40px 8px;
  font-size: ${({ theme }) => theme.FONT_SIZE.medium};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
  color: ${({ theme }) => theme.COLORS.beige[800]};
`
const Content = styled.div`
  margin: 20px 40px 8px;
  max-height: 120px;
  height: fit-content;
  font-size: ${({ theme }) => theme.FONT_SIZE.medium};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.regular};
  color: ${({ theme }) => theme.COLORS.beige[800]};
`
const PostImages = styled.div`
  width: 90%;
  height: 110px;
  margin-left: 5%;
  ${flexCenter}
`
const OneImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.COLORS.beige[200]};
  overflow: hidden;
`
const WeekDay = styled.div`
  position: relative;
  right: -76%;
  margin-bottom: 4px;
  font-size: ${({ theme }) => theme.FONT_SIZE.XSmall};
  color: ${({ theme }) => theme.COLORS.beige[500]};
`
/* edit-mode */
const EditContainer = styled.div`
  &.expand {
    height: 600px;
    margin-top: 40px;
    ${flexAlignCenter}
    justify-content: space-around;
    flex-direction: column;
  }
`
const TitleInput = styled.input`
  width: 540px;
  height: 50px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.COLORS.beige[500]};
  font-size: ${({ theme }) => theme.FONT_SIZE.large};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
  color: ${({ theme }) => theme.COLORS.beige[800]};
`
const ContentTextarea = styled.textarea`
  width: 540px;
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
  PostImages,
  OneImage,
}
