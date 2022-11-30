import request, { gql } from 'graphql-request'

const SPLITS_SUBGRAPH =
  'https://api.thegraph.com/subgraphs/name/0xsplits/splits-subgraph-ethereum'

const GET_1000_SPLIT_IDS_QUERY = gql`
  query GetAllSplits($skipNum: Int!) {
    splits(first: 1000, skip: $skipNum) {
      id
    }
  }
`
const GET_1000_WATERFALL_IDS_QUERY = gql`
  query GetAllWaterfalls($skipNum: Int!) {
    waterfallModules(first: 1000, skip: $skipNum) {
      id
    }
  }
`
const GET_1000_LIQUID_SPLIT_IDS_QUERY = gql`
  query GetAllLiquidSplits($skipNum: Int!) {
    waterfallModules(first: 1000, skip: $skipNum) {
      id
    }
  }
`

export const getAllSplits = async () => {
  const allSplits = []

  let moreRemaining = true
  let i = 0

  while (moreRemaining) {
    // console.log(`fetching splits from #${i * 1000}-#${i * 1000 + 1000}`)
    // eslint-disable-next-line no-await-in-loop
    const { splits } = await request(
      SPLITS_SUBGRAPH,
      GET_1000_SPLIT_IDS_QUERY,
      {
        skipNum: i * 1000,
      }
    )

    allSplits.push(...splits)

    if (splits.length < 1000) {
      moreRemaining = false
    }
    // console.log(`received ${splits.length} splits`)

    // eslint-disable-next-line no-plusplus
    i++
  }
  // console.log(`no more splits`)
  return allSplits
}

export const getAllWaterfalls = async () => {
  const allWaterfalls = []

  let moreRemaining = true
  let i = 1

  while (moreRemaining) {
    // console.log(`fetching waterfalls up to #${i * 1000}`)
    // eslint-disable-next-line no-await-in-loop
    const { waterfallModules } = await request(
      SPLITS_SUBGRAPH,
      GET_1000_WATERFALL_IDS_QUERY,
      {
        skipNum: i * 1000,
      }
    )

    allWaterfalls.push(...waterfallModules)

    if (waterfallModules.length < 1000) {
      moreRemaining = false
    }
    // console.log(`received ${waterfallModules.length} waterfalls`)

    // eslint-disable-next-line no-plusplus
    i++
  }
  // console.log(`no more waterfalls`)
  return allWaterfalls
}

export const getAllLiquidSplits = async () => {
  const allLiquidSplits = []

  let moreRemaining = true
  let i = 1

  while (moreRemaining) {
    // console.log(`fetching liquidSplits up to #${i * 1000}`)
    // eslint-disable-next-line no-await-in-loop
    const { liquidSplits } = await request(
      SPLITS_SUBGRAPH,
      GET_1000_LIQUID_SPLIT_IDS_QUERY,
      {
        skipNum: i * 1000,
      }
    )

    allLiquidSplits.push(...liquidSplits)

    if (liquidSplits.length < 1000) {
      moreRemaining = false
    }
    // console.log(`received ${liquidSplits.length} liquidSplits`)

    // eslint-disable-next-line no-plusplus
    i++
  }
  // console.log(`no more liquidSplits`)
  return allLiquidSplits
}
