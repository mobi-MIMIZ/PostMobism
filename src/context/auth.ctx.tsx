import { AuthApi } from "@/features/user/auth.api"
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
export const useAuth = () => useContext(AuthContext)

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
