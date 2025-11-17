import { createClient } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'
import { verifyMessage } from 'ethers' // Changed import from 'ethers/lib/utils' to 'ethers' for v6 compatibility

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { address, message, signature } = body

    if (!address || !message || !signature) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    let recoveredAddress: string
    try {
      recoveredAddress = verifyMessage(message, signature)
    } catch (error) {
      return NextResponse.json(
        { verified: false, error: 'Invalid signature' },
        { status: 400 }
      )
    }

    const verified = recoveredAddress.toLowerCase() === address.toLowerCase()

    if (verified) {
      const supabase = await createClient()

      // Update wallet account verification status
      await supabase
        .from('wallet_accounts')
        .update({ verified: true })
        .eq('wallet_address', address.toLowerCase())
    }

    return NextResponse.json({ verified })
  } catch (error) {
    console.error('[v0] Wallet verify error:', error)
    return NextResponse.json(
      { error: 'Verification failed' },
      { status: 500 }
    )
  }
}
