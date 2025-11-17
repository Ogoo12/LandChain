'use client'

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { LayoutWrapper } from "@/components/layout-wrapper"
import { Home, CheckCircle2, AlertCircle, TrendingUp } from 'lucide-react'
import Link from 'next/link'

interface DashboardStats {
  totalProperties: number
  verifiedRecords: number
  pendingVerification: number
  totalValue: number
}

interface Transaction {
  id: string
  owner_name: string
  location: string
  status: string
  tx_hash: string
  transaction_type: string
  timestamp: string
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalProperties: 0,
    verifiedRecords: 0,
    pendingVerification: 0,
    totalValue: 0,
  })
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, transactionsRes] = await Promise.all([
          fetch('/api/dashboard/stats'),
          fetch('/api/dashboard/transactions'),
        ])

        if (statsRes.ok) {
          const statsData = await statsRes.json()
          setStats(statsData)
        }

        if (transactionsRes.ok) {
          const transData = await transactionsRes.json()
          setTransactions(transData)
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const formatValue = (value: number) => {
    return `$${(value / 1000000000).toFixed(1)}B`
  }

  return (
    <LayoutWrapper>
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-balance">Land Ownership Registry</h1>
          <p className="text-gray-400">Secure blockchain-based property records with immutable verification</p>
        </div>

        {/* Metrics Grid */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="bg-gradient-to-br from-blue-900/40 to-slate-900/40 border-blue-800/50 p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-400">Total Properties</p>
              <Home className="h-4 w-4 text-blue-400" />
            </div>
            <p className="text-2xl font-bold">{stats.totalProperties}</p>
            <p className="text-xs text-green-400">+12% this month</p>
          </Card>

          <Card className="bg-gradient-to-br from-cyan-900/40 to-slate-900/40 border-cyan-800/50 p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-400">Verified Records</p>
              <CheckCircle2 className="h-4 w-4 text-cyan-400" />
            </div>
            <p className="text-2xl font-bold">{stats.verifiedRecords}</p>
            <p className="text-xs text-green-400">{stats.totalProperties > 0 ? Math.round((stats.verifiedRecords / stats.totalProperties) * 100) : 0}% verified</p>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/40 to-slate-900/40 border-purple-800/50 p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-400">Pending Verification</p>
              <AlertCircle className="h-4 w-4 text-purple-400" />
            </div>
            <p className="text-2xl font-bold">{stats.pendingVerification}</p>
            <p className="text-xs text-yellow-400">Awaiting confirmation</p>
          </Card>

          <Card className="bg-gradient-to-br from-emerald-900/40 to-slate-900/40 border-emerald-800/50 p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-400">Total Value</p>
              <TrendingUp className="h-4 w-4 text-emerald-400" />
            </div>
            <p className="text-2xl font-bold">{formatValue(stats.totalValue)}</p>
            <p className="text-xs text-green-400">+5.2% YoY</p>
          </Card>
        </div>

        {/* Recent Transactions */}
        <Card className="bg-slate-900/40 border-blue-800/30 p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Blockchain Transactions</h2>
          {transactions.length > 0 ? (
            <div className="space-y-3">
              {transactions.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-800/40 border border-blue-800/20 hover:bg-slate-800/60 transition">
                  <div className="flex-1">
                    <p className="font-medium">{tx.owner_name}</p>
                    <p className="text-sm text-gray-400">{tx.location} • {tx.transaction_type}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={tx.status === "confirmed" ? "bg-green-500/20 text-green-300" : tx.status === "pending" ? "bg-yellow-500/20 text-yellow-300" : "bg-red-500/20 text-red-300"}>
                      {tx.status === "confirmed" ? "Verified" : tx.status === "pending" ? "Pending" : "Failed"}
                    </Badge>
                    <span className="text-xs text-gray-500 font-mono">{tx.tx_hash?.slice(0, 10) || 'N/A'}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-center py-8">No transactions yet</p>
          )}
        </Card>

        {/* Action Cards */}
        <div className="grid md:grid-cols-2 gap-4">
          <Link href="/register">
            <Card className="bg-gradient-to-br from-blue-900/40 to-slate-900/40 border-blue-800/50 p-6 hover:border-blue-600/50 cursor-pointer transition">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold mb-2">Register New Property</h3>
                  <p className="text-sm text-gray-400">Digitize land title with encryption and blockchain</p>
                </div>
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">Start Registration</Button>
            </Card>
          </Link>

          <Link href="/verify">
            <Card className="bg-gradient-to-br from-cyan-900/40 to-slate-900/40 border-cyan-800/50 p-6 hover:border-cyan-600/50 cursor-pointer transition">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold mb-2">Verify Property</h3>
                  <p className="text-sm text-gray-400">Check immutability and transaction history</p>
                </div>
              </div>
              <Button className="w-full bg-cyan-600 hover:bg-cyan-700">Search Records</Button>
            </Card>
          </Link>
        </div>
      </div>
    </LayoutWrapper>
  )
}
