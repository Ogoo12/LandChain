import { createThirdwebClient, getContract, eth } from "thirdweb"

export const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID || '',
})

// Get wallet balance
export async function getWalletBalance(address: string, chainId: number = 1) {
  try {
    const balance = await eth.getBalance({
      address,
      chain: chainId === 1 ? undefined : chainId, // Default to mainnet if not specified
      client,
    })
    return balance.toString()
  } catch (error) {
    console.error('[v0] Error fetching wallet balance:', error)
    return '0'
  }
}

// Get wallet transactions (this would integrate with Thirdweb's transaction APIs or Etherscan)
export async function getWalletTransactions(address: string, chainId: number = 1) {
  try {
    // In production, you'd use Thirdweb's transaction tracking or Etherscan API
    // For now, we'll fetch from our database
    const response = await fetch(`/api/wallet/transactions?address=${address}&chainId=${chainId}`)
    if (!response.ok) throw new Error('Failed to fetch transactions')
    return await response.json()
  } catch (error) {
    console.error('[v0] Error fetching transactions:', error)
    return []
  }
}

// Get wallet info
export async function getWalletInfo(address: string) {
  try {
    const response = await fetch(`/api/wallet/info?address=${address}`)
    if (!response.ok) throw new Error('Failed to fetch wallet info')
    return await response.json()
  } catch (error) {
    console.error('[v0] Error fetching wallet info:', error)
    return null
  }
}

// Save wallet connection to database
export async function saveWalletConnection(walletData: {
  address: string
  chainId: number
  walletType?: string
  username?: string
  email?: string
}) {
  try {
    const response = await fetch('/api/wallet/connect', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(walletData),
    })
    if (!response.ok) throw new Error('Failed to save wallet connection')
    return await response.json()
  } catch (error) {
    console.error('[v0] Error saving wallet connection:', error)
    return null
  }
}

// Verify wallet ownership (sign message)
export async function verifyWalletOwnership(address: string, message: string, signature: string) {
  try {
    const response = await fetch('/api/wallet/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ address, message, signature }),
    })
    if (!response.ok) throw new Error('Failed to verify wallet')
    return await response.json()
  } catch (error) {
    console.error('[v0] Error verifying wallet:', error)
    return { verified: false }
  }
}
