import { createThirdwebClient } from "thirdweb"

const clientId = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID

export const client = clientId && clientId !== "placeholder" ? createThirdwebClient({
  clientId: clientId,
}) : null

export const isThirdwebConfigured = () => {
  return clientId && clientId !== "placeholder" && clientId.length > 0
}

export const SUPPORTED_WALLETS = [
  "io.metamask",
  "com.trustwallet.app",
  "io.zerion.wallet",
  "com.okex.wallet",
  "com.binance.wallet",
  "com.bitget.web3",
  "com.safepal",
  "pro.tokenpocket",
  "org.uniswap",
  "com.bestwallet",
  "com.ledger",
  "com.bybit",
  "com.elrond.maiar.wallet",
  "com.fireblocks",
  "com.crypto.wallet",
  "com.bitcoin",
  "com.bifrostwallet",
  "im.token",
  "io.1inch.wallet",
  "com.blockchain.login",
]

export const SEPOLIA_CHAIN_ID = 11155111
export const MUMBAI_CHAIN_ID = 80002

export const LAND_REGISTRY_CONTRACT_ADDRESS = "0x"
export const LAND_REGISTRY_ABI = [
  {
    "name": "registerLand",
    "type": "function",
    "inputs": [
      { "name": "propertyId", "type": "string" },
      { "name": "owner", "type": "address" },
      { "name": "location", "type": "string" },
      { "name": "area", "type": "uint256" },
      { "name": "documentHash", "type": "bytes32" }
    ]
  },
  {
    "name": "verifyOwnership",
    "type": "function",
    "inputs": [{ "name": "propertyId", "type": "string" }]
  },
  {
    "name": "transferOwnership",
    "type": "function",
    "inputs": [
      { "name": "propertyId", "type": "string" },
      { "name": "newOwner", "type": "address" }
    ]
  }
]
