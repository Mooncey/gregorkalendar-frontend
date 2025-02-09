import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card";
import { Slot } from "../../../types/types";
import SlotsTable from "./SlotsTable";



export default function SlotsTab({ slots, leaders } : { slots: Slot[], leaders: string[] }) {

    console.log(JSON.stringify(slots))
    return (
        <Card>
            <CardHeader>
                <CardTitle>Slots</CardTitle>
                <CardDescription>Set slots for team assignments</CardDescription>
            </CardHeader>
            <CardContent>
                <SlotsTable slots={slots} leaders={leaders} />
            </CardContent>
        </Card>
    );
}

