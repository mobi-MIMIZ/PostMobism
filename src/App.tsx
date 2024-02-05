import { RouterProvider } from "react-router-dom"
import router from "./router/router"
import AuthProvider from "./context/auth.ctx"
import GlobalStyles from "./styles/global.style"

function App() {
  return (
    <AuthProvider>
      <GlobalStyles />
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App
