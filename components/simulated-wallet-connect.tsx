'use client'

import { Button } from "@/components/ui/button"
import { useWallet } from "./mock-wallet-provider"

export function SimulatedWalletConnect() {
  const { isConnected, address, connect, disconnect } = useWallet()

  return (
    <div>
      {isConnected && address ? (
        <div className="flex items-center gap-4">
          <p className="text-sm">
            {address.slice(0, 6)}...{address.slice(-4)}
          </p>
          <Button onClick={disconnect} variant="outline">
            Disconnect
          </Button>
        </div>
      ) : (
        <Button onClick={connect}>
          Connect Wallet
        </Button>
      )}
    </div>
  )
}
