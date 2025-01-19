import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../../components/ui/table"
import { AddSlotButtonModal } from "./AddSlotButtonModal"
import { Slot } from "../../../types/types"
import { rangeToTime } from "../../../utils/block"

export default function SlotsTable({ slots, leaders } : { slots: Slot[], leaders: string[] }) {

    const currentUser = JSON.parse(localStorage.getItem('apiData') ?? "{\"name\":\"Emily Fuchs\",\"email\":\"emilyef@ubc.ca\"}");

    const isLeader = leaders.some((leader) => leader === currentUser.email);

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Slots</h2>
                {isLeader && <AddSlotButtonModal />}
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Slot Name</TableHead>
                            <TableHead># Members Needed</TableHead>
                            <TableHead>Start Day</TableHead>
                            <TableHead>Start Time</TableHead>
                            <TableHead>End Day</TableHead>
                            <TableHead>End Time</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {slots.map((slot) => {
                            const range = rangeToTime(slot.startBlock, slot.endBlock)
                            const startDay = range[0][0]
                            const startTime = range[0][1]
                            const endDay = range[1][0]
                            const endTime = range[1][1]
                            return (
                                <TableRow key={slot.slotId}>
                                    <TableCell>{slot.name}</TableCell>
                                    <TableCell>{slot.numMembers}</TableCell>
                                    <TableCell>{startDay}</TableCell>
                                    <TableCell>{startTime}</TableCell>
                                    <TableCell>{endDay}</TableCell>
                                    <TableCell>{endTime}</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

