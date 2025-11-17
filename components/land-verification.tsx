"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useState, useEffect } from "react"
import { Search, CheckCircle2, Shield, Clock, User, MapPin, DollarSign, Zap, FileText } from 'lucide-react'
import { EmptyState } from "@/components/empty-state"

interface LandRecord {
  id: string
  owner_name: string
  location: string
  area_sqft: number
  market_value: number
  status: string
  registered_date: string
  wallet_address?: string
}

export function LandVerification() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRecord, setSelectedRecord] = useState<string | null>(null)
  const [records, setRecords] = useState<LandRecord[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)

  const handleSearch = async () => {
    setLoading(true)
    setSearched(true)
    try {
      const response = await fetch(`/api/verify/search?q=${encodeURIComponent(searchQuery)}`)
      if (response.ok) {
        const data = await response.json()
        setRecords(data)
        if (data.length > 0) {
          setSelectedRecord(data[0].id)
        }
      }
    } catch (error) {
      console.error('Error searching records:', error)
      setRecords([])
    } finally {
      setLoading(false)
    }
  }

  const selected = selectedRecord ? records.find(r => r.id === selectedRecord) : null

  return (
    <div className="space-y-6">
      {/* Search Section */}
      <Card className="bg-slate-900/40 border-blue-800/30 p-6">
        <div className="flex gap-2">
          <Input
            placeholder="Search by address, owner name, or property ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            className="bg-slate-800/50 border-slate-700 focus:border-blue-600"
          />
          <Button 
            className="bg-blue-600 hover:bg-blue-700 gap-2"
            onClick={handleSearch}
            disabled={loading}
          >
            <Search className="h-4 w-4" />
            {loading ? 'Searching...' : 'Search'}
          </Button>
        </div>
      </Card>

      {/* Results Grid */}
      {searched ? (
        records.length > 0 ? (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Search Results */}
            <div className="lg:col-span-1">
              <Card className="bg-slate-900/40 border-blue-800/30 p-4">
                <h3 className="font-semibold mb-4">Found Records ({records.length})</h3>
                <div className="space-y-2">
                  {records.map((record) => (
                    <button
                      key={record.id}
                      onClick={() => setSelectedRecord(record.id)}
                      className={`w-full text-left p-3 rounded-lg transition ${
                        selectedRecord === record.id
                          ? "bg-blue-900/40 border border-blue-600"
                          : "bg-slate-800/40 border border-slate-700 hover:bg-slate-800/60"
                      }`}
                    >
                      <p className="font-medium text-sm">{record.owner_name}</p>
                      <p className="text-xs text-gray-400">{record.location}</p>
                      <Badge className={`mt-2 text-xs ${record.status === "verified" ? "bg-green-500/20 text-green-300" : record.status === "pending" ? "bg-yellow-500/20 text-yellow-300" : "bg-gray-500/20 text-gray-300"}`}>
                        {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                      </Badge>
                    </button>
                  ))}
                </div>
              </Card>
            </div>

            {/* Record Details */}
            <div className="lg:col-span-2">
              {selected ? (
                <div className="space-y-4">
                  {/* Header */}
                  <Card className="bg-gradient-to-br from-blue-900/40 to-slate-900/40 border-blue-800/30 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h2 className="text-xl font-bold">{selected.owner_name}</h2>
                          {selected.status === "verified" && (
                            <CheckCircle2 className="h-5 w-5 text-green-400" />
                          )}
                        </div>
                        <p className="text-gray-400 flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          {selected.location}
                        </p>
                      </div>
                      <Badge className={selected.status === "verified" ? "bg-green-500/20 text-green-300" : selected.status === "pending" ? "bg-yellow-500/20 text-yellow-300" : "bg-gray-500/20 text-gray-300"}>
                        {selected.status.charAt(0).toUpperCase() + selected.status.slice(1)}
                      </Badge>
                    </div>
                  </Card>

                  {/* Property Information */}
                  <Card className="bg-slate-900/40 border-blue-800/30 p-6">
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Property Information
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-slate-800/30 rounded-lg">
                        <p className="text-xs text-gray-400 mb-1">Area</p>
                        <p className="font-medium">{selected.area_sqft.toLocaleString()} sq ft</p>
                      </div>
                      <div className="p-3 bg-slate-800/30 rounded-lg">
                        <p className="text-xs text-gray-400 mb-1 flex items-center gap-1">
                          <DollarSign className="h-3 w-3" />
                          Market Value
                        </p>
                        <p className="font-medium">${(selected.market_value || 0).toLocaleString()}</p>
                      </div>
                      <div className="p-3 bg-slate-800/30 rounded-lg">
                        <p className="text-xs text-gray-400 mb-1 flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Registered
                        </p>
                        <p className="font-medium text-sm">{new Date(selected.registered_date).toLocaleDateString()}</p>
                      </div>
                      <div className="p-3 bg-slate-800/30 rounded-lg">
                        <p className="text-xs text-gray-400 mb-1">Property ID</p>
                        <p className="font-medium text-sm font-mono">{selected.id.slice(0, 8)}</p>
                      </div>
                    </div>
                  </Card>

                  {/* Blockchain Details */}
                  <Card className="bg-slate-900/40 border-blue-800/30 p-6">
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <Zap className="h-4 w-4 text-cyan-400" />
                      Blockchain Details
                    </h3>
                    <div className="space-y-3">
                      <div className="p-3 bg-slate-800/30 rounded-lg border border-slate-700">
                        <p className="text-xs text-gray-400 mb-1">Wallet Address</p>
                        <p className="font-mono text-sm font-medium">{selected.wallet_address || 'Not connected'}</p>
                      </div>
                      <p className="text-xs text-gray-500 flex items-center gap-2">
                        <Shield className="h-3 w-3" />
                        This record is immutable and permanently stored on the blockchain
                      </p>
                    </div>
                  </Card>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button className="flex-1 bg-blue-600 hover:bg-blue-700">View Full Details</Button>
                    <Button variant="outline" className="flex-1">Download Certificate</Button>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        ) : (
          <EmptyState
            title="No records found"
            description={`No properties matching "${searchQuery}" were found. Try searching with different keywords.`}
            icon={<Search className="h-12 w-12 text-gray-600" />}
          />
        )
      ) : (
        <EmptyState
          title="Search for properties"
          description="Enter an address, owner name, or property ID to find and verify land ownership records."
        />
      )}
    </div>
  )
}
