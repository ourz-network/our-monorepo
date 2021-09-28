/* eslint-disable no-underscore-dangle */
import axios from "axios"; // Requests

export const checkForAccountID = async (web3Address) => {
  try {
    const res = await axios.get(`/api/users/${web3Address}`);
    const userProfile = await res.data.data;
    if (userProfile) {
      return userProfile._id;
    }
    return null;
  } catch (error) {
    return null;
  }
};

export const checkForProfile = async (web3Address) => {
  try {
    const res = await axios.get(`/api/users/${web3Address}`);
    const userProfile = await res.data.data;
    if (userProfile) {
      return userProfile;
    }
    return null;
  } catch (error) {
    return null;
  }
};
