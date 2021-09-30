/* eslint-disable react/destructuring-assignment */
// import Footer from "./Footer.js";
import { ReactNode } from "react";
import Navbar from "./Navbar";

const PageLayout = (props): JSX.Element => (
  <div className="mx-auto w-full h-screen min-h-screen">
    <Navbar />
    {props.children}
    {/* <Footer /> */}
  </div>
);

export default PageLayout;
