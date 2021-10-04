/* eslint-disable no-underscore-dangle */
import { FC, useEffect, useState } from "react"; // State management
import { useRouter } from "next/router"; // Page redirects (static routing)
import { GetStaticPaths, GetStaticProps } from "next";
import web3 from "@/app/web3";
import { getPostsByOwner } from "@/modules/subgraphs/zora/functions"; // Post retrieval function
import { Profile } from "@/components/Profile/Profile";
import connectDB from "@/modules/mongodb/utils/connectDB";
import { getAllProfilePaths } from "@/modules/subgraphs/ourz/functions";
import { Media } from "@/modules/subgraphs/zora/types";
import { IProfile, ProfileModel } from "@/modules/mongodb/models/ProfileModel";
import { IUser, UserModel } from "@/modules/mongodb/models/UserModel";
import { addressLength } from "../../MOVEME/utils";

interface ProfilePageProps {
  redirectUsername: string;
  usernameOrAddress: string;
  user: IUser;
  profileDetails: IProfile;
  posts: Media[];
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [redirectUsername]);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

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
   *   // eslint-disable-next-line react-hooks/exhaustive-deps
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
// eslint-disable-next-line consistent-return
export const getStaticProps: GetStaticProps = async (context) => {
  const { usernameOrAddress } = context.params;
  await connectDB();
  let user: IUser | null;

  // check if address has user profile first
  if (usernameOrAddress.length === addressLength) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    user = await UserModel.findOne({
      ethAddress: (usernameOrAddress as string).toLowerCase(),
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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    user = await UserModel.findOne({
      username_lower: (usernameOrAddress as string).toLowerCase(),
    }).populate("user");
  }

  if (!user) {
    // fetch posts
    const ownedMedia: Media[] = await getPostsByOwner(usernameOrAddress as string);
    const posts: Media[] = ownedMedia.reverse();
    return {
      props: {
        usernameOrAddress,
        posts,
      },
      revalidate: 15,
    };
  }
  // fetch posts
  const ownedMedia: Media[] = await getPostsByOwner(user.ethAddress);
  const posts: Media[] = ownedMedia.reverse();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const profileDetails: IProfile = await ProfileModel.findOne({ user: user._id });
  return {
    props: {
      linkUsername: user.username,
      user: JSON.parse(JSON.stringify(user)) as string,
      profileDetails: JSON.parse(JSON.stringify(profileDetails)) as string,
      posts,
    },
    revalidate: 15,
  };
};

export default ProfilePage;
