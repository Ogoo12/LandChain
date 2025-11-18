'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Home, Plus, Search, FileText, Lock, Zap } from 'lucide-react'
import Link from 'next/link'

interface LayoutWrapperProps {
  children: React.ReactNode
}

export function LayoutWrapper({ children }: LayoutWrapperProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white">
      {/* Navigation */}
      <nav className="border-b border-blue-800/30 bg-slate-950/50 backdrop-blur">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center">
              <Home className="h-5 w-5 text-slate-950" />
            </div>
            <span className="font-bold text-lg">LandChain</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">Dashboard</Button>
            </Link>
            <Link href="/verify">
              <Button variant="ghost" size="sm">Verify</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Layout */}
      <div className="grid lg:grid-cols-[280px_1fr]">
        {/* Sidebar */}
        <aside className="border-r border-blue-800/30 bg-slate-950/50 backdrop-blur p-4 space-y-4">
          <div className="space-y-2">
            <p className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Menu</p>
            <div className="space-y-1">
              <Link href="/dashboard">
                <Button variant="ghost" className="w-full justify-start gap-2 hover:bg-blue-900/30">
                  <Home className="h-4 w-4" />
                  Dashboard
                </Button>
              </Link>
              <Link href="/register">
                <Button variant="ghost" className="w-full justify-start gap-2 hover:bg-blue-900/30">
                  <Plus className="h-4 w-4" />
                  Register Land
                </Button>
              </Link>
              <Link href="/verify">
                <Button variant="ghost" className="w-full justify-start gap-2 hover:bg-blue-900/30">
                  <Search className="h-4 w-4" />
                  Verify Property
                </Button>
              </Link>
              <Link href="/records">
                <Button variant="ghost" className="w-full justify-start gap-2 hover:bg-blue-900/30">
                  <FileText className="h-4 w-4" />
                  My Records
                </Button>
              </Link>
            </div>
          </div>

          <div className="pt-4 border-t border-blue-800/30">
            <Card className="bg-gradient-to-br from-blue-900/40 to-cyan-900/40 border-blue-800/50 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-4 w-4 text-blue-400" />
                <p className="text-sm font-semibold">Network Status</p>
              </div>
              <p className="text-xs text-gray-400 mb-3">Connected to Ethereum</p>
              <Badge className="bg-green-500/20 text-green-300 hover:bg-green-500/20">Active</Badge>
            </Card>
          </div>

          <div className="space-y-2 pt-4 border-t border-blue-800/30">
            <p className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Security</p>
            <div className="space-y-2 text-xs text-gray-400">
              <div className="flex items-start gap-2">
                <Lock className="h-4 w-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                <span>End-to-end encryption</span>
              </div>
              <div className="flex items-start gap-2">
                <Zap className="h-4 w-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                <span>Immutable records</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
