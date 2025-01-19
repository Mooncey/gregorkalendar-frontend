import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../../components/ui/table"
import { rangeToTime } from '../../../utils/block'
import { SlotAssignment, User } from '../../../types/types'


export function ScheduleTable({ assignments }: { assignments: SlotAssignment[] }) {


    return (
        <Table>
            <TableCaption>Generated Schedule</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Slot Name</TableHead>
                    <TableHead>Start Time</TableHead>
                    <TableHead>End Time</TableHead>
                    <TableHead>Assigned Members</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {assignments.map((ass, index) => {

                    const range = rangeToTime(ass.slot.startBlock, ass.slot.endBlock)
                    const startDay = range[0][0]
                    const startTime = range[0][1]
                    const endDay = range[1][0]
                    const endTime = range[1][1]
                    const memberNames = ass.members.map((member: User) => {
                        return member.name
                    })

                    return (<TableRow key={index}>
                        <TableCell className="font-medium">{ass.slot.name}</TableCell>
                        <TableCell>{`${startDay} ${startTime}`}</TableCell>
                        <TableCell>{`${endDay} ${endTime}`}</TableCell>
                        <TableCell>{memberNames.join(', ')}</TableCell>
                    </TableRow>)
                })}
            </TableBody>
        </Table>
    )
}

