export interface Brc20Token {
  symbol: string;
  tokenInscriptionId: string;
  protocolType: string;
  totalSupply: Number;
  mintAmount: Number;
  deployTime: Number;
  holder: Number;
  transactionCount: Number;
  circulatingSupply: Number;
  mintBitwork: string;
  limitPerMint: Number;
  runesSymbol: string;
  tokenContractAddress: string;
  lastPrice: Number;
  maxSupply: Number;
  volume24h: Number;
  marketCap: Number;
  high24h: Number;
  low25h: Number;
  priceAbnormal: [];
  inscriptionId: string;
  inscriptionNumber: Number;
  mintRate: Number;
  logoUrl: string;
}
