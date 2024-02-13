import styled from "styled-components"
import FormHeader from "./components/form-header"
import { ViewPortSize, flexCenter } from "@/styles/common.style"
import MMZinput from "@/components/mmz-input"
import { SignInArr } from "@/consts/form-fields"
import MMZbutton from "@/components/mmz-button"
import { UseNavigation } from "@/hooks/use-navigate"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { SignInSchema, SignInType } from "@/consts/form-schema"
import { AuthApi } from "@/features/user/auth.api"
import { useAuth } from "@/context/auth.ctx"
import { useState } from "react"

const SignIn = () => {
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    resolver: zodResolver(SignInSchema),
    mode: "all",
    defaultValues: {
      userId: "",
      password: "",
    },
  })

  const initialUserInfo = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")!) : null
  const [, setUserInfo] = useState(initialUserInfo)
  const { toMain, toSignUp } = UseNavigation()
  const { signIn } = useAuth()
  /**
   * 왜 안되는가?
   * localStorage에 setItem이 제대로되지 않아서?
   */

  const onSubmitSignIn = async (data: SignInType) => {
    try {
      const res = await AuthApi.SignIn(data)
      console.log(res.data)
      const userInfo = {
        userId: res.data.userId,
        nickName: res.data.info.nickname,
        profileUrl: res.data.info.profileUrl,
      }
      localStorage.setItem("userInfo", JSON.stringify(userInfo))
      setUserInfo(userInfo)
      signIn(res.data.token)
      toMain()
    } catch {
      alert("아이디와 비밀번호를 확인해주세요")
    }
  }

  return (
    <S.Wrapper>
      <FormHeader />
      <S.FormContent onSubmit={handleSubmit(onSubmitSignIn)}>
        {SignInArr.map(input => {
          const { id, label, type, placeholder } = input
          return (
            <Controller
              control={control}
              name={id}
              rules={{
                required: true,
              }}
              render={({ field, fieldState }) => (
                <MMZinput
                  key={id}
                  id={id}
                  label={label}
                  type={type}
                  placeholder={placeholder}
                  usage={"signForm"}
                  value={field.value}
                  error={fieldState.error?.message}
                  onChange={field.onChange}
                />
              )}
            />
          )
        })}
        <MMZbutton usage={"SignForm"} type="submit" label={"sign in"} disabled={!isValid} />
        <S.Text onClick={() => toSignUp()}>not a member?</S.Text>
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
    margin-top: 140px;
  }
`
const Text = styled.p`
  width: 100px;
  height: 20px;
  border-radius: 50px;
  color: ${({ theme }) => theme.COLORS.primary["pink"]};
  font-size: ${({ theme }) => theme.FONT_SIZE["small"]};
  margin-top: 10px;
  cursor: pointer;
  transition: all 0.6s ease-in-out;
  ${flexCenter}
  &:hover {
    background-color: ${({ theme }) => theme.COLORS.primary["pink"]};
    color: ${({ theme }) => theme.COLORS.white};
  }
`

const S = {
  Wrapper,
  FormContent,
  Text,
}
