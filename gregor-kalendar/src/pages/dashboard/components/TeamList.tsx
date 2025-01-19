import { Card } from "../../../components/ui/card"
import { Link } from 'react-router-dom'
import { CreateTeamButtonModal } from './CreateTeamButtonModal'
import { useFetch } from "../../../services/useFetch"
import { getUserTeams } from "../../../services/getUserTeams"
import { Skeleton } from "../../../components/ui/skeleton"


export function TeamList() {


  const { data, isLoading, error } = useFetch(getUserTeams, "john@example.com");

  return (
    <div className="container py-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Teams</h2>
        <CreateTeamButtonModal />
      </div>
      <div className="grid gap-4">
        {
          isLoading && <Skeleton className="h-[125px] w-full rounded-xl" />
        }
        {data?.teams.map((team) => (
          <Link key={team.teamId} to={`/team/${team.teamId}`}>
            <Card className="p-4 hover:bg-blue-50 transition-colors cursor-pointer">
              <h3 className="text-lg font-medium">{team.teamName}</h3>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

