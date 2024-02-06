import { RouterProvider } from "react-router-dom"
import router from "./router/router"
import AuthProvider from "./context/auth.ctx"
import GlobalStyles from "./styles/global.style"
import { ThemeProvider } from "styled-components"
import theme from "./styles/theme.style"

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <GlobalStyles />
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
