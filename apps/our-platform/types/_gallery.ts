// import type { Post, Site, User } from "@prisma/client";

// export interface AdjacentPost
//   extends Pick<
//     Post,
//     "createdAt" | "description" | "image" | "imageBlurhash" | "slug" | "title"
//   > {}

// export interface _SiteData extends Site {
//   user: User | null;
//   font: "font-cal" | "font-lora" | "font-work";
//   posts: Array<Post>;
// }

// export interface _SiteSlugData extends Post {
//   site: _SiteSite | null;
// }

// interface _SiteSite extends Site {
//   user: User | null;
// }

export interface GalleryConfig {
  subdomain?: string
  title?: string
  desc?: string
  networkId?: 1 | 4 | 137
  curator?: string
  contracts?: string
  fontFamily?: 'serif' | 'sans' | 'mono'
  mode?: 'light' | 'dark'
  accent?:
    | 'blue'
    | 'green'
    | 'indigo'
    | 'orange'
    | 'pink'
    | 'purple'
    | 'red'
    | 'teal'
    | 'yellow'
}
