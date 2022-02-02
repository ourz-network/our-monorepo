import { css } from "@emotion/react";
// import { useContext } from "react";
// import { SubdomainContext } from "../context/SubdomainContext";
import { NavLink } from "./NavLink";

export const Footer = () => {
  // const { userConfig } = useContext(SubdomainContext);

  return (
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
};
