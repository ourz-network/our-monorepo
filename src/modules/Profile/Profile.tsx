/* eslint-disable no-nested-ternary */
import Head from "next/head";
import { ProfileHeader } from "@/modules/Profile/ProfileHeader";
import NFTPreviewCard from "@/components/Cards/NFTPreviewCard";
import PageLayout from "@/components/Layout/PageLayout"; // Layout wrapper
import { IProfile } from "@/mongodb/models/ProfileModel";
import { IUser } from "@/mongodb/models/UserModel";
import { NFTCard } from "../subgraphs/utils";

export const Profile = ({
  linkAddress,
  profileDetails,
  ownAccount,
  user,
  posts,
}: {
  linkAddress: string;
  profileDetails: IProfile;
  ownAccount: boolean;
  user: IUser;
  posts: NFTCard[];
}): JSX.Element => (
  <PageLayout>
    <Head>
      {/* Custom meta for profile */}
      {/* <meta
          property="og:image"
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
        />
      )}

      {posts?.length > 0 ? (
        // Else if, post count > 0
        <div id="medias" className="mx-auto w-full h-auto border-t border-dark-border">
          <div className="flex flex-col gap-4 justify-evenly justify-items-center content-evenly mx-4 md:grid 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 max-w-auto">
            {posts.map((post) => (
              <div key={post.name} className="flex justify-center w-full h-full">
                <NFTPreviewCard post={post} />
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
