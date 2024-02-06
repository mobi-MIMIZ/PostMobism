import MMZbutton from "@/components/mmz-button"
import MMZinput from "@/components/mmz-input"
import styled from "styled-components"
import FormHeader from "./components/form-header"
import { ViewPortSize, flexCenter } from "@/styles/common.style"
import { SignUpArr } from "@/consts/form"

const SignUpForm = () => {
  return (
    <S.Wrapper>
      <FormHeader />
      <S.FormContent>
        {SignUpArr.map(input => {
          const { id, label, type, placeholder } = input
          return <MMZinput key={id} id={id} label={label} type={type} placeholder={placeholder} usage={"signForm"} />
        })}
        <MMZbutton label={"sign up"} type={"submit"} usage={"SignForm"} />
      </S.FormContent>
    </S.Wrapper>
  )
}
export default SignUpForm

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
  margin-top: 105px;
  & > button {
    margin-top: 90px;
  }
`

export const S = {
  Wrapper,
  FormContent,
}
