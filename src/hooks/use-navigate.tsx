import { useNavigate } from "react-router-dom"

/**
 * @function UseNavigation
 * useNavigate를 활용한 custom hook 함수
 * 특정 페이지로 이동할 때마다 useNavigate를 import해 사용하기 번거로워 제작한 함수
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
  const toDetail = () => {
    navigate("/detail")
  }

  return {
    toMain,
    toSignUp,
    toDetail,
  }
}
