import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

export default function SettingsPage() {
  const [name, setName] = useState('shadcn')
  const [email] = useState('user@example.com')

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
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <p className="text-sm text-muted-foreground">
              This is your public display name. It can be your real name or a pseudonym. You can only change this once every 30 days.
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
              You can manage verified email addresses in your email settings.
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

