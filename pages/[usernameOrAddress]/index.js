import { useState, useEffect } from "react"; // State management
import web3 from "@/app/web3";
import zoraSubgraph from "@/modules/graphProtocol/zora/index"; // GraphQL client
import { getPostByID } from "@/modules/graphProtocol/zora/functions"; // Post retrieval function
import { ZORA_MEDIA_BY_OWNER } from "@/modules/graphProtocol/zora/queries"; // Retrieval query
import Profile from "@/components/Profile/Profile";
import connectDB from "@/modules/mongodb/utils/connectDB";
import UserModel from "@/modules/mongodb/models/UserModel";
import ProfileModel from "@/modules/mongodb/models/ProfileModel";
import FollowModel from "@/modules/mongodb/models/FollowModel";
import { useRouter } from "next/router"; // Page redirects (static routing)

const ProfilePage = ({
  linkUsername,
  linkAddress,
  user,
  profileDetails,
  followersLength,
  followingLength,
  userFollowStats,
  postsToSet,
  redirectUsername,
}) => {
  const [loading, setLoading] = useState(postsToSet?.length > 1 ? false : true); // Global loading state

  const router = useRouter();
  // console.log(linkAddress);
  useEffect(() => {
    // Static Redirect
    if (redirectUsername) {
      router.push(`/${redirectUsername}`);
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
      setOwnAccount(address == (linkAddress || user?.ethAddress));
    } else {
      setOwnAccount(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  useEffect(() => {
    async function collectOwnedMedia() {
      // Collect all postIDs by owner
      const res = await zoraSubgraph.query({
        query: ZORA_MEDIA_BY_OWNER(
          user ? user.ethAddress.toLowerCase() : linkAddress
        ),
      });
      const allPosts = res.data.medias;
      let ownedMedia = [];
      // For all owned posts
      for (let i = 0; i < allPosts.length; i++) {
        // Colelct postID
        const postID = allPosts[i].id;

        // Collect post
        const post = await getPostByID(postID);
        // Push post to ownedMedia
        if (post) {
          ownedMedia.push(post);
        }
      }
      setPosts([...ownedMedia.reverse()]); // Update owned posts (reversed for newest first)
      setLoading(false); // Toggle loading
    }
    if (user || linkAddress) {
      collectOwnedMedia();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, linkAddress]); // Collect owned media on load
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  return (
    <Profile
      linkAddress={linkAddress ? linkAddress : undefined}
      linkUsername={linkUsername ? linkUsername : undefined}
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
export async function getStaticPaths() {
  await connectDB();

  try {
    const allUsers = await UserModel.find().populate("user");
    const paths = allUsers.map((user) => ({
      params: { usernameOrAddress: `${user.username}` },
    }));

    // console.log(`[linkUsername]/\n   - getStaticPaths\n   - paths:\n`, paths);

    return { paths, fallback: true };
  } catch (error) {
    // console.log(error);
    return { paths: [], fallback: true };
  }
}

// Run on page load
export async function getStaticProps(context) {
  const { usernameOrAddress } = context.params;
  // console.log(`usernameOrAddress: `, usernameOrAddress);
  await connectDB();
  let linkAddress, linkUsername;
  if (usernameOrAddress.length == 42) {
    linkAddress = usernameOrAddress;
    // console.log(`linkaddress: `, usernameOrAddress);

    try {
      const user = await UserModel.findOne({
        ethAddress: linkAddress,
      }).populate("user");

      return {
        props: {
          redirectUsername: user.username,
          linkAddress: linkAddress,
        },
      };
    } catch (error) {
      // Collect all postIDs by owner
      const allPosts = await zoraSubgraph.query({
        query: ZORA_MEDIA_BY_OWNER(linkAddress),
      });
      let ownedMedia = [];
      // For all owned posts
      for (let i = 0; i < allPosts.length; i++) {
        // Colelct postID
        const postID = allPosts[i].id;
        // FIXME: hardcoded fix for /dev/null lmao
        if (postID !== "2") {
          // Collect post
          const post = await getPostByID(allPosts.medias[i].id);
          // Push post to ownedMedia
          ownedMedia.push(post);
        }
      }
      const postsToSet = ownedMedia.reverse();
      return {
        props: {
          linkAddress: linkAddress,
          postsToSet: postsToSet,
        },
        revalidate: 15,
      };
    }
  } else {
    linkUsername = usernameOrAddress;
    // console.log(`linkusername: `, usernameOrAddress);
    try {
      const user = await UserModel.findOne({
        username_lower: linkUsername.toLowerCase(),
      }).populate("user");

      const profileDetails = await ProfileModel.findOne({ user: user._id });
      const profileFollowStats = await FollowModel.findOne({ user: user._id });
      const followersLength =
        profileFollowStats?.followers?.length > 0
          ? profileFollowStats.followers.length
          : 0;
      const followingLength =
        profileFollowStats?.following?.length > 0
          ? profileFollowStats.following.length
          : 0;

      // console.log(`[linkUsername]/\n   - getStaticProps
      //             \n   - user:\n${JSON.stringify(user)}
      //             \n   - profileDetails\n${JSON.stringify(profileDetails)}
      //             \n   - followers/following\n${followersLength}/${followingLength}`);

      // Collect all postIDs by owner
      const res = await zoraSubgraph.query({
        query: ZORA_MEDIA_BY_OWNER(user.ethAddress.toLowerCase()),
      });
      const allPosts = res.data.medias;
      let ownedMedia = [];
      // For all owned posts
      for (let i = 0; i < allPosts.length; i++) {
        // Colelct postID
        const postID = allPosts[i].id;

        // Collect post
        const post = await getPostByID(postID);

        // Push post to ownedMedia
        if (post) {
          ownedMedia.push(post);
        }
      }
      const postsToSet = [...ownedMedia.reverse()];
      return {
        props: {
          linkUsername: user.username,
          user: JSON.parse(JSON.stringify(user)),
          profileDetails: JSON.parse(JSON.stringify(profileDetails)),
          profileFollowStats: JSON.parse(JSON.stringify(profileFollowStats)),
          followersLength: followersLength,
          followingLength: followingLength,
          postsToSet: postsToSet || null,
        },
        revalidate: 15,
      };
    } catch (error) {
      console.log(error);
      return { notFound: true };
    }
  }
}

export default ProfilePage;
