export const gnosisChain = {
  id: "0x64",
  token: "xDai",
  shortName: "gno",
  label: "Gnosis Chain",
  rpcUrl: "https://rpc.gnosischain.com",
  blockExplorerUrl: "https://gnosisscan.io",
  color: "#3e6957",
  transactionServiceUrl: "https://safe-transaction-gnosis-chain.safe.global",
  isStripePaymentsEnabled: false,
  isMoneriumPaymentsEnabled: false,
};

export const goerliChain = {
  id: "0x5",
  token: "gETH",
  label: "Görli",
  shortName: "gor",
  rpcUrl: "https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161",
  blockExplorerUrl: "https://goerli.etherscan.io",
  color: "#fbc02d",
  transactionServiceUrl: "https://safe-transaction-goerli.safe.global",
  isStripePaymentsEnabled: false,
  isMoneriumPaymentsEnabled: true,
};

export const mainnetChain = {
  id: "0x1",
  token: "ETH",
  label: "Ethereum",
  shortName: "eth",
  rpcUrl: "https://cloudflare-eth.com",
  blockExplorerUrl: "https://etherscan.io",
  color: "#DDDDDD",
  transactionServiceUrl: "https://safe-transaction-mainnet.safe.global",
  isStripePaymentsEnabled: false,
  isMoneriumPaymentsEnabled: false,
};

export const polygonChain = {
  id: "0x89",
  token: "matic",
  shortName: "matic",
  label: "Polygon",
  rpcUrl: "https://polygon-rpc.com",
  blockExplorerUrl: "https://polygonscan.com",
  color: "#8248E5",
  transactionServiceUrl: "https://safe-transaction-polygon.safe.global",
  isStripePaymentsEnabled: false,
  isMoneriumPaymentsEnabled: false,
};

export const zkEvmMumbai = {
  id: "0x5a2",
  token: "ETH",
  shortName: "ether",
  label: "ZkEvm",
  rpcUrl:
    "https://polygonzkevm-testnet.g.alchemy.com/v2/eZU8yvzhwDn4JJO2HV7vSBmUG3Uln5Rg",
  blockExplorerUrl: "https://testnet-zkevm.polygonscan.com/",
  color: "#8248E5",
  // transactionServiceUrl: 'https://safe-transaction-polygon.safe.global',
  isStripePaymentsEnabled: false,
  isMoneriumPaymentsEnabled: false,
  faucetUrl: "https://faucet.polygon.technology/",
};

export const mumbaiChain = {
  id: "0x13881",
  token: "matic",
  shortName: "matic",
  label: "Mumbai",
  rpcUrl: "https://rpc-mumbai.maticvigil.com/",
  blockExplorerUrl: "https://mumbai.polygonscan.com",
  color: "#8248E5",
  isStripePaymentsEnabled: true,
  isMoneriumPaymentsEnabled: false,
  faucetUrl: "https://mumbaifaucet.com/",
};

const chains = [
  gnosisChain,
  goerliChain,
  mainnetChain,
  mumbaiChain,
  polygonChain,
  zkEvmMumbai,
];

export const initialChain = mumbaiChain;

export default chains;
