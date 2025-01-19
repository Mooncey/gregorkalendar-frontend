import { useState } from "react"
import { Button } from "../../../components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select"

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, "0"))
const minutes = ["00", "15", "30", "45"]

export function AddSlotButtonModal() {
  const [open, setOpen] = useState(false)
  const [slotName, setSlotName] = useState("")
  const [startDay, setStartDay] = useState("")
  const [endDay, setEndDay] = useState("")
  const [startHour, setStartHour] = useState("")
  const [startMinute, setStartMinute] = useState("")
  const [endHour, setEndHour] = useState("")
  const [endMinute, setEndMinute] = useState("")
  const [membersNeeded, setMembersNeeded] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log({
      slotName,
      startDay,
      endDay,
      startHour,
      startMinute,
      endHour,
      endMinute,
      membersNeeded,
    })
    setOpen(false)
    // Reset form fields
    setSlotName("")
    setStartDay("")
    setEndDay("")
    setStartHour("")
    setStartMinute("")
    setEndHour("")
    setEndMinute("")
    setMembersNeeded("")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add Slot</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Slot</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="slotName">Slot Name</Label>
            <Input
              id="slotName"
              value={slotName}
              onChange={(e) => setSlotName(e.target.value)}
              placeholder="Enter slot name"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="startDay">Start Day</Label>
            <Select value={startDay} onValueChange={setStartDay} required>
              <SelectTrigger id="startDay">
                <SelectValue placeholder="Select start day" />
              </SelectTrigger>
              <SelectContent>
                {days.map((day) => (
                  <SelectItem key={day} value={day}>
                    {day}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="endDay">End Day</Label>
            <Select value={endDay} onValueChange={setEndDay} required>
              <SelectTrigger id="endDay">
                <SelectValue placeholder="Select end day" />
              </SelectTrigger>
              <SelectContent>
                {days.map((day) => (
                  <SelectItem key={day} value={day}>
                    {day}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex space-x-4">
            <div className="flex-1 space-y-2">
              <Label htmlFor="startHour">Start Hour</Label>
              <Select value={startHour} onValueChange={setStartHour} required>
                <SelectTrigger id="startHour">
                  <SelectValue placeholder="HH" />
                </SelectTrigger>
                <SelectContent>
                  {hours.map((hour) => (
                    <SelectItem key={hour} value={hour}>
                      {hour}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1 space-y-2">
              <Label htmlFor="startMinute">Start Minute</Label>
              <Select value={startMinute} onValueChange={setStartMinute} required>
                <SelectTrigger id="startMinute">
                  <SelectValue placeholder="MM" />
                </SelectTrigger>
                <SelectContent>
                  {minutes.map((minute) => (
                    <SelectItem key={minute} value={minute}>
                      {minute}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex space-x-4">
            <div className="flex-1 space-y-2">
              <Label htmlFor="endHour">End Hour</Label>
              <Select value={endHour} onValueChange={setEndHour} required>
                <SelectTrigger id="endHour">
                  <SelectValue placeholder="HH" />
                </SelectTrigger>
                <SelectContent>
                  {hours.map((hour) => (
                    <SelectItem key={hour} value={hour}>
                      {hour}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1 space-y-2">
              <Label htmlFor="endMinute">End Minute</Label>
              <Select value={endMinute} onValueChange={setEndMinute} required>
                <SelectTrigger id="endMinute">
                  <SelectValue placeholder="MM" />
                </SelectTrigger>
                <SelectContent>
                  {minutes.map((minute) => (
                    <SelectItem key={minute} value={minute}>
                      {minute}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="membersNeeded">Number of Members Needed</Label>
            <Input
              id="membersNeeded"
              type="number"
              value={membersNeeded}
              onChange={(e) => setMembersNeeded(e.target.value)}
              placeholder="Enter number of members needed"
              required
              min="1"
            />
          </div>
          <Button type="submit" className="w-full">Add Slot</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

