import { useState } from "react"
import { PositionXYCenter, ViewPortSize } from "@/styles/common.style"
import { DetailPageProps, Post } from "@/type/type"
import { FC } from "react"
import styled from "styled-components"
import DetailHeader from "./components/header.detail"
import DetailContent from "./components/content.detail"

const DetailPage: FC<DetailPageProps> = ({ setIsOpenDetailModal, selectedPost }) => {
  // 클릭한 포스트를 선택하도록 하는 함수

  return (
    <S.Wrapper>
      <S.Form>
        {/* 선택된 포스트가 있을 경우에만 상세 내용을 렌더링 */}
        {selectedPost && (
          <>
            <DetailHeader selectedPost={selectedPost} setIsOpenDetailModal={setIsOpenDetailModal} />
            <DetailContent selectedPost={selectedPost} />
            <S.Line />
          </>
        )}
      </S.Form>
    </S.Wrapper>
  )
}

export default DetailPage

const Wrapper = styled.div`
  position: fixed;
  ${ViewPortSize};
  background-color: rgba(253, 249, 242, 0.5);
  z-index: 1000;
`

const Form = styled.form`
  ${PositionXYCenter}
  width: 720px;
  height: 950px;
  background-color: ${({ theme }) => theme.COLORS.white};
  box-shadow: 0px 10px 10px 10px rgba(236, 185, 150, 0.2);
  border-radius: 16px;
  padding-top: 4px;
`

const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.COLORS.beige[500]};
`

const S = {
  Wrapper,
  Form,
  Line,
}
