import { useState, useEffect, useRef } from 'react'
import { Global, css } from '@emotion/react'
import { useNavigate } from '@tanstack/react-router'
import { colors } from '../styles'
import { useTerminal } from '../utils/terminalContext'
import { useSidebar } from '../utils/sidebarContext'

export const TERMINAL_HEIGHT = 220

const style = css`
  .terminal {
    position: fixed;
    bottom: 22px;
    right: 0;
    height: ${TERMINAL_HEIGHT}px;
    background: ${colors.bg};
    border-top: 1px solid ${colors.green};
    display: flex;
    flex-direction: column;
    z-index: 50;
  }
  .terminal__tabs {
    display: flex;
    align-items: center;
    height: 30px;
    background: ${colors.bg2};
    border-bottom: 1px solid ${colors.border};
    flex-shrink: 0;
    padding: 0 4px;
  }
  .terminal__tab {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: ${colors.dim};
    padding: 0 12px;
    height: 100%;
    display: flex;
    align-items: center;
    cursor: default;
    border-bottom: 1px solid transparent;
  }
  .terminal__tab--active {
    color: ${colors.text};
    border-bottom-color: ${colors.green};
  }
  .terminal__close {
    margin-left: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    border-radius: 3px;
    border: none;
    background: transparent;
    color: ${colors.dim};
    cursor: pointer;
    font-size: 16px;
    line-height: 1;
    transition: background 0.1s, color 0.1s;
    &:hover {
      background: ${colors.bg4};
      color: ${colors.text};
    }
  }
  .terminal__body {
    flex: 1;
    overflow-y: auto;
    padding: 6px 12px 2px;
    scrollbar-width: thin;
    scrollbar-color: ${colors.bg4} transparent;
  }
  .terminal__line {
    font-size: 12px;
    color: ${colors.text};
    line-height: 1.6;
    white-space: pre-wrap;
    word-break: break-all;
  }
  .terminal__prompt-row {
    display: flex;
    align-items: center;
    padding: 4px 12px 8px;
    flex-shrink: 0;
    gap: 6px;
  }
  .terminal__ps1 {
    font-size: 13px;
    color: ${colors.green};
    white-space: nowrap;
    flex-shrink: 0;
  }
  .terminal__input {
    flex: 1;
    background: transparent;
    border: none;
    outline: none;
    font-family: inherit;
    font-size: 13px;
    color: ${colors.text};
    caret-color: ${colors.green};
    caret-shape: block;
    min-width: 0;
  }
`

const TABS = ['Terminal', 'Problems', 'Output']

const FILES = {
  'home.tsx':                  { route: '/' },
  'about.html':                { route: '/about' },
  'experience.ts':             { route: '/experience' },
  'projects.js':               { route: '/projects' },
  'skills.json':               { route: '/skills' },
  'contact.css':               { route: '/contact' },
  'README.md':                 { route: '/readme' },
  'Stephen_Forbes_Resume.pdf': { href: '/Stephen_Forbes_Resume.pdf' },
}

