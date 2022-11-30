import type { NextApiRequest, NextApiResponse } from 'next'

import { getMediaFromZoraAPI } from '@/lib/api'
import { HttpMethod } from '@/types'

// ourz.network/api/media/[chainId]/[contractAddress]/[tokenId]/[type]/[quality]
export default async function getGalleryOwnerAddress(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log('hi')
  switch (req.method) {
    case HttpMethod.HEAD:
    // fallthrough
    case HttpMethod.GET:
      return getMediaFromZoraAPI(req, res)

    default:
      res.setHeader('Allow', [
        HttpMethod.GET,
        HttpMethod.HEAD,
        // HttpMethod.POST,
        // HttpMethod.DELETE,
        // HttpMethod.PUT,
      ])
      return res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
