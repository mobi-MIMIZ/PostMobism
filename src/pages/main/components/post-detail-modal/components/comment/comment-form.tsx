import { Send } from "lucide-react"
import styled from "styled-components"

const CommentForm = () => {
  return (
    <S.Form>
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
