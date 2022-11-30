import type { NextApiRequest, NextApiResponse } from 'next'

// ourz.network/api/media/[chainId]/[contractAddress]/[tokenId]/image/[quality]
export async function getMediaFromZoraAPI(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { chainId, contractAddress, tokenId, type, quality } = req.query

  if (!chainId || !contractAddress || !tokenId || !type || !quality) {
    res.status(403).json({ failed: true })
  }
  if (
    Array.isArray(chainId) ||
    Array.isArray(contractAddress) ||
    Array.isArray(tokenId) ||
    Array.isArray(type) ||
    Array.isArray(quality)
  ) {
    return res
      .status(400)
      .end('Bad request. subdomain parameter cannot be an array.')
  }

  const chainString = Number(chainId) === 1 ? 'ETHEREUM-MAINNET' : chainId

  try {
    const zoraRes = await fetch(
      `https://api.zora.co/media/${chainString}/${contractAddress}/${tokenId}/${type}/${quality}`,
      { method: 'GET' }
    )
    console.log({ zoraRes })
    // res = zoraRes as unknown as NextApiResponse
    if (
      zoraRes.headers.get('content-type')?.startsWith('video') ||
      zoraRes.headers.get('content-type')?.startsWith('audio')
    ) {
      console.log('media api returning buffer')
      const media = await zoraRes.arrayBuffer()
      res.setHeader('keep-alive', zoraRes.headers.get('keep-alive') ?? 10000)
      res.setHeader(
        'content-type',
        zoraRes.headers.get('content-type') ?? 'video/*'
      )
      return res.status(200).send(media)
    }
    if (zoraRes.headers.get('content-type')?.startsWith('image')) {
      console.log('media api returning blob')
      const media = await zoraRes.blob()
      res.setHeader('keep-alive', zoraRes.headers.get('keep-alive') ?? 10000)
      res.setHeader(
        'content-type',
        zoraRes.headers.get('content-type') ?? 'image/*'
      )
      return res.status(200).send(media)
    }
    console.log('didnt return media')
    return res.status(500).json({ failed: true })
  } catch (error) {
    console.log(error)
    return res.status(500).end(error)
  }
  // return res.status(500).json({ failed: true })
}
