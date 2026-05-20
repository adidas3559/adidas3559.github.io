import { Global, css } from '@emotion/react'
import PageHeading from '../components/PageHeading'
import SkillCard from '../components/SkillCard'

const style = css`
  .skills {
    flex: 1;
    padding-bottom: 100px;
  }
  .skills-content {
    padding: 32px 64px;
  }
  .skills-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }
  @media (max-width: 992px) {
    .skills-content {
      padding: 24px;
    }
    .skills-grid {
      grid-template-columns: 1fr;
    }
  }
  @media (max-width: 568px) {
    .skills-content {
      padding: 16px;
    }
    .skills-grid {
      gap: 28px;
    }
  }
`

const skillGroups = [
  {
    title: 'Languages',
    skills: [
      { name: 'JavaScript',    level: 95, color: 'yellow' },
      { name: 'TypeScript',    level: 95, color: 'blue' },
      { name: 'CSS3/SCSS/LESS', level: 93, color: 'pink' },
      { name: 'SQL',           level: 55, color: 'purple' },
      { name: 'C#',            level: 50, color: 'orange' },
    ],
  },
  {
    title: 'Frameworks & Libraries',
    skills: [
      { name: 'React',         level: 95, color: 'blue' },
      { name: 'Vue',           level: 80, color: 'green' },
      { name: 'React Native',  level: 73, color: 'pink' },
      { name: 'Node.js / Express', level: 80, color: 'green' },
      { name: 'Tailwind CSS',  level: 85, color: 'blue' },
      { name: '.Net',          level: 55, color: 'purple' },
    ],
  },
  {
    title: 'Tooling & Process',
    skills: [
      { name: 'Git',           level: 91, color: 'orange' },
      { name: 'Jira / Monday', level: 78, color: 'blue' },
      { name: 'Agile',         level: 60, color: 'green' },
      { name: 'HubSpot CMS',   level: 75, color: 'yellow' },
      { name: 'SEO',           level: 85, color: 'pink' },
    ],
  },
  {
    title: 'Platforms & Services',
    skills: [
      { name: 'GitLab',        level: 80, color: 'orange' },
      { name: 'Azure',         level: 45, color: 'blue' },
      { name: 'PostgreSQL',    level: 64, color: 'green' },
      { name: 'Redux',         level: 82, color: 'purple' },
    ],
  },
]

function Skills() {
  return (
    <>
      <Global styles={style} />
      <div className="skills">
        <PageHeading
          breadcrumb="// skills.json — tech stack & tools I actually use"
          title="Skills"
          subtitle='{ "status": "always_learning", "passion": "immeasurable" }'
        />
        <div className="skills-content">
          <div className="skills-grid">
            {skillGroups.map((group) => (
              <SkillCard key={group.title} title={group.title} skills={group.skills} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Skills
