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
      padding: 24px;
    }
  }
`

const entries = [
  {
    isCurrent: true,
    dates: '2025 - Present',
    title: 'Junior Software Developer',
    company: 'EduVanceAI',
    description: 'Building intelligent backend systems and AI integrations for an EdTech platform. ML-powered personalization, RAG pipelines, and scalable APIs serving thousands of learners daily.',
    tags: ['FastAPI', 'Python', 'Django', 'PostgreSQL', 'Docker', 'AWS', 'GenAI', 'React'],
  },
  {
    dates: 'Jun 2023 - Aug 2023',
    title: 'User Experience Designer',
    company: 'Zepto Digital Labs',
    description: 'Designed UI for a simulation platform and improved user experience through design thinking principles. Delivered research-backed interface improvements that enhanced usability.',
    tags: ['Figma', 'UX Research', 'Design Thinking', 'Prototyping'],
  },
  {
    dates: 'Jun 2023 - Jul 2023',
    title: 'Back End Intern',
    company: 'Laser Technologies Pvt Ltd',
    description: 'Managed and maintained backend systems and databases to support enterprise-level web applications. Ensured uptime, performance, and data integrity across production systems.',
    tags: ['Backend', 'Databases', 'SQL', 'Web Applications'],
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
