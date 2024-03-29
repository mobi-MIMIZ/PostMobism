const COLORS = {
  primary: {
    peach: "#FBCDB3",
    pink: "#FF596A",
  },
  font: "#0F0F0F",
  error: "#EE384B",
  access: "#10CB44",
  white: "#FFFFFF",
  black: "#0A0A0A",
  beige: {
    100: "#FDF9F2",
    200: "#F6E9D6",
    500: "#ECB996",
    800: "#592C0D",
  },
} as const

const FONT_SIZE = {
  XSmall: "12px",
  small: "14px",
  medium: "16px",
  large: "22px",
  XLarge: "24px",
  XXLarge: "28px",
} as const

const FONT_WEIGHT = {
  thin: 100,
  regular: 400,
  bold: 700,
} as const

const theme = {
  COLORS,
  FONT_SIZE,
  FONT_WEIGHT,
} as const
export default theme


/**
 * theme를 as const로
 */
