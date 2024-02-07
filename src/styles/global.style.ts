import { createGlobalStyle } from "styled-components"
import reset from "styled-reset"

const GlobalStyles = createGlobalStyle`
  ${reset}
  * {
    box-sizing: border-box;
    list-style: none;
  }
  body {
    background-color: #FFFFFF;
    font-family: "Roboto Condensed", sans-serif, system-ui, sans-serif;
  }
  button {
    border: none;
    background-color: #FFFFFF;
    cursor: pointer;
  }
`

export default GlobalStyles
