import { Global, css } from '@emotion/react'
import PageHeading from '../components/PageHeading'

const style = css`
  .readme {
    flex: 1;
    padding-bottom: 100px;
  }
  .readme-content {
    padding: 32px 64px;
  }
  @media (max-width: 768px) {
    .readme-content {
      padding: 24px;
    }
  }
`

function ReadMe() {
  return (
    <>
      <Global styles={style} />
      <div className="readme">
        <PageHeading
          breadcrumb="// README.md"
          title="ReadMe"
          subtitle="// how this site was built"
        />
        <div className="readme-content">
          {/* This page will document how the site was made — the stack, design decisions,
              component architecture, tooling choices, and anything interesting that came
              up during the build. Kind of like a behind-the-scenes / devlog for the portfolio itself. */}
        </div>
      </div>
    </>
  )
}

export default ReadMe
