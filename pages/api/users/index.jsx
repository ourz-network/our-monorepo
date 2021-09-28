/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
import connectDB from "@/modules/mongodb/utils/connectDB";
import UserModel from "@/modules/mongodb/models/UserModel";
import FollowModel from "@/modules/mongodb/models/FollowModel";
import ProfileModel from "@/modules/mongodb/models/ProfileModel";

// const regexUserName = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;

export default async function handler(req, res) {
  const { method } = req;

  await connectDB();

  switch (method) {
    // GET ALL USERS. FOR GETSTATICPATHS SSG. https://masteringjs.io/tutorials/mongoose/find-all
    case "GET":
      try {
        // console.log(`api/users/index.js - Method: GET\nReturning allUsers...`);
        const allUsers = await UserModel.find().populate("user"); // Finds all Users in DB
        if (!allUsers) {
          return res.status(404).json({ success: false, data: "No Users" });
        }
        // console.log(`api/users/index.js - Method: GET\nallUsers: ${allUsers}`);

        res.status(200).json({ success: true, data: allUsers });
      } catch (error) {
        // console.log(`Profile.js - get/allUsers \nError: ${error}`);
        res.status(500).send("Server Error");
      }
      break;
    case "POST":
      // console.log("signupApi req", req.body);
      // eslint-disable-next-line no-case-declarations
      const { ethAddress, username } = req.body;

      try {
        let user;
        user = await UserModel.findOne({ ethAddress });
        user = await UserModel.findOne({ username });
        user = await UserModel.findOne({
          username_lower: username?.toLowerCase(),
        });

        if (user) {
          return res.status(401).send("User already registered.");
        }
        console.log("Username Available!");

        user = new UserModel({
          ethAddress,
          username,
          username_lower: username?.toLowerCase(),
        });

        console.log("Attempting to create new user...");
        await user.save((err) => {
          if (err) {
            console.log(err);
            return res.status(401).send(err);
          }
          console.log("New User Created:", user);
          console.log("Creating new 'Followers' linked database pair for this user...");
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
          console.log("Success");
        });
        res.status(201).json({ success: true, data: user });
      } catch (error) {
        console.error(error);
        return res.status(500).send(`Server error`);
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
