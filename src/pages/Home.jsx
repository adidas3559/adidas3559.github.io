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
          <Pill text="5 Years Exp" color={colors.purple} />
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
        <NavLinks links={[
          { to: '/projects', label: 'Projects', emoji: '🗂️' },
          { to: '/about',    label: 'About Me', emoji: '👤' },
          { to: '/contact',  label: 'Contact',  emoji: '✉️' },
        ]} />
        <StatBar stats={[
          { value: '5+',  label: 'Years' },
          { value: '12+', label: 'Projects' },
          { value: '100+', label: 'Sites Maintained' },
          { value: '↑',   label: 'Always Shipping' },
        ]} />
      </main>
    </>
  )
}

export default Home
