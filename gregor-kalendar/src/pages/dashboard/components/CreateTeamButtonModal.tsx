import { SetStateAction, useState } from 'react'
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog"
import { Label } from "../../../components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar"
import { Plus, User } from 'lucide-react'

export function CreateTeamButtonModal() {
  const [teamName, setTeamName] = useState('')
  const [open, setOpen] = useState(false)

  const handleCreate = () => {
    // TODO: Implement team creation logic here
    console.log('Creating team:', teamName)
    setOpen(false)
    setTeamName('')
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Create Team</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Team</DialogTitle>
          <DialogDescription>
            Enter your team name below.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="team-name" className="text-right">
              Team Name
            </Label>
            <Input
              id="team-name"
              value={teamName}
              onChange={(e: { target: { value: SetStateAction<string> } }) => setTeamName(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Leaders</Label>
            <div className="col-span-3 flex items-center space-x-2">
              <Avatar>
                <AvatarImage src="/placeholder-user.jpg" alt="@johndoe" />
                <AvatarFallback><User /></AvatarFallback>
              </Avatar>
              <span>Gregor Kiczales</span>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleCreate} disabled={!teamName.trim()}>
            <Plus className="mr-2 h-4 w-4" />
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

