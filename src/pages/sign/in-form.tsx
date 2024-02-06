import styled from "styled-components"
import FormHeader from "./components/form-header"
import { ViewPortSize, flexCenter } from "@/styles/common.style"
import MMZinput from "@/components/mmz-input"
import { SignInArr } from "@/consts/form"
import MMZbutton from "@/components/mmz-button"

const SignIn = () => {
  return (
    <S.Wrapper>
      <FormHeader />
      <S.FormContent>
        {SignInArr.map(input => {
          const { id, label, type, placeholder } = input

          return <MMZinput key={id} id={id} label={label} type={type} placeholder={placeholder} usage={"signForm"} />
        })}
        <MMZbutton usage={"SignForm"} type="submit" label={"sign in"} />
      </S.FormContent>
    </S.Wrapper>
  )
}

export default SignIn

const Wrapper = styled.div`
  ${ViewPortSize}
  position: relative;
  ${flexCenter}
  flex-direction: column;
`

const FormContent = styled.form`
  width: 100%;
  height: 552px;
  ${flexCenter}
  flex-direction: column;
  margin-top: 80px;
  & > button {
    margin-top: 158px;
  }
`

const S = {
  Wrapper,
  FormContent,
}
