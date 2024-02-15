import { SignUp, signOut } from "@/features/user/user.slice"
import { useAppDispatch, useAppSelector } from "./use-redux-toolkit"
import { SignUpUser } from "@/type/dto/form"

export const useUserActions = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(state => state.user[0])
  const isLoggedIn = Boolean(user.userId)

  // 현재 로그인한 유저 정보 가져오기
  const getCurrentUser = () => {
    if (isLoggedIn) {
      console.log("현재 로그인된 유저의 정보:", user)
      return user
    } else {
      return null
    }
  }

  // 사용자 등록(회원가입)
  const handleSignUp = async (formData: SignUpUser) => {
    try {
      const resultAction = await dispatch(SignUp(formData))
      const newUser = SignUp.fulfilled.match(resultAction) ? resultAction.payload : null

      if (newUser) {
        console.log("사용자 등록 성공:", newUser) // 에러 방지
      }
    } catch (error) {
      console.error("사용자 등록에 실패했습니다:", error)
    }
  }

  // 사용자 로그아웃
  const handleSignOut = () => {
    dispatch(signOut())
    // 로그아웃과 관련된 로직 추가
  }

  return {
    user,
    handleSignUp,
    handleSignOut,
    getCurrentUser,
  }
}
