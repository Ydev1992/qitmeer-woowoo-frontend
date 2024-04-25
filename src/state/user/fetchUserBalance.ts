import axios from "axios";
import { EXPLORER_API_URL } from "config/chains";
import { COLLECTION_FACTORY_GRAPH_URL, MARKETPLACE_GRAPH_URL } from "config/constants";
import { SUPPORTED_CHAIN_IDS } from "config/constants/networks";
import $ from "jquery";
import { getMulticallContract } from "utils/contracts";
import { isAddress } from "utils/functions";

export async function fetchUserInfo(account: string | undefined, jwtToken?: string) {
  if (!isAddress(account)) return {};
  try {
    let config = {};
    if (jwtToken) config = { headers: { Authorization: `Bearer ${jwtToken}` } };
    const result = await axios.get(`/api/users/${account?.toLowerCase()}`, config);
    return result.data;
  } catch (e) {
    console.log(e);
    return {};
  }
}
export async function getTokenbalances(account: string | undefined, chainId: number | undefined) {
  if (!isAddress(account) || !SUPPORTED_CHAIN_IDS.includes(Number(chainId))) return [];
  try {
    const result = await axios.get(
      `${EXPLORER_API_URL[chainId as any]}?module=account&action=tokenlist&address=${account}`
    );
    return result.data.result;
  } catch (e) {
    console.log(e);
    return [];
  }
}
export async function fetchUserCollectionBalance(
  account: string | undefined,
  chainId: number | undefined
) {
  if (!isAddress(account) || !SUPPORTED_CHAIN_IDS.includes(Number(chainId))) return [];
  try {
    const result = await getTokenbalances(account, chainId);
    const collections: any = {};
    result
      .filter((token: any) => token.type === "ERC-721")
      .map((token: any) => {
        collections[token.contractAddress] = {
          ...token,
          address: token.contractAddress,
          name: $("<textarea />").html(token.name).text(),
        };
      });
    return collections;
  } catch (e) {
    console.log(e);
    return [];
  }
}

