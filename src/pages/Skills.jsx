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
      { name: 'Python',     level: 92, color: 'pink' },
      { name: 'Java',       level: 72, color: 'orange' },
      { name: 'JavaScript', level: 78, color: 'yellow' },
      { name: 'TypeScript', level: 74, color: 'blue' },
      { name: 'SQL',        level: 88, color: 'purple' },
    ],
  },
  {
    title: 'Generative AI & LLM Engineering',
    skills: [
      { name: 'LangChain',                level: 82, color: 'green' },
      { name: 'LangGraph',                level: 78, color: 'green' },
      { name: 'RAG Pipelines',            level: 85, color: 'blue' },
      { name: 'Prompt Engineering',       level: 90, color: 'yellow' },
      { name: 'Agentic Workflows',        level: 80, color: 'purple' },
      { name: 'Hugging Face Transformers', level: 83, color: 'orange' },
    ],
  },
  {
    title: 'AI · ML · Data Science',
    skills: [
      { name: 'PyTorch',      level: 85, color: 'red' },
      { name: 'TensorFlow',   level: 80, color: 'orange' },
      { name: 'scikit-learn', level: 90, color: 'yellow' },
      { name: 'Pandas',       level: 88, color: 'blue' },
      { name: 'NumPy',        level: 86, color: 'blue' },
      { name: 'spaCy',        level: 80, color: 'green' },
      { name: 'NLTK',         level: 75, color: 'purple' },
    ],
  },
  {
    title: 'Backend & APIs',
    skills: [
      { name: 'FastAPI', level: 90, color: 'green' },
      { name: 'Flask',   level: 82, color: 'blue' },
      { name: 'Django',  level: 76, color: 'green' },
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
