import { Global, css } from '@emotion/react'
import { colors, typography } from '../styles'

const style = css`
  .exp-timeline {
    display: flex;
    flex-direction: column;
  }
  .exp-timeline__entry {
    display: flex;
    gap: 24px;
  }
  .exp-timeline__left {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-shrink: 0;
    width: 10px;
  }
  .exp-timeline__dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: ${colors.dim};
    flex-shrink: 0;
    margin-top: 7px;
    position: relative;
    z-index: 1;
  }
  .exp-timeline__dot--current {
    background: ${colors.blue};
    box-shadow: 0 0 0 3px ${colors.bg}, 0 0 0 5px ${colors.blue};
  }
  .exp-timeline__connector {
    width: 1px;
    flex: 1;
    background: ${colors.border};
    margin-top: 6px;
    margin-bottom: 0;
  }
  .exp-timeline__content {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding-bottom: 40px;
  }
  .exp-timeline__entry:last-child .exp-timeline__content {
    padding-bottom: 0;
  }
  .exp-timeline__dates {
    font-size: 13px;
    color: ${colors.dim};
    margin: 0;
    margin-top: 1px;
  }
  .exp-timeline__title {
    font-family: ${typography.Display};
    font-weight: 800;
    font-size: clamp(18px, 4vw, 24px);
    letter-spacing: -0.5px;
    line-height: 1.1;
    color: ${colors.bright};
    margin: 0;
  }
  .exp-timeline__company {
    font-size: 14px;
    color: ${colors.blue};
    margin: 0;
  }
  .exp-timeline__desc {
    font-size: 13px;
    line-height: 1.8;
    color: ${colors.dim};
    margin: 0;
  }
  .exp-timeline__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-top: 4px;
  }
  .exp-timeline__tag {
    font-size: 12px;
    color: ${colors.blue};
    background-color: #007acc14;
    border: 1px solid #007acc40;
    border-radius: 3px;
    padding: 3px 10px;
    letter-spacing: 0.02em;
  }
`

function ExperienceTimeline({ entries = [] }) {
  return (
    <>
      <Global styles={style} />
      <div className="exp-timeline">
        {entries.map((entry, i) => (
          <div key={i} className="exp-timeline__entry">
            <div className="exp-timeline__left">
              <div className={`exp-timeline__dot${entry.isCurrent ? ' exp-timeline__dot--current' : ''}`} />
              {i < entries.length - 1 && <div className="exp-timeline__connector" />}
            </div>
            <div className="exp-timeline__content">
              <p className="exp-timeline__dates">{entry.dates}</p>
              <h3 className="exp-timeline__title">{entry.title}</h3>
              <p className="exp-timeline__company">@ {entry.company}</p>
              <p className="exp-timeline__desc">{entry.description}</p>
              <div className="exp-timeline__tags">
                {entry.tags.map((tag) => (
                  <span key={tag} className="exp-timeline__tag">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default ExperienceTimeline
