import { flexCenter } from "@/styles/common.style"
import styled from "styled-components"

const FormHeader = () => {
  return <Title>POSTMOBISM</Title>
}

export default FormHeader

const Title = styled.div`
  color: ${({ theme }) => theme.COLORS.primary["pink"]};
  font-size: 80px;
  ${flexCenter}
`