function Terminal() {
  const { isOpen, toggle, close } = useTerminal()
  const { isVisible: sidebarVisible } = useSidebar()
  const navigate = useNavigate()
  const terminalLeft = sidebarVisible ? 298 : 48
  const [cwd, setCwd] = useState('~')
  const [lines, setLines] = useState([
    { text: "Welcome to stephen's portfolio terminal. Type 'help' for available commands.", color: colors.green },
  ])
  const [input, setInput] = useState('')
  const [cmdHistory, setCmdHistory] = useState([])
  const [historyIdx, setHistoryIdx] = useState(-1)
  const inputRef = useRef(null)
  const bodyRef = useRef(null)

  useEffect(() => {
    function onKey(e) {
      if (e.ctrlKey && e.key === '`') {
        e.preventDefault()
        toggle()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [toggle])

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 0)
  }, [isOpen])

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight
  }, [lines])

  function processCommand(cmd) {
    const parts = cmd.trim().split(/\s+/)
    const command = parts[0].toLowerCase()
    const args = parts.slice(1)

    switch (command) {
      case 'help':
        return [
          { text: 'Available commands:', color: colors.bright },
          '  ls              list directory contents',
          '  pwd             print working directory',
          '  cd <dir>        change directory',
          '  cat <file>      open a portfolio file',
          '  open <file>     open a portfolio file',
          '  whoami          about Stephen Forbes',
          '  echo <text>     print text',
          '  date            print current date & time',
          '  git log         show recent commits',
          '  node --version  show node version',
          '  clear           clear terminal',
          '  help            show this help message',
        ]

      case 'ls': {
        if (cwd === '~') {
          return [{ text: 'portfolio/', color: colors.blue }]
        }
        return [
          { text: 'home.tsx', color: colors.blue },
          { text: 'about.html', color: colors.orange },
          { text: 'experience.ts', color: colors.blue },
          { text: 'projects.js', color: colors.yellow },
          { text: 'skills.json', color: colors.green },
          { text: 'contact.css', color: colors.pink },
          { text: 'README.md', color: colors.text },
          { text: 'Stephen_Forbes_Resume.pdf', color: colors.dim },
        ]
      }

      case 'pwd':
        return [cwd === '~' ? '/home/stephen' : '/home/stephen/portfolio']

      case 'cd': {
        const dir = args[0]
        if (!dir || dir === '~') {
          setCwd('~')
          return []
        }
        if (dir === '..') {
          setCwd('~')
          return []
        }
        if (dir === 'portfolio') {
          if (cwd === '~') setCwd('~/portfolio')
          return []
        }
        return [{ text: `cd: no such file or directory: ${dir}`, color: colors.red }]
      }

      case 'cat':
      case 'open': {
        const filename = args[0]
        if (!filename) return [{ text: `${command}: missing operand`, color: colors.red }]
        if (cwd === '~') {
          if (filename === 'portfolio') return [{ text: `${command}: portfolio: Is a directory`, color: colors.red }]
          return [{ text: `${command}: ${filename}: No such file or directory`, color: colors.red }]
        }
        const file = FILES[filename]
        if (!file) return [{ text: `${command}: ${filename}: No such file or directory`, color: colors.red }]
        if (file.route) {
          navigate({ to: file.route })
          return [{ text: `Opening ${filename}...`, color: colors.green }]
        }
        if (file.href) {
          window.open(file.href)
          return [{ text: `Opening ${filename}...`, color: colors.green }]
        }
        return []
      }

      case 'whoami':
        return [
          { text: 'Stephen Forbes', color: colors.bright },
          '  Role      Front End Developer',
          '  GitHub    github.com/adidas3559',
          '  Email     s.forbes@builderdesigns.com',
          '  Stack     React · TypeScript · Vue · React Native · Node.js',
          '  Based in  Lenexa, KS',
        ]

      case 'echo':
        return [args.join(' ')]

      case 'date':
        return [new Date().toString()]

      case 'git': {
        if (args[0] === 'log') {
          return [
            { text: 'commit a3f92b1 (HEAD -> main, origin/main)', color: colors.yellow },
            '  Author: Stephen Forbes <s.forbes@builderdesigns.com>',
            '  Date:   Tue Apr 29 2026',
            '',
            '      add copilot panel, settings popup & terminal commands',
            '',
            { text: 'commit 7c4d851', color: colors.yellow },
            '  Author: Stephen Forbes <s.forbes@builderdesigns.com>',
            '  Date:   Mon Apr 28 2026',
            '',
            '      add activity bar, menu bar & keyboard shortcuts',
            '',
            { text: 'commit 2e19f4a', color: colors.yellow },
            '  Author: Stephen Forbes <s.forbes@builderdesigns.com>',
            '  Date:   Sun Apr 27 2026',
            '',
            '      initial build — VS Code themed portfolio site',
          ]
        }
        return [{ text: `git: '${args.join(' ')}' is not a git command. See 'git --help'.`, color: colors.red }]
      }

      case 'node': {
        if (args[0] === '--version' || args[0] === '-v') return ['v22.11.0']
        return ['Usage: node [options] [ -e script | script.js ] [arguments]']
      }

      case '':
        return []

      default:
        return [{ text: `command not found: ${command}`, color: colors.red }]
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      const cmd = input.trim()

      if (cmd === 'clear') {
        setLines([])
        setInput('')
        setCmdHistory(prev => [cmd, ...prev])
        setHistoryIdx(-1)
        return
      }

      const promptLine = { text: `stephen @portfolio : ${cwd} $ ${input}`, color: colors.green }
      const output = cmd ? processCommand(cmd) : []
      setLines(prev => [...prev, promptLine, ...output])

      if (cmd) {
        setCmdHistory(prev => [cmd, ...prev])
        setHistoryIdx(-1)
      }
      setInput('')
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHistoryIdx(prev => {
        const next = Math.min(prev + 1, cmdHistory.length - 1)
        if (cmdHistory[next] !== undefined) setInput(cmdHistory[next])
        return next
      })
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHistoryIdx(prev => {
        const next = Math.max(prev - 1, -1)
        setInput(next === -1 ? '' : (cmdHistory[next] ?? ''))
        return next
      })
    }
  }

  if (!isOpen) return <Global styles={style} />

  return (
    <>
      <Global styles={style} />
      <div className="terminal" style={{ left: terminalLeft }}>
        <div className="terminal__tabs">
          {TABS.map((tab, i) => (
            <span key={tab} className={`terminal__tab${i === 0 ? ' terminal__tab--active' : ''}`}>
              {tab}
            </span>
          ))}
          <button className="terminal__close" onClick={close}>×</button>
        </div>
        <div ref={bodyRef} className="terminal__body" onClick={() => inputRef.current?.focus()}>
          {lines.map((line, i) => (
            <div
              key={i}
              className="terminal__line"
              style={typeof line === 'object' ? { color: line.color } : undefined}
            >
              {typeof line === 'object' ? line.text : line}
            </div>
          ))}
        </div>
        <div className="terminal__prompt-row">
          <span className="terminal__ps1">stephen @portfolio : {cwd} $</span>
          <input
            ref={inputRef}
            className="terminal__input"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            spellCheck={false}
            autoComplete="off"
          />
        </div>
      </div>
    </>
  )
}

export default Terminal