export async function fetchCreatedCollections(
  account: string | undefined,
  chainId: number | undefined
) {
  if (!isAddress(account) || !SUPPORTED_CHAIN_IDS.includes(Number(chainId))) return [];
  try {
    const subgraph_endpoint = COLLECTION_FACTORY_GRAPH_URL[chainId as number];
    const response = await axios.post(subgraph_endpoint, {
      query: `{
        collections(
          first: 1000
          where: {creator: "${account?.toLowerCase()}"}
        ) {
          id
          name
          royaltyFraction
          royaltyReceiver
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

export async function getUserNFTs(
  address: string,
  account: string | undefined,
  chainId: number | undefined
) {
  if (!isAddress(address) || !isAddress(account)) return [];

  try {
    let items: any = [];
    let blockNumber;
    let index;
    let response: any;
    do {
      blockNumber = response ? response.next_page_params.block_number : 100000000;
      index = response ? response.next_page_params.index : 0;
      response = await axios.get(`${
        EXPLORER_API_URL[chainId as number]
      }/v2/addresses/${account}/token-transfers?type=ERC-721&token=${address}&block_number=${blockNumber}&index=${index}
    `);
      response = response.data;
      items = [...items, ...response.items];
    } while (response.next_page_params);

    const ownedNFTs: any = [];
    for (let i = 0; i < items.length; i++) {
      if (items[i].to.hash.toLowerCase() !== account?.toLowerCase()) continue;
      const isExisting = items.find(
        (tx: any) =>
          tx.from.hash.toLowerCase() === account?.toLowerCase() &&
          new Date(tx.timestamp).getTime() > new Date(items[i].timestamp).getTime() &&
          items[i].total.token_id === tx.total.token_id
      );
      if (!isExisting) ownedNFTs.push(parseInt(items[i].total.token_id));
    }

    console.log(ownedNFTs.length);
    return ownedNFTs.map((tokenId: any) => {
      return { address, chainId, tokenId };
    });
  } catch (e) {
    console.log(e);
    return [];
  }
}

export async function fetchETHBalance(account: string | undefined, chainId: number | undefined) {
  if (!isAddress(account) || !SUPPORTED_CHAIN_IDS.includes(Number(chainId))) return 0;
  try {
    const multicallContract = getMulticallContract(null, chainId);
    const result = await multicallContract.getEthBalance(account);
    return result.toString();
  } catch (e) {
    console.log(e);
    return 0;
  }
}

export async function getListedCollectionNFTs(account: string, chainId: number) {
  if (!isAddress(account)) return [];
  try {
    const response = await Promise.all([
      axios.post(MARKETPLACE_GRAPH_URL[chainId], {
        query: `{
        listings(first: 1000, where: {listingCreator: "${account.toLowerCase()}", status: CREATED}) {
          assetContract
          tokenId
        }
      }`,
      }),
      axios.post(MARKETPLACE_GRAPH_URL[chainId], {
        query: `{
        auctions(first: 1000, where: {auctionCreator: "${account.toLowerCase()}", status: CREATED}) {
          assetContract
          tokenId
        }
      }`,
      }),
    ]);
    const listings = [
      ...response[0].data.data.listings.map((listing: any) => ({ ...listing, type: "listing" })),
      ...response[1].data.data.auctions.map((auction: any) => ({ ...auction, type: "auction" })),
    ];
    const addresses: any = [];
    for (let i = 0; i < listings.length; i++)
      if (!addresses.includes(listings[i].assetContract)) addresses.push(listings[i].assetContract);

    const result = await Promise.all(
      addresses.map((collection: string) =>
        axios.get(
          `${EXPLORER_API_URL[813]}?module=token&action=getToken&contractaddress=${collection}`
        )
      )
    );

    const collections = result.map((response, i) => {
      const data = response.data.result;
      const filteredListings = listings.filter(
        (listing: any) => listing.assetContract === addresses[i]
      );
      return {
        balance: filteredListings.length,
        contractAddress: addresses[i],
        decimals: "",
        name: data.name,
        symbol: data.symbol,
        type: data.type,
        nfts: filteredListings.map((listing: any) => {
          return { tokenId: listing.tokenId, address: addresses[i], chainId, type: listing.type };
        }),
      };
    });
    return collections;
  } catch (e) {
    console.log(e);
    return [];
  }
}

export async function getBidHistory(account: string, chainId: number) {
  try {
    const result = await axios.post(MARKETPLACE_GRAPH_URL[chainId], {
      query: `{
        auctions(first: 1000) {
          bids(first: 1000, where: {bidder: "${account}"}) {
            auctionId
            bidAmount
            bidder
            id
            timestamp
          }
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
        }
      }`,
    });
    const bids: any = [];
    result.data.data.auctions.map((auction: any) => auction.bids.map((bid: any) => bids.push({})));
    return result.data.data.auctions;
  } catch (e) {
    console.log(e);
    return [];
  }
}

export async function getTransactionHistory(account: string, chainId: number) {
  try {
    const response = await Promise.all([
      axios.post(MARKETPLACE_GRAPH_URL[chainId], {
        query: `{
        listings(first: 1000, where: {listingCreator: "${account}"}) {
          txHash
          tokenId
          tokenType
          status
          id
          assetContract
          currencies
          prices
          listingCreator
          timestamp
        }
        auctions(first: 1000, where: {auctionCreator: "${account}"}) {
          auctionCreator
          assetContract
          id
          currency
          buyoutBidAmount
          timestamp
          tokenId
          txHash
          tokenType
          status
        }
        bids(first: 1000) {
          id
          bidder
          bidAmount
          timestamp
          txHash
          auction {
            auctionCreator
            currency
            tokenId
            assetContract
            status
          }
        }
        sales(first: 1000, where: {buyer: "${account}"}) {
          txHash
          timestamp
          totalPricePaid
          currency
          id
          buyer
          listing {
            listingCreator
            tokenId
            assetContract
          }
        }
      }`,
      }),
      axios.post(MARKETPLACE_GRAPH_URL[chainId], {
        query: `{
        sales(first: 1000, where: { listing_: {listingCreator: "${account}"}}) {
          txHash
          timestamp
          totalPricePaid
          currency
          id
          buyer
          listing {
            listingCreator
            tokenId
            assetContract
          }
        }
      }`,
      }),
    ]);
    const result = response[0];

    const listings = result.data.data.listings.map((listing: any) => ({
      ...listing,
      creator: listing.listingCreator,
      currency: listing.currencies[0],
      price: listing.prices[0],
      type: "Listed",
      status: "history." + listing.status,
    }));

    const auctions = result.data.data.auctions.map((auction: any) => ({
      ...auction,
      creator: auction.auctionCreator,
      price: auction.buyoutBidAmount,
      type: "Listed",
      status: "history." + auction.status,
    }));

    const offersmade = result.data.data.bids
      .filter((bid: any) => bid.bidder === account.toLowerCase())
      .map((bid: any) => ({
        ...bid,
        ...bid.auction,
        creator: bid.bidder,
        price: bid.bidAmount,
        type: "offersmade",
        status:
          bid.auction.status === "COMPLETED"
            ? "history.EXPIRED"
            : bid.auction.status === "CREATED"
            ? "history.PLACED A BID"
            : "",
      }));

    const offersreceived = result.data.data.bids
      .filter((bid: any) => bid.auction.auctionCreator === account.toLowerCase())
      .map((bid: any) => ({
        ...bid,
        ...bid.auction,
        creator: bid.bidder,
        price: bid.bidAmount,
        type: "offersreceived",
        status:
          bid.auction.status === "COMPLETED"
            ? "history.EXPIRED"
            : bid.auction.status === "CREATED"
            ? "history.PLACED A BID"
            : "",
      }));

    const buySale = response[0].data.data.sales.map((sale: any) => ({ ...sale, type: "" }));
    const sellSale = response[1].data.data.sales.map((sale: any) => ({ ...sale, type: "Sale" }));
    const sales = [...buySale, ...sellSale].map((sale: any) => ({
      ...sale,
      ...sale.listing,
      creator: sale.listing.listingCreator,
      price: sale.totalPricePaid,
      status: sale.buyer === account ? "history.BOUGHT" : "history.SOLD",
    }));

    return [...listings, ...auctions, ...offersmade, ...offersreceived, ...sales].sort(
      (a: any, b: any) => b.timestamp - a.timestamp
    );
  } catch (e) {
    console.log(e);
    return [];
  }
}
