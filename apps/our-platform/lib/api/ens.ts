import type { NextApiRequest, NextApiResponse } from 'next'

import { getAddressFromENS } from '../ens'

// ourz.xyz/api/gallery/subdomain/address
export async function getGalleryOwnerAddress(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { subdomain } = req.query

  if (!subdomain) {
    res.status(403).json({ failed: true })
  }
  if (Array.isArray(subdomain))
    return res
      .status(400)
      .end('Bad request. subdomain parameter cannot be an array.')

  try {
    const ensAddress = await getAddressFromENS(subdomain)
    res.status(200).json(ensAddress)
  } catch (error) {
    console.log(error)
    return res.status(500).end(error)
  }
  return res.status(500).json({ failed: true })
}
