export interface IUser {
  _id: string;
  // Minimum Requirements
  ethAddress: string;
  username: string;
  username_lower: string;
}

export interface IProfile {
  _id: string;
  user: string;

  name: string;

  bio: string;

  social: {
    discord: string;
    galleryso: string;
    github: string;
    instagram: string;
    lazy: string;
    linktree: string;
    showtime: string;
    tiktok: string;
    twitch: string;
    twitter: string;
    website: string;
    yat: string;
    youtube: string;
  };
}
