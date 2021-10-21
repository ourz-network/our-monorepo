/* eslint-disable no-underscore-dangle */
import React, { FC, useEffect } from "react"; // State management
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router"; // Page redirects (static routing)
import { ParsedUrlQuery } from "querystring";
import web3 from "@/app/web3";
import { getPostsByOwner } from "@/subgraphs/zora/functions"; // Post retrieval function
import connectDB from "@/mongodb/utils/connectDB";
import { getAllProfilePaths } from "@/subgraphs/ourz/functions";
import { Media } from "@/utils/ZoraSubgraph";
import { IProfile, ProfileModel } from "@/mongodb/models/ProfileModel";
import { IUser, UserModel } from "@/mongodb/models/UserModel";
import { addressLength } from "@/utils/index";
import { NFTCard } from "@/modules/subgraphs/utils";
import useOwners from "@/common/hooks/useOwners";
import PageLayout from "@/components/Layout/PageLayout";
import ProfileHeader from "@/modules/Profile/ProfileHeader";
import SquareGrid from "@/common/components/NFTs/SquareGrid";

interface ProfilePageProps {
  redirectUsername: string;
  usernameOrAddress: string;
  user: IUser;
  profileDetails: IProfile;
  posts: NFTCard[];
}

const ProfilePage: FC<ProfilePageProps> = ({
  redirectUsername,
  usernameOrAddress,
  user,
  profileDetails,
  posts,
}: ProfilePageProps): JSX.Element => {
  const router = useRouter();
  const { address } = web3.useContainer();
  const { isOwner } = useOwners({ address, ownerAddress: user?.ethAddress ?? usernameOrAddress });

  useEffect(() => {
    if (redirectUsername) {
      router.push(`/profile/${redirectUsername}`).then(
        () => {},
        () => {}
      );
    }
  }, [redirectUsername, router]);

  if (router.isFallback) {
    return (
      <PageLayout>
        <p className="my-auto w-full text-center animate-pulse text-dark-primary">Redirecting...</p>
      </PageLayout>
    );
  }

  return (
    <>
      {/* <Head /> */}
      <PageLayout>
        <ProfileHeader
          linkAddress={user?.ethAddress ?? usernameOrAddress}
          user={user}
          profileDetails={profileDetails}
          isOwner={isOwner}
        />

        {posts?.length > 0 ? (
          <SquareGrid posts={posts} />
        ) : (
          <div className="mx-auto mt-6 h-full text-center text-dark-primary">
            Empty Collection{" "}
            <span role="img" aria-label="Frown Face">
              ☹️
            </span>
          </div>
        )}
      </PageLayout>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  await connectDB();
  const addresses = await getAllProfilePaths();

  const paths: { params: ParsedUrlQuery }[] = [];
  if (addresses) {
    addresses.forEach((address) => paths.push({ params: { usernameOrAddress: address } }));
  }

  try {
    const allUserAccounts = await UserModel.find().populate("user");
    (allUserAccounts as IUser[]).forEach((user) =>
      paths.push({ params: { usernameOrAddress: `${user.username}` } })
    );

    return { paths, fallback: true };
  } catch (error) {
    return { paths, fallback: true };
  }
};

export const getStaticProps: GetStaticProps = async (context) => {
  const usernameOrAddress = context.params?.usernameOrAddress;
  await connectDB();

  const getPosts = async (ethAddress: string) => {
    const ownedMedia: Media[] = await getPostsByOwner(ethAddress);
    // const createdMedia: Media[] = await getPostsByCreator(user.ethAddress);
    const posts = [
      ...ownedMedia.reverse(),
      //  ...createdMedia.reverse()
    ];
    return { posts };
  };

  if (usernameOrAddress?.length === addressLength) {
    // if a profile exists for the address, redirect to profile/[username]
    try {
      const user = await UserModel.findOne({
        ethAddress: usernameOrAddress,
      }).populate("user");

      if (user !== null) {
        return {
          props: {
            redirectUsername: user.username,
            usernameOrAddress,
          },
        };
      }
    } catch (error) {
      const { posts } = await getPosts(usernameOrAddress);
      return {
        props: {
          usernameOrAddress,
          posts,
        },
        revalidate: 10,
      };
    }
  }

  // else username
  try {
    const user = await UserModel.findOne({
      username_lower: (usernameOrAddress as string).toLowerCase(),
    }).populate("user");
    const profileDetails: IProfile = await ProfileModel.findOne({ user: user._id });
    const { posts } = await getPosts(user.ethAddress);

    if (user && profileDetails && posts) {
      return {
        props: {
          linkUsername: user.username,
          user: JSON.parse(JSON.stringify(user)) as string,
          profileDetails: JSON.parse(JSON.stringify(profileDetails)) as string,
          posts,
        },
        revalidate: 10,
      };
    }
  } catch (error) {
    return {
      notFound: true,
    };
  }
  return {
    notFound: true,
  };
};

export default ProfilePage;
