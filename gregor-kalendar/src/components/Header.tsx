import { SmileIcon } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Link } from 'react-router-dom'

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-blue-50">
      <div className="container flex h-14 items-center justify-between">
        <Link to="/dashboard" className="flex items-center space-x-2">
          <span className="text-xl font-bold">Scheduler</span>
        </Link>
        <Button variant="ghost" size="icon">
          <SmileIcon className="h-5 w-5" />
          <span className="sr-only">Profile</span>
        </Button>
      </div>
    </header>
  )
}