'use client'

import { useActiveAccount } from "thirdweb/react"
import { Card } from "@/components/ui/card"
import { CheckCircle2, AlertCircle } from 'lucide-react'

export function BlockchainStatus() {
  const account = useActiveAccount()

  if (!account) {
    return (
      <Card className="bg-gradient-to-br from-amber-900/40 to-slate-900/40 border-amber-800/50 p-4">
        <div className="flex items-center gap-3">
          <AlertCircle className="h-5 w-5 text-amber-400" />
          <div>
            <p className="font-semibold text-sm">Wallet Not Connected</p>
            <p className="text-xs text-gray-400">Connect your wallet to register and verify properties</p>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card className="bg-gradient-to-br from-emerald-900/40 to-slate-900/40 border-emerald-800/50 p-4">
      <div className="flex items-center gap-3">
        <CheckCircle2 className="h-5 w-5 text-emerald-400" />
        <div>
          <p className="font-semibold text-sm">Wallet Connected</p>
          <p className="text-xs text-gray-400">{account.address.slice(0, 6)}...{account.address.slice(-4)}</p>
        </div>
      </div>
    </Card>
  )
}
