import { OutletSize, PositionXCenter, flexCenter } from "@/styles/common.style"
import styled from "styled-components"
import Pagination from "./components/pagination"
import OneList from "./components/one-list"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux-toolkit"
import { getPosts } from "@/api/post-slice"

const MainPage = () => {
  type Writer = {
    nickname: string
    profile: string
  }
  type Post = {
    title: string
    content: string
    writer: Writer
  }
  const samplePostArr: Post[] = [
    { title: "test", content: "testing testing", writer: { nickname: "amy", profile: "" } },
    { title: "test", content: "testing testing", writer: { nickname: "ann", profile: "" } },
    { title: "test", content: "testing testing", writer: { nickname: "daniel", profile: "" } },
    { title: "test", content: "testing testing", writer: { nickname: "jack", profile: "" } },
    { title: "test", content: "testing testing", writer: { nickname: "kimi", profile: "" } },
    { title: "test", content: "testing testing", writer: { nickname: "levi", profile: "" } },
  ]

  const dispatch = useAppDispatch()
  const post = useAppSelector(state => state.post.data)

  useEffect(() => {
    dispatch(getPosts())
  }, [])

  console.log(post)

  return (
    <S.Wrapper>
      <S.Title>Post Your Code</S.Title>
      {samplePostArr.map((list, idx) => (
        <OneList number={idx + 1} title={list.title} nickname={list.writer.nickname} image={list.writer.profile} />
      ))}
      <Pagination />
    </S.Wrapper>
  )
}
export default MainPage

const Wrapper = styled.div`
  ${OutletSize}
  ${PositionXCenter}
  ${flexCenter}
  flex-direction: column;
  top: 60px;
  background-color: ${({ theme }) => theme.COLORS.white};
  color: ${({ theme }) => theme.COLORS.beige[800]};
`
const Title = styled.p`
  font-size: ${({ theme }) => theme.FONT_SIZE["XLarge"]};
  margin-bottom: 28px;
  position: relative;
  left: -26%;
`

export const S = {
  Wrapper,
  Title,
}
