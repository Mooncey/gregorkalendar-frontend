import { useState, useMemo, useEffect } from 'react'
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "../../../components/ui/radio-group"
import { PlusIcon } from 'lucide-react'
import { postLeader } from '../../../services/postLeader'
import { useParams } from 'react-router-dom'
import { PostLeaderRequest, PostLeaderResponse } from '../../../types/apiTypes'
import { usePost } from '../../../services/usePost'
import { User } from '../../../types/types'

interface AddLeaderButtonModalProps {
    setLeaders: React.Dispatch<React.SetStateAction<User[]>>;
    leaders: User[]
}





export function AddLeaderButtonModal(props: AddLeaderButtonModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [addOption, setAddOption] = useState<'single' | 'multiple'>('single')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [file, setFile] = useState<File | null>(null)
  
  const { data, isLoading, error, sendRequest } = usePost<PostLeaderRequest, PostLeaderResponse>(postLeader)
  const { id } = useParams();


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (addOption === 'single') {

      const leader: User = {
          name: name,
          email: email
      }
      const requestBody: PostLeaderRequest = {
        teamId: parseInt(id ?? '0'),
        leader: leader
      }

      sendRequest(requestBody)

      console.log('Adding single user:', { name, email })
      props.setLeaders([...props.leaders, leader])
      // Here you would typically call an API to add the user
    } else {
      console.log('Uploading CSV file:', file?.name)
      // Here you would typically handle the CSV file upload
    }
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
            <PlusIcon className="mr-2 h-4 w-4" /> Add Leader
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Leader</DialogTitle>
          <DialogDescription>
            Add a single leader or multiple leaders via CSV upload.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <RadioGroup defaultValue="single" onValueChange={(value) => setAddOption(value as 'single' | 'multiple')}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="single" id="single" />
                <Label htmlFor="single">Add Single User</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="multiple" id="multiple" />
                <Label htmlFor="multiple">Add Multiple Users by CSV</Label>
              </div>
            </RadioGroup>

            {addOption === 'single' ? (
              <>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="col-span-3"
                  />
                </div>
              </>
            ) : (
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="csv">Upload CSV</Label>
                <Input
                  id="csv"
                  type="file"
                  accept=".csv"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button type="submit">Add Leader(s)</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

