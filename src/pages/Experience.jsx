import { Global, css } from '@emotion/react'
import PageHeading from '../components/PageHeading'
import ExperienceTimeline from '../components/ExperienceTimeline'

const style = css`
  .experience {
    flex: 1;
    padding-bottom: 100px;
  }
  .experience-content {
    padding: 32px 64px;
  }
  @media (max-width: 768px) {
    .experience-content {
      padding: 24px 16px;
    }
  }
`

const entries = [
  {
    isCurrent: true,
    dates: 'Apr 2025 – Present',
    title: 'Front End Developer',
    company: 'Builder Designs',
    description: 'Developing homebuilder websites using a React/Redux CMS-driven architecture, binding live property data to custom UI components via a proprietary HOC data layer. Solely designed and owned 4 homebuilder sites end-to-end while contributing to 10+ additional builds and maintaining 100+ production sites. Engineered an AI support ticket workflow that interfaces with the GitLab and Monday.com CLIs to ingest a ticket, attempt a code-level fix, surface a diff for developer review, and upon approval create the merge request.',
    tags: ['React', 'Redux', 'TypeScript', 'JavaScript', 'CSS3', 'Less.js', 'Emotion.css', 'Node.js'],
  },
  {
    dates: 'Sep 2021 – Feb 2025',
    title: 'Front End Software Developer III',
    company: 'Productive Edge',
    description: 'Created complex digital solutions using React, Vue, React Native, Node, Express, TypeScript, and .Net. Served as front end lead in Agile ceremonies and worked closely with PM to define stories. Conducted technical and screening interviews. Collaborated on 12+ projects for healthcare clients including Blue Cross Blue Shield, Vitality, Medela, and Bamboo.',
    tags: ['React', 'Vue', 'React Native', 'TypeScript', 'Node.js', '.Net', 'Agile'],
  },
  {
    dates: 'Jan 2021 – Sep 2021 · Feb 2025 – Mar 2025',
    title: 'Front End Developer – Contractor',
    company: 'Primitive',
    description: 'Built websites using HubSpot as the CMS with HTML/CSS, Tailwind CSS, and Alpine.js for 5 different companies and hospitals. Worked closely with the Lead Developer to refine best practices and participated heavily in sprint planning and retrospectives.',
    tags: ['HTML', 'CSS3', 'Tailwind CSS', 'Alpine.js', 'HubSpot', 'JavaScript', 'SEO'],
  },
]

function Experience() {
  return (
    <>
      <Global styles={style} />
      <div className="experience">
        <PageHeading
          breadcrumb="// experience.ts - professional journey"
          title="Experience"
          subtitle="interface Career extends Timeline {}"
        />
        <div className="experience-content">
          <ExperienceTimeline entries={entries} />
        </div>
      </div>
    </>
  )
}

export default Experience
