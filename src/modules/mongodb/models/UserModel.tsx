import mongoose from "mongoose";

const { Schema } = mongoose;

// User + Profile API Models are purely for aesthetic and branding purposes for the artists.
// It allows them to display typical social media details (name, bio, links) on their page.
// It is not required to use Ourz, and as soon as there is a worthy decentralized database,
// I'd like to migrate any info off MongoDB and onto the decentralized option.
const UserSchema = new Schema(
  {
    // Minimum Requirements
    ethAddress: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true, trim: true },
    username_lower: { type: String, required: true, unique: true, trim: true },

    // Not in use. No plans for use. But just in case.
    email: { type: String },
    profilePic: { type: String },
  },
  { timestamps: true }
);

export interface IUser {
  _id: string;
  // Minimum Requirements
  ethAddress: string;
  username: string;
  username_lower: string;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type UserType = IUser & mongoose.Document<any, any, IUser>;

export const UserModel = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

// module.exports = mongoose.models.User || mongoose.model < IUser >("User", UserSchema);
