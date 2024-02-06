import styled from "styled-components"
import FormHeader from "./components/form-header"
import { flexCenter } from "@/styles/common.style"
import MMZinput from "@/components/mmz-input"
import { SignInArr } from "@/consts/form"
import MMZbutton from "@/components/mmz-button"

const SignIn = () => {
  return (
    <S.Wrapper>
      <FormHeader />
      <S.Form>
        {SignInArr.map(el => {
          const { id, label, type, placeholder } = el

          return <MMZinput key={id} id={id} label={label} type={type} placeholder={placeholder} usage={"signForm"} />
        })}
        <MMZbutton usage={"SignForm"} type="submit" label={"sign in"} />
      </S.Form>
    </S.Wrapper>
  )
}

export default SignIn

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
`

const Form = styled.form`
  ${flexCenter}
  display: flex;
  flex-direction: column;
  & > button {
    margin-top: 200px;
  }
`

const S = {
  Wrapper,
  Form,
}
