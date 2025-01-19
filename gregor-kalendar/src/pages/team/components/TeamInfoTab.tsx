import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../components/ui/table"
import { TeamInfo } from "../../../types/apiTypes"
import { User } from "../../../types/types"
import { AddMemberButtonModal } from "./AddMemberButtonModal"
import { AddLeaderButtonModal } from "./AddLeaderButtonModal"
import { SetStateAction, useState } from "react"

export default function TeamInfoTab(teamInfo: {teamInfo: TeamInfo}) {

  const [leaders, setLeaders] = useState<User[]>(teamInfo.teamInfo.leaders)
  const [members, setMembers] = useState<User[]>(teamInfo.teamInfo.members)
  
  const currentUser = JSON.parse(localStorage.getItem('apiData') ?? "{\"name\":\"Emily Fuchs\",\"email\":\"emilyef@ubc.ca\"}");

  const isLeader = teamInfo.teamInfo.leaders.some(user => user.email === currentUser.email);

  return (
          <Card>
            <CardHeader>
              <CardTitle>Team Info</CardTitle>
              <CardDescription>View team members and information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-semibold">Team Leaders</h3>
                    {isLeader &&<AddLeaderButtonModal setLeaders={setLeaders} leaders={leaders}  />}
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                    {teamInfo.teamInfo.leaders.map((leader: User) => (
                      <TableRow key={leader.email}>
                        <TableCell>{leader.name}</TableCell>
                        <TableCell>{leader.email}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  </Table>
                </div>
        
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-semibold">Team Members</h3>
                    {isLeader && <AddMemberButtonModal setMembers={setMembers} members={members}/>}
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                    {teamInfo.teamInfo.members.map((member: User) => (
                      <TableRow key={member.email}>
                        <TableCell>{member.name}</TableCell>
                        <TableCell>{member.email}</TableCell>
                      </TableRow>
                    ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
  )
}

