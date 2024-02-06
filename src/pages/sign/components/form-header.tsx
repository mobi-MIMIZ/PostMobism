import { flexCenter } from "@/styles/common.style"
import styled from "styled-components"

const FormHeader = () => {
  return <S.Title>POSTMOBISM</S.Title>
}

export default FormHeader

const Title = styled.div`
  color: ${({ theme }) => theme.COLORS.primary["pink"]};
  font-size: 60px;
  ${flexCenter};
  padding: 200px 0px;
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.thin};
`

const S = {
  Title,
}
