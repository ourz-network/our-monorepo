import { Global, css } from "@emotion/react";
import "@fontsource/source-serif-4/variable-full.css";
import { media } from "./mixins";
import { returnBreakpoint } from "./breakpoints";
import { useContext, useEffect, useState } from "react";
import { SubdomainContext } from "../context/SubdomainContext";

export default function GlobalStyles() {
  const { userConfig } = useContext(SubdomainContext);
  const { fontFamily } = userConfig;

  return (
    <Global
      styles={css`
        :root {
          /* COLORS */
          --black: #000;
          --white: #fff;
          --border-color: var(--colors-accent);
          --font-color: var(--colors-textPrimary);
          --font-family: var(--${fontFamily ?? `sans`});
          --overlay: rgba(0, 0, 0, 0.85);
          --overlay-light: rgba(0, 0, 0, 0.35);
          --border-black: 1px solid var(--black);
          --border-light: 1px solid #dbdbdb;

          /* FONTS */
          /* --font-a: Helvetica, Arial, sans-serif; */

          --serif: "Didot", "Source Serif 4", serif;
          --sans: "Neue Helvetica", "Neue-Helvetica", "Helvetica", "Inter", "Arial", sans-serif;
          --mono: Courier, monospace;
          --font-stretch-normal: normal;
          --font-stretch-condensed: condensed;
          --font-weight-bold: bold;
          --font-weight-regular: normal;
          --font-weight-condensed: 500;
          --font-weight-light: 300;

          /* SPACING */
          --base-unit: 8px;
          --space-sm: calc(var(--base-unit) * 2);
          --space-md: calc(var(--base-unit) * 3);
          --space-lg: calc(var(--base-unit) * 5);

          /* TYPOGRAPHY */
          --text-01: calc(var(--base-unit) * 1.5);
          --text-02: calc(var(--base-unit) * 2);
          --text-03: calc(var(--base-unit) * 3);
          --text-04: calc(var(--base-unit) * 4);
          --text-05: calc(var(--base-unit) * 5);

          /* LAYOUT */
          --header-z: 100;
          --header-height: calc(var(--base-unit) * 10);
          --footer-height: calc(var(--base-unit) * 10);
          --content-width-md: 960px;
          --content-width-lg: ${returnBreakpoint("desktop")};
          --content-width-xl: ${returnBreakpoint("xl")};
        }

        /* MEDIA QUERY MIXIN */
        ${media.laptop`
          :root {
            --base-unit: 10px;
            --text-05: calc(var(--base-unit) * 6);
          }
        `}

        ${media.xl`
          :root {
            --base-unit: 11px;
            --text-05: calc(var(--base-unit) * 7);
          }
        `}

        /* DEFAULTS */
        /* LAYOUT */
        body {
          font-family: var(--font-family);
          overflow-y: scroll;
          ::-webkit-scrollbar {
            width: 0; /* Remove scrollbar space */
            background: transparent; /* Optional: just make scrollbar invisible */
          }
          /* Optional: show position indicator in red */
          ::-webkit-scrollbar-thumb {
            background: #ff0000;
          }
        }

        main {
          /* background-color: var(--bg-color); */
          width: 100%;
          overflow-x: hidden;
          position: relative;
          min-height: calc(100vh - (var(--header-height) + var(--footer-height)));
        }

        header,
        footer {
          font-family: var(--font-family) !important;
          text-transform: uppercase;
          background-color: var(--colors-background);
          font-size: var(--text-02);
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          padding: 0 var(--space-md);
          ${media.tablet`
            flex-direction: row;
          `}
          a {
            text-decoration: none;
            text-align: center;
            color: var(--font-color);
            &.active {
              text-decoration: underline;
            }
            ${media.hover`
              text-decoration: underline;
            `}
          }
        }

        /* TYPOGRPAHY */
        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          color: var(--font-color);
          font-family: var(--font-family);
          font-weight: 500;
        }
        h1 {
          font-size: var(--text-05);
          line-height: 1;
          text-align: center;
          padding: var(--space-md) 0 var(--space-sm);
        }
        h2 {
          font-size: var(--text-03);
          text-align: center;
          padding: var(--space-sm) 0 var(--space-md);
        }
        h3 {
          font-size: var(--text-03);
          padding: var(--space-sm) 0;
        }
        a {
          font-weight: 400;
        }
        p,
        ol,
        ul {
          font-size: var(--text-02);
          padding-bottom: var(--space-sm);
          line-height: 1.35;
          font-weight: 400;
        }

        /* CUSTOM */

        .center-x {
          ${media.tablet`
            position: absolute;
            left: 50%;
            transform: translate(-50%);
          `}
        }

        .modal {
          ::-webkit-scrollbar {
            width: 0; /* Remove scrollbar space */
            background: transparent; /* Optional: just make scrollbar invisible */
          }
          /* Optional: show position indicator in red */
          ::-webkit-scrollbar-thumb {
            background: #ff0000;
          }
          overflow-y: scroll;
          position: fixed;
          z-index: 1;
          padding-top: 100px;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          background-color: rgb(0, 0, 0);
          background-color: rgba(0, 0, 0, 0.4);
        }
        .modal-content {
          display: flex;
          z-index: 2;
          flex-direction: column;
          background-color: var(--colors-background);
          color: var(--colors-textPrimary);
          margin: 5% auto;
          padding: 20px;
          border: 3px solid var(--colors-accent);
          border-radius: var(--base-unit);
          width: 80%;
        }

        .form {
          display: grid;
          grid-auto-flow: row;
          grid-auto-rows: max-content;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 10px;
          height: full;
          width: auto;
          max-width: full;
          justify: center;
        }
        .form-item {
          display: flex;
          flex-direction: column;
          border: 1px solid #000;
          align-items: center;
          padding: var(--space-sm);
          margin: var(--base-unit);
        }
        .form-item label {
          font-style: italic;
          margin-bottom: var(--base-unit);
        }
        .form-item input {
          margin: 10px;
          width: min-content;
        }
        .svg {
          height: var(--space-md);
          width: var(--space-md);
          ${media.hover`
            border: 1px solid var(--border-color);
            cursor: pointer;
          `}
        }
        .icon {
          transform: translateY(1px);
          position: relative;
          display: block;
          text-align: center;
          border: none;
        }

        /* ZORA SPECIFIC -- CLEAN UP
           - WALLET MODAL
        */
        .zora-wallet-modalContent {
          h3 {
            font-size: var(--text-03) !important;
            padding: 0 0 15px;
          }
          .zora--auction-house-modalSuccessMessage {
            font-size: var(--text-02) !important;
          }
          img {
            object-fit: contain;
          }
          p {
            font-size: var(--text-02) !important;
            padding: 0 0 10px;
            &:last-of-type {
              padding-bottom: 30px !important;
            }
          }
          .zora--auction-house-ethAmountLabel {
            padding-bottom: 15px;
            font-size: var(--text-02);
          }
          input {
            margin-bottom: 15px;
          }
          button.zora--auction-house-actionButton {
            margin-bottom: 15px;
          }
        }
      `}
    />
  );
}
