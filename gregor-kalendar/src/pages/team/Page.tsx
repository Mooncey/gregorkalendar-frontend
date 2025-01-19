import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { useParams } from "react-router-dom";
import { getTeam } from "../../services/getTeam";
import { useFetch } from "../../services/useFetch";
import TeamInfoTab from "./components/TeamInfoTab";
import AvailabilityTab from "./components/AvailabilityTab";
import { useEffect, useMemo, useState } from "react";
import { Block, MemberAvailability } from "../../types/types";
import { usePost } from "../../services/usePost";
import { postTeamMemberAvailability } from "../../services/postTeamMemberAvailability";

export default function TeamPage() {

    const { id } = useParams();

    // Stabilize the fetch parameters using useMemo
    const fetchParams = useMemo(() => ({
      teamId: parseInt(id ?? '0', 0), // Parse `id` only once
      userEmail: "someone_1@example.com"
    }), [id]);
    
    const { data, isLoading, error } = useFetch(getTeam, fetchParams);

    const { data: updatedAvailability, isLoading: updateIsLoading, error: updateError, sendRequest: sendAvailabilityUpdateRequest } = usePost<MemberAvailability, MemberAvailability>(postTeamMemberAvailability)

    const [availableBlocks, setAvailableBlocks] = useState<Block[]>([])
    const [preferNotBlocks, setPreferNotBlocks] = useState<Block[]>([])

    useEffect(() => {
      if (data) {
        setAvailableBlocks(data.availability.availableBlocks)
        setPreferNotBlocks(data.availability.preferNotBlocks)
      }
    }, [data]);

    useEffect(() => {
      if (updatedAvailability) {
        setAvailableBlocks(updatedAvailability.availableBlocks)
        setPreferNotBlocks(updatedAvailability.preferNotBlocks)
      }
    }, [updatedAvailability])

    const handleMemberAvailabilityUpdate = async (updateParams: MemberAvailability): Promise<void> => {
      // make a post availability request
      await sendAvailabilityUpdateRequest(updateParams)
    }
  



    return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Team Dashboard</h1>
      
      {data &&
      (<Tabs defaultValue="schedule" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="availability">Availability</TabsTrigger>
          <TabsTrigger value="slots">Slots</TabsTrigger>
          <TabsTrigger value="team-info">Team Info</TabsTrigger>
        </TabsList>
        
        <TabsContent value="schedule">
          <Card>
            <CardHeader>
              <CardTitle>Schedule</CardTitle>
              <CardDescription>View the current team schedule</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-center h-64">
              <p className="text-xl text-muted-foreground">No schedule posted yet.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="availability">
          <Card>
            <CardHeader>
              <CardTitle>Availability</CardTitle>
              <CardDescription>Manage team member availability</CardDescription>
            </CardHeader>
            <CardContent>
              <AvailabilityTab availableBlocks={availableBlocks} preferNotBlocks={preferNotBlocks} handleUpdate={handleMemberAvailabilityUpdate} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="slots">
          <Card>
            <CardHeader>
              <CardTitle>Slots</CardTitle>
              <CardDescription>Set slots for team assignments</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Slots content will be added here */}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="team-info">
          <TeamInfoTab teamInfo={data.teamInfo} />
        </TabsContent>
      </Tabs>)}
    </div>
  )
}

