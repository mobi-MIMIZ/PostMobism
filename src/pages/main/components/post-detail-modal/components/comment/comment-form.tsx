import { CommentApi } from "@/features/comment/comment.api"
import { commentApi } from "@/hooks/use-get-comment-list-query"
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux-toolkit"
import { Send } from "lucide-react"
import { useState } from "react"
import styled from "styled-components"

export type CommentDataType = {
  content: string
  parentId: string
}

export type FormElementType = {
  target: {
    content: {
      value: string
    }
  }
} & React.KeyboardEvent<HTMLFormElement>

const CommentForm: React.FC<{ page: number }> = ({ page }) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const postDetail = useAppSelector(state => state.post.postDetail)

  const onSubmitComment = async (e: FormElementType) => {
    e.preventDefault()
    if (!postDetail?.data.id) return
    const CommentData: CommentDataType = {
      content: e.target.content.value,
      parentId: postDetail.data.id,
    }
    try {
      setIsSubmitting(true) // 제출 시작시 버튼 비활성화
      const res = await CommentApi.postComment(CommentData)
      e.target.content.value = ""
      setTimeout(() => {
        setIsSubmitting(false) // 제출 완료
      }, 1500)
      dispatch(
        commentApi.util.updateQueryData("getCommentList", { postId: postDetail.data.id, pageParam: page }, old => {
          return {
            ...old,
            data: [res.data, ...old.data],
          }
        }),
      )
    } catch {
      alert("댓글 작성에 실패하였습니다")
    }
  }

  return (
    <S.Form onSubmit={onSubmitComment}>
      <S.MyProfileImg />
      <S.TextArea placeholder="write your comments...." name="content" />
      <S.SendBtn type="submit" disabled={isSubmitting}>
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
