import { getGalleryConfig, updateGalleryConfig } from '@/lib/api'
import { HttpMethod } from '@/types'

import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case HttpMethod.GET:
      return getGalleryConfig(req, res)
    case HttpMethod.POST:
      return updateGalleryConfig(req, res)
    // case HttpMethod.DELETE:
    //   return updateSite(req, res);
    case HttpMethod.PUT:
      return updateGalleryConfig(req, res)
    default:
      res.setHeader('Allow', [
        HttpMethod.GET,
        HttpMethod.POST,
        // HttpMethod.DELETE,
        HttpMethod.PUT,
      ])
      return res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
