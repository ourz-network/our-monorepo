/* eslint-disable jsx-a11y/anchor-is-valid */
// import { useContext } from "react";
// import { SubdomainContext } from "../context/SubdomainContext";
import { NavLink } from "./NavLink";
import { Wallet } from "./Wallet";

export const Header = () => {
  // const { userConfig } = useContext(SubdomainContext);

  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <>
      <header
      // css={css`
      //   height: var(--header-height);
      //   position: sticky;
      //   top: 0;
      //   z-index: var(--header-z);
      //   border-bottom: var(--border-black);
      // `}
      >
        <NavLink passHref href="/">
          <a>Auctions</a>
        </NavLink>
        <div className="center-x">
          <NavLink passHref href="/collection">
            <a>Collection</a>
          </NavLink>
        </div>
        <div>
          <Wallet />
        </div>
      </header>
    </>
  );
};
