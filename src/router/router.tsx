import SignIn from "@/pages/sign/in-form"
import { createBrowserRouter } from "react-router-dom"

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignIn />,
  },
])

export default router
