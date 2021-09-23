// import Footer from "./Footer.js";
import Navbar from "./Navbar.js";

const PageLayout = (props) => {
  return (
    <div className="w-full h-screen min-h-screen mx-auto">
      <Navbar />
      {props.children}
      {/* <Footer /> */}
    </div>
  );
};

export default PageLayout;
