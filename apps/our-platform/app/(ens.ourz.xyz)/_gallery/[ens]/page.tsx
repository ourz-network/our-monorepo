import Link from 'next/link'
// import BlurImage from '@/components/BlurImage'
// import BlogCard from '@/components/BlogCard'
// import prisma from "@/lib/prisma";
import { ZDK } from '@zoralabs/zdk'
// import type { _SiteData } from "@/types";
// import { placeholderBlurhash } from '@/lib/util'
import { Strategies, Networks, MediaFetchAgent } from '@zoralabs/nft-hooks'
import { getAllGalleryConfigs, getGalleryConfig } from '@/lib/fetchers'

export async function generateStaticParams() {
  // const configs = await getAllGalleryConfigs()
  // console.log(configs)

  // const allPaths = configs.map((config) => {
  //   return { ens: config.subdomain }
  // })
  // console.log({ allPaths })
  // return allPaths
  return [{ ens: 'ourz' }]
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
const get = async () => {
  await delay(2000)
  return { string: 'hi' }
}

export default async function Page({ params }: { params: { ens: string } }) {
  console.log('hi')
  const { ens } = params
  // const data = await get();
  const data = await getGalleryConfig(ens)

  const API_ENDPOINT = 'https://api.zora.co/graphql'
  const zdk = new ZDK({ endpoint: API_ENDPOINT }) // Defaults to Ethereum Mainnet
  // const tokens = await zdk.tokens({
  //   where: {
  //     collectionAddresses: [
  //       ...(data?.contracts?.split(',') as string[]),

  //       '0xabEFBc9fD2F806065b4f3C237d4b59D9A97Bcac7',
  //       '0xCa21d4228cDCc68D4e23807E5e370C07577Dd152',
  //       '0x12C8630369977eE708C8E727d8e838f74D9420C5',
  //       '0xb80fBF6cdb49c33dC6aE4cA11aF8Ac47b0b4C0f3',
  //       // ...(process.env.NEXT_PUBLIC_MAINNET_CONTRACTS as string[]),
  //     ] as string[],
  //     ownerAddresses: [data.curator as string, `${data?.subdomain}.eth`],
  //   },
  //   // sort: {
  //   // Optional, sorts the response by ascending tokenIds
  //   // direct: 'ASC',
  //   // sortKey: 'TokenId',
  //   // },
  //   pagination: { limit: 25 }, // Optional, limits the response size to 3 NFTs
  //   includeFullDetails: false, // Optional, provides more data on the NFTs such as events
  //   includeSalesHistory: false, // Optional, provides sales data on the NFTs
  // })

  const mints = await zdk.mints({
    where: {
      collectionAddresses: [
        ...(data?.contracts?.split(',') as string[]),
        '0xabEFBc9fD2F806065b4f3C237d4b59D9A97Bcac7',
        '0xCa21d4228cDCc68D4e23807E5e370C07577Dd152',
        '0x12C8630369977eE708C8E727d8e838f74D9420C5',
        '0xb80fBF6cdb49c33dC6aE4cA11aF8Ac47b0b4C0f3',
      ],
      minterAddresses: [data?.curator as string, `${data?.subdomain}.eth`],
    },
  })
  // console.log({ mints })
  // const fetchAgent = new MediaFetchAgent(Networks.MAINNET)
  // const tokens = await fetchAgent.genericMediaFetcher()
  // const fetchAgent = new Strategies.ZDKFetchStrategy(Networks.MAINNET)
  // const tokens = await fetchAgent.queryNFTs({
  //   curatorAddress: data?.curator ?? (await getAddressFromENS(subdomain)),
  //   collectionAddresses: [...data.contractAddresses],
  //   limit: 25,
  //   offset: 0,
  // })
  console.log(
    { data: JSON.stringify(data) },
    {
      tokens: JSON.stringify(mints),
    }
  )
  // console.log("pagetsx", data);

  return (
    <div className='md:mb-28'>
      data: {JSON.stringify(data)}
      <br />
      {/* tokens: {JSON.stringify(tokens)} */}
      <br />
      mints: {JSON.stringify(mints)}
      {/* {data.posts.length > 0 ? (
        <div>
          <Link href={`/${data.posts[0].slug}`}>
            <div className="overflow-hidden relative mx-auto w-full max-w-screen-xl h-80 group sm:h-150 lg:rounded-xl">
              {data.posts[0].image ? (
                <BlurImage
                  alt={data.posts[0].title ?? ""}
                  blurDataURL={
                    data.posts[0].imageBlurhash ?? placeholderBlurhash
                  }
                  className="object-cover w-full h-full group-hover:scale-105 group-hover:duration-300"
                  width={1300}
                  height={630}
                  placeholder="blur"
                  src={data.posts[0].image}
                />
              ) : (
                <div className="flex absolute justify-center items-center w-full h-full text-4xl text-gray-500 bg-gray-100 select-none">
                  ?
                </div>
              )}
            </div>
            <div className="mx-5 mt-10 max-w-screen-xl xl:mx-auto">
              <h2 className="my-10 text-4xl font-title md:text-6xl">
                {data.posts[0].title}
              </h2>
              <p className="w-full text-base md:text-lg lg:w-2/3">
                {data.posts[0].description}
              </p>
              <div className="flex justify-start items-center space-x-4 w-full">
                <div className="overflow-hidden relative flex-none w-8 h-8 rounded-full">
                  {data.user?.image ? (
                    <BlurImage
                      alt={data.user?.name ?? "User Avatar"}
                      width={100}
                      height={100}
                      className="object-cover w-full h-full"
                      src={data.user?.image}
                    />
                  ) : (
                    <div className="flex absolute justify-center items-center w-full h-full text-4xl text-gray-500 bg-gray-100 select-none">
                      ?
                    </div>
                  )}
                </div>
                <p className="inline-block ml-3 text-sm font-semibold align-middle whitespace-nowrap font-title md:text-base">
                  {data.user?.name}
                </p>
                <div className="h-6 border-l border-gray-600" />
                <p className="m-auto my-5 w-10/12 text-sm font-light text-gray-500 md:text-base">
                  {data.createdAt.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center py-20">
          <BlurImage
            src="/empty-state.png"
            alt="No Posts"
            width={613}
            height={420}
            placeholder="blur"
            blurDataURL={placeholderBlurhash}
          />
          <p className="text-2xl text-gray-600 font-cal">No posts yet.</p>
        </div>
      )}

      {data.posts.length > 1 && (
        <div className="mx-5 my-20 max-w-screen-xl xl:mx-auto">
          <h2 className="mb-10 text-4xl font-title md:text-5xl">
            More stories
          </h2>
          <div className="grid grid-cols-1 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 sm:gap-x-4">
            {data.posts.slice(1).map((metadata, index) => (
              <BlogCard key={index} data={metadata} />
            ))}
          </div>
        </div>
      )} */}
    </div>
  )
}
