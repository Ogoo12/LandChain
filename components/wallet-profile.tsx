'use client'

import { useState, useEffect } from 'react'
import { useActiveAccount } from 'thirdweb/react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Wallet, Copy, ExternalLink, LogOut } from 'lucide-react'
import { getWalletBalance, getWalletInfo } from '@/lib/thirdweb-wallet'

interface UserProfile {
  id: string
  wallet_address: string
  username?: string
  email?: string
  kyc_verified: boolean
  kyc_status: string
  profile_picture_url?: string
  bio?: string
}

export function WalletProfile() {
  const account = useActiveAccount()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [balance, setBalance] = useState('0')
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!account?.address) return

    const fetchProfile = async () => {
      setLoading(true)
      try {
        const [walletInfo, walletBalance] = await Promise.all([
          getWalletInfo(account.address),
          getWalletBalance(account.address, account.chainId),
        ])

        setProfile(walletInfo)
        setBalance((parseInt(walletBalance) / 1e18).toFixed(4)) // Convert from wei to ETH
      } catch (error) {
        console.error('[v0] Error loading profile:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [account?.address, account?.chainId])

  const copyAddress = () => {
    if (account?.address) {
      navigator.clipboard.writeText(account.address)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  if (!account) {
    return null
  }

  return (
    <Card className="bg-gradient-to-br from-blue-900/40 to-slate-900/40 border-blue-800/50 p-6 w-full">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wallet className="h-5 w-5 text-blue-400" />
            <h3 className="text-lg font-semibold">Wallet Profile</h3>
          </div>
          {profile?.kyc_verified && (
            <Badge className="bg-green-500/20 text-green-300">KYC Verified</Badge>
          )}
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-lg bg-slate-800/40 border border-blue-800/20">
            <div className="min-w-0 flex-1">
              <p className="text-sm text-gray-400">Wallet Address</p>
              <p className="font-mono text-sm truncate">{account.address}</p>
            </div>
            <button
              onClick={copyAddress}
              className="ml-2 p-2 hover:bg-slate-700/40 rounded transition"
              title="Copy address"
            >
              <Copy className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-slate-800/40 border border-blue-800/20">
              <p className="text-sm text-gray-400">Balance</p>
              <p className="text-lg font-semibold">{balance} ETH</p>
            </div>

            <div className="p-3 rounded-lg bg-slate-800/40 border border-blue-800/20">
              <p className="text-sm text-gray-400">Status</p>
              <p className="text-lg font-semibold capitalize">
                {profile?.kyc_status || 'Connected'}
              </p>
            </div>
          </div>

          {profile && (
            <div className="space-y-2">
              {profile.username && (
                <div>
                  <p className="text-sm text-gray-400">Username</p>
                  <p className="font-medium">{profile.username}</p>
                </div>
              )}
              {profile.email && (
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <p className="font-medium">{profile.email}</p>
                </div>
              )}
              {profile.bio && (
                <div>
                  <p className="text-sm text-gray-400">Bio</p>
                  <p className="text-sm">{profile.bio}</p>
                </div>
              )}
            </div>
          )}

          <div className="flex gap-2 pt-2">
            <a
              href={`https://etherscan.io/address/${account.address}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1"
            >
              <Button
                variant="outline"
                className="w-full text-xs"
              >
                <ExternalLink className="h-3 w-3 mr-1" />
                View on Etherscan
              </Button>
            </a>
          </div>
        </div>
      </div>
    </Card>
  )
}
