import MMZbutton from "@/components/mmz-button"
import MMZinput from "@/components/mmz-input"
import styled from "styled-components"
import FormHeader from "./components/form-header"
import { ViewPortSize, flexCenter } from "@/styles/common.style"
import { SignUpArr } from "@/consts/form-fields"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { SignUpSchema, SignUpType } from "@/consts/schema"

export type SignUpFieldName = "userId" | "nickname" | "password" | "passwordConfirm"

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    /* reset, */
  } = useForm<SignUpType>({
    resolver: zodResolver(SignUpSchema),
    mode: "all",
    defaultValues: {
      nickname: "",
      userId: "",
      password: "",
      passwordConfirm: "",
    },
  })

  const sendSignUpData = () => {}

  return (
    <S.Wrapper>
      <FormHeader />
      <S.FormContent onSubmit={handleSubmit(sendSignUpData)}>
        {SignUpArr.map(input => {
          const { id, label, type, placeholder } = input
          const fieldName = id as SignUpFieldName
          return (
            <MMZinput
              key={id}
              id={id}
              label={label}
              type={type}
              placeholder={placeholder}
              usage={"signForm"}
              register={register}
              error={errors[fieldName]?.message}
            />
          )
        })}
        <MMZbutton label={"sign up"} type={"submit"} usage={"SignForm"} disabled={isSubmitting} />
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
