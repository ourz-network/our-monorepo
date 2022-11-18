import { NavLink } from "./NavLink";

// eslint-disable-next-line react/function-component-definition
export const Footer = () => (
  <footer
  // css={css`
  //   height: var(--footer-height);
  //   border-top: var(--border-black);
  //   a {
  //     text-decoration: none;
  //   }
  // `}
  >
    <a target="_blank" href="https://zora.co" className="zora-branding" rel="noreferrer">
      ☼☽
    </a>
    <div className="center-x">
      <NavLink passHref href="/about">
        <a>About</a>
      </NavLink>
    </div>
    <a target="_blank" href="https://docs.zora.co" rel="noreferrer">
      Powered by Zora
    </a>
  </footer>
);
