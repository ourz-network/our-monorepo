import Head from "../components/head";
import readMe from "../README.md";

import Markdown from "../components/Markdown";
import { PageWrapper } from "../styles/components";

const About = () => {
  return (
    <>
      <Head title="About" />
      <PageWrapper>
        <Markdown markdown={readMe} />
      </PageWrapper>
    </>
  );
};

export default About;
