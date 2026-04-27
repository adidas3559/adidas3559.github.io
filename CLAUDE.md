# Portfolio Site 2026

## Styling

All component and page styles must be written as an inline `const style` using the `css` tagged template from `@emotion/react`, injected via `<Global styles={style} />`. Do not create separate `.css` files or use `className` with the emotion `css` return value directly.

```jsx
import { Global, css } from '@emotion/react'

const style = css`
  .my-component {
    color: red;
  }
`

function MyComponent() {
  return (
    <>
      <Global styles={style} />
      <div className="my-component">...</div>
    </>
  )
}
```

No blank lines inside the `const style` template literal.

## Colors & Typography

Never use hardcoded hex values, rgb values, or font family strings in any component or page style. Always import and reference tokens from `src/styles`:

```jsx
import { colors, typography } from '../styles'

const style = css`
  .my-component {
    color: ${colors.text};
    background: ${colors.bg};
    font-family: ${typography.SansSerif};
  }
`
```

Available color tokens: `bg`, `bg2`, `bg3`, `bg4`, `title`, `border`, `text`, `dim`, `bright`, `blue`, `blue2`, `green`, `gcm`, `yellow`, `orange`, `purple`, `pink`, `red`

Available font tokens: `typography.Body` (JetBrains Mono), `typography.Display` (Syne)

## Global Styles

Base resets, structural layout (`#root`), global background, and shared utility classes (e.g. `.card`) live in `src/styles/base.jsx`. It uses the same emotion `Global` pattern as the rest of the project and has full access to color tokens. `GlobalBase` is rendered once in `Layout.jsx`. Add styles here when they are truly site-wide and not tied to a specific component or page.

### Default font

`typography.Body` (JetBrains Mono) is set as the base `font-family` on `body` globally. Do not add `font-family` declarations in components unless the text intentionally uses a different font. The only reason to set a font-family is when using `typography.Display` (Syne) for large headings or display text where it is very obvious or explicitly requested.
