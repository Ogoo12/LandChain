import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search, Home, Plus } from 'lucide-react'
import Link from 'next/link'

interface EmptyStateProps {
  icon?: React.ReactNode
  title: string
  description: string
  action?: {
    label: string
    href: string
  }
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <Card className="bg-slate-900/40 border-blue-800/30 p-12 text-center">
      <div className="flex justify-center mb-4">
        {icon || <Search className="h-12 w-12 text-gray-600" />}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-400 mb-6">{description}</p>
      {action && (
        <Link href={action.href}>
          <Button className="bg-blue-600 hover:bg-blue-700">{action.label}</Button>
        </Link>
      )}
    </Card>
  )
}
