import { RouterProvider } from "react-router-dom"
import router from "./router/router"
import AuthProvider from "./context/auth.ctx"
import GlobalStyles from "./styles/global.style"
import { ThemeProvider } from "styled-components"
import theme from "./styles/theme.style"
import { Provider } from "react-redux"
import { store } from "./features/store"
import { QueryClient, QueryClientProvider } from "react-query"

const queryClient = new QueryClient()

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <AuthProvider>
          <GlobalStyles />
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
          </QueryClientProvider>
        </AuthProvider>
      </Provider>
    </ThemeProvider>
  )
}

export default App
