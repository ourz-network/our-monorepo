import { css } from "@emotion/react";

export const Footer = () => (
  // eslint-disable-next-line react/jsx-filename-extension
  <footer
    css={css`
      height: var(--footer-height);
      border-top: var(--border-black);
      a {
        text-decoration: none;
      }
    `}
  >
    <a target="_blank" href="https://zora.co" className="zora-branding" rel="noreferrer">
      ☼☽
    </a>
    <a target="_blank" href="https://docs.zora.co" rel="noreferrer">
      Powered by Zora
    </a>
  </footer>
);
