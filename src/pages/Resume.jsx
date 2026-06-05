import { Global, css } from '@emotion/react'
import { colors, typography } from '../styles'

const style = css`
  .resume-page {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 32px 24px 48px;
    min-height: 0;
  }
  .resume-toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: 900px;
    margin-bottom: 16px;
  }
  .resume-toolbar__title {
    font-size: 13px;
    color: ${colors.dim};
    letter-spacing: 0.04em;
  }
  .resume-toolbar__title span {
    color: ${colors.text};
  }
  .resume-download {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 6px 14px;
    background: ${colors.blue2};
    border: 1px solid ${colors.blue};
    color: ${colors.bright};
    font-family: ${typography.Body};
    font-size: 12px;
    cursor: pointer;
    text-decoration: none;
    border-radius: 3px;
    transition: background 0.15s, color 0.15s;
  }
  .resume-download:hover {
    background: ${colors.blue};
    color: ${colors.bg};
  }
  .resume-download svg {
    flex-shrink: 0;
  }
  .resume-viewer {
    width: 100%;
    max-width: 900px;
    flex: 1;
    border: 1px solid ${colors.border};
    background: ${colors.bg2};
    border-radius: 4px;
    overflow: hidden;
    min-height: 600px;
  }
  .resume-viewer iframe {
    width: 100%;
    height: 100%;
    min-height: 780px;
    border: none;
    display: block;
  }
  @media (max-width: 768px) {
    .resume-page {
      padding: 20px 12px 32px;
    }
    .resume-toolbar {
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
    }
    .resume-viewer iframe {
      min-height: 520px;
    }
  }
`

function Resume() {
  return (
    <>
      <Global styles={style} />
      <div className="resume-page">
        <div className="resume-toolbar">
          <span className="resume-toolbar__title">
            <span>Stephen_Forbes_Resume.pdf</span> — preview
          </span>
          <a
            className="resume-download"
            href="/Stephen_Forbes_Resume.pdf"
            download="Stephen_Forbes_Resume.pdf"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Download PDF
          </a>
        </div>
        <div className="resume-viewer">
          <iframe
            src="/Stephen_Forbes_Resume.pdf"
            title="Stephen Forbes Resume"
          />
        </div>
      </div>
    </>
  )
}

export default Resume
