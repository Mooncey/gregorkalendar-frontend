import { useEffect, useState } from "react";
import { TeamList } from "./components/TeamList"
import { getMemberTeams } from "../../services/getMemberTeams";

export default function DashboardPage() {
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    // Fetch data on component mount
    const getData = async () => {
      try {
        const data = await getMemberTeams();
        setMessage(data.message);
      } catch (error) {
        console.error(error);
      }
    };

    getData();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <TeamList />
      <h1>{message}</h1>
    </div>
  )
}