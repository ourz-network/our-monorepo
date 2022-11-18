import { getGalleryConfig } from '@/lib/api'
// import { unstable_getServerSession } from "next-auth/next";

// import { authOptions } from "./auth/[...nextauth]";
import { HttpMethod } from '@/types'

import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // const session = await unstable_getServerSession(req, res, authOptions);
  // if (!session) return res.status(401).end();
  console.log({ req })
  switch (req.method) {
    case HttpMethod.GET:
      return getGalleryConfig(req, res /*session*/)
    // case HttpMethod.POST:
    //   return updateSite(req, res);
    // case HttpMethod.DELETE:
    //   return updateSite(req, res);
    // case HttpMethod.PUT:
    //   return updateSite(req, res);
    default:
      res.setHeader('Allow', [
        HttpMethod.GET,
        HttpMethod.POST,
        HttpMethod.DELETE,
        HttpMethod.PUT,
      ])
      return res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
