import { cache } from 'react'

import clientPromise from './mongodb'

import type { GalleryConfig } from '@/types'

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
      allGalleries.push({ ...(galleryConfig as unknown as GalleryConfig) })
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

    if (galleryConfig) return galleryConfig as unknown as GalleryConfig
    return undefined
  }
)
