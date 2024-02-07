import { Send } from "lucide-react"
import styled from "styled-components"

const CommentForm = () => {
  return (
    <S.Form>
      <S.MyProfileImg />
      <S.TextArea placeholder="write your comments....">
        <S.SendBtn type="submit">
          <Send color="#ECB996" size={22} />
        </S.SendBtn>
      </S.TextArea>
    </S.Form>
  )
}

export default CommentForm

const Form = styled.form`
  position: relative;
  position: absolute;
  bottom: 0px;
  width: 100%;
  background-color: ${({ theme }) => theme.COLORS.white};
  display: flex;
  border-radius: 0px 0px 16px 16px;
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
  margin: 0px 30px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.COLORS.primary["peach"]};
`

const SendBtn = styled.button`
  background: none;
  cursor: pointer;
`

const S = {
  Form,
  MyProfileImg,
  TextArea,
  SendBtn,
}
