import Head from "next/head";
import PageLayout from "@/components/Layout/PageLayout";
import React, { useState } from "react"; // React state management
import { getPostByID } from "@/modules/subgraphs/zora/functions"; // Post collection helper
import HomeNFT from "@/components/Cards/HomeNFT";
import { Zora } from "@zoralabs/zdk";
import { ethers } from "ethers";

const Home = (props) => {
  // console.log(`props`, props);
  const [posts, setPosts] = useState(props.postsToSet); // Posts array
  const [loading, setLoading] = useState(false); // Button loading state
  const [numPosts, setNumPosts] = useState(props.maxSupply); // Number of loadable posts

  const collectMore = async () => {
    setLoading(true); // Toggle button loading

    let newPosts = [];
    // For numPosts ... max(numPosts - 24, 0)
    for (let i = numPosts; i >= numPosts - 23; i--) {
      if (i !== 2) {
        // Collect post
        const post = await getPostByID(i);
        // Push post to newPosts
        if (post != null) {
          newPosts.push(post);
        }
      }
    }
    setNumPosts(numPosts - 24); // Update number of loadable posts count

    setPosts([...posts, ...newPosts]); // Append newPosts to posts array
    setLoading(false); // Toggle button loading
  };

  return (
    <PageLayout>
      <Head>
        <title>ourz.network</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="flex flex-col w-full min-h-screen landingPage bg-dark-background">
        {posts.length >= 0 ? (
          // If posts array contains at least 1 post
          <>
            <div className="w-full h-full mx-auto max-w-11/12 xl:mx-16">
              <div className="w-full h-full space-x-4 space-y-4 timeline xl:grid">
                {posts.map((post, i) => {
                  // For each Zora post
                  return (
                    // Return Post component
                    <HomeNFT key={i} tokenId={post.id} />
                  );
                })}
              </div>
            </div>
            {posts &&
            posts.length >= 0 &&
            posts[posts.length - 1]?.id !== "0" ? (
              // If there remain posts that can be loaded, display button
              <button
                onClick={() => collectMore()}
                disabled={loading}
                className={
                  `w-auto mx-auto my-12 text-center transition-opacity px-3 py-1 mainButton border border-dark-border text-dark-primary` +
                  (loading ? ` text-dark-primary animate-pulse` : "")
                }
              >
                {loading ? "Loading..." : "Load More"}
              </button>
            ) : (
              // Else, display text signalling (end, beginning)
              <div className="">
                <span>Is this the end or beginning? You decide.</span>
              </div>
            )}
          </>
        ) : (
          // Else, display loading state
          <div className="items-center content-center w-8 h-8 mx-auto mt-32 text-center transition-opacity bg-ourange-500 ll animate-pulse">
            {/* <h3 className="px-3 py-1 bg-dark-background ">Loading...</h3> */}
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export async function getStaticProps() {
  const queryProvider = ethers.providers.getDefaultProvider("rinkeby", {
    infura: process.env.NEXT_PUBLIC_INFURA_ID,
    alchemy: process.env.NEXT_PUBLIC_ALCHEMY_KEY,
    pocket: process.env.NEXT_PUBLIC_POKT_ID,
    etherscan: process.env.NEXT_PUBLIC_ETHERSCAN_KEY,
  });
  const zoraQuery = new Zora(queryProvider, 4);
  const unburned = Number((await zoraQuery.fetchTotalMedia()) - 1);
  const maxSupply = parseInt(await zoraQuery.fetchMediaByIndex(unburned));

  let requests = [];
  let postsToSet = [];
  if (maxSupply) {
    for (let i = maxSupply; i >= maxSupply - 47; i--) {
      // Collect post
      const post = await getPostByID(i);
      if (post != null) {
        postsToSet.push(post);
      }
    }

    return {
      props: {
        postsToSet: JSON.parse(JSON.stringify(postsToSet)),
        maxSupply: JSON.parse(JSON.stringify(Number(maxSupply - 48))),
      },
      revalidate: 60,
    };
  }
}

export default Home;
