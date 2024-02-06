import Layout from "@/layout/layout"
import MainPage from "@/pages/main/main.index"
import SignUpForm from "@/pages/sign/up-form"
import { createBrowserRouter } from "react-router-dom"

const router = createBrowserRouter([
  { path: "/sign-up", element: <SignUpForm /> },
  { element: <Layout />, children: [{ path: "/mobism", element: <MainPage /> }] },
])

export default router
