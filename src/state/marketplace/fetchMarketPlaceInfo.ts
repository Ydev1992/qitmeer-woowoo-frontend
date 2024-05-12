import axios from "axios";
import { EXPLORER_API_URL } from "config/chains";
import { COLLECTION_FACTORY_GRAPH_URL, MARKETPLACE_GRAPH_URL } from "config/constants";
import { SUPPORTED_CHAIN_IDS } from "config/constants/networks";
import { ethers } from "ethers";
import { getCollectionContract } from "utils/contracts";
import { formatIPFSString, isAddress } from "utils/functions";

export async function fetchListings(chainId: number) {
  if (!SUPPORTED_CHAIN_IDS.includes(Number(chainId))) return [];
  try {
    let allListings: any = [],
      allSales: any = [],
      listings,
      sales,
      page = 0;
    do {
      const response = await axios.post(MARKETPLACE_GRAPH_URL[chainId], {
        query: `{
          listings(first: 1000, skip:${page * 1000}, where: {status: CREATED}) {
            assetContract
            currencies
            endTimestamp
            id
            listingCreator
            listingId
            prices
            quantity
            reserved
            reservedFor
            startTimestamp
            status
            tokenId
            tokenType
            timestamp
          }
          sales(first:1000, skip:${page * 1000}) {
            buyer
            currency
            id
            listingId
            quantityBought
            timestamp
            txHash
            totalPricePaid
            listing {
              assetContract
              tokenId
            }
          }
        }`,
      });
      listings = response.data.data.listings;
      allListings = [...allListings, ...(listings ?? [])];

      sales = response.data.data.sales;
      allSales = [...allSales, ...(sales ?? [])];

      page++;
    } while (listings.length === 1000 || sales.length === 1000);

    allListings = allListings
      .filter((listing: any) => {
        const isExistingSale = allSales.find(
          (sale: any) =>
            sale.listing.assetContract === listing.assetContract &&
            sale.listing.tokenId === listing.tokenId
        );
        if (isExistingSale && Number(listing.timestamp) <= Number(isExistingSale.timestamp)) {
          return false;
        }
        return true;
      })
      .map((listing: any) => ({
        ...listing,
        type: "listing",
        address: listing.assetContract,
        floorPrice: listing.prices[0],
        currency: listing.currencies[0],
        chainId: 813,
      }));

    return allListings;
  } catch (e) {
    console.log(e);
    return [];
  }
}

export async function getAuctions(chainId: number) {
  if (!SUPPORTED_CHAIN_IDS.includes(Number(chainId))) return [];
  try {
    const response = await axios.post(MARKETPLACE_GRAPH_URL[chainId], {
      query: `{
        auctions(first: 1000) {
          assetContract
          auctionCreator
          auctionId
          bidBufferBps
          buyoutBidAmount
          currency
          endTimestamp
          id
          minimumBidAmount
          paidOutAuctionTokens
          paidOutBidAmount
          quantity
          startTimestamp
          status
          timeBufferInSeconds
          tokenId
          tokenType
          winningBid {
            auctionId
            bidAmount
            bidder
            id
            timestamp
            txHash
          }
        }
      }`,
    });
    return response.data.data.auctions
      .filter(
        (auction: any) =>
          !(auction.winningBid && auction.paidOutAuctionTokens && auction.paidOutBidAmount)
      )
      .map((auction: any) => ({
        ...auction,
        type: "auction",
        address: auction.assetContract,
        floorPrice: auction.buyoutBidAmount,
        chainId: 813,
        id: auction.auctionId,
        listingCreator: auction.auctionCreator,
      }));
  } catch (e) {
    console.log(e);
    return [];
  }
}

export async function fetchCreatedCollectionsByName(name: string | undefined, chainId: number) {
  try {
    const subgraph_endpoint = COLLECTION_FACTORY_GRAPH_URL[chainId];
    const response = await axios.post(subgraph_endpoint, {
      query: `{
        collections(
          first: 1000
          where: {name: "${name}"}
        ) {
          id
          name
          symbol
          creator
          address
        }
      }`,
    });
    return response.data.data.collections;
  } catch (e) {
    console.log(e);
    return [];
  }
}

export async function getNFTInfo(address: string, tokenId: number, chainId = 813) {
  if (!isAddress(address) || !SUPPORTED_CHAIN_IDS.includes(Number(chainId))) return null;
  try {
    const url = `${EXPLORER_API_URL[chainId]}/v2/tokens/${address}/instances/${tokenId}/transfers`;

    const nftContract = getCollectionContract(address, null, chainId);
    const result = await Promise.all([
      axios.get(url).catch((e) => console.log(e)),
      nftContract.tokenURI(tokenId),
      nftContract.name(),
    ]);
    const creator = result[0]?.data.items.find(
      (tx: any) => tx.from.hash === ethers.constants.AddressZero
    ).to.hash;
    const owner = result[0]?.data.items[0].to.hash;
    const collectionName = result[2];

    const URI = result[1];
    const creatorAndInfo = await Promise.all([
      creator
        ? axios.get(`/api/users/${creator.toLowerCase()}`).catch((e) => {
            return { data: null };
          })
        : { data: null },
      axios.get(formatIPFSString(URI)),
      owner
        ? axios.get(`/api/users/${owner.toLowerCase()}`).catch((e) => {
            return { data: null };
          })
        : { data: null },
    ]);

    const creatorInfo = creatorAndInfo[0].data;
    const info = creatorAndInfo[1].data;
    const ownerInfo = creatorAndInfo[2].data;

    const _owner = ownerInfo === "" || !ownerInfo ? { wallet: owner } : ownerInfo;
    const _creator = creatorInfo === "" || !creatorInfo ? { wallet: creator } : creatorInfo;
    const description = info.description ?? "";
    const name = info.name ?? "";
    const attributes = info.attributes ?? [];
    const image = formatIPFSString(info.image) ?? "";

    return {
      address: address.toLowerCase(),
      chainId,
      tokenId,
      owner: _owner,
      creator: _creator,
      description,
      name,
      attributes,
      image,
      collectionName,
    };
  } catch (e) {
    console.log(e);
    return null;
  }
}
export async function getNFTInfos(
  address: string,
  tokenIds: number[],
  chainId: number | undefined
) {
  if (!isAddress(address) || !SUPPORTED_CHAIN_IDS.includes(Number(chainId))) return [];
  try {
    const nftInfos = await Promise.all(
      tokenIds.map((tokenId) => getNFTInfo(address, tokenId, chainId))
    );
    return nftInfos.filter((nftInfo) => nftInfo);
  } catch (e) {
    console.log(e);
    return [];
  }
}

export async function getBidInfo(auctionId: number, chainId: number) {
  if (!SUPPORTED_CHAIN_IDS.includes(Number(chainId))) return [];
  try {
    const response = await axios.post(MARKETPLACE_GRAPH_URL[chainId], {
      query: `{
        bids(where: {auctionId: "${auctionId}"}) {
          auctionId
          bidAmount
          bidder
          id
          timestamp
        }
      }`,
    });
    return response.data.data.bids;
  } catch (e) {
    console.log(e);
    return [];
  }
}
