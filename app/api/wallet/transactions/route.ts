import { createClient } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const address = request.nextUrl.searchParams.get('address')
    const chainId = request.nextUrl.searchParams.get('chainId')
    const limit = parseInt(request.nextUrl.searchParams.get('limit') || '10')

    if (!address) {
      return NextResponse.json(
        { error: 'Wallet address is required' },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    const { data: transactions, error } = await supabase
      .from('wallet_transactions')
      .select('*')
      .eq('wallet_address', address.toLowerCase())
      .eq('chain_id', chainId ? parseInt(chainId) : 1)
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) throw error

    return NextResponse.json(transactions || [])
  } catch (error) {
    console.error('[v0] Wallet transactions error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch transactions' },
      { status: 500 }
    )
  }
}
