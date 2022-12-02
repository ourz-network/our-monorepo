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
    liquidSplits(first: 1000, skip: $skipNum) {
      id
    }
  }
`

export const getAllSplits = async (): Promise<string[]> => {
  const allSplits = []

  let moreRemaining = true
  let i = 0

  while (moreRemaining) {
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

    // eslint-disable-next-line no-plusplus
    i++
  }

  return allSplits.map((split: { id: string }) => split.id)
}

export const getAllWaterfalls = async () => {
  const allWaterfalls = []

  let moreRemaining = true
  let i = 0

  while (moreRemaining) {
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

    // eslint-disable-next-line no-plusplus
    i++
  }
  return allWaterfalls.map((waterfall: { id: string }) => waterfall.id)
}

export const getAllLiquidSplits = async () => {
  const allLiquidSplits = []

  let moreRemaining = true
  let i = 0

  while (moreRemaining) {
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

    // eslint-disable-next-line no-plusplus
    i++
  }

  return allLiquidSplits.map((liquidSplit: { id: string }) => liquidSplit.id)
}

export const getEverySplit = async () => {
  const allSplits = await getAllSplits()
  const allWaterfalls = await getAllWaterfalls()
  const allLiquidSplits = await getAllLiquidSplits()

  return [
    //
    ...allSplits,
    ...allWaterfalls,
    ...allLiquidSplits,
  ]
}
