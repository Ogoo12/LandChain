'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Shield, CheckCircle2, FileText } from 'lucide-react'

export function VerificationTool() {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResult, setSearchResult] = useState<any>(null)

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setSearchResult({
        propertyId: searchQuery,
        owner: "John Doe",
        location: "123 Oak Street, New York",
        status: "Verified",
        registrationDate: "2024-01-15",
        blockNumber: "19456789",
        txHash: "0x4f2e8a9c7d3e1b5c6a2f8d4e9c1a3b5d",
        immutable: true,
        fraudResistance: "100%",
        lastUpdated: "2024-11-17",
        history: [
          { type: "Registration", date: "2024-01-15", hash: "0x123..." },
          { type: "Verification", date: "2024-01-16", hash: "0x456..." },
          { type: "Transfer", date: "2024-02-20", hash: "0x789..." },
        ]
      })
    }
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Search Section */}
      <Card className="bg-slate-900/40 border-blue-800/30 p-6">
        <h2 className="text-2xl font-bold mb-4">Verify Property Ownership</h2>
        <div className="flex gap-2">
          <Input placeholder="Enter Property ID, Address, or Blockchain Hash" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          <Button className="bg-cyan-600 hover:bg-cyan-700" onClick={handleSearch}>Search</Button>
        </div>
      </Card>

      {/* Results */}
      {searchResult && (
        <div className="space-y-4">
          {/* Property Info */}
          <Card className="bg-gradient-to-br from-blue-900/40 to-slate-900/40 border-blue-800/50 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold mb-2">{searchResult.location}</h3>
                <p className="text-gray-400">Property ID: {searchResult.propertyId}</p>
              </div>
              <Badge className="bg-green-500/20 text-green-300">Verified</Badge>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-400">Owner</p>
                <p className="font-medium">{searchResult.owner}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Registration Date</p>
                <p className="font-medium">{searchResult.registrationDate}</p>
              </div>
            </div>
          </Card>

          {/* Immutability Verification */}
          <Card className="bg-slate-900/40 border-blue-800/30 p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Shield className="h-5 w-5 text-cyan-400" />
              Immutability & Fraud Resistance
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-slate-800/40 rounded-lg border border-blue-800/20">
                <span>Immutable Status</span>
                <Badge className="bg-green-500/20 text-green-300">Confirmed</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-800/40 rounded-lg border border-blue-800/20">
                <span>Fraud Resistance</span>
                <span className="font-bold text-green-400">{searchResult.fraudResistance}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-800/40 rounded-lg border border-blue-800/20">
                <span>Block Number</span>
                <span className="font-mono text-sm">{searchResult.blockNumber}</span>
              </div>
            </div>
          </Card>

          {/* Blockchain History */}
          <Card className="bg-slate-900/40 border-blue-800/30 p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-400" />
              Transaction History
            </h3>
            <div className="space-y-2">
              {searchResult.history.map((event: any, idx: number) => (
                <div key={idx} className="flex items-start gap-4 p-3 bg-slate-800/40 rounded-lg border border-blue-800/20">
                  <CheckCircle2 className="h-5 w-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="font-medium">{event.type}</p>
                    <p className="text-sm text-gray-400">{event.date} • {event.hash}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Verification Badge */}
          <div className="bg-green-500/10 border border-green-800/30 rounded-lg p-4 flex items-center gap-3">
            <CheckCircle2 className="h-6 w-6 text-green-400 flex-shrink-0" />
            <div>
              <p className="font-semibold text-green-300">Verified & Immutable</p>
              <p className="text-sm text-green-200">This property record is cryptographically secured on the blockchain and cannot be altered.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
