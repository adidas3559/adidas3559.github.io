import { Global, css } from '@emotion/react'
import PageHeading from '../components/PageHeading'
import ProjectCard from '../components/ProjectCard'

const style = css`
  .projects {
    flex: 1;
    padding-bottom: 100px;
  }
  .projects-content {
    padding: 32px 64px;
  }
  .projects-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }
  @media (max-width: 768px) {
    .projects-content {
      padding: 24px 16px;
    }
    .projects-grid {
      grid-template-columns: 1fr;
    }
  }
`

const projects = [
  {
    emoji: '🦷',
    categories: [{ label: 'Healthcare', color: 'blue' }, { label: 'Full Stack', color: 'green' }],
    links: [{ label: 'GitHub', href: '#' }],
    title: 'Humana Dental Vision D2C',
    description: 'Maintained and revamped the Direct to Consumer enrollment flow for Humana Dental & Vision. Initially maintained the existing flow in a .Net/Razor/LESS environment, then led the front end rewrite using Vue to fully decouple the UI from the back end.',
    tags: ['Vue', 'JavaScript', 'CSS/LESS', 'Razor', '.Net'],
  },
  {
    emoji: '🤖',
    categories: [{ label: 'AI / Chat', color: 'pink' }, { label: 'Healthcare', color: 'blue' }],
    links: [{ label: 'GitHub', href: '#' }],
    title: 'Vitality AI Chatbot',
    description: 'Implemented the UI for an AI chatbot that uses machine learning to parse hundreds of insurance documents and surface policy information. Worked closely with a Data Science Engineer to wire up real-time Azure ML outputs to the React front end.',
    tags: ['React', 'TypeScript', 'Zod', 'Azure'],
  },
  {
    emoji: '🏡',
    categories: [{ label: 'CMS', color: 'orange' }, { label: 'React', color: 'blue' }],
    links: [{ label: 'GitHub', href: '#' }],
    title: 'Homebuilder Websites',
    description: 'Solely designed and owned 4 homebuilder websites end-to-end at Builder Designs using a React/Redux CMS-driven architecture. Binding live property data to custom UI components via a proprietary HOC data layer, while helping maintain 100+ production sites.',
    tags: ['React', 'Redux', 'TypeScript', 'CSS3', 'Node.js'],
  },
  {
    emoji: '⚙️',
    categories: [{ label: 'AI / Dev Tools', color: 'purple' }, { label: 'Automation', color: 'green' }],
    links: [{ label: 'GitHub', href: '#' }],
    title: 'AI Ticket Workflow',
    description: 'Engineered an internal AI support ticket tool that interfaces with the GitLab and Monday.com CLIs. Ingests a ticket, attempts a code-level fix, surfaces a diff for developer review, then — upon approval — auto-creates the merge request and updates the Monday ticket.',
    tags: ['Node.js', 'GitLab CLI', 'Monday.com CLI', 'AI', 'TypeScript'],
  },
]

function Projects() {
  return (
    <>
      <Global styles={style} />
      <div className="projects">
        <PageHeading
          breadcrumb="// projects.js : things I've built & shipped"
          title="Projects"
          subtitle="const projects = [ ...shipped, ...building ]"
        />
        <div className="projects-content">
          <div className="projects-grid">
            {projects.map((project) => (
              <ProjectCard key={project.title} {...project} />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Projects
