import { Global, css } from '@emotion/react'
import Pill from '../components/Pill'
import NavLinks from '../components/NavLinks'
import Typewriter from '../components/Typewriter'
// import StatBar from '../components/StatBar'
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
    font-family: ${typography.DisplayAlt};
    font-weight: 800;
    font-size: clamp(38px, 11vw, 68px);
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
    width: fit-content;
    background: linear-gradient(to right, #f0b429, #e84040);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    &::after {
      content: '_';
      -webkit-text-fill-color: #f0b429;
      animation: cursor-blink 1s steps(1) infinite;
    }
  }
  @keyframes cursor-blink {
    50% { opacity: 0; }
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
    margin-top: 18px;
  }
  .home-contact-links {
    display: flex;
    gap: 10px;
    margin-top: 20px;
    flex-wrap: wrap;
  }
  .home-contact-link {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 14px;
    border: 1px solid ${colors.border};
    border-radius: 4px;
    background: ${colors.bg3};
    color: ${colors.dim};
    font-size: 12px;
    text-decoration: none;
    transition: border-color 0.15s, color 0.15s;
    &:hover {
      border-color: ${colors.text};
      color: ${colors.text};
    }
  }
  .home-contact-link svg {
    flex-shrink: 0;
  }
  @keyframes rise {
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @media (max-width: 768px) {
    .home { padding: 20px 16px 64px; }
    .home-name { letter-spacing: -1.5px; margin-bottom: 12px; }
    .home-roles { margin-bottom: 24px; }
    .home-tagline { margin: 0 0 20px; }
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
          <Pill text="Front End Developer" color={colors.green} />
          <Pill text="React · Vue · RN" color={colors.blue} />
          <Pill text="5+ Years Exp" color={colors.purple} />
          <Pill text="@ Builder Designs" color={colors.pink} />
        </div>
        <p className="home-tagline">
          <Typewriter phrases={[
            'Crafting pixel-perfect interfaces 🎨',
            'React, Vue, React Native — fluent in all three ⚛️',
            'Quick to ramp, quick to ship 🚀',
            'Sent to the hard projects for a reason 🔧',
          ]} />
        </p>
        <p className="home-bio">
          Five years of turning <strong>designs into production UIs</strong>. I own tickets
          end-to-end with minimal direction and have a track record of being dropped into{' '}
          <strong>problem projects</strong> to get them across the finish line.
        </p>
        <div className="home-contact-links">
          <a className="home-contact-link" href="mailto:forbes3559@gmail.com">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            forbes3559@gmail.com
          </a>
          <a className="home-contact-link" href="https://linkedin.com/in/stephen-forbes-smn3043559" target="_blank" rel="noreferrer">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            LinkedIn ↗
          </a>
          <a className="home-contact-link" href="https://github.com/adidas3559" target="_blank" rel="noreferrer">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/></svg>
            GitHub ↗
          </a>
        </div>
        <NavLinks links={[
          { to: '/projects', label: 'Projects', desc: 'Selected work and side projects I\'ve shipped.' },
          { to: '/skills',   label: 'Skills',   desc: 'React, TypeScript, Vue, React Native, Node, and more.' },
          { to: '/experience', label: 'Experience', desc: 'Five years across React, Vue, and React Native in production.' },
        ]} />
        {/* <StatBar stats={[
          { value: '5+',  label: 'Years' },
          { value: '12+', label: 'Projects' },
          { value: '100+', label: 'Sites Maintained' },
          { value: '↑',   label: 'Always Shipping' },
        ]} /> */}
      </main>
    </>
  )
}

export default Home
