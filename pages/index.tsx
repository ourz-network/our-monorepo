import styled from "@emotion/styled";
import Head from "../components/head";
import { PageWrapper } from "../styles/components";
import { AuctionsList } from "../components/AuctionsList";

export default function Home() {
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <IndexWrapper>
      <Head />
      <h1>{process.env.NEXT_PUBLIC_APP_TITLE}</h1>
      <AuctionsList />
    </IndexWrapper>
  );
}

const IndexWrapper = styled(PageWrapper)`
  max-width: var(--content-width-xl);
`;
