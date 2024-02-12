import { AuthApi } from "@/api/auth.api"
import { TokenRepository } from "@/repository/token-repository"
import { FC, ReactNode, createContext, useContext } from "react"

type AuthProviderProps = {
  children: ReactNode
}

interface AuthContextProps {
  signIn: (token: string) => void
  signOut: () => void
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined)
export const useAuth = () => {
  const context = useContext(AuthContext)
  // 변수가 있는지 확인하는 간단한 런타임 검사. null 이나 undefined일 경우 오류 발생
  if (!context) {
    throw new Error("useAuth는 반드시 AuthProvider와 함께 사용되어야 합니다")
  }
  return context
}

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const signIn = async (token: string) => {
    TokenRepository.setToken(token)
  }
  const signOut = async () => {
    await AuthApi.SignOut()
    TokenRepository.removeToken()
  }
  return <AuthContext.Provider value={{ signIn, signOut }}>{children}</AuthContext.Provider>
}
export default AuthProvider
