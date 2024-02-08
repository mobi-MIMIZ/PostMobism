import theme from "@/styles/theme.style";

type Theme = typeof theme

declare module 'styled-components' {
    interface DefaultTheme extends Theme {}
}

/**
 * d.ts => type을 vscode에 declare함
 * 원래 정의 되어있지 않은 styled-components 의 DefaultTheme에 타입을 스스로 정의해줘서 추론을 할 수 있도록 해줌!
 * 기존에있던 타입에 타입정의
 */
