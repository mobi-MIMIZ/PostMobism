import { css } from "styled-components"

// align : flex
export const flexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`
export const flexAlignCenter = css`
  display: flex;
  align-items: center;
`
export const flexJustifyCenter = css`
  display: flex;
  justify-content: center;
`
// align : position
export const PositionCenter = css`
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(-50%, -50%);
`
export const PositionXCenter = css`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`
export const PositionYCenter = css`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`

// wrapper size
export const ViewPortSize = css`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`
export const OutletSize = css`
  width: 100vw;
  height: calc(100vh - 150px);
  overflow: hidden;
`
