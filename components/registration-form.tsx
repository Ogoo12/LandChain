'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Upload } from 'lucide-react'

export function RegistrationForm() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    ownerName: '',
    ownerEmail: '',
    ownerPhone: '',
    latitude: '',
    longitude: '',
    address: '',
    area: '',
    documentFile: null,
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <Card className="bg-slate-900/40 border-blue-800/30 p-6 max-w-2xl">
      <h2 className="text-2xl font-bold mb-6">Register New Land Property</h2>
      
      {/* Progress Indicator */}
      <div className="flex gap-4 mb-8">
        {[1, 2, 3, 4].map((s) => (
          <div key={s} className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
              s <= step ? 'bg-blue-600 text-white' : 'bg-slate-800 text-gray-400'
            }`}>
              {s}
            </div>
            {s < 4 && <div className={`w-12 h-1 mx-2 ${s < step ? 'bg-blue-600' : 'bg-slate-800'}`} />}
          </div>
        ))}
      </div>

      {/* Step 1: Owner Information */}
      {step === 1 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold mb-4">Owner Information</h3>
          <div>
            <label className="text-sm text-gray-400 mb-2 block">Full Name</label>
            <Input placeholder="Enter full name" value={formData.ownerName} onChange={(e) => handleInputChange('ownerName', e.target.value)} />
          </div>
          <div>
            <label className="text-sm text-gray-400 mb-2 block">Email Address</label>
            <Input placeholder="Enter email" value={formData.ownerEmail} onChange={(e) => handleInputChange('ownerEmail', e.target.value)} />
          </div>
          <div>
            <label className="text-sm text-gray-400 mb-2 block">Phone Number</label>
            <Input placeholder="Enter phone number" value={formData.ownerPhone} onChange={(e) => handleInputChange('ownerPhone', e.target.value)} />
          </div>
        </div>
      )}

      {/* Step 2: Location Information */}
      {step === 2 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold mb-4">Property Location</h3>
          <div>
            <label className="text-sm text-gray-400 mb-2 block">Street Address</label>
            <Input placeholder="Enter property address" value={formData.address} onChange={(e) => handleInputChange('address', e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Latitude</label>
              <Input placeholder="e.g., 40.7128" value={formData.latitude} onChange={(e) => handleInputChange('latitude', e.target.value)} />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Longitude</label>
              <Input placeholder="e.g., -74.0060" value={formData.longitude} onChange={(e) => handleInputChange('longitude', e.target.value)} />
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Property Details */}
      {step === 3 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold mb-4">Property Details</h3>
          <div>
            <label className="text-sm text-gray-400 mb-2 block">Land Area (m²)</label>
            <Input placeholder="Enter land area" value={formData.area} onChange={(e) => handleInputChange('area', e.target.value)} />
          </div>
          <div className="bg-slate-800/50 border border-blue-800/30 rounded-lg p-4">
            <p className="text-sm text-gray-400 mb-3">Encryption Note:</p>
            <p className="text-xs text-gray-500">All property documents will be encrypted using AES-256 before blockchain storage.</p>
          </div>
        </div>
      )}

      {/* Step 4: Document Upload */}
      {step === 4 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold mb-4">Upload Land Title Document</h3>
          <div className="border-2 border-dashed border-blue-800/50 rounded-lg p-8 text-center hover:border-blue-600 transition cursor-pointer">
            <Upload className="h-8 w-8 text-blue-400 mx-auto mb-2" />
            <p className="font-medium mb-1">Click or drag document</p>
            <p className="text-sm text-gray-400">PDF, JPG, PNG (Max 10MB)</p>
          </div>
          <div className="bg-green-500/10 border border-green-800/30 rounded-lg p-4">
            <p className="text-sm text-green-300">✓ Document will be securely encrypted with AES-256</p>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex gap-3 mt-8">
        <Button variant="outline" onClick={() => setStep(Math.max(1, step - 1))} disabled={step === 1}>Previous</Button>
        {step < 4 ? (
          <Button className="bg-blue-600 hover:bg-blue-700 ml-auto" onClick={() => setStep(step + 1)}>Next</Button>
        ) : (
          <Button className="bg-green-600 hover:bg-green-700 ml-auto">Register on Blockchain</Button>
        )}
      </div>
    </Card>
  )
}
