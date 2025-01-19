import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card";
import { SlotAssignment } from "../../../types/types";
import { ScheduleTable } from "./ScheduleTable";

export interface ScheduleTabProps {
    assignments: SlotAssignment[] | null
}


export default function ScheduleTab(props: ScheduleTabProps) {

    console.log(JSON.stringify(props))
    return (
        <Card>
            <CardHeader>
                <CardTitle>Schedule</CardTitle>
                <CardDescription>View the current team schedule</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-center h-64">
                {props.assignments == null && <p className="text-xl text-muted-foreground">No schedule posted yet.</p>}
                {props.assignments != null && <ScheduleTable assignments={props.assignments} />}
            </CardContent>
        </Card>
    );
}

