import { useState, useEffect } from 'react'
import { Global, css } from '@emotion/react'
import { colors } from '../styles'

const TYPE_MS   = 2000
const DELETE_MS = 1000
const WAIT_MS   = 2000

const style = css`
  .typewriter__cursor {
    color: ${colors.pink};
    animation: tw-blink 1s step-end infinite;
  }
  @keyframes tw-blink {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0; }
  }
`

function Typewriter({ phrases = [] }) {
  const [displayed, setDisplayed]     = useState('')
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [isDeleting, setIsDeleting]   = useState(false)

  useEffect(() => {
    if (!phrases.length) return
    const current        = phrases[phraseIndex]
    const currentChars   = Array.from(current)
    const displayedChars = Array.from(displayed)

    if (!isDeleting && displayed === current) {
      const t = setTimeout(() => setIsDeleting(true), WAIT_MS)
      return () => clearTimeout(t)
    }

    if (isDeleting && displayed === '') {
      // timeout is just to silence linter as it was complaining about calling setState synchronsously
      const t = setTimeout(() => {
        setIsDeleting(false)
        setPhraseIndex(i => (i + 1) % phrases.length)
      }, 0)
      return () => clearTimeout(t)
    }

    const speed = isDeleting
      ? DELETE_MS / currentChars.length
      : TYPE_MS   / currentChars.length

    const t = setTimeout(() => {
      setDisplayed(
        isDeleting
          ? displayedChars.slice(0, -1).join('')
          : currentChars.slice(0, displayedChars.length + 1).join('')
      )
    }, speed)

    return () => clearTimeout(t)
  }, [displayed, phraseIndex, isDeleting, phrases])

  return (
    <>
      <Global styles={style} />
      <span>
        {displayed}
        <span className="typewriter__cursor" aria-hidden="true">|</span>
      </span>
    </>
  )
}

export default Typewriter
