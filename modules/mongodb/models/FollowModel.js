const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FollowSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },

  followers: [
    {
      user: { type: Schema.Types.ObjectId, ref: "User" },
    },
  ],

  following: [
    {
      user: { type: Schema.Types.ObjectId, ref: "User" },
    },
  ],
});

module.exports =
  mongoose.models.Follow || mongoose.model("Follow", FollowSchema);
