import connectDB from "@/modules/mongodb/utils/connectDB";
import UserModel from "@/modules/mongodb/models/UserModel";
// import FollowModel from "@/modules/mongodb/models/FollowModel";
import ProfileModel from "@/modules/mongodb/models/ProfileModel";
import { ethers } from "ethers";

const regexUserName = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;

export default async function handler(req, res) {
  const {
    query: { username },
    method,
  } = req;
  const loadedUsername = username; // else you get 'ReferenceError: Cannot access 'username' before initialization'
  // console.log(`loadedUsername: `, loadedUsername);
  await connectDB();

  switch (method) {
    case "GET":
      // console.log("signupApi check username req.body", username)
      try {
        if (ethers.utils.isAddress(loadedUsername)) {
          const user = await UserModel.findOne({ ethAddress: loadedUsername });

          if (user) {
            console.log(`User Found For Address`, user);
            res.status(200).json({ success: true, data: user });
          } else {
            console.log(`No User Found For Address`, user);
            res.status(404).json({ success: false, error: "No User Found" });
          }
        } else {
          if (loadedUsername.length <= 3)
            return res
              .status(412)
              .send("Username must be at least 4 characters long.");

          if (!regexUserName.test(loadedUsername))
            return res.status(412).send("Invalid Characters");

          const user = await UserModel.findOne({
            username_lower: loadedUsername.toLowerCase(),
          });

          if (user) {
            return res.status(200).json({ success: true, data: user });
          } else {
            return res
              .status(404)
              .json({ success: false, message: "Username Available" });
          }
        }
      } catch (error) {
        console.error(error);
        return res.status(500).send(`Server error`);
      }
      break;
    case "PUT":
      // console.log("req.body:", req.body);
      try {
        const {
          userId,
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
        } = req.body;
        console.log(
          `User Attempting Update: ${userId} name: ${name} bio: ${bio}`
        );

        let profileFields = {};
        // user.username = username;
        if (name) profileFields.name = name;
        if (bio) profileFields.bio = bio;
        profileFields.social = {};
        if (discord) profileFields.social.discord = discord;
        if (galleryso) profileFields.social.galleryso = galleryso;
        if (github) profileFields.social.github = github;
        if (instagram) profileFields.social.instagram = instagram;
        if (lazy) profileFields.social.lazy = lazy;
        if (linktree) profileFields.social.linktree = linktree;
        if (showtime) profileFields.social.showtime = showtime;
        if (tiktok) profileFields.social.tiktok = tiktok;
        if (twitch) profileFields.social.twitch = twitch;
        if (twitter) profileFields.social.twitter = twitter;
        if (website) profileFields.social.website = website;
        if (yat) profileFields.social.yat = yat;
        if (youtube) profileFields.social.youtube = youtube;
        // console.log(`profileFields: `, profileFields);
        const result = await ProfileModel.findOneAndUpdate(
          { user: userId },
          { $set: profileFields },
          { new: true }
        );
        if (result) {
          // console.log(`updatedProfile. res: `, result);
          return res.status(200).send("Success");
        }
        // console.groupEnd();
      } catch (error) {
        console.error(error);
        return res.status(500).send("Server Error");
      }
  }
}
