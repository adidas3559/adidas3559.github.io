import { Global, css } from '@emotion/react'
import { colors, typography } from '../styles'

const style = css`
  .page-heading {
    padding: 50px 64px 0;
  }
  .page-heading__breadcrumb {
    font-size: 16px;
    color: ${colors.gcm};
    font-style: italic;
    margin: 0 0 25px;
    letter-spacing: 0.02em;
  }
  .page-heading__title {
    font-family: ${typography.DisplayAlt};
    font-weight: 800;
    font-size: clamp(28px, 9vw, 40px);
    line-height: 0.9;
    letter-spacing: -2px;
    text-align: left;
    color: ${colors.bright};
    margin: 0 0 8px;
  }
  .page-heading__tags {
    font-size: 14px;
    color: ${colors.dim};
    margin: 0;
    letter-spacing: 0.02em;
  }
  .page-heading__tags-dot {
    margin: 0 6px;
    opacity: 0.5;
  }
  @media (max-width: 768px) {
    .page-heading {
      padding: 20px 16px 8px;
    }
    .page-heading__title {
      letter-spacing: -1px;
    }
    .page-heading__breadcrumb {
      margin: 0 0 16px;
    }
  }
`

function PageHeading({ filename, name, title, tags = [], breadcrumb, subtitle }) {
  const renderedBreadcrumb = breadcrumb ?? `<!-- ${filename}${name ? ` - ${name}` : ''} -->`

  return (
    <>
      <Global styles={style} />
      <header className="page-heading">
        <p className="page-heading__breadcrumb">{renderedBreadcrumb}</p>
        <h1 className="page-heading__title">{title}</h1>
        {subtitle ? (
          <p className="page-heading__tags">{subtitle}</p>
        ) : tags.length > 0 && (
          <p className="page-heading__tags">
            {'// '}
            {tags.map((tag, i) => (
              <span key={tag}>
                {tag}
                {i < tags.length - 1 && (
                  <span className="page-heading__tags-dot">·</span>
                )}
              </span>
            ))}
          </p>
        )}
      </header>
    </>
  )
}

export default PageHeading
