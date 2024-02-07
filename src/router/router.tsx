import Layout from "@/layout/layout"
import MainPage from "@/pages/main/main"
import SignIn from "@/pages/sign/in-form"
import SignUpForm from "@/pages/sign/up-form"
import { createBrowserRouter } from "react-router-dom"

const router = createBrowserRouter([
  {
    path: "/sign-in",
    element: <SignIn />,
  },
  { path: "/sign-up", element: <SignUpForm /> },
  {
    element: <Layout />,
    children: [{ path: "/mobism", element: <MainPage /> }],
  },
])

export default router
