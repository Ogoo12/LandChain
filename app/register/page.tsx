'use client'

import { LayoutWrapper } from "@/components/layout-wrapper"
import { RegistrationForm } from "@/components/registration-form"

export default function RegisterPage() {
  return (
    <LayoutWrapper>
      <div className="space-y-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Register New Property</h1>
          <p className="text-gray-400">Digitize your land title with secure encryption and blockchain registration</p>
        </div>
        <RegistrationForm />
      </div>
    </LayoutWrapper>
  )
}
