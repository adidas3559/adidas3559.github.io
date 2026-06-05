import { Global, css } from '@emotion/react'
import { colors, typography } from '../styles'

const style = css`
  .project-card {
    background: ${colors.bg2};
    border: 1px solid ${colors.border};
    border-radius: 4px;
    padding: 24px 28px;
    display: flex;
    flex-direction: column;
    gap: 14px;
    transition: background 0.15s ease, transform 0.15s ease;
    cursor: default;
    min-width: 0;
    overflow: hidden;
  }
  .project-card:hover {
    background: ${colors.bg3};
    transform: translateY(-2px);
  }
  .project-card__top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }
  @media (max-width: 568px) {
    .project-card__top {
      flex-direction: column;
      align-items: flex-start;
    }
  }
  .project-card__meta {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .project-card__emoji {
    font-size: 22px;
    line-height: 1;
  }
  .project-card__categories {
    display: flex;
    align-items: center;
    gap: 0;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }
  .project-card__category {
    color: ${colors.green};
  }
  .project-card__category--pink {
    color: ${colors.pink};
  }
  .project-card__category--blue {
    color: ${colors.blue};
  }
  .project-card__category--yellow {
    color: ${colors.yellow};
  }
  .project-card__category--orange {
    color: ${colors.orange};
  }
  .project-card__category--purple {
    color: ${colors.purple};
  }
  .project-card__category-dot {
    color: ${colors.dim};
    margin: 0 6px;
    opacity: 0.6;
  }
  .project-card__links {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .project-card__link {
    font-size: 12px;
    color: ${colors.dim};
    text-decoration: none;
    border: 1px solid ${colors.border};
    border-radius: 3px;
    padding: 3px 10px;
    transition: color 0.12s ease, border-color 0.12s ease;
    white-space: nowrap;
  }
  .project-card__link:hover {
    color: ${colors.text};
    border-color: ${colors.text};
  }
  .project-card__title {
    font-family: ${typography.DisplayAlt};
    font-weight: 800;
    font-size: 22px;
    letter-spacing: -0.5px;
    line-height: 1.1;
    color: ${colors.bright};
    margin: 0;
  }
  .project-card__desc {
    font-size: 12px;
    line-height: 1.6;
    color: ${colors.dim};
    margin: 0;
    flex: 1;
  }
  .project-card__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-top: 4px;
  }
  .project-card__tag {
    font-size: 11px;
    color: ${colors.dim};
    border: 1px solid ${colors.border};
    border-radius: 3px;
    background-color: ${colors.bg3};
    padding: 2px 8px;
    letter-spacing: 0.04em;
  }
`

const colorMap = {
  green: '',
  pink: 'project-card__category--pink',
  blue: 'project-card__category--blue',
  yellow: 'project-card__category--yellow',
  orange: 'project-card__category--orange',
  purple: 'project-card__category--purple',
}

function ProjectCard({ emoji, categories = [], links = [], title, description, tags = [] }) {
  return (
    <>
      <Global styles={style} />
      <div className="project-card">
        <div className="project-card__top">
          <div className="project-card__meta">
            <span className="project-card__emoji">{emoji}</span>
            <div className="project-card__categories">
              {categories.map(({ label, color = 'green' }, i) => (
                <span key={label}>
                  <span className={`project-card__category ${colorMap[color] ?? ''}`}>{label}</span>
                  {i < categories.length - 1 && (
                    <span className="project-card__category-dot">·</span>
                  )}
                </span>
              ))}
            </div>
          </div>
          <div className="project-card__links">
            {links.map(({ label, href }) => (
              <a key={label} href={href} className="project-card__link" target="_blank" rel="noreferrer">
                {label} ↗
              </a>
            ))}
          </div>
        </div>
        <h3 className="project-card__title">{title}</h3>
        <p className="project-card__desc">{description}</p>
        <div className="project-card__tags">
          {tags.map((tag) => (
            <span key={tag} className="project-card__tag">{tag}</span>
          ))}
        </div>
      </div>
    </>
  )
}

export default ProjectCard
