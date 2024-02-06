import DetailPage from "@/pages/detail/detail.index"
import SignIn from "@/pages/sign/in-form"
import { createBrowserRouter } from "react-router-dom"

const router = createBrowserRouter([
  {
    path: "/signIn",
    element: <SignIn />,
  },
  {
    path: "/detail",
    element: <DetailPage />,
  },
])

export default router
