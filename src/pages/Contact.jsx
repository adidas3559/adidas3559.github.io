import { Global, css } from '@emotion/react'
import { useState } from 'react'
import PageHeading from '../components/PageHeading'
import { colors } from '../styles'

// Icons are defined inline rather than imported from src/assets because SVG files loaded
// via <img> don't resolve `currentColor` — the color prop has no DOM context to inherit from.
// As inline JSX, `fill="currentColor"` or `stroke="currentColor"` picks up the parent's CSS
// `color` property, which lets the icon box tint each icon without hardcoding a color.
// The .svg files in assets can be deleted — they aren't used anywhere.
const EmailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
)

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

const GithubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
)

const style = css`
  .contact {
    flex: 1;
    padding-bottom: 100px;
  }
  .contact-content {
    padding: 32px 64px;
  }
  .contact-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 48px;
    align-items: start;
  }
  .contact-section-title {
    font-size: 11px;
    font-weight: 700;
    color: ${colors.green};
    letter-spacing: 0.2em;
    text-transform: uppercase;
    margin: 0 0 16px;
  }
  .contact-links {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .contact-link {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 12px 14px;
    border: 1px solid ${colors.border};
    border-radius: 4px;
    text-decoration: none;
    transition: border-color 0.15s ease, background 0.15s ease;
  }
  .contact-link:hover {
    border-color: ${colors.dim};
    background: ${colors.bg3};
  }
  .contact-link__icon {
    width: 36px;
    height: 36px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    flex-shrink: 0;
  }
  .contact-link__info {
    flex: 1;
    min-width: 0;
  }
  .contact-link__label {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.12em;
    display: block;
    margin-bottom: 3px;
  }
  .contact-link__url {
    font-size: 12px;
    color: ${colors.dim};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .contact-link__arrow {
    color: ${colors.dim};
    font-size: 12px;
    flex-shrink: 0;
  }
  .contact-form {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }
  .contact-form__field {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .contact-form__label {
    font-size: 12px;
    color: ${colors.dim};
    letter-spacing: 0.04em;
  }
  .contact-form__label-required {
    color: ${colors.red};
  }
  .contact-form__input,
  .contact-form__textarea {
    background: ${colors.bg3};
    border: 1px solid ${colors.border};
    border-radius: 3px;
    padding: 10px 14px;
    color: ${colors.text};
    font-family: inherit;
    font-size: 13px;
    outline: none;
    width: 100%;
    box-sizing: border-box;
    transition: border-color 0.15s ease;
  }
  .contact-form__input:focus,
  .contact-form__textarea:focus {
    border-color: ${colors.blue2};
  }
  .contact-form__input::placeholder,
  .contact-form__textarea::placeholder {
    color: ${colors.dim};
    opacity: 0.5;
  }
  .contact-form__textarea {
    resize: vertical;
    min-height: 130px;
  }
  .contact-form__submit {
    width: 100%;
    padding: 13px;
    background: ${colors.blue2};
    color: ${colors.bright};
    border: none;
    border-radius: 3px;
    font-family: inherit;
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: opacity 0.15s ease;
    text-align: center;
  }
  .contact-form__submit:hover {
    opacity: 0.85;
  }
  .contact-form__note {
    font-size: 12px;
    color: ${colors.dim};
    margin: 0;
  }
  @media (max-width: 768px) {
    .contact-content {
      padding: 24px 16px;
    }
    .contact-grid {
      grid-template-columns: 1fr;
      gap: 40px;
    }
  }
`

const contactLinks = [
  {
    icon: <EmailIcon />,
    iconBg: colors.green,
    color: colors.green,
    label: 'EMAIL',
    display: 's.forbes@builderdesigns.com',
    href: 'mailto:s.forbes@builderdesigns.com',
  },
  {
    icon: <LinkedinIcon />,
    iconBg: colors.blue,
    color: colors.blue,
    label: 'LINKEDIN',
    display: 'linkedin.com/in/stephenforbes',
    href: '#',
  },
  {
    icon: <GithubIcon />,
    iconBg: colors.text,
    color: colors.bright,
    label: 'GITHUB',
    display: 'github.com/stephenforbes',
    href: '#',
  },
]

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  return (
    <>
      <Global styles={style} />
      <div className="contact">
        <PageHeading
          breadcrumb="/* contact.css — let's build something */"
          title="Contact"
          subtitle="// open to work, collabs & good conversations"
        />
        <div className="contact-content">
          <div className="contact-grid">
            <div>
              <p className="contact-section-title">Find Me On</p>
              <div className="contact-links">
                {contactLinks.map(({ emoji, icon, iconBg, color, label, display, href }) => (
                  <a key={label} href={href} className="contact-link" target="_blank" rel="noreferrer">
                    <div
                      className="contact-link__icon"
                      // CSS supports 8-char hex (#RRGGBBAA). Appending '22' (≈13% opacity) or '33' (≈20% opacity)
                      // to a 6-char token value gives a tinted bg/border without needing rgba() or a separate token.
                      style={{ background: iconBg + '22', color: iconBg, border: `1px solid ${iconBg + '33'}` }}
                    >
                      {icon ?? emoji}
                    </div>
                    <div className="contact-link__info">
                      <span className="contact-link__label" style={{ color }}>{label}</span>
                      <span className="contact-link__url">{display}</span>
                    </div>
                    <span className="contact-link__arrow">↗</span>
                  </a>
                ))}
              </div>
            </div>
            <div>
              <p className="contact-section-title">Send a Message</p>
              <form
                className="contact-form"
                action="https://formspree.io/f/YOUR_FORM_ID"
                method="POST"
              >
                <div className="contact-form__field">
                  <label className="contact-form__label">
                    {'// YOUR_NAME'}<span className="contact-form__label-required"> *</span>
                  </label>
                  <input
                    className="contact-form__input"
                    type="text"
                    name="name"
                    placeholder="string"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="contact-form__field">
                  <label className="contact-form__label">
                    {'// YOUR_EMAIL'}<span className="contact-form__label-required"> *</span>
                  </label>
                  <input
                    className="contact-form__input"
                    type="email"
                    name="email"
                    placeholder="string"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="contact-form__field">
                  <label className="contact-form__label">{'// SUBJECT'}</label>
                  <input
                    className="contact-form__input"
                    type="text"
                    name="subject"
                    placeholder="string"
                    value={form.subject}
                    onChange={handleChange}
                  />
                </div>
                <div className="contact-form__field">
                  <label className="contact-form__label">
                    {'// MESSAGE'}<span className="contact-form__label-required"> *</span>
                  </label>
                  <textarea
                    className="contact-form__textarea"
                    name="message"
                    placeholder="'''your message'''"
                    value={form.message}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" className="contact-form__submit">→ send_message()</button>
                <p className="contact-form__note">{'// Powered by Formspree (lands directly in my inbox) :p'}</p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Contact
