import { GalleryConfig } from '@/types'
// import cuid from 'cuid'
// import { WithId } from 'mongodb'
// import prisma from "@/lib/prisma";

import type { NextApiRequest, NextApiResponse } from 'next'
// import type { Site } from ".prisma/client";
// import type { Session } from "next-auth";
import clientPromise from '../mongodb'
// import { placeholderBlurhash } from '../util'

// import { NextApiRequest, NextApiResponse } from "next/types";
// import { ethers } from "ethers";
// import { getAddressFromENS } from "../../../utils/ethers";

// ourz.xyz/api/user/ens
const getCollection = async () => {
  const client = await clientPromise
  return client.db('ourGallery').collection('ourGallery')
}

/**
 * Get Gallery Config
 *
 * Fetches & returns either a single or all sites available depending on
 * whether a `siteId` query parameter is provided. If not all sites are
 * returned
 *
 * @param req - Next.js API Request
 * @param res - Next.js API Response
 */
export async function getGalleryConfig(
  req: NextApiRequest,
  res: NextApiResponse
  // session: Session
) /*: Promise<void | NextApiResponse<Array<Site> | (Site | null)>>*/ {
  const { subdomain } = req.query
  console.log('lib/api', { subdomain })
  if (!subdomain) {
    res.status(403).json({ failed: true })
  }

  const collection = await getCollection()

  if (Array.isArray(subdomain))
    return res
      .status(400)
      .end('Bad request. subdomain parameter cannot be an array.')

  try {
    if (subdomain) {
      const galleryConfig = await collection.findOne({ _id: `${subdomain}` })
      res.status(200).json(galleryConfig)
    }

    const cursor = collection.find()
    const allGalleries: GalleryConfig[] = []
    cursor.forEach((galleryConfig) => {
      console.log(galleryConfig)
      allGalleries.push(galleryConfig as GalleryConfig)
    })
    res.status(200).json(allGalleries)
  } catch (error) {
    console.log(error)
    return res.status(500).end(error)
  }
}

/**
 * Create Site
 *
 * Creates a new site from a set of provided query parameters.
 * These include:
 *  - name
 *  - description
 *  - subdomain
 *  - userId
 *
 * Once created, the sites new `siteId` will be returned.
 *
 * @param req - Next.js API Request
 * @param res - Next.js API Response
 */
// export async function createSite(
//   req: NextApiRequest,
//   res: NextApiResponse
// ): Promise<void | NextApiResponse<{
//   siteId: string;
// }>> {
//   const { name, subdomain, description, userId } = req.body;

//   const sub = subdomain.replace(/[^a-zA-Z0-9/-]+/g, "");

//       const { userConfig, signedMessage } = JSON.parse(req.body);

//       const signerAddress = ethers.utils.verifyMessage(
//         JSON.stringify(userConfig),
//         signedMessage
//       );
//       const subdomainAddress = await getAddressFromENS(subdomain);

//       if (signerAddress === subdomainAddress) {
//         const userExists = await collection.find({ _id: `${subdomain}` });

//         if (userExists) {
//           const updateDocument = await collection.replaceOne(
//             { _id: `${subdomain}` },
//             { _id: `${subdomain}`, ...userConfig }
//           );

//           res.status(200).json("Update Successful");
//         } else {
//           const newDocument = await collection.insertOne({
//             _id: `${subdomain}`,
//             ...userConfig,
//           });

//           res.status(201).json("Creation Successful");
//         }
//       } else {
//         res.status(403).json(`Failed. Signer does not own ${subdomain}.eth`);
//       }

// try {
//   const response = await prisma.site.create({
//     data: {
//       name: name,
//       description: description,
//       subdomain: sub.length > 0 ? sub : cuid(),
//       logo: "/logo.png",
//       image: `/placeholder.png`,
//       imageBlurhash: placeholderBlurhash,
//       user: {
//         connect: {
//           id: userId,
//         },
//       },
//     },
//   });

//   return res.status(201).json({
//     siteId: response.id,
//   });
// } catch (error) {
//   console.error(error);
// return res.status(500).end(/*error*/);
// }
// }

/**
 * Delete Site
 *
 * Deletes a site from the database using a provided `siteId` query
 * parameter.
 *
 * @param req - Next.js API Request
 * @param res - Next.js API Response
 */
// export async function deleteSite(
//   req: NextApiRequest,
//   res: NextApiResponse
// ): Promise<void | NextApiResponse> {
//   const { siteId } = req.query;

//   if (Array.isArray(siteId))
//     return res
//       .status(400)
//       .end("Bad request. siteId parameter cannot be an array.");

// try {
//   await prisma.$transaction([
//     prisma.post.deleteMany({
//       where: {
//         site: {
//           id: siteId,
//         },
//       },
//     }),
//     prisma.site.delete({
//       where: {
//         id: siteId,
//       },
//     }),
//   ]);

//   return res.status(200).end();
// } catch (error) {
//   console.error(error);
// return res.status(500).end(/*error*/);
// }
// }

/**
 * Update site
 *
 * Updates a site & all of its data using a collection of provided
 * query parameters. These include the following:
 *  - id
 *  - currentSubdomain
 *  - name
 *  - description
 *  - image
 *  - imageBlurhash
 *
 * @param req - Next.js API Request
 * @param res - Next.js API Response
 */
export async function updateGalleryConfig(
  req: NextApiRequest,
  res: NextApiResponse
) /*: Promise<void | NextApiResponse<Site>>*/ {
  const { id, currentSubdomain, name, description, image, imageBlurhash } =
    req.body

  const sub = req.body.subdomain.replace(/[^a-zA-Z0-9/-]+/g, '')
  const subdomain = sub.length > 0 ? sub : currentSubdomain

  //       const { userConfig, signedMessage } = JSON.parse(req.body);

  //       const signerAddress = ethers.utils.verifyMessage(
  //         JSON.stringify(userConfig),
  //         signedMessage
  //       );
  //       const subdomainAddress = await getAddressFromENS(subdomain);

  //       if (signerAddress === subdomainAddress) {
  //         const userExists = await collection.find({ _id: `${subdomain}` });

  //         if (userExists) {
  //           const updateDocument = await collection.replaceOne(
  //             { _id: `${subdomain}` },
  //             { _id: `${subdomain}`, ...userConfig }
  //           );

  //           res.status(200).json("Update Successful");
  //         } else {
  //           const newDocument = await collection.insertOne({
  //             _id: `${subdomain}`,
  //             ...userConfig,
  //           });

  //           res.status(201).json("Creation Successful");
  //         }
  //       } else {
  //         res.status(403).json(`Failed. Signer does not own ${subdomain}.eth`);
  //       }

  // try {
  //   const response = await prisma.site.update({
  //     where: {
  //       id: id,
  //     },
  //     data: {
  //       name,
  //       description,
  //       subdomain,
  //       image,
  //       imageBlurhash,
  //     },
  //   });

  //   return res.status(200).json(response);
  // } catch (error) {
  //   console.error(error);
  return res.status(500).end(/*error*/)
  // }
}
