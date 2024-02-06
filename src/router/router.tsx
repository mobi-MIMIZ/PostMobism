import Layout from "@/layout/layout"
import MainPage from "@/pages/main/main.index"
import DetailPage from "@/pages/detail/detail.index"
import SignIn from "@/pages/sign/in-form"
import SignUpForm from "@/pages/sign/up-form"
import { createBrowserRouter } from "react-router-dom"

const router = createBrowserRouter([
  { path: "/", element: <SignIn /> },
  { path: "/sign-up", element: <SignUpForm /> },
  {
    element: <Layout />,
    children: [
      { path: "/mobism", element: <MainPage /> },
      { path: "/detail", element: <DetailPage /> },
    ],
  },
])
export default router
