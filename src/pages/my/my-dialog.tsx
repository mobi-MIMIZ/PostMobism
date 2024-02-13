import { flexAlignCenter, flexCenter } from "@/styles/common.style"
import styled from "styled-components"

const MyDialog = () => {
    return<S.Wrapper>
        <S.Select>Create Post</S.Select>
        <S.Line />
        <S.Select>Logout</S.Select>
    </S.Wrapper>
}
export default MyDialog

const Wrapper = styled.ul`
    position: absolute;
    top: 140%;
    right: 30px;
    width: 190px;
    height: 77px;
    background-color: ${({theme}) => theme.COLORS.white};
    box-shadow: 0 0 15px 0 rgba(236,185,150, .2);
    ${flexCenter}
    flex-direction: column;
`
const Select = styled.li`
    width: 182px;
    height: 30px;
    padding-left: 16px;
    border-radius: 6px;
    ${flexAlignCenter}
    color: ${({theme}) => theme.COLORS.beige[500]};
    transition: all .3s;
    cursor: pointer;
    &:hover {
        background-color: rgba(252, 205, 179, .3);
        color: ${({theme}) => theme.COLORS.primary['pink']};
    }
`
const Line = styled.div`
 width: 100%;
 height: 1px;
 background-color: ${({theme}) => theme.COLORS.beige[500]};
 margin: 4px 0;
`

export const S = {
    Wrapper,
    Select,
    Line
}