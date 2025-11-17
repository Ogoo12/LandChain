'use client'

import { LayoutWrapper } from "@/components/layout-wrapper"
import { VerificationTool } from "@/components/verification-tool"

export default function VerifyPage() {
  return (
    <LayoutWrapper>
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Verify Property Ownership</h1>
          <p className="text-gray-400">Search and verify property records with blockchain immutability proof</p>
        </div>
        <VerificationTool />
      </div>
    </LayoutWrapper>
  )
}
