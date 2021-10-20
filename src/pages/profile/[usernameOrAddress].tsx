/* eslint-disable no-underscore-dangle */
import { FC, useEffect, useState } from "react"; // State management
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router"; // Page redirects (static routing)
import web3 from "@/app/web3";
import { getPostsByOwner } from "@/subgraphs/zora/functions"; // Post retrieval function
import { Profile } from "@/modules/Profile/Profile";
import connectDB from "@/mongodb/utils/connectDB";
import { getAllProfilePaths } from "@/subgraphs/ourz/functions";
import { Media } from "@/utils/ZoraSubgraph";
import { IProfile, ProfileModel } from "@/mongodb/models/ProfileModel";
import { IUser, UserModel } from "@/mongodb/models/UserModel";
import { addressLength } from "@/utils/index";
import { NFTCard } from "@/modules/subgraphs/utils";

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
  useEffect(() => {
    // Static Redirect
    if (redirectUsername) {
      router.push(`/profile/${redirectUsername}`).then(
        () => {},
        () => {}
      );
    }
  }, [redirectUsername, router]);

  // const [loggedUserFollowStats, setUserFollowStats] = useState(userFollowStats);

  // if metamask address matches url address, ownAccount = true.
  const { address } = web3.useContainer();
  const [ownAccount, setOwnAccount] = useState(false);
  useEffect(() => {
    if (address && (user || usernameOrAddress !== null)) {
      setOwnAccount(address === (usernameOrAddress || user?.ethAddress));
    } else {
      setOwnAccount(false);
    }
  }, [address, user, usernameOrAddress]);

  /*
   * useEffect(() => {
   *   async function collectOwnedMedia() {
   *     const ownedMedia = await getPostsByOwner(
   *       user ? user.ethAddress.toLowerCase() : usernameOrAddress
   *     );
   */

  /*
   *     setPosts([...ownedMedia.reverse()]); // Update owned posts (reversed for newest first)
   *     setLoading(false); // Toggle loading
   *   }
   *   if (user || usernameOrAddress) {
   *     collectOwnedMedia().then(
   *       () => {},
   *       () => {}
   *     );
   *   }
   *
   * }, [user, usernameOrAddress]); // Collect owned media on load
   */
  if (router.isFallback) {
    return (
      <p className="place-self-center px-4 py-2 m-auto animate-pulse text-centeer text-dark-bg">
        Redirecting...
      </p>
    );
  }
  return (
    <Profile
      linkAddress={usernameOrAddress || null}
      profileDetails={profileDetails}
      user={user}
      /*
       * linkUsername={linkUsername || undefined}
       * loggedUserFollowStats={loggedUserFollowStats}
       * setUserFollowStats={setUserFollowStats}
       */
      ownAccount={ownAccount}
      /*
       * followersLength={followersLength}
       * followingLength={followingLength}
       */
      posts={posts}
    />
  );
};

// Run on server build
export const getStaticPaths: GetStaticPaths = async () => {
  await connectDB();
  const addresses = await getAllProfilePaths();
  const paths: { params: { usernameOrAddress: string } }[] = [];
  addresses.forEach((address) => paths.push({ params: { usernameOrAddress: address } }));

  try {
    const allUsers = await UserModel.find().populate("user");
    (allUsers as IUser[]).forEach((user) =>
      paths.push({
        params: { usernameOrAddress: `${user.username}` },
      })
    );
    return { paths, fallback: true };
  } catch (error) {
    return { paths: [], fallback: true };
  }
};

// Run on page load

export const getStaticProps: GetStaticProps = async (context) => {
  const { usernameOrAddress } = context.params;
  await connectDB();

  let user: IUser | null;
  // check if address has user profile first
  if (usernameOrAddress.length === addressLength) {
    user = await UserModel.findOne({
      ethAddress: usernameOrAddress,
    }).populate("user");

    // if they have profile, abort prop fetching and redirect to page
    if (user !== null) {
      return {
        props: {
          redirectUsername: user.username,
          usernameOrAddress,
        },
      };
    }
  } else {
    user = await UserModel.findOne({
      username_lower: (usernameOrAddress as string).toLowerCase(),
    }).populate("user");
  }

  if (!user) {
    // fetch posts
    const ownedMedia: Media[] = await getPostsByOwner(usernameOrAddress as string);
    // const createdMedia: Media[] = await getPostsByCreator(usernameOrAddress as string);
    const posts: Media[] = [
      ...ownedMedia.reverse(),
      //  ...createdMedia.reverse()
    ];
    return {
      props: {
        usernameOrAddress,
        posts,
      },
      revalidate: 10,
    };
  }
  // fetch posts
  const ownedMedia: Media[] = await getPostsByOwner(user.ethAddress);
  // const createdMedia: Media[] = await getPostsByCreator(user.ethAddress);
  const posts: Media[] = [
    ...ownedMedia.reverse(),
    //  ...createdMedia.reverse()
  ];

  const profileDetails: IProfile = await ProfileModel.findOne({ user: user._id });
  return {
    props: {
      linkUsername: user.username,
      user: JSON.parse(JSON.stringify(user)) as string,
      profileDetails: JSON.parse(JSON.stringify(profileDetails)) as string,
      posts,
    },
    revalidate: 10,
  };
};

export default ProfilePage;
