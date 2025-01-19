import { TeamList } from "./components/TeamList"
// import { getMemberTeams } from "../../services/getMemberTeams";
// import { useFetch } from "../../services/useFetch";

export default function DashboardPage() {
  // const { data, isLoading, error } = useFetch(getMemberTeams);


  return (
    <div className="min-h-screen bg-slate-50">
      {/* {isLoading && <h1>Loading...</h1>}
      {error && <h1>Error: {error.message}</h1>}
      {data && <h1>Message: {data.teams[0].teamName}</h1>} */}
      <TeamList />
    </div>
  )
}