declare module "*.svg" {
  import React = require("react")

  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>
  const src: string
  export default src
}
//React.ImgHTMLAttributes<HTMLImageElement>.src?: string | undefined
/**
 *  TS사용 시 SVG 파일을 모듈로 인식하고 이를 React 컴포넌트로 변환하여 사용할 수 있도록 지시하는 코드
 */
