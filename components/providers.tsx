'use client'

import { ReactNode } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/lib/query-client'
import { MockWalletProvider } from './mock-wallet-provider'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <MockWalletProvider>
        {children}
      </MockWalletProvider>
    </QueryClientProvider>
  )
}
