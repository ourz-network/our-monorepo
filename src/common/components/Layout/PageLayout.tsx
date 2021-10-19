/* eslint-disable react/destructuring-assignment */
// import Footer from "./Footer.js";
import { ReactNode } from "react";
import Navbar from "./Navbar";

const PageLayout = ({ children }: { children: ReactNode }): JSX.Element => (
  <div className="flex-col mx-auto w-full h-screen min-h-screen bg-dark-background">
    <Navbar />
    {children}
    {/* <Footer /> */}
  </div>
);

export default PageLayout;
