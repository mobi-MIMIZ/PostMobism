import { useNavigate } from "react-router-dom"

export const UseNavigation = () => {
  const navigate = useNavigate()

  const toMain = () => {
    navigate("/mobism")
  }
  const toSignUp = () => {
    navigate("/sign-up")
  }

  return {
    toMain,
    toSignUp,
  }
}
