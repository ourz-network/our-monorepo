import axios from "axios";
import baseUrl from "./baseUrl";
import catchErrors from "./catchErrors";

const Axios = axios.create({
  baseURL: `${baseUrl}/api/profile`,
});

export const followUser = async (userToFollowId, setUserFollowStats) => {
  try {
    await Axios.post(`/follow/${userToFollowId}`);

    setUserFollowStats((prev) => ({
      ...prev,
      following: [...prev.following, { user: userToFollowId }],
    }));
  } catch (error) {
    alert(catchErrors(error));
  }
};

export const unfollowUser = async (userToUnfollowId, setUserFollowStats) => {
  try {
    await Axios.put(`/unfollow/${userToUnfollowId}`);

    setUserFollowStats((prev) => ({
      ...prev,
      following: prev.following.filter((following) => following.user !== userToUnfollowId),
    }));
  } catch (error) {
    alert(catchErrors(error));
  }
};

export const userUpdate = async (formData, setLoading, setError) => {
  try {
    console.log("formData", formData);
    const {
      address,
      username,
      name,
      bio,
      discord,
      galleryso,
      github,
      instagram,
      lazy,
      linktree,
      showtime,
      tiktok,
      twitch,
      twitter,
      website,
      yat,
      youtube,
    } = formData;

    await Axios.post(`/update`, {
      address,
      username,
      name,
      bio,
      discord,
      galleryso,
      github,
      instagram,
      lazy,
      linktree,
      showtime,
      tiktok,
      twitch,
      twitter,
      website,
      yat,
      youtube,
    });

    setLoading(false);
    // Router.reload();
  } catch (error) {
    setError(catchErrors(error));
    setLoading(false);
  }
};

export const toggleMessagePopup = async (popupSetting, setPopupSetting, setSuccess) => {
  try {
    await Axios.post(`/settings/messagePopup`);

    setPopupSetting(!popupSetting);
    setSuccess(true);
  } catch (error) {
    alert(catchErrors(error));
  }
};
