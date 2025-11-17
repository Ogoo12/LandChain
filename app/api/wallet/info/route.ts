import { createClient } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const address = request.nextUrl.searchParams.get('address')

    if (!address) {
      return NextResponse.json(
        { error: 'Wallet address is required' },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('wallet_address', address.toLowerCase())
      .single()

    if (error && error.code !== 'PGRST116') throw error

    return NextResponse.json(user || { wallet_address: address })
  } catch (error) {
    console.error('[v0] Wallet info error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch wallet info' },
      { status: 500 }
    )
  }
}
