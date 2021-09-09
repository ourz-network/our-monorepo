import ProfileHeader from "@/components/Profile/ProfileHeader";
import ProfilePageNFT from "@/components/Cards/ProfilePageNFT";
import PageLayout from "@/components/Layout/PageLayout"; // Layout wrapper
import Head from "next/head";

export const Profile = ({
  linkAddress,
  linkUsername,
  profileDetails,
  ownAccount,
  loading,
  user,
  loggedUserFollowStats,
  setUserFollowStats,
  posts,
}) => {
  return (
    <PageLayout>
      <Head>
        {/* Custom meta for profile */}
        {/* <meta
          property="og:image"
          content={`https://zora.gallery/api/meta/profile?address=${linkUsername ? linkUsername : linkAddress}`}
        /> */}
        {/* <meta
          property="twitter:image"
          content={`https://zora.gallery/api/meta/profile?address=${linkUsername ? linkUsername : linkAddress}`}
        /> */}
      </Head>
      <div
        id="pagecontainer"
        className="w-full h-auto min-h-screen bg-dark-background"
      >
        {(user || linkAddress) && (
          <ProfileHeader
            profileDetails={profileDetails}
            user={user}
            linkAddress={user ? user.ethAddress : linkAddress}
            ownAccount={ownAccount}
            loggedUserFollowStats={loggedUserFollowStats}
            setUserFollowStats={setUserFollowStats}
          />
        )}

        {loading ? (
          // If loading state, show loading
          <div className="justify-center w-screen h-screen mx-auto text-center align-middle transition-opacity text-dark-secondary animate-pulse">
            <span>Loading...</span>
          </div>
        ) : posts.length > 0 ? (
          // Else if, post count > 0
          <div
            id="medias"
            className="w-full h-auto mx-auto border-t border-dark-border"
          >
            <div className="flex flex-col gap-4 mx-4 justify-items-center content-evenly justify-evenly md:grid 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 max-w-auto">
              {/* <NFTFetchConfiguration network={Networks.MAINNET}> */}
              {posts.map((post, i) => {
                // For each Zora post
                return (
                  // Return Post component
                  <div key={i} className="flex justify-center w-full h-full">
                    <ProfilePageNFT
                      tokenId={post.id}
                      username={user ? user.username : null}
                      address={linkAddress ? linkAddress : null}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          // Else, if not loading and post count !> 0, return no owned media
          <div
            id="medias"
            className="flex w-screen h-full mx-auto mt-6 text-center text-dark-primary place-content-center"
          >
            <span>
              Empty Collection{" "}
              <span role="img" aria-label="Frown Face">
                ☹️
              </span>
            </span>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default Profile;
