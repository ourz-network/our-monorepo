/* eslint-disable jsx-a11y/anchor-is-valid */
import { css } from "@emotion/react";
import { NavLink } from "./NavLink";

export const Header = () => (
  // eslint-disable-next-line react/jsx-filename-extension
  <>
    <header
      css={css`
        height: var(--header-height);
        position: sticky;
        top: 0;
        z-index: var(--header-z);
        border-bottom: var(--border-black);
        background-color: var(--white);
      `}
    >
      <NavLink passHref href="/">
        <a>Auctions</a>
      </NavLink>
      <NavLink passHref href="/list">
        <a>List</a>
      </NavLink>
      <NavLink passHref href="/about">
        <a>About</a>
      </NavLink>
    </header>
  </>
);
