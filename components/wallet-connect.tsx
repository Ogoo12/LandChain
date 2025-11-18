'use client'

import { useEffect, useState } from "react"
import { ConnectButton, useActiveAccount } from "thirdweb/react"
import { Button } from "@/components/ui/button"
import { client, isThirdwebConfigured, SUPPORTED_WALLETS } from "@/lib/thirdweb-client"

export function WalletConnect() {
  const [mounted, setMounted] = useState(false)
  const [hasError, setHasError] = useState(false)
  const account = useActiveAccount()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const handleWalletError = (error: ErrorEvent) => {
      if (error.message?.includes("Proposal expired") || error.message?.includes("relay.walletconnect")) {
        setHasError(true)
      }
    }

    window.addEventListener("error", handleWalletError)
    return () => window.removeEventListener("error", handleWalletError)
  }, [mounted])

  if (!mounted) return null

  if (!isThirdwebConfigured()) {
    return (
      <Button disabled className="bg-gray-600 cursor-not-allowed text-xs">
        Wallet (Not Configured)
      </Button>
    )
  }

  if (!client || hasError) {
    return (
      <Button disabled className="bg-gray-600 cursor-not-allowed text-xs" title="Wallet connection unavailable in this environment">
        Wallet (Unavailable)
      </Button>
    )
  }

  return (
    <ConnectButton 
      client={client}
      wallets={SUPPORTED_WALLETS}
      theme="dark"
      autoConnect={false}
    />
  )
}
