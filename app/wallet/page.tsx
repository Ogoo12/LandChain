'use client'

import { useActiveAccount } from 'thirdweb/react'
import { LayoutWrapper } from '@/components/layout-wrapper'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { WalletProfile } from '@/components/wallet-profile'
import { WalletTransactions } from '@/components/wallet-transactions'
import { UserCircle, LogOut } from 'lucide-react'

export default function WalletPage() {
  const account = useActiveAccount()

  if (!account) {
    return (
      <LayoutWrapper>
        <div className="flex flex-col items-center justify-center py-20">
          <UserCircle className="h-16 w-16 text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold mb-2">No Wallet Connected</h2>
          <p className="text-gray-400 text-center max-w-md mb-6">
            Please connect your wallet to view your profile and transaction history.
          </p>
        </div>
      </LayoutWrapper>
    )
  }

  return (
    <LayoutWrapper>
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-balance">Wallet Management</h1>
          <p className="text-gray-400">Manage your wallet, view balances, and track transactions</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <WalletProfile />
          </div>

          <div className="lg:col-span-2">
            <WalletTransactions />
          </div>
        </div>
      </div>
    </LayoutWrapper>
  )
}
