import { Plus } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Link } from 'react-router-dom'

interface Team {
  id: string
  name: string
}

const teams: Team[] = [
  { id: "1", name: "My Awesome Team" },
  { id: "2", name: "Frontend Team" },
  { id: "3", name: "Backend Team" },
  { id: "4", name: "CPSC 110" },
  { id: "5", name: "Leadership Team" },
  { id: "6", name: "Gregor Kiczales Lovers" },
  { id: "7", name: "Gregor Fans" },
]

export function TeamList() {
  return (
    <div className="container py-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Teams</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Team
        </Button>
      </div>
      <div className="grid gap-4">
        {teams.map((team) => (
          <Link key={team.id} to={`/team/${team.id}`}>
            <Card className="p-4 hover:bg-blue-50 transition-colors cursor-pointer">
              <h3 className="text-lg font-medium">{team.name}</h3>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

