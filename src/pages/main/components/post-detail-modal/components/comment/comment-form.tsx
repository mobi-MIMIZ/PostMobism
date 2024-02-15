import { QUERY_KEY } from "@/consts/query-key"
import { CommentApi } from "@/features/comment/comment.api"
import { getPosts } from "@/features/post/post.slice"
import useInput from "@/hooks/use-input"
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux-toolkit"
import { Send } from "lucide-react"
import { useEffect, useState } from "react"
import { useQueryClient } from "react-query"
import styled from "styled-components"

export type CommentDataType = {
  nickName: string
  profileUrl: string
  userId: string
  content: string
  parentId: string
}

const CommentForm = () => {
  const dispatch = useAppDispatch()
  const post = useAppSelector(state => state.post.data)

  useEffect(() => {
    dispatch(getPosts())
  }, [])

  // console.log("post", post[0])

  const queryClient = useQueryClient()
  const [content, setContent] = useState("")

  //댓글을 작성하는 함수
  const [values, onChange] = useInput({
    content: "",
  })

  const onSubmitComment = async (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      const userInfoString = localStorage.getItem("userInfo")!
      const userInfo = JSON.parse(userInfoString)
      const CommentData: CommentDataType = {
        nickName: userInfo.nickName,
        profileUrl: userInfo.profileUrl,
        userId: userInfo.userId,
        content: values.content,
        parentId: post[0].id,
      }
      try {
        await CommentApi.postComment(CommentData)
        setContent("")
        queryClient.invalidateQueries(QUERY_KEY.COMMENT_LIST)
      } catch {
        alert("댓글 작성에 실패하였습니다")
      }
    }
  }

  return (
    <S.Form onKeyDown={onSubmitComment}>
      <S.MyProfileImg />
      <S.TextArea placeholder="write your comments...." onChange={onChange} />
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
