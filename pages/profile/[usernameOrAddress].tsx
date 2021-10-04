/* eslint-disable no-underscore-dangle */
import { useState, useEffect, FC } from "react"; // State management
import { useRouter } from "next/router"; // Page redirects (static routing)
import { GetStaticProps } from "next";
import web3 from "@/app/web3";
import zoraSubgraph from "@/modules/subgraphs/zora/index"; // GraphQL client
import getPostByID from "@/modules/subgraphs/zora/functions"; // Post retrieval function
import { ZORA_MEDIA_BY_OWNER } from "@/modules/subgraphs/zora/queries"; // Retrieval query
import { Profile } from "@/components/Profile/Profile";
import connectDB from "@/modules/mongodb/utils/connectDB";
import { UserModel } from "@/modules/mongodb/models/UserModel";
import { ProfileModel } from "@/modules/mongodb/models/ProfileModel";
import { FollowModel } from "@/modules/mongodb/models/FollowModel";
import { getAllProfilePaths } from "@/modules/subgraphs/ourz/functions";
import { IUser, IProfile } from "@/modules/mongodb/models/types";

interface ProfilePageProps {
  linkUsername: string;
  linkAddress: string;
  user: IUser;
  profileDetails: IProfile;
  followersLength: number;
  followingLength: number;
  userFollowStats: Record<string, unknown>;
  postsToSet: Record<string, unknown>;
  redirectUsername: string;
}

const ProfilePage: FC<ProfilePageProps> = ({
  linkUsername,
  linkAddress,
  user,
  profileDetails,
  followersLength,
  followingLength,
  userFollowStats,
  postsToSet,
  redirectUsername,
}: ProfilePageProps): JSX.Element => {
  const [loading, setLoading] = useState(!(postsToSet?.length > 1)); // Global loading state

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

  const [posts, setPosts] = useState(postsToSet); // Posts array
  const [loggedUserFollowStats, setUserFollowStats] = useState(userFollowStats);

  // if metamask address matches url address, ownAccount = true.
  const { address } = web3.useContainer();
  const [ownAccount, setOwnAccount] = useState(false);
  useEffect(() => {
    if (address && (user || linkAddress != null)) {
      setOwnAccount(address === (linkAddress || user?.ethAddress));
    } else {
      setOwnAccount(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  useEffect(() => {
    async function collectOwnedMedia() {
      // Collect all postIDs by owner
      const res = await zoraSubgraph.query({
        query: ZORA_MEDIA_BY_OWNER(user ? user.ethAddress.toLowerCase() : linkAddress),
      });
      const allPosts = res.data.medias;
      const ownedMedia = [];
      // For all owned posts
      const completeFetch = await Promise.all(
        allPosts.map(async (item, i) => {
          const postID = allPosts[i].id;
          // Collect post
          const post = await getPostByID(postID);
          // Push post to newPosts
          if (post != null) {
            ownedMedia.push(post);
          }
        })
      );

      if (completeFetch) {
        setPosts([...ownedMedia.reverse()]); // Update owned posts (reversed for newest first)
        setLoading(false); // Toggle loading
      }
    }
    if (user || linkAddress) {
      collectOwnedMedia().then(
        () => {},
        () => {}
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, linkAddress]); // Collect owned media on load
  if (router.isFallback) {
    return (
      <p className="place-self-center px-4 py-2 m-auto animate-pulse text-centeer text-dark-bg">
        Redirecting...
      </p>
    );
  }
  return (
    <Profile
      linkAddress={linkAddress || undefined}
      linkUsername={linkUsername || undefined}
      profileDetails={profileDetails}
      loading={loading}
      user={user}
      loggedUserFollowStats={loggedUserFollowStats}
      setUserFollowStats={setUserFollowStats}
      ownAccount={ownAccount}
      followersLength={followersLength}
      followingLength={followingLength}
      posts={posts}
    />
  );
};

// Run on server build
export async function getStaticPaths(): Promise<{ paths: any; fallback: boolean }> {
  await connectDB();
  const addresses = await getAllProfilePaths();
  const paths: { params: { usernameOrAddress: string } }[] = [];
  addresses.forEach((address) => paths.push({ params: { usernameOrAddress: address } }));

  try {
    const allUsers: IUser[] = await UserModel.find().populate("user");
    allUsers.forEach((user) =>
      paths.push({
        params: { usernameOrAddress: `${user.username}` },
      })
    );
    return { paths, fallback: true };
  } catch (error) {
    return { paths: [], fallback: true };
  }
}

// Run on page load
// eslint-disable-next-line consistent-return
export const getStaticProps: GetStaticProps = async (context) => {
  const { usernameOrAddress } = context.params;
  await connectDB();
  let linkAddress;
  let linkUsername;
  if (usernameOrAddress.length === 42) {
    linkAddress = usernameOrAddress;

    try {
      const user = await UserModel.findOne({
        ethAddress: linkAddress,
      }).populate("user");

      return {
        props: {
          redirectUsername: user.username,
          linkAddress,
        },
      };
    } catch (error) {
      // Collect all postIDs by owner
      const res = await zoraSubgraph.query({
        query: ZORA_MEDIA_BY_OWNER(linkAddress),
      });
      const allPosts = res.data.medias;
      const ownedMedia = [];
      // For all owned posts
      const completeFetch = await Promise.all(
        allPosts.map(async (item, i) => {
          const postID = allPosts[i].id;
          // Collect post
          const post = await getPostByID(postID);
          // Push post to newPosts
          if (post != null) {
            ownedMedia.push(post);
          }
        })
      );

      if (completeFetch) {
        const postsToSet = ownedMedia.reverse();
        return {
          props: {
            linkAddress,
            postsToSet,
          },
          revalidate: 15,
        };
      }
    }
  } else {
    linkUsername = usernameOrAddress;
    try {
      const user = await UserModel.findOne({
        username_lower: linkUsername.toLowerCase(),
      }).populate("user");

      const profileDetails = await ProfileModel.findOne({ user: user._id });
      const profileFollowStats = await FollowModel.findOne({ user: user._id });
      const followersLength =
        profileFollowStats?.followers?.length > 0 ? profileFollowStats.followers.length : 0;
      const followingLength =
        profileFollowStats?.following?.length > 0 ? profileFollowStats.following.length : 0;

      // Collect all postIDs by owner
      const res = await zoraSubgraph.query({
        query: ZORA_MEDIA_BY_OWNER(user.ethAddress.toLowerCase()),
      });
      const allPosts = res.data.medias;
      const ownedMedia = [];
      // For all owned posts
      const completeFetch = await Promise.all(
        allPosts.map(async (item, i) => {
          const postID = allPosts[i].id;
          // Collect post
          const post = await getPostByID(postID);
          // Push post to newPosts
          if (post != null) {
            ownedMedia.push(post);
          }
        })
      );

      if (completeFetch) {
        const postsToSet = [...ownedMedia.reverse()];
        return {
          props: {
            linkUsername: user.username,
            user: JSON.parse(JSON.stringify(user)),
            profileDetails: JSON.parse(JSON.stringify(profileDetails)),
            profileFollowStats: JSON.parse(JSON.stringify(profileFollowStats)),
            followersLength,
            followingLength,
            postsToSet: postsToSet || null,
          },
          revalidate: 5,
        };
      }
    } catch (error) {
      return { notFound: true };
    }
  }
};

export default ProfilePage;
