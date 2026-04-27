import { Global, css } from '@emotion/react'
import { colors, typography } from '../styles'

const style = css`
  .pill {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 6px 12px;
    border: 1px solid ${colors.border};
    font-family: ${typography.Serif};
    font-size: 11px;
    color: ${colors.bright};
    background-color: ${colors.bg2};
    white-space: nowrap;
    border-radius: 2px;
  }
  .pill__dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    flex-shrink: 0;
  }
  .pill__image {
    width: 16px;
    height: 16px;
    object-fit: contain;
    flex-shrink: 0;
  }
`

function Pill({ text, color, image }) {
  return (
    <>
      <Global styles={style} />
      <span className="pill">
        {color && <span className="pill__dot" style={{ background: color }} />}
        {image && <img className="pill__image" src={image} alt="" />}
        {text}
      </span>
    </>
  )
}

export default Pill
