import { useState } from 'react'
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Separator } from "../../components/ui/separator"

export default function SettingsPage() {
  const [name, setName] = useState('Gregor Kiczales')
  const [email] = useState('gregor@cs.ubc.ca')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement profile update logic
    console.log('Updating profile with name:', name)
  }

  return (
    <div className="container max-w-2xl py-10 text-left flex flex-col items-start">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and set e-mail preferences.
        </p>
      </div>

      <Separator className="my-6" />

      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold">Profile</h2>
          <p className="text-sm text-muted-foreground">
            This is how others will see you on the site.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <p className="text-sm text-muted-foreground">
              This is your display name that will be visible to your teams.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              value={email}
              disabled
            />
            <p className="text-sm text-muted-foreground">
              You cannot change your email address.
            </p>
          </div>

          <Button type="submit">
            Update profile
          </Button>
        </form>
      </div>
    </div>
  )
}

