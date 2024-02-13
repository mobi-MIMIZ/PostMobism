import { flexAlignCenter } from "@/styles/common.style"
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import styled from "styled-components"

export type PaginationProps = {
  listLength: number;
  currentPage: number;
  perPage: number;
  onPageChange: (pageNumber: number) => void; 
};

const Pagination = ({ listLength, currentPage, perPage, onPageChange }: PaginationProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  // constants about pages:
  const page = parseInt(searchParams.get("page") || "1", 10); 
  const totalPage = Math.ceil(listLength / perPage);
  const pagesPerGroup = 10;
  const [, setCurrentGroup] = useState(1);

  const startPage = Math.max(1, Math.ceil(currentPage / pagesPerGroup) * pagesPerGroup - pagesPerGroup + 1);

  const NumberButtons: number[] = Array.from(
    { length: Math.min(pagesPerGroup, totalPage) },
    (_, index) => startPage + index,
  ).filter(pageNumber => pageNumber <= totalPage);

  // functions : handle pages
  const jumpFirst = () => onPageChange(1);
  const jumpLast = () => onPageChange(totalPage);
  const handleNext = () => onPageChange(Math.min(currentPage + 1, totalPage));
  const handlePrev = () => onPageChange(Math.max(currentPage - 1, 1));
  const handleTarget = (pageNumber: number) => onPageChange(pageNumber);

  // 페이지 그룹을 바꿔주는 함수 => 현재 페이지가 바뀔 때마다 실행
  // Update URL when currentPage changes
  useEffect(() => {
    const newCurrentGroup = Math.ceil(currentPage / pagesPerGroup);
    setCurrentGroup(newCurrentGroup);
    setSearchParams({ page: currentPage.toString() });
  }, [currentPage, setSearchParams]);

  return (
    <S.Wrapper>
      <S.JumpFirst onClick={jumpFirst}>&lt;&lt;</S.JumpFirst>
      <S.Prev onClick={handlePrev}>&lt;</S.Prev>
      {NumberButtons.map((pageNumber, idx) => (
        <S.Number key={idx + 1} onClick={() => handleTarget(pageNumber)} className={pageNumber === currentPage ? 'active' : ''}>
          {pageNumber}
        </S.Number>
      ))}
      <S.Next onClick={handleNext}>&gt;</S.Next>
      <S.JumpLast onClick={jumpLast}>&gt;&gt;</S.JumpLast>
    </S.Wrapper>
  );
};
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
