import { cache } from 'react'

// import prisma from "@/lib/prisma";
// import remarkMdx from "remark-mdx";
// import { remark } from "remark";
// import { serialize } from "next-mdx-remote/serialize";
import clientPromise from './mongodb'

import type { GalleryConfig } from '@/types'
// import { replaceExamples, replaceTweets } from "@/lib/remark-plugins";

const getCollection = async () => {
  const client = await clientPromise
  return client.db('ourGallery').collection('ourGallery')
}

export const getAllGalleryConfigs: () => Promise<GalleryConfig[]> = cache(
  async (): Promise<GalleryConfig[]> => {
    const collection = await getCollection()
    const cursor = collection.find()
    const allGalleries: GalleryConfig[] = []
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    cursor.forEach((galleryConfig) => {
      // console.log(galleryConfig);
      allGalleries.push(galleryConfig as unknown as GalleryConfig)
    })

    return allGalleries
  }
)

export const getGalleryConfig: (
  subdomain: string
) => Promise<GalleryConfig | undefined> = cache(
  async (subdomain: string): Promise<GalleryConfig | undefined> => {
    const collection = await getCollection()
    const galleryConfig = await collection.findOne({ _id: `${subdomain}` })
    // console.log({ galleryConfig })
    // const data = await fetch(`/api/gallery/${subdomain}`);
    // const galleryConfig = await data.json();
    // console.log(galleryConfig);
    if (galleryConfig) return galleryConfig as unknown as GalleryConfig
    // setConfig(config as UserConfig);
    // let filter: {
    //   subdomain?: string;
    //   customDomain?: string;
    // } = {
    //   subdomain: ensOrAddress,
    // };

    // if (ensOrAddress.includes(".")) {
    //   filter = {
    //     customDomain: ensOrAddress,
    //   };
    // }

    // const data = (await prisma.site.findUnique({
    //   where: filter,
    //   include: {
    //     user: true,
    //     posts: {
    //       where: {
    //         published: true,
    //       },
    //       orderBy: [
    //         {
    //           createdAt: "desc",
    //         },
    //       ],
    //     },
    //   },
    // })) as _SiteData;

    // return data;
    // return { user: null, font: "font-work", posts: [] };
  }
)

// export const getPostData = cache(async (site: string, slug: string) => {
//   let filter: {
//     subdomain?: string;
//     customDomain?: string;
//   } = {
//     subdomain: site,
//   };

//   if (site.includes(".")) {
//     filter = {
//       customDomain: site,
//     };
//   }

//   const data = { user: null, font: "font-work", posts: [] };

//   // const data = await prisma.post.findFirst({
//   //   where: {
//   //     site: {
//   //       ...filter,
//   //     },
//   //     slug,
//   //   },
//   //   include: {
//   //     site: {
//   //       include: {
//   //         user: true,
//   //       },
//   //     },
//   //   },
//   // });

//   if (!data) return { notFound: true, revalidate: 10 };

//   // const [mdxSource, adjacentPosts] = await Promise.all([
//   //   getMdxSource(data.content!),
//   //   prisma.post.findMany({
//   //     where: {
//   //       site: {
//   //         ...filter,
//   //       },
//   //       published: true,
//   //       NOT: {
//   //         id: data.id,
//   //       },
//   //     },
//   //     select: {
//   //       slug: true,
//   //       title: true,
//   //       createdAt: true,
//   //       description: true,
//   //       image: true,
//   //       imageBlurhash: true,
//   //     },
//   //   }),
//   // ]);

//   return {
//     data: {
//       ...data,
//       // mdxSource,
//     },
//     // adjacentPosts,
//   };
// });

// async function getMdxSource(postContents: string) {
//   // Use remark plugins to convert markdown into HTML string
//   const processedContent = await remark()
//     // Native remark plugin that parses markdown into MDX
//     .use(remarkMdx)
//     // Replaces tweets with static <Tweet /> component
//     .use(replaceTweets)
//     // Replaces examples with <Example /> component (only for demo.vercel.pub)
//     .use(() => replaceExamples(prisma))
//     .process(postContents);

//   // Convert converted html to string format
//   const contentHtml = String(processedContent);

//   // Serialize the content string into MDX
//   const mdxSource = await serialize(contentHtml);

//   return mdxSource;
// }
