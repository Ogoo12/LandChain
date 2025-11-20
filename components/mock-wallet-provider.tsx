'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface WalletState {
  isConnected: boolean
  address: string | null
  connect: () => void
  disconnect: () => void
}

const WalletContext = createContext<WalletState | undefined>(undefined)

export function MockWalletProvider({ children }: { children: ReactNode }) {
  const [isConnected, setIsConnected] = useState(false)
  const [address, setAddress] = useState<string | null>(null)

  const connect = () => {
    // Simulate connecting to a wallet and getting an address
    const simulatedAddress = `0x${[...Array(40)].map(() => Math.floor(Math.random() * 16).toString(16)).join('')}`
    setAddress(simulatedAddress)
    setIsConnected(true)
  }

  const disconnect = () => {
    setIsConnected(false)
    setAddress(null)
  }

  const value = { isConnected, address, connect, disconnect }

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  )
}

export function useWallet() {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error('useWallet must be used within a MockWalletProvider')
  }
  return context
}
