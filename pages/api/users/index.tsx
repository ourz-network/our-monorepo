/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
import connectDB from "@/modules/mongodb/utils/connectDB";
import UserModel from "@/modules/mongodb/models/UserModel";
import FollowModel from "@/modules/mongodb/models/FollowModel";
import ProfileModel from "@/modules/mongodb/models/ProfileModel";

// const regexUserName = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;

export default async function handler(req: Request, res: Response): Promise<any> {
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
      const { ethAddress, desiredUsername } = req.body;

      try {
        let user;
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

        await user.save((err) => {
          if (err) {
            // eslint-disable-next-line no-console
            console.log(err);
            return res.status(401).send(err);
          }
          // new UserModel({ user: user._id, social: {} }).save();
          new ProfileModel({
            user: user._id,
            followers: [],
            following: [],
          }).save();
          new FollowModel({
            user: user._id,
            followers: [],
            following: [],
          }).save();
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
}
