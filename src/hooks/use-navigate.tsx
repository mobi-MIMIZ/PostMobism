import { useNavigate } from "react-router-dom"

/**
 * @function UseNavigation
 * useNavigate를 모아놓은 함수 (SITEMAP)
 * @param 주소의 값을 활용해야 하는 경우 param에 값을 넣어야할 수 있습니다.
 * @returns 특정 페이지로 이동시키는 함수
 */

export const UseNavigation = () => {
  const navigate = useNavigate()

  const toMain = () => {
    navigate("/mobism")
  }
  const toSignUp = () => {
    navigate("/sign-up")
  }
  const toSignIn = () => {
    navigate("/")
  }
  const toDetail = () => {
    navigate("/detail")
  }

  return {
    toMain,
    toSignUp,
    toSignIn,
    toDetail,
  }
}
