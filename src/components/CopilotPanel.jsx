import { useState, useRef } from 'react'
import { Global, css } from '@emotion/react'
import { colors } from '../styles'
import { useCopilot } from '../utils/copilotContext'

const SUGGESTIONS = [
  { text: "Tell me about Stephen?" },
  { text: "What projects has Stephen built?" },
  { text: "Tell me about his work experience" },
  { text: "What's his tech stack?" },
  { text: "How can I contact Stephen?" },
  { text: "How can I support Stephen?" },
]

const style = css`
  @keyframes copilot-slide-in {
    from { transform: translateX(100%); opacity: 0.6; }
    to   { transform: translateX(0);    opacity: 1;   }
  }
  @keyframes copilot-fade-up {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0);    }
  }
  .copilot-panel {
    position: fixed;
    right: 0;
    top: 28px;
    bottom: 22px;
    width: 350px;
    background: ${colors.bg};
    border-left: 1px solid ${colors.border};
    display: flex;
    flex-direction: column;
    z-index: 800;
    /* animation: copilot-slide-in 0.18s ease; */
  }
  .copilot-panel__header {
    display: flex;
    align-items: center;
    gap: 7px;
    padding: 0 10px;
    height: 46px;
    border-bottom: 1px solid ${colors.border};
    flex-shrink: 0;
  }
  .copilot-panel__header-icon {
    color: ${colors.purple};
    display: flex;
    align-items: center;
    flex-shrink: 0;
  }
  .copilot-panel__title {
    flex: 1;
    font-size: 13px;
    font-weight: 700;
    color: ${colors.bright};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .copilot-panel__icon-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 26px;
    height: 26px;
    border-radius: 4px;
    border: none;
    background: transparent;
    color: ${colors.dim};
    cursor: pointer;
    flex-shrink: 0;
    transition: background 0.1s, color 0.1s;
    &:hover {
      background: ${colors.bg4};
      color: ${colors.text};
    }
  }
  .copilot-panel__workspace {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 7px 12px;
    border-bottom: 1px solid ${colors.border};
    flex-shrink: 0;
  }
  .copilot-panel__ws-label {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: ${colors.dim};
    flex-shrink: 0;
  }
  .copilot-panel__ws-badge {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 11px;
    color: ${colors.text};
    border: 1px solid ${colors.purple + '33'};
    border-radius: 4px;
    padding: 4px 10px 4px 8px;
    background: ${colors.purple + '0d'};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    min-width: 0;
  }
  .copilot-panel__ws-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${colors.purple};
    flex-shrink: 0;
  }
  .copilot-panel__body {
    flex: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 28px 14px 16px;
    scrollbar-width: thin;
    scrollbar-color: ${colors.bg4} transparent;
  }
  .copilot-panel__avatar {
    width: 72px;
    height: 72px;
    border-radius: 50%;
    background: ${colors.purple + '22'};
    border: 2px solid ${colors.purple + '66'};
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${colors.purple};
    flex-shrink: 0;
  }
  .copilot-panel__greeting {
    font-size: 16px;
    font-weight: 700;
    color: ${colors.bright};
    text-align: center;
    margin: 14px 0 0;
  }
  .copilot-panel__subtitle {
    font-size: 12px;
    color: ${colors.dim};
    text-align: center;
    max-width: 230px;
    line-height: 1.65;
    margin: 7px 0 22px;
  }
  .copilot-panel__suggestions {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    width: 100%;
  }
  .copilot-panel__suggestion {
    display: flex;
    gap: 5px;
    padding: 10px 11px;
    background: ${colors.bg3};
    border: 1px solid ${colors.border};
    border-radius: 8px;
    text-align: left;
    cursor: pointer;
    font-family: inherit;
    font-size: 11px;
    color: ${colors.text};
    line-height: 1.45;
    opacity: 0;
    animation: copilot-fade-up 0.15s ease forwards;
    transition: background 0.12s, border-color 0.12s, color 0.12s;
    &:hover {
      background: ${colors.purple + '22'};
      border-color: ${colors.purple + '55'};
      color: ${colors.purple};
    }
  }
  .copilot-panel__suggestion-star {
    font-size: 10px;
    color: ${colors.purple};
    line-height: 1;
  }
  .copilot-panel__input-area {
    flex-shrink: 0;
    padding: 10px 12px 0;
    border-top: 1px solid ${colors.border};
  }
  .copilot-panel__input-wrap {
    background: ${colors.bg2};
    border: 1px solid ${colors.border};
    border-radius: 8px;
    padding: 8px 10px 6px;
    transition: border-color 0.15s;
    &:focus-within {
      /* border-color: ${colors.purple + '88'}; */
    }
  }
  .copilot-panel__textarea {
    width: 100%;
    background: transparent;
    border: none;
    outline: none;
    font-family: inherit;
    font-size: 12px;
    color: ${colors.text};
    resize: none;
    line-height: 1.5;
    display: block;
    &::placeholder {
      color: ${colors.dim};
    }
  }
  .copilot-panel__input-meta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 5px;
  }
  .copilot-panel__msgs-left {
    font-size: 11px;
    color: ${colors.dim};
  }
  .copilot-panel__send {
    width: 30px;
    height: 30px;
    border-radius: 6px;
    background: ${colors.purple};
    border: none;
    color: ${colors.bright};
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    transition: opacity 0.12s;
    &:hover { opacity: 0.82; }
    &:disabled { opacity: 0.35; cursor: default; }
  }
  .copilot-panel__disclaimer {
    font-size: 10px;
    color: ${colors.dim};
    text-align: center;
    padding: 7px 12px 10px;
    flex-shrink: 0;
    line-height: 1.55;
  }
`

const PencilIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
)

const SendIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13"/>
    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
)

const CopilotIcon = () => (
  <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2 9.5 9.5 2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5L12 2z"/>
  </svg>
)

function CopilotPanel() {
  const { close } = useCopilot()
  const [input, setInput] = useState('')
  const [msgsLeft] = useState(3)
  const textareaRef = useRef(null)

  function handleSuggestion(text) {
    setInput(text)
    textareaRef.current?.focus()
  }

  return (
    <>
      <Global styles={style} />
      <div className="copilot-panel">
        <div className="copilot-panel__header">
          <span className="copilot-panel__header-icon">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2 9.5 9.5 2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5L12 2z"/>
            </svg>
          </span>
          <span className="copilot-panel__title">Stephen's AI Assistant</span>
          <button className="copilot-panel__icon-btn" aria-label="edit">
            <PencilIcon />
          </button>
          <button className="copilot-panel__icon-btn" aria-label="close" onClick={close}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <div className="copilot-panel__workspace">
          <span className="copilot-panel__ws-label">Workspace</span>
          <span className="copilot-panel__ws-badge">
            <span className="copilot-panel__ws-dot" />
            portfolio · stephen-forbes
          </span>
        </div>

        <div className="copilot-panel__body">
          <div className="copilot-panel__avatar">
            <CopilotIcon />
          </div>
          <p className="copilot-panel__greeting">Hi! I'm Stephen's Copilot 👋</p>
          <p className="copilot-panel__subtitle">
            Ask me anything about his projects, skills, experience, or achievements.
          </p>

          <div className="copilot-panel__suggestions">
            {SUGGESTIONS.map((s, i) => (
              <button
                key={i}
                className="copilot-panel__suggestion"
                style={{ animationDelay: `${i * 0.06 + 0.08}s` }}
                onClick={() => handleSuggestion(s.text)}
              >
                <span className="copilot-panel__suggestion-star">✦</span>
                {s.text}
              </button>
            ))}
          </div>
        </div>

        <div className="copilot-panel__input-area">
          <div className="copilot-panel__input-wrap">
            <textarea
              ref={textareaRef}
              className="copilot-panel__textarea"
              rows={2}
              placeholder="Ask about Stephen's projects, experience, skills..."
              value={input}
              onChange={e => setInput(e.target.value)}
            />
            <div className="copilot-panel__input-meta">
              <span className="copilot-panel__msgs-left">{msgsLeft} msgs left</span>
              <button className="copilot-panel__send" disabled={!input.trim()}>
                <SendIcon />
              </button>
            </div>
          </div>
        </div>

        <p className="copilot-panel__disclaimer">
          AI can make mistakes · Contact Stephen directly for important info
        </p>
      </div>
    </>
  )
}

export default CopilotPanel
