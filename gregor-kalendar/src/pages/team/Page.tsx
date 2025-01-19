import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { useParams } from "react-router-dom";
import { getTeam } from "../../services/getTeam";
import { useFetch } from "../../services/useFetch";
import TeamInfoTab from "./components/TeamInfoTab";
import AvailabilityTab from "./components/AvailabilityTab";
import { useEffect, useMemo, useState } from "react";
import { Block, MemberAvailability, SlotAssignment, User } from "../../types/types";
import { usePost } from "../../services/usePost";
import { postTeamMemberAvailability } from "../../services/postTeamMemberAvailability";
import { PostTeamMemberAvailabilityRequest, PostTeamMemberAvailabilityResponse } from "../../types/apiTypes";
import ScheduleTab from "./components/ScheduleTab";
import SlotsTab from "./components/SlotsTab";

export default function TeamPage() {

  const { id } = useParams();

  const user = JSON.parse(localStorage.getItem('apiData') ?? "{\"name\":\"Emily Fuchs\",\"email\":\"emilyef@ubc.ca\"}");

  // Stabilize the fetch parameters using useMemo
  const fetchParams = useMemo(() => ({
    teamId: parseInt(id ?? '0', 0), // Parse `id` only once
    userEmail: user.email
  }), [id]);

  const { data, isLoading, error } = useFetch(getTeam, fetchParams);

  const { data: updatedAvailability, isLoading: updateIsLoading, error: updateError, sendRequest: sendAvailabilityUpdateRequest } = usePost<PostTeamMemberAvailabilityRequest, PostTeamMemberAvailabilityResponse>(postTeamMemberAvailability)

  const [availableBlocks, setAvailableBlocks] = useState<Block[] | null>(null)
  const [preferNotBlocks, setPreferNotBlocks] = useState<Block[] | null>(null)
  const [postedSchedule, setPostedSchedule] = useState<SlotAssignment[] | null>(null)

  useEffect(() => {
    if (data?.availability) {
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
      userEmail: user.email,
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
            <TabsTrigger value="availability" disabled={data?.availability == null}>Availability</TabsTrigger>
            <TabsTrigger value="slots">Slots</TabsTrigger>
            <TabsTrigger value="team-info">Team Info</TabsTrigger>
          </TabsList>

          <TabsContent value="schedule">
            <ScheduleTab setAssignments={setPostedSchedule} assignments={postedSchedule} />
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
            <SlotsTab slots={data.slots || []} leaders={data.teamInfo.leaders.map((user: User) => {
              return (user.email)
            })} />
          </TabsContent>

          <TabsContent value="team-info">
            <TeamInfoTab teamInfo={data.teamInfo} />
          </TabsContent>
        </Tabs>)}
    </div>
  )
}

