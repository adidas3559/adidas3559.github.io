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
    emoji: '🤖',
    categories: [{ label: 'AI/ML', color: 'pink' }, { label: 'Backend', color: 'green' }],
    links: [{ label: 'GitHub', href: '#' }, { label: 'Live', href: '#' }],
    title: 'RAG Pipeline Engine',
    description: 'A retrieval-augmented generation system built on top of vector databases. Supports multi-document ingestion, semantic chunking, and context-aware response synthesis for enterprise knowledge bases.',
    tags: ['Python', 'LangChain', 'Pinecone', 'FastAPI', 'OpenAI'],
  },
  {
    emoji: '📊',
    categories: [{ label: 'Data Science', color: 'blue' }, { label: 'Viz', color: 'yellow' }],
    links: [{ label: 'GitHub', href: '#' }],
    title: 'ML Dashboard',
    description: 'Interactive analytics dashboard for monitoring ML model performance in production. Tracks drift, latency, accuracy metrics, and provides automated alerting when models degrade.',
    tags: ['React', 'Python', 'Plotly', 'Pandas', 'PostgreSQL'],
  },
  {
    emoji: '🌐',
    categories: [{ label: 'Full Stack', color: 'orange' }, { label: 'API', color: 'green' }],
    links: [{ label: 'GitHub', href: '#' }, { label: 'Live', href: '#' }],
    title: 'EduVance Platform',
    description: 'AI-powered learning platform serving thousands of daily users. Features adaptive content delivery, NLP-driven quiz generation, and personalized learning path recommendations.',
    tags: ['Node.js', 'React', 'MongoDB', 'OpenAI', 'Redis'],
  },
  {
    emoji: '🔍',
    categories: [{ label: 'NLP', color: 'purple' }, { label: 'Research', color: 'pink' }],
    links: [{ label: 'GitHub', href: '#' }],
    title: 'Semantic Search API',
    description: 'High-performance semantic search service using bi-encoder models for approximate nearest neighbor retrieval. Sub-100ms latency at scale with HNSW indexing and query expansion.',
    tags: ['Python', 'Sentence Transformers', 'FAISS', 'FastAPI', 'Docker'],
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
