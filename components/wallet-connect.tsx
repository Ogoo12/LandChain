'use client'

import { useEffect, useState } from "react"
import { ConnectButton, useActiveAccount } from "thirdweb/react"
import { Button } from "@/components/ui/button"
import { client, isThirdwebConfigured } from "@/lib/thirdweb-client"

export function WalletConnect() {
  const [mounted, setMounted] = useState(false)
  const account = useActiveAccount()

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleConnect = async () => {
    if (!isThirdwebConfigured()) {
      alert('Thirdweb is not configured. Please set NEXT_PUBLIC_THIRDWEB_CLIENT_ID')
      return
    }

    try {
      // Simulate wallet connection for demo
      // In production, integrate with wagmi or ethers.js
      const mockAddress = "0x" + Math.random().toString(16).slice(2, 42)
      localStorage.setItem('walletAddress', mockAddress)
      setAddress(mockAddress)
      setIsConnected(true)
      
      console.log("[v0] Wallet connected:", mockAddress)
    } catch (error) {
      console.error("[v0] Connection error:", error)
    }
  }

  const handleDisconnect = () => {
    localStorage.removeItem('walletAddress')
    setAddress(null)
    setIsConnected(false)
  }

  if (!mounted) return null

  if (!isThirdwebConfigured()) {
    return (
      <Button disabled className="bg-gray-600 cursor-not-allowed text-xs">
        Wallet (Not Configured)
      </Button>
    )
  }

  return (
    <div className="flex items-center">
      {client ? (
        <ConnectButton client={client} />
      ) : (
        <Button disabled className="bg-gray-600 cursor-not-allowed">
          Wallet Setup Error
        </Button>
      )}
    </div>
  )
}
