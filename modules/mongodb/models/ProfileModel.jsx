const mongoose = require("mongoose");

const { Schema } = mongoose;

// User + Profile API Models are purely for aesthetic and branding purposes for the artists.
// It allows them to display typical social media details (name, bio, links) on their page.
// It is not required to use Ourz, and as soon as there is a worthy decentralized database,
// I'd like to migrate any info off MongoDB and onto the decentralized option.
const ProfileSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },

    name: { type: String },

    bio: { type: String },

    social: {
      discord: { type: String },
      galleryso: { type: String },
      github: { type: String },
      instagram: { type: String },
      lazy: { type: String },
      linktree: { type: String },
      showtime: { type: String },
      tiktok: { type: String },
      twitch: { type: String },
      twitter: { type: String },
      website: { type: String },
      yat: { type: String },
      youtube: { type: String },
    },

    splits: [
      {
        splitContract: { type: Schema.Types.ObjectId, ref: "SplitV1" },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.models.Profile || mongoose.model("Profile", ProfileSchema);
