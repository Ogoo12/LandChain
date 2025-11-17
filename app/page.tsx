'use client'

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, Shield, Lock, Zap, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'
import { WalletConnect } from '@/components/wallet-connect'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white">
      {/* Navigation */}
      <nav className="border-b border-blue-800/30 bg-slate-950/50 backdrop-blur">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center">
              <Shield className="h-5 w-5 text-slate-950" />
            </div>
            <span className="font-bold text-lg">LandChain</span>
          </div>
          <div className="flex items-center gap-4">
            <WalletConnect />
            <Link href="/dashboard">
              <Button className="bg-blue-600 hover:bg-blue-700">Dashboard</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="mx-auto max-w-7xl px-6 py-20 space-y-12">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold text-balance">Secure Blockchain Land Registry</h1>
          <p className="text-xl text-gray-300">Digitize, verify, and secure land ownership with immutable blockchain records and end-to-end encryption</p>
          <div className="flex gap-4 justify-center pt-4">
            <Link href="/dashboard">
              <Button className="bg-blue-600 hover:bg-blue-700 h-12 px-8 text-lg">Get Started</Button>
            </Link>
            <Link href="/verify">
              <Button variant="outline" className="h-12 px-8 text-lg">Verify Property</Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-blue-900/40 to-slate-900/40 border-blue-800/50 p-6">
            <div className="bg-blue-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Lock className="h-6 w-6 text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Secure Encryption</h3>
            <p className="text-gray-400 text-sm">Digitize land titles using AES-256 encryption to protect sensitive ownership documents</p>
          </Card>

          <Card className="bg-gradient-to-br from-cyan-900/40 to-slate-900/40 border-cyan-800/50 p-6">
            <div className="bg-cyan-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Zap className="h-6 w-6 text-cyan-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Immutable Ledger</h3>
            <p className="text-gray-400 text-sm">Implement blockchain transaction records that cannot be altered or forged</p>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/40 to-slate-900/40 border-purple-800/50 p-6">
            <div className="bg-purple-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <CheckCircle2 className="h-6 w-6 text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Fraud Prevention</h3>
            <p className="text-gray-400 text-sm">Verify ownership with cryptographic proof and 100% fraud resistance rating</p>
          </Card>
        </div>

        {/* Objectives Section */}
        <Card className="bg-slate-900/40 border-blue-800/30 p-8">
          <h2 className="text-2xl font-bold mb-6">Our Objectives</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <div className="bg-blue-500/20 w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="font-bold text-blue-400">1</span>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Digitize Land Titles</h3>
                <p className="text-sm text-gray-400">Convert physical land documents into secure digital records with encryption</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="bg-cyan-500/20 w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="font-bold text-cyan-400">2</span>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Blockchain Transparency</h3>
                <p className="text-sm text-gray-400">Implement transparent ledger for all transactions with permanent audit trail</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="bg-purple-500/20 w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="font-bold text-purple-400">3</span>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Public Verification</h3>
                <p className="text-sm text-gray-400">Allow buyers and authorities to verify ownership without intermediaries</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="bg-emerald-500/20 w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="font-bold text-emerald-400">4</span>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Immutability Testing</h3>
                <p className="text-sm text-gray-400">Demonstrate fraud resistance and cryptographic integrity of all records</p>
              </div>
            </div>
          </div>
        </Card>

        {/* CTA Section */}
        <Card className="bg-gradient-to-r from-blue-900/40 to-cyan-900/40 border-blue-800/30 p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Register Your Property?</h2>
          <p className="text-gray-300 mb-6">Join thousands of property owners using blockchain for secure land ownership verification</p>
          <Link href="/register">
            <Button className="bg-blue-600 hover:bg-blue-700 h-12 px-8 text-lg inline-flex items-center gap-2">
              Start Registration <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </Card>
      </div>
    </div>
  )
}
