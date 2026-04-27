import { Global, css } from '@emotion/react'
import Pill from '../components/Pill'
import NavLinks from '../components/NavLinks'
import Typewriter from '../components/Typewriter'
import StatBar from '../components/StatBar'
import { colors, typography } from '../styles';

const style = css`
  .home {
    flex: 1;
    text-align: left;
    padding: 80px 64px 100px;
    color: ${colors.text};
  }
  .home-greeting {
    font-size: 16px;
    color: ${colors.green};
    margin: 0 0 20px;
    letter-spacing: 0.02em;
    opacity: 0;
    animation: rise 0.5s ease forwards;
  }
  .home-name {
    font-family: ${typography.Display};
    font-weight: 800;
    font-size: clamp(48px, 11vw, 68px);
    line-height: 0.9;
    letter-spacing: -3px;
    margin: 0 0 36px;
    opacity: 0;
    animation: rise 0.5s ease 0.08s forwards;
  }
  .home-name__first {
    display: block;
    color: ${colors.bright};
  }
  .home-name__last {
    display: block;
    color: ${colors.pink};
  }
  .home-roles {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin: 0 0 30px;
    opacity: 0;
    animation: rise 0.5s ease 0.16s forwards;
  }
  .home-tagline {
    font-size: 14px;
    color: ${colors.dim};
    margin: 0 0 36px;
    opacity: 0;
    animation: rise 0.5s ease 0.24s forwards;
  }

  .home-bio {
    font-size: 16px;
    line-height: 1.75;
    color: ${colors.dim};
    max-width: 580px;
    font-weight: 400;
    opacity: 0;
    animation: rise 0.5s ease 0.32s forwards;
  }
  .home-bio strong {
    font-weight: 700;
    color: ${colors.blue};
  }
  .home .nav-links {
    margin-top: 32px;
  }
  @keyframes rise {
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @media (max-width: 768px) {
    .home { padding: 48px 24px 64px; }
    .home-name { letter-spacing: -1.5px; }
  }
`

function Home() {
  return (
    <>
      <Global styles={style} />
      <main className="home">
        <p className="home-greeting">// hello world !! Welcome to my portfolio</p>
        <h1 className="home-name">
          <span className="home-name__first">Stephen</span>
          <span className="home-name__last">Forbes</span>
        </h1>
        <div className="home-roles">
          <Pill text="Backend Engineer" color={colors.green} />
          <Pill text="AI / ML Dev" color={colors.purple} />
          <Pill text="Data Scientist" color={colors.blue} />
          <Pill text="@ EduVanceAI" color={colors.pink} />
        </div>
        <p className="home-tagline">
          <Typewriter phrases={[
            'Turning data into decisions 🧠',
            'Exploring LLMs & RAG pipelines 🤖',
            'Building intelligent systems 🔧',
            'Always learning, always shipping ✨',
          ]} />
        </p>
        <p className="home-bio">
          I live at the crossroads of <strong>backend engineering</strong>, AI/ML, and{' '}
          <strong>data science</strong>. I build systems that are genuinely{' '}
          <strong>intelligent and scalable</strong>.
        </p>
        <NavLinks links={[
          { to: '/projects', label: 'Projects', emoji: '🗂️' },
          { to: '/about',    label: 'About Me', emoji: '👤' },
          { to: '/contact',  label: 'Contact',  emoji: '✉️' },
        ]} />
        <StatBar stats={[
          { value: '3+', label: 'Years' },
          { value: '10+', label: 'Projects' },
          { value: '∞',  label: 'Curiosity' },
          { value: '↑',  label: 'Always Learning' },
        ]} />
      </main>
    </>
  )
}

export default Home
