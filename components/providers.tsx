'use client'

import { ReactNode } from 'react'
import { ThirdwebProvider } from 'thirdweb/react'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/lib/query-client'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThirdwebProvider>
        {children}
      </ThirdwebProvider>
    </QueryClientProvider>
  )
}
