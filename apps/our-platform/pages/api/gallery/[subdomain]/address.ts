import { getGalleryOwnerAddress } from '@/lib/api/ens'
import { HttpMethod } from '@/lib/types'

import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case HttpMethod.GET:
      return getGalleryOwnerAddress(req, res)

    default:
      res.setHeader('Allow', [HttpMethod.GET])
      return res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
