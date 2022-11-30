import { ethers } from 'ethers'
import type { NextApiRequest, NextApiResponse } from 'next'

import { getAddressFromENS } from '../ens'
import clientPromise from '../mongodb'

import { GalleryConfig } from '@/types'

const getCollection = async () => {
  const client = await clientPromise
  return client.db('ourGallery').collection('ourGallery')
}

// ourz.xyz/api/gallery/subdomain
export async function getGalleryConfig(
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
    const collection = await getCollection()
    const galleryConfig = await collection.findOne({ _id: `${subdomain}` })
    res.status(200).json(galleryConfig)
  } catch (error) {
    console.log(error)
    return res.status(500).end(error)
  }
  return res.status(500).json({ failed: true })
}

// ourz.xyz/api/gallery/subdomain
export async function updateGalleryConfig(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void | NextApiResponse<GalleryConfig[] | (GalleryConfig | null)>> {
  const { subdomain } = req.query
  const { galleryConfig, signedMessage } = JSON.parse(req.body)
  console.log({ galleryConfig, signedMessage })

  if (!subdomain || !galleryConfig || !signedMessage) {
    res.status(403).json({ failed: true })
  }

  if (Array.isArray(subdomain))
    return res
      .status(400)
      .end('Bad request. subdomain parameter cannot be an array.')

  const signerAddress = ethers.utils.verifyMessage(
    JSON.stringify(galleryConfig),
    signedMessage
  )

  const subdomainAddress = await getAddressFromENS(subdomain)

  console.log({ subdomainAddress, signerAddress })
  if (signerAddress !== subdomainAddress) {
    res.status(403).json(`Failed. Signer does not own ${subdomain}.eth`)
  }
  try {
    const collection = await getCollection()
    const userExists = await collection.find({ _id: `${subdomain}` })

    if (userExists) {
      const updatedConfig = await collection.replaceOne(
        { _id: `${subdomain}` },
        { _id: `${subdomain}`, ...galleryConfig }
      )
      res
        .status(200)
        .json(`Update Successful ${JSON.stringify({ updatedConfig })}`)
    } else {
      const newGalleryConfig = await collection.insertOne({
        _id: `${subdomain}`,
        ...galleryConfig,
      })
      res
        .status(200)
        .json(`Successfully Created ${JSON.stringify({ newGalleryConfig })}`)
    }
  } catch (error) {
    console.log(error)
    return res.status(500).end(error)
  }
  return res.status(500).json({ failed: true })
}
