 
import { Global, css } from '@emotion/react'
import { colors } from './colors.jsx'

const style = css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
  html, body {
    background: ${colors.bg};
  }
  body {
    margin: 0;
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  #root {
    max-width: 100%;
    margin: 0 auto;
    min-height: 100svh;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
  }
  p {
    margin: 0;
  }
  .card {
    background: ${colors.bg2};
    border: 1px solid ${colors.border};
    border-radius: 4px;
    padding: 28px 32px;
  }
`

export function GlobalBase() {
  return <Global styles={style} />
}
