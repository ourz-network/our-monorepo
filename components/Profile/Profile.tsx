/* eslint-disable no-nested-ternary */
import Head from "next/head";
import { ProfileHeader } from "@/components/Profile/ProfileHeader";
import ProfileNFT from "@/components/Cards/ProfileNFT";
import PageLayout from "@/components/Layout/PageLayout"; // Layout wrapper

export const Profile = ({
  linkAddress,
  profileDetails,
  ownAccount,
  loading,
  user,
  loggedUserFollowStats,
  setUserFollowStats,
  posts,
}: {
  linkAddress: string;
  profileDetails: any;
  ownAccount: boolean;
  loading: boolean;
  user: any;
  loggedUserFollowStats: any;
  setUserFollowStats: any;
  posts: any;
}): JSX.Element => (
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
    <div id="pagecontainer" className="w-full h-auto min-h-screen bg-dark-background">
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
        <div className="justify-center mx-auto w-screen h-screen text-center align-middle transition-opacity animate-pulse text-dark-secondary">
          <span>Loading...</span>
        </div>
      ) : posts.length > 0 ? (
        // Else if, post count > 0
        <div id="medias" className="mx-auto w-full h-auto border-t border-dark-border">
          <div className="flex flex-col gap-4 justify-evenly justify-items-center content-evenly mx-4 md:grid 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 max-w-auto">
            {/* <NFTFetchConfiguration network={Networks.MAINNET}> */}
            {posts.map((post, i) => (
              // For each Zora post
              // Return Post component
              <div key={post.id} className="flex justify-center w-full h-full">
                <ProfileNFT
                  tokenId={post.id}
                  username={user ? user.username : null}
                  address={linkAddress || null}
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        // Else, if not loading and post count !> 0, return no owned media
        <div
          id="medias"
          className="flex place-content-center mx-auto mt-6 h-full text-center text-dark-primary"
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

export default Profile;
