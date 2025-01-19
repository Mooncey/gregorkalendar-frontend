import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { useParams } from "react-router-dom";
import { getTeam } from "../../services/getTeam";
import { useFetch } from "../../services/useFetch";
import TeamInfoTab from "./components/TeamInfoTab";
import AvailabilityTab from "./components/AvailabilityTab";
import { useEffect, useMemo, useState } from "react";
import { Block, MemberAvailability, SlotAssignment } from "../../types/types";
import { usePost } from "../../services/usePost";
import { postTeamMemberAvailability } from "../../services/postTeamMemberAvailability";
import { PostTeamMemberAvailabilityRequest, PostTeamMemberAvailabilityResponse } from "../../types/apiTypes";
import ScheduleTab from "./components/ScheduleTab";
import SlotsTab from "./components/SlotsTab";

export default function TeamPage() {

    const { id } = useParams();

    // Stabilize the fetch parameters using useMemo
    const fetchParams = useMemo(() => ({
      teamId: parseInt(id ?? '0', 0), // Parse `id` only once
      userEmail: "susan@ubc.ca"
    }), [id]);
    
    const { data, isLoading, error } = useFetch(getTeam, fetchParams);

    const { data: updatedAvailability, isLoading: updateIsLoading, error: updateError, sendRequest: sendAvailabilityUpdateRequest } = usePost<PostTeamMemberAvailabilityRequest, PostTeamMemberAvailabilityResponse>(postTeamMemberAvailability)

    const [availableBlocks, setAvailableBlocks] = useState<Block[]>([])
    const [preferNotBlocks, setPreferNotBlocks] = useState<Block[]>([])
    const [postedSchedule, setPostedSchedule] = useState<SlotAssignment[] | null>(null)

    useEffect(() => {
      if (data) {
        setAvailableBlocks(data.availability.availableBlocks)
        setPreferNotBlocks(data.availability.preferNotBlocks)
        setPostedSchedule(data.schedule?.schedule.slotAssignments)
        console.log(JSON.stringify(data.schedule?.schedule.slotAssignments))
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
      const { availableBlocks: updateAvailBlocks, preferNotBlocks: updatePreferBlocks } = updateParams

      const postUpdateParams: PostTeamMemberAvailabilityRequest = {
        teamId: parseInt(id ?? '0'),
        userEmail: "susan@ubc.ca",
        availableBlocks: updateAvailBlocks,
        preferNotBlocks: updatePreferBlocks,
      }

      await sendAvailabilityUpdateRequest(postUpdateParams)
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
          <ScheduleTab assignments={postedSchedule} />
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
          <SlotsTab slots={data.slots} />
        </TabsContent>
        
        <TabsContent value="team-info">
          <TeamInfoTab teamInfo={data.teamInfo} />
        </TabsContent>
      </Tabs>)}
    </div>
  )
}

