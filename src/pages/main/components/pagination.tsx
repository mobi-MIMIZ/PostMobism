import { flexAlignCenter } from "@/styles/common.style"
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import styled from "styled-components"

export type PaginationProps = {
  startPage: number
  endPage: number
  currentPage: number
  totalPage: number
  onPageChange: (page: number) => void
}

const Pagination = ({
  currentPage = 1,
  totalPage = 1,
  endPage = 1,
  startPage = 1,
  onPageChange,
}: Partial<PaginationProps>) => {
  const pagesPerGroup = 10
  const [, setCurrentGroup] = useState(1)
  const [, setSearchParams] = useSearchParams()

  const NumberButtons: number[] = Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index)
  // start -> page

  // functions : handle pages
  const jumpFirst = () => onPageChange?.(1)
  const jumpLast = () => onPageChange?.(totalPage)
  const handleNext = () => onPageChange?.(Math.min(currentPage + 1, totalPage))
  const handlePrev = () => onPageChange?.(Math.max(currentPage - 1, 1))
  const handleTarget = (pageNumber: number) => onPageChange?.(pageNumber)

  // Update URL when currentPage changes
  useEffect(() => {
    const newCurrentGroup = Math.ceil(currentPage / pagesPerGroup)
    setCurrentGroup(newCurrentGroup)
    setSearchParams(prev => {
      const newSearchParams = new URLSearchParams(prev)
      newSearchParams.set("page", currentPage.toString())
      return newSearchParams
    })
  }, [currentPage, setSearchParams])

  return (
    <S.Wrapper>
      <S.JumpFirst onClick={jumpFirst}>&lt;&lt;</S.JumpFirst>
      <S.Prev onClick={handlePrev}>&lt;</S.Prev>
      {NumberButtons.map((pageNumber, idx) => (
        <S.Number
          key={idx + 1}
          onClick={() => handleTarget(pageNumber)}
          className={pageNumber === currentPage ? "active" : ""}
        >
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