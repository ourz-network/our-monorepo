import { gql } from 'graphql-request';

const ZNFT_PARTIALS = gql`
  fragment ZNFTShort on SplitZNFT {
    id
    creator {
      id
    }
  }

  fragment ZNFTDetails on SplitZNFT {
    id
    creator {
      ...SplitShort
    }
    transactionHash
  }
`;

const ZEDITION_PARTIALS = gql`
  fragment EditionShort on SplitEdition {
    id
    creator {
      id
    }
    name
    symbol
    description
    imageUrl
    animationUrl
    editionSize
  }

  fragment EditionDetails on SplitEdition {
    id
    creator {
      ...SplitShort
    }
    name
    symbol
    description
    imageUrl
    animationUrl
    editionSize
    royaltyBPS
  }
`;

const TRANSFER_PARTIALS = gql`
  fragment TransferShort on ERC20Transfer {
    id
    contract
    amount
  }

  fragment TransferDetails on ERC20Transfer {
    id
    split {
      ...SplitShort
    }
    transactionHash
    contract
    amount
  }
`;

const USER_PARTIALS = gql`
  fragment UserShort on User {
    id
    createdSplits {
      id
    }
    ownedSplits {
      id
    }
    recipientInfo {
      id
    }
    claimedETH
  }

  fragment UserDetails on User {
    id
    createdSplits {
      ...SplitShort
    }
    ownedSplits {
      ...SplitShort
    }
    recipientInfo {
      ...RecipientShort
    }
    claimedETH
  }
`;

const RECIPIENT_PARTIALS = gql`
  fragment RecipientShort on Recipient {
    id
    name
    role
    shares
    allocation
    claimableETH
    claimedETH
  }

  fragment RecipientDetails on Recipient {
    id
    user {
      ...UserShort
    }
    split {
      ...SplitShort
    }
    name
    role
    shares
    allocation
    claimableETH
    claimedETH
  }
`;

const SPLIT_PARTIALS = gql`
  fragment SplitShort on Split {
    id
    nickname
    owners {
      id
    }
    creator {
      id
    }
    recipients {
      id
    }
    creations {
      id
    }
    editions {
      id
    }
    ETH
    needsIncremented
  }

  fragment SplitDetails on Split {
    id
    nickname
    owners {
      ...UserShort
    }
    creator {
      ...UserShort
    }
    recipients {
      ...RecipientShort
    }
    creations {
      ...ZNFTShort
    }
    editions {
      ...EditionShort
    }
    ETH
    needsIncremented
    ERC20Transfers {
      ...TransferShort
    }
    transactionHash
    createdAtTimestamp
    createdAtBlockNumber
  }
`;

export const GET_SPLITS = gql`
  ${ZNFT_PARTIALS}
  ${ZEDITION_PARTIALS}
  ${TRANSFER_PARTIALS}
  ${USER_PARTIALS}
  ${RECIPIENT_PARTIALS}
  ${SPLIT_PARTIALS}

  query getSplitsByAddresses($addresses: [ID!]) {
    splits(where: { id_in: $addresses }) {
      ...SplitDetails
    }
  }
`;

export const GET_USERS = gql`
  ${ZNFT_PARTIALS}
  ${ZEDITION_PARTIALS}
  ${TRANSFER_PARTIALS}
  ${USER_PARTIALS}
  ${RECIPIENT_PARTIALS}
  ${SPLIT_PARTIALS}

  query getSplitsByUsers($addresses: [ID!]) {
    users(where: { id_in: $addresses }) {
      ...UserDetails
    }
  }
`;
export const GET_EDITIONS = gql`
  ${ZNFT_PARTIALS}
  ${ZEDITION_PARTIALS}
  ${TRANSFER_PARTIALS}
  ${USER_PARTIALS}
  ${RECIPIENT_PARTIALS}
  ${SPLIT_PARTIALS}

  query getEditionsByAddresses($addresses: [ID!]) {
    splitEditions(where: { id_in: $addresses }) {
      ...EditionDetails
    }
  }
`;
