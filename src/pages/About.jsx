import { Global, css } from '@emotion/react'
import { colors } from '../styles'
import PageHeading from '../components/PageHeading'

const style = css`
  .about {
    flex: 1;
    padding-bottom: 100px;
  }
  .about-content {
    padding: 32px 64px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .about-bio {
    font-size: 15px;
    line-height: 1.9;
    color: ${colors.text};
  }
  .about-bio strong {
    color: ${colors.blue};
    font-weight: 600;
  }
  .about-section-title {
    font-size: 11px;
    font-weight: 700;
    color: ${colors.green};
    letter-spacing: 0.2em;
    text-transform: uppercase;
    margin: 0 0 20px;
  }
  .about-focus-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px 48px;
  }
  .about-focus-item {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    font-size: 13px;
    color: ${colors.dim};
    line-height: 1.6;
  }
  .about-focus-item__emoji {
    flex-shrink: 0;
  }
  .about-edu-entry {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  .about-edu-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 16px;
    margin-bottom: 4px;
  }
  .about-edu-name {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    font-weight: 700;
    color: ${colors.bright};
  }
  .about-edu-years {
    font-size: 13px;
    color: ${colors.dim};
    white-space: nowrap;
    flex-shrink: 0;
  }
  .about-edu-university {
    font-size: 13px;
    color: ${colors.dim};
  }
  .about-edu-degree {
    font-size: 13px;
    color: ${colors.blue};
  }
  .about-edu-minors {
    font-size: 13px;
    color: ${colors.dim};
  }
  .about-edu-gpa {
    font-size: 13px;
    color: ${colors.green};
  }
  @media (max-width: 768px) {
    .about-content {
      padding: 24px 16px;
    }
    .about-focus-grid {
      grid-template-columns: 1fr;
    }
    .about-edu-header {
      flex-direction: column;
      gap: 4px;
    }
  }
`

const focusItems = [
  { emoji: '🔧', text: 'Building scalable backend systems & AI integrations at EduVanceAI' },
  { emoji: '🤖', text: 'Deep interest in NLP, LLMs & ML pipelines' },
  { emoji: '🌱', text: 'Currently exploring RAG, MLOps & Vector Databases' },
  { emoji: '💬', text: 'Talk to me about Python, APIs, Data Science' },
  { emoji: '⚡', text: 'Making data stories non-data people actually get' },
  { emoji: '✨', text: 'Always learning, always shipping' },
]

function About() {
  return (
    <>
      <Global styles={style} />
      <div className="about">
        <PageHeading
          filename="about.html"
          name="Stephen Forbes"
          title="About Me"
          tags={['who I am', 'what I do', 'where I build']}
        />
        <div className="about-content">
          <div className="card">
            <p className="about-bio">
              Hi! I'm <strong>Stephen Forbes</strong>, a software developer living at the crossroads of{' '}
              <strong>backend engineering</strong>, <strong>AI/ML</strong>, and <strong>data science</strong>.
              I love building systems that are not just functional but genuinely{' '}
              <strong>intelligent and scalable</strong>. Currently a{' '}
              <strong>Junior Software Developer at EduVanceAI</strong>, building AI integrations and backend
              systems that power learning experiences for thousands of users daily.
            </p>
          </div>
          <div className="card">
            <p className="about-section-title">Current Focus</p>
            <div className="about-focus-grid">
              {focusItems.map(({ emoji, text }) => (
                <div key={text} className="about-focus-item">
                  <span className="about-focus-item__emoji">{emoji}</span>
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="card">
            <p className="about-section-title">Education</p>
            <div className="about-edu-entry">
              <div className="about-edu-header">
                <span className="about-edu-name">
                  <span>🎓</span>
                  SIES Graduate School of Technology
                </span>
                <span className="about-edu-years">2021 – 2025</span>
              </div>
              <span className="about-edu-university">University of Mumbai</span>
              <span className="about-edu-degree">Bachelor of Engineering in Computer Engineering</span>
              <span className="about-edu-minors">Minors: Artificial Intelligence & Machine Learning (AI/ML)</span>
              <span className="about-edu-gpa">GPA: 9.28</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default About
