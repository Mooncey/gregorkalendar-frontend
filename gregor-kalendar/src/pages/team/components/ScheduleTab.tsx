import { useParams } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card";
import { putSchedule } from "../../../services/putSchedule";
import { GenerateScheduleRequest, GenerateScheduleResponse } from "../../../types/apiTypes";
import { SlotAssignment } from "../../../types/types";
import { ScheduleTable } from "./ScheduleTable";
import { usePost } from "../../../services/usePost";

export interface ScheduleTabProps {
    setAssignments: React.Dispatch<React.SetStateAction<SlotAssignment[] | null>>;
    assignments: SlotAssignment[] | null
}


export default function ScheduleTab(props: ScheduleTabProps) {

    const { data, isLoading, error, sendRequest } = usePost<GenerateScheduleResponse, GenerateScheduleRequest>(putSchedule)
    const { id } = useParams();


      const handleGenerate = () => {
    
        const requestBody: GenerateScheduleRequest = {
          teamId: parseInt(id ?? '0'),
        }
    
        sendRequest(requestBody)
    
        if (data) {
            props.setAssignments(data.schedule.slotAssignments);
        }
    
        // window.location.href=window.location.href
      }

    console.log(JSON.stringify(props))
    return (
        <Card>
            <CardHeader>
                <CardTitle>Schedule</CardTitle>
                <CardDescription>View the current team schedule</CardDescription>
            </CardHeader>
            <CardContent className="flex-col items-center justify-center h-64">
                {props.assignments == null && (
                    <>
                        <p className="text-xl text-muted-foreground">No schedule posted yet.</p>
                        <Button type="submit" onClick={handleGenerate}>Generate Schedule</Button>
                    </>
                    )
                }
                {props.assignments != null && <ScheduleTable assignments={props.assignments} />}
            </CardContent>
        </Card>
    );
}

