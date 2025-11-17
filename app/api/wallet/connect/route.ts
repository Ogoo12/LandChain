import { createClient } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { address, chainId, walletType, username, email } = body

    if (!address) {
      return NextResponse.json(
        { error: 'Wallet address is required' },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    const { data: existingUser } = await supabase
      .from('users')
      .select('id')
      .eq('wallet_address', address.toLowerCase())
      .single()

    let userId = existingUser?.id

    if (!existingUser) {
      // Create new user
      const { data: newUser, error: userError } = await supabase
        .from('users')
        .insert({
          wallet_address: address.toLowerCase(),
          username: username || `User_${address.slice(0, 6)}`,
          email: email || null,
        })
        .select('id')
        .single()

      if (userError) throw userError
      userId = newUser?.id
    }

    // Create or update wallet account
    const { data: walletAccount, error: walletError } = await supabase
      .from('wallet_accounts')
      .upsert(
        {
          user_id: userId,
          wallet_address: address.toLowerCase(),
          chain_id: chainId,
          wallet_type: walletType || 'unknown',
          is_primary: true,
          verified: true,
          last_activity: new Date().toISOString(),
        },
        { onConflict: 'wallet_address' }
      )
      .select()
      .single()

    if (walletError) throw walletError

    return NextResponse.json({
      success: true,
      user_id: userId,
      wallet_account: walletAccount,
    })
  } catch (error) {
    console.error('[v0] Wallet connect error:', error)
    return NextResponse.json(
      { error: 'Failed to connect wallet' },
      { status: 500 }
    )
  }
}
