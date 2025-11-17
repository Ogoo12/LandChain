'use client'

import { useState, useEffect } from 'react'
import { useActiveAccount } from 'thirdweb/react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowUpRight, ArrowDownLeft, Zap } from 'lucide-react'
import { getWalletTransactions } from '@/lib/thirdweb-wallet'

interface Transaction {
  id: string
  transaction_hash: string
  from_address: string
  to_address: string
  amount: string
  gas_fee: string
  status: string
  token_symbol: string
  created_at: string
  description?: string
}

export function WalletTransactions() {
  const account = useActiveAccount()
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!account?.address) return

    const fetchTransactions = async () => {
      setLoading(true)
      try {
        const txs = await getWalletTransactions(account.address, account.chainId)
        setTransactions(txs)
      } catch (error) {
        console.error('[v0] Error loading transactions:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTransactions()
  }, [account?.address, account?.chainId])

  if (!account) return null

  if (loading) {
    return (
      <Card className="bg-slate-900/40 border-blue-800/30 p-6">
        <p className="text-gray-400">Loading transactions...</p>
      </Card>
    )
  }

  return (
    <Card className="bg-slate-900/40 border-blue-800/30 p-6 space-y-4">
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <Zap className="h-5 w-5 text-blue-400" />
        Wallet Transactions
      </h3>

      {transactions.length > 0 ? (
        <div className="space-y-2 max-h-[400px] overflow-y-auto">
          {transactions.map((tx) => (
            <div
              key={tx.id}
              className="flex items-center justify-between p-3 rounded-lg bg-slate-800/40 border border-blue-800/20 hover:bg-slate-800/60 transition"
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="bg-blue-500/20 p-2 rounded-lg flex-shrink-0">
                  {tx.from_address === account.address ? (
                    <ArrowUpRight className="h-4 w-4 text-red-400" />
                  ) : (
                    <ArrowDownLeft className="h-4 w-4 text-green-400" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium truncate">
                    {tx.from_address === account.address ? 'Sent' : 'Received'} {tx.token_symbol}
                  </p>
                  <p className="text-xs text-gray-400 font-mono truncate">{tx.transaction_hash?.slice(0, 10)}...</p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                <div className="text-right">
                  <p className="font-semibold">{(parseFloat(tx.amount) / 1e18).toFixed(4)} {tx.token_symbol}</p>
                  <p className="text-xs text-gray-400">{new Date(tx.created_at).toLocaleDateString()}</p>
                </div>
                <Badge
                  className={
                    tx.status === 'confirmed'
                      ? 'bg-green-500/20 text-green-300'
                      : tx.status === 'pending'
                        ? 'bg-yellow-500/20 text-yellow-300'
                        : 'bg-red-500/20 text-red-300'
                  }
                >
                  {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400 text-center py-8">No transactions yet</p>
      )}
    </Card>
  )
}
