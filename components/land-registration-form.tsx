"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { Upload, MapPin, FileText, User, DollarSign, Calendar, CheckCircle2 } from 'lucide-react'

export function LandRegistrationForm() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    ownerName: "",
    ownerEmail: "",
    location: "",
    latitude: "",
    longitude: "",
    area: "",
    propertyType: "",
    marketValue: "",
    documents: [],
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      setFormData(prev => ({
        ...prev,
        documents: Array.from(files).map(f => f.name)
      }))
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex gap-4 justify-between mb-4">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex-1">
              <div className={`h-1 rounded-full transition-all ${s <= step ? "bg-gradient-to-r from-blue-400 to-cyan-400" : "bg-slate-700"}`} />
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-400 text-center">Step {step} of 4</p>
      </div>

      {/* Step 1: Owner Information */}
      {step === 1 && (
        <Card className="bg-slate-900/40 border-blue-800/30 p-6 space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
              <User className="h-5 w-5 text-blue-400" />
              Owner Information
            </h2>
            <p className="text-sm text-gray-400">Provide details about the property owner</p>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Full Name</label>
              <Input
                name="ownerName"
                value={formData.ownerName}
                onChange={handleInputChange}
                placeholder="John Doe"
                className="bg-slate-800/50 border-slate-700 focus:border-blue-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email Address</label>
              <Input
                name="ownerEmail"
                value={formData.ownerEmail}
                onChange={handleInputChange}
                placeholder="john@example.com"
                type="email"
                className="bg-slate-800/50 border-slate-700 focus:border-blue-600"
              />
            </div>
          </div>
        </Card>
      )}

      {/* Step 2: Property Location */}
      {step === 2 && (
        <Card className="bg-slate-900/40 border-blue-800/30 p-6 space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-cyan-400" />
              Property Location
            </h2>
            <p className="text-sm text-gray-400">Enter the exact location of the property</p>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Address</label>
              <Input
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="123 Oak Street, City, State"
                className="bg-slate-800/50 border-slate-700 focus:border-cyan-600"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Latitude</label>
                <Input
                  name="latitude"
                  value={formData.latitude}
                  onChange={handleInputChange}
                  placeholder="40.7128"
                  className="bg-slate-800/50 border-slate-700 focus:border-cyan-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Longitude</label>
                <Input
                  name="longitude"
                  value={formData.longitude}
                  onChange={handleInputChange}
                  placeholder="-74.0060"
                  className="bg-slate-800/50 border-slate-700 focus:border-cyan-600"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Total Area (sq ft)</label>
              <Input
                name="area"
                value={formData.area}
                onChange={handleInputChange}
                placeholder="5,000"
                className="bg-slate-800/50 border-slate-700 focus:border-cyan-600"
              />
            </div>
          </div>
        </Card>
      )}

      {/* Step 3: Property Details */}
      {step === 3 && (
        <Card className="bg-slate-900/40 border-blue-800/30 p-6 space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
              <FileText className="h-5 w-5 text-purple-400" />
              Property Details
            </h2>
            <p className="text-sm text-gray-400">Provide property specifications and valuation</p>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Property Type</label>
              <select
                name="propertyType"
                value={formData.propertyType}
                onChange={handleInputChange}
                className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-3 py-2 text-white focus:border-purple-600"
              >
                <option value="">Select type</option>
                <option value="residential">Residential</option>
                <option value="commercial">Commercial</option>
                <option value="agricultural">Agricultural</option>
                <option value="industrial">Industrial</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Market Value (USD)</label>
              <Input
                name="marketValue"
                value={formData.marketValue}
                onChange={handleInputChange}
                placeholder="$500,000"
                className="bg-slate-800/50 border-slate-700 focus:border-purple-600"
              />
            </div>
          </div>
        </Card>
      )}

      {/* Step 4: Documentation */}
      {step === 4 && (
        <Card className="bg-slate-900/40 border-blue-800/30 p-6 space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
              <Upload className="h-5 w-5 text-emerald-400" />
              Upload Documents
            </h2>
            <p className="text-sm text-gray-400">Upload supporting documents for verification</p>
          </div>
          <div className="space-y-4">
            <div className="border-2 border-dashed border-slate-700 rounded-lg p-8 text-center hover:border-blue-500 transition cursor-pointer">
              <input
                type="file"
                multiple
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                <p className="font-medium mb-1">Click to upload documents</p>
                <p className="text-sm text-gray-500">PDF, images (max 10MB each)</p>
              </label>
            </div>

            {formData.documents.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium">Uploaded Files:</p>
                {formData.documents.map((doc, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2 bg-slate-800/50 rounded-lg">
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                    <span className="text-sm">{doc}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Navigation Buttons */}
      <div className="flex gap-4 mt-8">
        <Button
          variant="outline"
          onClick={() => setStep(Math.max(1, step - 1))}
          disabled={step === 1}
          className="flex-1"
        >
          Previous
        </Button>
        <Button
          onClick={() => setStep(Math.min(4, step + 1))}
          className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
        >
          {step === 4 ? "Submit Registration" : "Next"}
        </Button>
      </div>
    </div>
  )
}
