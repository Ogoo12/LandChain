'use client'

import { useEffect, useState } from 'react'
import { LayoutWrapper } from "@/components/layout-wrapper"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye } from 'lucide-react'
import { EmptyState } from "@/components/empty-state"

interface Record {
  id: string
  location: string
  status: string
  registered_date: string
}

export default function RecordsPage() {
  const [records, setRecords] = useState<Record[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await fetch('/api/records')
        if (response.ok) {
          const data = await response.json()
          setRecords(data)
        }
      } catch (error) {
        console.error('Error fetching records:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchRecords()
  }, [])

  return (
    <LayoutWrapper>
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">My Property Records</h1>
          <p className="text-gray-400">View all your registered and verified land properties</p>
        </div>

        {records.length > 0 ? (
          <Card className="bg-slate-900/40 border-blue-800/30 p-6 max-w-4xl">
            <div className="space-y-3">
              {records.map((record) => (
                <div key={record.id} className="flex items-center justify-between p-4 rounded-lg bg-slate-800/40 border border-blue-800/20 hover:bg-slate-800/60 transition">
                  <div>
                    <p className="font-medium">{record.location}</p>
                    <p className="text-sm text-gray-400">{record.id} • {new Date(record.registered_date).toLocaleDateString()}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={record.status === "verified" ? "bg-green-500/20 text-green-300" : record.status === "pending" ? "bg-yellow-500/20 text-yellow-300" : "bg-gray-500/20 text-gray-300"}>
                      {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                    </Badge>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        ) : (
          <EmptyState
            title="No property records yet"
            description="You haven't registered any properties yet. Start by registering your first land property."
            action={{
              label: "Register Property",
              href: "/register",
            }}
          />
        )}
      </div>
    </LayoutWrapper>
  )
}
