import { Header } from "../../components/Header"
import { TeamList } from "./components/TeamList"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <TeamList />
    </div>
  )
}