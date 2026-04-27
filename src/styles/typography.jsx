/* eslint-disable react-refresh/only-export-components */
import { Global, css } from '@emotion/react'
import colors from './colors';

const typography = {
  Body: 'JetBrains Mono, monospace',
  Display: 'Syne, sans-serif',
};

const injectGlobal = css`
  body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-family: ${typography.Body};
    color: ${colors.body};
  }

  ${
    typography.Body &&
    `
      .text-body {
        font-family: ${typography.Body}
      }
    `
  }

  ${
    typography.Display &&
    `
      .text-display {
        font-family: ${typography.Display}
      }
    `
  }

  a {
    color: ${colors.brand1};
    &:hover {
      text-decoration: none;
      color: ${colors.brand1Light};
    }
  }
  p {
    font-size: 14px;
    line-height: 1.8;
    font-family: ${typography.Body};
    font-weight: 400;
    margin: 0 0 0 0;
    padding: 0 0 0 0;
    text-align: left;
    @media (min-width: 992px) {
      font-size: 18px;
      line-height: 1.8;
      margin: 0 0 0 0;
      padding: 0 0 0 0;
    }
  }
  b, strong {
    font-weight: bold;
    font-weight: 700;
  }
  .error {
    color: ${colors.error};
  }
`

export function GlobalFonts() {
  return <Global styles={injectGlobal} />
}

export default typography;
