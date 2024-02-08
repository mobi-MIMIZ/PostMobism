import { RouterProvider } from "react-router-dom"
import router from "./router/router"
import AuthProvider from "./context/auth.ctx"
import GlobalStyles from "./styles/global.style"
import { ThemeProvider } from "styled-components"
import theme from "./styles/theme.style"
import { Provider } from "react-redux"
import { store } from "./store/store"

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <AuthProvider>
          <GlobalStyles />
          <RouterProvider router={router} />
        </AuthProvider>
      </Provider>
    </ThemeProvider>
  )
}

export default App
