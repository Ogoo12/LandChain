"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, CheckCircle2, Clock, User, Zap } from 'lucide-react'

export function BlockchainHistory() {
  const transactions = [
    {
      id: 1,
      type: "Registration",
      from: "Owner Address",
      to: "Smart Contract",
      property: "123 Oak Street",
      status: "Confirmed",
      timestamp: "2024-11-15 14:32:00",
      blockNumber: "19,243,856",
      gasUsed: "125,432"
    },
    {
      id: 2,
      type: "Verification",
      from: "Verifier",
      to: "Smart Contract",
      property: "123 Oak Street",
      status: "Confirmed",
      timestamp: "2024-11-14 10:15:00",
      blockNumber: "19,238,234",
      gasUsed: "95,123"
    },
    {
      id: 3,
      type: "Transfer",
      from: "Previous Owner",
      to: "Current Owner",
      property: "123 Oak Street",
      status: "Confirmed",
      timestamp: "2024-11-01 09:47:00",
      blockNumber: "19,120,891",
      gasUsed: "156,789"
    },
  ]

  return (
    <div className="space-y-4">
      {transactions.map((tx, idx) => (
        <Card key={tx.id} className="bg-slate-900/40 border-blue-800/30 p-6 hover:bg-slate-900/60 transition">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-4 flex-1">
              <div className="p-3 bg-gradient-to-br from-blue-900/40 to-slate-900/40 rounded-lg">
                <Zap className="h-5 w-5 text-cyan-400" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-semibold">{tx.type}</p>
                  <Badge className="bg-green-500/20 text-green-300 text-xs">{tx.status}</Badge>
                </div>
                <p className="text-sm text-gray-400">{tx.property}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">{tx.timestamp}</p>
              <p className="font-mono text-xs text-gray-400">Block #{tx.blockNumber}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-700">
            <div className="text-sm">
              <p className="text-xs text-gray-500 mb-1">From</p>
              <p className="font-mono text-xs">{tx.from}</p>
            </div>
            <div className="text-center flex items-center justify-center">
              <ArrowRight className="h-4 w-4 text-gray-600" />
            </div>
            <div className="text-sm">
              <p className="text-xs text-gray-500 mb-1">To</p>
              <p className="font-mono text-xs">{tx.to}</p>
            </div>
          </div>

          <div className="mt-4 p-3 bg-slate-800/30 rounded-lg">
            <p className="text-xs text-gray-400">Gas Used: <span className="text-gray-300">{tx.gasUsed}</span></p>
          </div>
        </Card>
      ))}
    </div>
  )
}
