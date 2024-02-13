import MMZbutton from "@/components/mmz-button"
import MMZinput from "@/components/mmz-input"
import styled from "styled-components"
import FormHeader from "./components/form-header"
import { ViewPortSize, flexCenter } from "@/styles/common.style"
import { SignUpArr } from "@/consts/form-fields"
import { Controller, FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { SignUpSchema } from "@/consts/schema"
import { z } from "zod"
import { AuthApi } from "@/features/user/auth.api"
import { UseNavigation } from "@/hooks/use-navigate"

export type SignUpFieldName = "userId" | "nickName" | "password" | "passwordConfirm"
export type SignUpType = z.infer<typeof SignUpSchema>

const SignUpForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<SignUpType>({
    resolver: zodResolver(SignUpSchema),
    mode: "all",
    defaultValues: {
      userId: "",
      nickName: "",
      password: "",
      passwordConfirm: "",
    },
  })

  const { toSignIn } = UseNavigation()

  const sendSignUpData: SubmitHandler<SignUpType> = async (data: FieldValues) => {
    /* window.confirm("You Sure? \n Can't change your information. ") */
    try {
      await AuthApi.SignUp(data)
      alert("Welcome, plz enjoy your time :)")
      reset()
      toSignIn()
    } catch (error) {
      alert("Oops! Error Occur! Plz try again later")
    }
  }

  return (
    <S.Wrapper>
      <FormHeader />
      <S.FormContent onSubmit={handleSubmit(sendSignUpData)}>
        {SignUpArr.map(input => {
          const { id, label, type, placeholder } = input
          const fieldName = id as SignUpFieldName
          return (
            <Controller
              key={id}
              control={control}
              name={fieldName}
              render={({ field }) => (
                <MMZinput
                  id={id}
                  label={label}
                  type={type}
                  placeholder={placeholder}
                  usage={"signForm"}
                  {...field}
                  error={errors[fieldName]?.message}
                />
              )}
            />
          )
        })}
        <MMZbutton label={"sign up"} type={"submit"} usage={"SignForm"} disabled={isValid} />
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
