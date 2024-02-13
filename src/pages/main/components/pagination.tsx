import { flexAlignCenter } from "@/styles/common.style"
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import styled from "styled-components"

export type PaginationProps = {
  listLength: number
}

const Pagination = ({ listLength }: PaginationProps) => {
  const [searchParams, setSearchParams] = useSearchParams()

  // constants about pages :
  // const page = Number(searchParams.get("page")) || "1"
  const page = (searchParams.get("page") as string) || "1"
  const perPage = 6 // posts per page
  const totalPage = Math.ceil(listLength / perPage)
  const pagesPerGroup = 10 // pages per numberButtons
  const initialPage = parseInt(page as string, 10) || 1
  const [currentPage, setCurrentPage] = useState<number>(initialPage)

  const startPage = Math.max(1, Math.ceil(currentPage / pagesPerGroup) * pagesPerGroup - pagesPerGroup + 1)
  // const endPage = Math.min(startPage + pagesPerGroup - 1, totalPage)

  // const NumberButtons: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const NumberButtons: number[] = Array.from(
    { length: Math.min(pagesPerGroup, totalPage) },
    (_, index) => startPage + index,
  )

  // functions : handle pages
  const jumpFirst = () => setCurrentPage(1)
  const jumpLast = () => setCurrentPage(totalPage)
  const handleNext = () => setCurrentPage(prev => Math.min(prev + 1, totalPage))
  const handlePrev = () => setCurrentPage(prev => Math.max(prev - 1, 1))
  const handleTarget = (pageNumber: number) => setCurrentPage(pageNumber)

  // Update URL when currentPage changes
  useEffect(() => {
    setSearchParams({ page: currentPage.toString() })
  }, [currentPage, setSearchParams])

  return (
    <S.Wrapper>
      <S.JumpFirst onClick={jumpFirst}>&lt;&lt;</S.JumpFirst>
      <S.Prev onClick={handlePrev}>&lt;</S.Prev>
      {NumberButtons.map((pageNumber, idx) => (
        <S.Number key={idx + 1} onClick={() => handleTarget(pageNumber)}>
          {pageNumber}
        </S.Number>
      ))}
      <S.Next onClick={handleNext}>&gt;</S.Next>
      <S.JumpLast onClick={jumpLast}>&gt;&gt;</S.JumpLast>
    </S.Wrapper>
  )
}
export default Pagination

const Wrapper = styled.div`
  width: 600px;
  height: 36px;
  ${flexAlignCenter}
  justify-content: space-evenly;
  margin-top: 38px;
  & > button {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    text-align: center;
    &:hover {
      border: 1px solid ${({ theme }) => theme.COLORS.primary["pink"]};
    }
    &.active {
      background-color: ${({ theme }) => theme.COLORS.primary["pink"]};
      color: ${({ theme }) => theme.COLORS.white};
    }
  }
`
const JumpFirst = styled.button``
const Prev = styled.button``
const Number = styled.button``
const Next = styled.button``
const JumpLast = styled.button``

export const S = {
  Wrapper,
  Number,
  JumpFirst,
  JumpLast,
  Prev,
  Next,
}
