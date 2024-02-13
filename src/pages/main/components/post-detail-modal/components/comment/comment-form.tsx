import { QUERY_KEY } from "@/consts/query-key"
import { CommentApi } from "@/features/comment/comment.api"
import { Send } from "lucide-react"
import { useQuery, useQueryClient } from "react-query"
import styled from "styled-components"

export type CommentDataType = {
  nickName: string
  profileUrl: string
  userId: string
}

const CommentForm = () => {
  const queryClient = useQueryClient()

  const { data: CommentList } = useQuery({
    queryKey: [QUERY_KEY.COMMENT_LIST],
    queryFn: () => CommentApi.getComment()
  })

  const onSubmitComment = async (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      const getItemUserInfo = localStorage.getItem("userInfo")!
      const userInfo = JSON.parse(getItemUserInfo)
      const CommentData: CommentDataType = {
        nickName: userInfo.nickName,
        profileUrl: userInfo.profileUrl,
        userId: userInfo.userId,
      }
      try {
        await CommentApi.postComment(CommentData)
        await queryClient.invalidateQueries({
          queryKey: [BATTLE_QUERY_KEY.COMMENT_LIST],
        })
      } catch {
        alert("댓글 작성에 실패하였습니다")
      }
    }
  }
  return (
    <S.Form onKeyDown={onSubmitComment}>
      <S.MyProfileImg />
      <S.TextArea placeholder="write your comments...." />
      <S.SendBtn type="submit">
        <Send color="#ECB996" size={22} strokeWidth={3} />
      </S.SendBtn>
    </S.Form>
  )
}

export default CommentForm

const Form = styled.form`
  position: fixed;
  bottom: 0px;
  width: 100%;
  display: flex;
  border-radius: 0px 0px 16px 16px;
  box-shadow: 0 2px 6px rgb(0 0 0 / 20%);
  padding: 10px 0px;
  background-color: ${({ theme }) => theme.COLORS.white};
`

const TextArea = styled.textarea`
  width: 578px;
  height: 107px;
  margin: 10px;
  padding: 10px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.COLORS.beige[100]};
  font-size: ${({ theme }) => theme.FONT_SIZE.medium};
  border: none;
  resize: none;

  &:focus {
    outline: none;
  }
  &::placeholder {
    color: ${({ theme }) => theme.COLORS.primary["peach"]};
  }
`

const MyProfileImg = styled.div`
  width: 50px;
  height: 50px;
  margin: 10px 30px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.COLORS.primary["peach"]};
`

const SendBtn = styled.button`
  position: absolute;
  bottom: 28px;
  right: 28px;
  background: none;
  cursor: pointer;
`

const S = {
  Form,
  MyProfileImg,
  TextArea,
  SendBtn,
}
