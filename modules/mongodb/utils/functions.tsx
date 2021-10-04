/* eslint-disable no-underscore-dangle */
import axios from "axios"; // Requests
import { IUser } from "@/modules/mongodb/models/UserModel";

interface Response {
  data: Data;
}

interface Data {
  data: IUser;
}

export default async function checkForProfile({
  web3Address,
}: {
  web3Address: string;
}): Promise<IUser> {
  try {
    const res = await axios.get<Response["data"]>(`/api/users/${web3Address}`);
    const userProfile = res.data.data;
    if (userProfile) {
      return userProfile;
    }
    return null;
  } catch (error) {
    return null;
  }
}
