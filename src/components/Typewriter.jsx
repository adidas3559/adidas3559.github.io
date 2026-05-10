import { useEffect, useReducer } from 'react'
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

// Todo: this is a state machine just like you just learned about
// to get rid of timeout, a better solution would be to use useReducer
// Do some research into this and attempt to restructure this to use useReducer instead of the useEffect

// notes from claude:
//  - The reducer's NEXT action should set all three values atomically: { displayed: '', phraseIndex: (i + 1) % total,
//    isDeleting: false }. That's the whole point — one dispatch replaces two separate setState calls.                 
//   - You can drop the setTimeout(..., 0) entirely and call dispatch({ type: 'NEXT', ... }) directly in the effect    
//   body. The linter won't flag dispatch.                                                                             
//   - Everything inside setTimeout callbacks (the typing/deleting ticks) stays the same, just swapping setDisplayed 
//   for dispatch({ type: 'TICK', value: ... }).                

function reducer(state, action) {
  switch (action.type) {
    case 'start_deleting': {      
      return {
        ...state,
        transitions: 'IS_DELETING',
      }
    }
    case 'start_typing': {

      return {
        ...state,
        phraseIndex: state.phraseIndex + 1,
        transitions: 'IS_TYPING',
        // phraseIndex: i => (i + 1) % state.phrases.length
      }
    }
    case 'updateDisplay': {
      const fallbackString = state.transitions === 'IS_DELETING' ? '' : state.displayed;
      return {
        ...state,
        displayed: action.newDisplay ? action.newDisplay : fallbackString,
      }
    }
  }
}

function Typewriter({ phrases = [] }) {
  // const [displayed, setDisplayed]     = useState('')
  // const [phraseIndex, setPhraseIndex] = useState(0)
  // const [isDeleting, setIsDeleting]   = useState(false)

  const [state, dispatch] = useReducer(reducer, { displayed: '', phraseIndex: 0, transitions: 'FULLY_DELETED', phrases });

  useEffect(() => {
    if (!phrases.length) return
    const current        = phrases[state.phraseIndex % phrases.length]
    const currentChars   = Array.from(current)
    const displayedChars = Array.from(state.displayed)

    if (state.displayed === current && state.transitions === 'IS_TYPING') { // FULLY_TYPED
      // const t = setTimeout(() => setIsDeleting(true), WAIT_MS)
      // dispatch({ type: 'FULLY_TYPED' })
      const t = setTimeout(() => dispatch({ type: 'start_deleting' }), WAIT_MS);
      // clearTimeout(t);
      // return
      return () => clearTimeout(t)
    }

    if (state.displayed === '' && (state.transitions === 'IS_DELETING' || state.transitions === 'FULLY_DELETED')) { // FULLY_DELETED
      // timeout is just to silence linter as it was complaining about calling setState synchronsously
      // const t = setTimeout(() => {
      //   setIsDeleting(false)
      //   setPhraseIndex(i => (i + 1) % phrases.length)
      // }, 0)
      dispatch({
        type: 'start_typing',
      });
      // return () => clearTimeout(t)
    }

    const speed = state.transitions === 'IS_DELETING'
      ? DELETE_MS / currentChars.length
      : TYPE_MS   / currentChars.length

    const t = setTimeout(() => { // IS_DELETING or IS_TYPING
      dispatch({
        type: 'updateDisplay',
        newDisplay: state.transitions === 'IS_DELETING'
          ? displayedChars.slice(0, -1).join('')
          : currentChars.slice(0, displayedChars.length + 1).join('')
      })
      // setDisplayed(
      //   state.transitions === 'IS_DELETING'
      //     ? displayedChars.slice(0, -1).join('')
      //     : currentChars.slice(0, displayedChars.length + 1).join('')
      // )
    }, speed)
    // if (state.displayed === current || state.displayed === '') {
    //   dispatch({
    //     type: state.transitions === 'IS_TYPING' ? 'FULLY_TYPED' : 'FULLY_DELETED',
    //   })
    // }
    // dispatch({
    //   type: state.transitions === 'IS_TYPING' ? 'FULLY_TYPED' : 'FULLY_DELETED',
    // })
    return () => clearTimeout(t)
  }, [state.displayed, state.phraseIndex, phrases, state.transitions])

  return (
    <>
      <Global styles={style} />
      <span>
        {state.displayed}
        <span className="typewriter__cursor" aria-hidden="true">|</span>
      </span>
    </>
  )
}

export default Typewriter
