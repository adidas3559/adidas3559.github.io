/* eslint-disable react-refresh/only-export-components */
import { Global, css } from '@emotion/react'

export const colors = {
  bg:     '#1e1e1e',
  bg2:    '#252526',
  bg3:    '#2d2d2d',
  bg4:    '#333333',
  bg5:    'rgb(255 255 255 / 6%)',
  title:  '#1a1a2e',
  border: '#3c3c3c',
  text:   '#cccccc',
  dim:    '#777777',
  bright: '#ffffff',
  blue:   '#4fc1ff',
  blue2:  '#007acc',
  green:  '#4ec9b0',
  gcm:    '#6a9955',
  yellow: '#dcdcaa',
  orange: '#ce9178',
  purple: '#c586c0',
  pink:   '#ff6fd8',
  red:    '#f44747',
}

const colorClasses = css`
  ${Object.entries(colors).map(([name, value]) => `
    .text-${name} { color: ${value}; }
    .bg-${name} { background-color: ${value}; }
  `).join('')}
`

export function GlobalColors() {
  return <Global styles={colorClasses} />
}

export default colors
