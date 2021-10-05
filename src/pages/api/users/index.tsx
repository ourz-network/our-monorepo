/* eslint-disable */
import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "@/mongodb/utils/connectDB";
import { IProfile, ProfileModel } from "@/mongodb/models/ProfileModel";
import { IUser, UserModel } from "@/mongodb/models/UserModel";

// const regexUserName = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;
/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default async (req: NextApiRequest, res: NextApiResponse): Promise<NextApiResponse> => {
  const { method } = req;

  await connectDB();

  switch (method) {
    // GET ALL USERS. FOR GETSTATICPATHS SSG. https://masteringjs.io/tutorials/mongoose/find-all
    case "GET":
      try {
        const allUsers = await UserModel.find().populate("user"); // Finds all Users in DB
        if (!allUsers) {
          return res.status(404).json({ success: false, data: "No Users" });
        }

        res.status(200).json({ success: true, data: allUsers });
      } catch (error) {
        res.status(500).send("Server Error");
      }
      break;
    case "POST":
      // eslint-disable-next-line no-case-declarations
      const { ethAddress, desiredUsername }: { ethAddress: string; desiredUsername: string } =
        req.body;

      try {
        let user: UserType;
        user = await UserModel.findOne({ ethAddress });
        user = await UserModel.findOne({ desiredUsername });
        user = await UserModel.findOne({
          username_lower: desiredUsername?.toLowerCase(),
        });

        if (user) {
          return res.status(401).send("User already registered.");
        }

        user = new UserModel({
          ethAddress,
          username: desiredUsername,
          username_lower: desiredUsername?.toLowerCase(),
        });

        user.save((err) => {
          if (err) {
            // eslint-disable-next-line no-console
            console.log(err);
            return res.status(401).send(err);
          }
          // new UserModel({ user: user._id, social: {} }).save();
          const usersProfile = new ProfileModel({
            user: user._id,
            followers: [],
            following: [],
          });
          usersProfile.save().then(
            () => {},
            () => {}
          );
          // await new FollowModel({
          //   user: user._id,
          //   followers: [],
          //   following: [],
          // }).save();
        });
        res.status(201).json({ success: true, data: user });
      } catch (error) {
        return res.status(500).send(`Server error`);
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};
