 
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
  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-track {
    background: ${colors.bg4};
  }
  ::-webkit-scrollbar-thumb {
    background: ${colors.bg3};
    border-radius: 0;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: ${colors.border};
  }
  body {
    margin: 0;
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow: hidden;
  }
  #root {
    max-width: 100%;
    margin: 0 auto;
    height: 100svh;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    padding-top: 28px;
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
